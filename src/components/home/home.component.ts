import { Component, signal, WritableSignal } from "@angular/core";
import { BaseComponent } from "../base.component";
import { AirportService } from "../../services/airport.service";
import { catchError, finalize, Observable, of } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ArrayUtils } from "../../utils/array.utils";
import { Airport } from "../../models/airport.model";

@Component({
  selector: "app-home",
  imports: [CommonModule, FormsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  standalone: true,
})
export class HomeComponent extends BaseComponent {
  isSeasonal = false;
  isJetBlue = false;
  isInterline = false;
  originAirports$!: Observable<(string | boolean)[]>;
  originRoutes: WritableSignal<Airport[]> = signal<Airport[]>([]);
  destinations: WritableSignal<string[]> = signal<string[]>([]);

  constructor(private airportService: AirportService) {
    super();
  }

  ngOnInit(): void {
    this.handleLoading(true);

    this.originAirports$ = this.airportService.getOriginAirports().pipe(
      catchError((error) => {
        this.handleError(error);

        return of([]);
      }),
      finalize(() => {
        this.handleLoading(false);
      })
    );
  }

  applyFilters(): void {
    const routes = this.originRoutes(); // Airport[]
    const filters: Partial<Airport> = {};
    if (this.isSeasonal) filters.IsSeasonal = true;
    if (this.isJetBlue) filters.IsJetBlue = true;
    if (this.isInterline) filters.IsInterline = true;

    const filteredRoutes = ArrayUtils.filterByMultipleConditions(
      routes,
      filters
    );
    const destCodes = ArrayUtils.getUniqueValues(
      filteredRoutes,
      "DestinationAirportCode"
    ) as string[];

    this.destinations.set(destCodes);
  }

  getDestinationsForOrigin(originEventOrCode: any): void {
    const origin =
      typeof originEventOrCode === "string"
        ? originEventOrCode
        : originEventOrCode?.target?.value;

    // get full Airport objects from the service signal
    const all = this.airportService.allAirports(); // Airport[]
    const matched = all.filter((a) => a.OriginAirportCode === origin);
    this.originRoutes.set(matched);

    // apply current checkboxes immediately
    this.applyFilters();
  }
}
