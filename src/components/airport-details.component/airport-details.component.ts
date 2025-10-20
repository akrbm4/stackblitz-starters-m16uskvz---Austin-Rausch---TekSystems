import { Component, signal, WritableSignal } from "@angular/core";
import { BaseComponent } from "../base.component";
import { ActivatedRoute } from "@angular/router";
import { takeUntil, switchMap, of, catchError, finalize } from "rxjs";
import { AirportDetails } from "../../models/airport.model";
import { AirportService } from "../../services/airport.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-airport-details",
  imports: [CommonModule],
  templateUrl: "./airport-details.component.html",
  styleUrl: "./airport-details.component.css",
  standalone: true,
})
export class AirportDetailsComponent extends BaseComponent {
  details: AirportDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    private airportService: AirportService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((pm) => {
          const code = pm.get("code") ?? "";
          if (!code) return of(null);

          this.handleLoading(true);
          return this.airportService.getAirportDetails(code).pipe(
            catchError((error: any) => {
              this.handleError(error);
              return of(null);
            }),
            finalize(() => this.handleLoading(false))
          );
        })
      )
      .subscribe((details) => {
        this.details = details;
      });
  }
}
