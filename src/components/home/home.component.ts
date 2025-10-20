import { Component } from "@angular/core";
import { BaseComponent } from "../base.component";
import { AirportService } from "../../services/airport.service";
import { catchError, finalize, Observable, of } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  imports: [CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  standalone: true,
})
export class HomeComponent extends BaseComponent {
  originAirports$!: Observable<(string | boolean)[]>;
  destinations$!: Observable<string[]>;

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

  getDestinationsForOrigin(origin: any): void {
    this.handleLoading(true);

    this.destinations$ = this.airportService
      .getDestinationsForOrigin(origin?.target?.value)
      .pipe(
        catchError((error) => {
          this.handleError(error);

          return of([]);
        }),
        finalize(() => {
          this.handleLoading(false);
        })
      );
  }
}
