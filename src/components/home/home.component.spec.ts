import { ComponentFixture, TestBed } from "@angular/core/testing";
import { firstValueFrom, of, throwError } from "rxjs";
import { signal } from "@angular/core";

import { HomeComponent } from "./home.component";
import { Airport } from "../../models/airport.model";
import { AirportService } from "../../services/airport.service";
import { Router } from "@angular/router";

describe("HomeComponent", () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let mockAirportService: any;
  let mockRouter: any;

  const sampleAirports: Airport[] = [
    {
      OriginAirportCode: "JFK",
      DestinationAirportCode: "BOS",
      IsSeasonal: true,
      IsJetBlue: true,
      IsInterline: false,
    } as Airport,
    {
      OriginAirportCode: "JFK",
      DestinationAirportCode: "LAX",
      IsSeasonal: false,
      IsJetBlue: false,
      IsInterline: true,
    } as Airport,
    {
      OriginAirportCode: "BOS",
      DestinationAirportCode: "JFK",
      IsSeasonal: false,
      IsJetBlue: true,
      IsInterline: true,
    } as Airport,
  ];

  beforeEach(async () => {
    // minimal mock: getOriginAirports returns observable; allAirports is a signal-like getter used in component
    const allSignal = signal<Airport[]>(sampleAirports);

    mockAirportService = {
      getOriginAirports: () => of(["JFK", "BOS"]),
      allAirports: () => allSignal(),
    };

    mockRouter = {
      navigate: (args: any[]) => Promise.resolve(true),
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: AirportService, useValue: mockAirportService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("ngOnInit should populate originAirports$ and call handleLoading lifecycle", async () => {
    const calls: string[] = [];
    // replace BaseComponent helpers to record calls
    (component as any).handleLoading = (v?: any) => calls.push(`loading:${v}`);
    (component as any).handleError = (m?: any) =>
      calls.push(`error:${String(m)}`);

    fixture.detectChanges(); // triggers ngOnInit

    const vals = await firstValueFrom(component.originAirports$);
    expect(vals).toEqual(["JFK", "BOS"]);
    // handleLoading should have been called at least once (true then false)
    expect(calls.some((c) => c.startsWith("loading"))).toBeTruthy();
    expect(calls.some((c) => c.startsWith("error"))).toBeFalsy();
  });

  it("getDestinationsForOrigin should set originRoutes and destinations based on service signal", () => {
    // ensure initial flags are false
    component.isSeasonal = false;
    component.isJetBlue = false;
    component.isInterline = false;

    // call with origin code
    component.getDestinationsForOrigin("JFK");

    // originRoutes should contain the two JFK routes
    const routes = component.originRoutes();
    expect(routes.length).toBe(2);
    // destinations should be unique codes from those routes
    const dests = component.destinations();
    expect(dests).toContain("BOS");
    expect(dests).toContain("LAX");
  });

  it("applyFilters should filter by checkboxes (only filter when checked)", () => {
    // set originRoutes to a mixture
    component.originRoutes.set([
      sampleAirports[0], // JFK->BOS seasonal true, jetblue true
      sampleAirports[1], // JFK->LAX seasonal false, jetblue false
    ]);

    // check seasonal only
    component.isSeasonal = true;
    component.isJetBlue = false;
    component.isInterline = false;
    component.applyFilters();
    expect(component.destinations()).toEqual(["BOS"]);

    // check jetblue only
    component.isSeasonal = false;
    component.isJetBlue = true;
    component.applyFilters();
    expect(component.destinations()).toEqual(["BOS"]);

    // check none (should return both)
    component.isJetBlue = false;
    component.applyFilters();
    const both = component.destinations();
    expect(both).toContain("BOS");
    expect(both).toContain("LAX");
  });

  it("getDestinationDetails should navigate and call handleError on failed navigation", async () => {
    const calls: string[] = [];
    (component as any).handleLoading = (v?: any) => calls.push(`loading:${v}`);
    (component as any).handleError = (m?: any) =>
      calls.push(`error:${String(m)}`);

    // successful navigation
    mockRouter.navigate = () => Promise.resolve(true);
    component.getDestinationDetails("BOS");
    // wait microtask queue
    await Promise.resolve();
    expect(calls.some((c) => c.startsWith("loading"))).toBeTruthy();
    expect(calls.some((c) => c.startsWith("error"))).toBeFalsy();

    // failed navigation (navigate resolves false)
    calls.length = 0;
    mockRouter.navigate = () => Promise.resolve(false);
    component.getDestinationDetails("LAX");
    await Promise.resolve();
    expect(calls.some((c) => c.startsWith("loading"))).toBeTruthy();
    expect(calls.some((c) => c.startsWith("error"))).toBeTruthy();

    // navigation throws
    calls.length = 0;
    mockRouter.navigate = () => Promise.reject(new Error("boom"));
    component.getDestinationDetails("SFO");
    // allow promise rejection to propagate through microtasks
    await Promise.resolve()
      .then(() => Promise.resolve())
      .catch(() => {});
    expect(calls.some((c) => c.startsWith("loading"))).toBeTruthy();
    expect(calls.some((c) => c.startsWith("error"))).toBeTruthy();
  });
});
