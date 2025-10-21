import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of, throwError, Observable } from "rxjs";
import { convertToParamMap } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

import { AirportDetailsComponent } from "./airport-details.component";
import { AirportService } from "../../services/airport.service";
import { AirportDetails } from "../../models/airport.model";

function createMockAirportService<T = AirportDetails | null>(
  initial$: Observable<T> = of(null as unknown as T)
) {
  const calls: string[] = [];
  let result$: Observable<T> = initial$;
  return {
    getAirportDetails(code: string) {
      calls.push(code);
      return result$;
    },
    __setReturn(obs: Observable<T>) {
      result$ = obs;
    },
    __calls: calls,
  } as unknown as {
    getAirportDetails: (code: string) => Observable<T>;
    __setReturn: (obs: Observable<T>) => void;
    __calls: string[];
  };
}

describe("AirportDetailsComponent", () => {
  let fixture: ComponentFixture<AirportDetailsComponent>;
  let component: AirportDetailsComponent;
  let mockAirportService: any;

  const sampleDetails: AirportDetails = {
    fullName: "John F. Kennedy International Airport",
    cityName: "New York City",
    description: "The city that never sleeps",
    meta: ["lifestyle", "culture"],
    thingsToDo: ["Visit Statue of Liberty", "Explore Central Park"],
  };

  beforeEach(async () => {
    mockAirportService = createMockAirportService(of(sampleDetails));

    await TestBed.configureTestingModule({
      imports: [AirportDetailsComponent],
      providers: [
        { provide: AirportService, useValue: mockAirportService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ code: "JFK" })) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AirportDetailsComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getAirportDetails with route code and set details on success", () => {
    const calls: string[] = [];
    (component as any).handleLoading = (v?: any) => calls.push(`loading:${v}`);
    (component as any).handleError = (msg?: any) =>
      calls.push(`error:${String(msg)}`);

    fixture.detectChanges();

    expect(mockAirportService.__calls).toContain("JFK");
    expect(component.details).toEqual(sampleDetails);
    expect(calls.some((c) => c.startsWith("loading"))).toBeTruthy();
    expect(calls.some((c) => c.startsWith("error"))).toBeFalsy();
  });

  it("should call handleError and keep details null on service error", () => {
    mockAirportService.__setReturn(throwError(() => new Error("network")));

    const calls: string[] = [];
    (component as any).handleLoading = (v?: any) => calls.push(`loading:${v}`);
    (component as any).handleError = (msg?: any) =>
      calls.push(`error:${String(msg)}`);

    fixture.detectChanges();

    expect(mockAirportService.__calls).toContain("JFK");
    expect(component.details).toBeNull();
    expect(calls.some((c) => c.startsWith("loading"))).toBeTruthy();
    expect(calls.some((c) => c.startsWith("error"))).toBeTruthy();
  });

  it("should not call service when route has no code", async () => {
    await TestBed.resetTestingModule();
    mockAirportService = createMockAirportService(of(sampleDetails));

    await TestBed.configureTestingModule({
      imports: [AirportDetailsComponent],
      providers: [
        { provide: AirportService, useValue: mockAirportService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({})) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AirportDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(mockAirportService.__calls.length).toBe(0);
    expect(component.details).toBeNull();
  });
});
