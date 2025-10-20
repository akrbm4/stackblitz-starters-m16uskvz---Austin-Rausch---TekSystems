import { Component } from "@angular/core";
import { BaseComponent } from "../base.component";
import { AirportService } from "../../services/airport.service";

@Component({
  selector: "app-home",
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  standalone: true,
})
export class HomeComponent extends BaseComponent {
  constructor(private airportService: AirportService) {
    super();
  }
}
