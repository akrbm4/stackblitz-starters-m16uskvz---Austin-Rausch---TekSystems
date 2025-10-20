import { Component } from "@angular/core";
import { BaseComponent } from "../base.component";
import { AirportService } from "../../services/airport.service";
import { Observable } from "rxjs";
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

  constructor(private airportService: AirportService) {
    super();
  }

  ngOnInit(): void {
    this.originAirports$ = this.airportService.getOriginAirports();
  }
}
