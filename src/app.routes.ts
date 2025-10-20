import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AirportDetailsComponent } from "./components/airport-details.component/airport-details.component";
import { ExploreByInterestComponent } from "./components/explore-by-interest.component/explore-by-interest.component";

// TODO: Import your components here
// import { HomeComponent } from './components/home.component';
// import { AirportDetailsComponent } from './components/airport-details.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },

  { path: "airport/:code", component: AirportDetailsComponent },

  { path: "explore-by-interest", component: ExploreByInterestComponent },

  // Temporary redirect until components are implemented
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home" },
];

/*
IMPLEMENTATION NOTES:
- HomeComponent should have:
  * Origin airport dropdown
  * Destination list based on selected origin  
  * Filter checkboxes (IsSeasonal, IsJetBlue, IsInterline)
  * Navigation to airport details when destination is clicked

- AirportDetailsComponent should:
  * Read airport code from route params
  * Display fullName, cityName, description, thingsToDo
  * Handle loading and error states

- Route parameters can be accessed using ActivatedRoute:
  constructor(private route: ActivatedRoute) {}
  const code = this.route.snapshot.paramMap.get('code');
*/
