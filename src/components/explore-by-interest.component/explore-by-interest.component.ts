import { Component } from "@angular/core";
import { BaseComponent } from "../base.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AirportService } from "../../services/airport.service";
import { Airport } from "../../models/airport.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-explore-by-interest",
  imports: [CommonModule, FormsModule],
  templateUrl: "./explore-by-interest.component.html",
  styleUrl: "./explore-by-interest.component.css",
  standalone: true,
})
export class ExploreByInterestComponent extends BaseComponent {
  tagMap: tagMap = {};
  airports: Airport[] = [];
  metaTags: string[] = [
    "lifestyle",
    "culture",
    "activities",
    "demographics",
    "specialty",
  ];

  constructor(private airportService: AirportService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.airports = this.airportService.allAirports();
  }

  applyFilters(): void {
    const selectedTags = Object.keys(this.tagMap).filter(
      (tag) => this.tagMap[tag]
    );

    console.log("Selected Tags:", selectedTags);
  }

  selectAirport(code: any): void {
    this.router.navigate(["/airport", code]);
  }
}

interface tagMap {
  [key: string]: boolean;
}
