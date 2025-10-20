import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { API_ENDPOINTS } from "../constants/airport.constants";
import { Airport, ApiResponse } from "../models/airport.model";
import { ArrayUtils } from "../utils/array.utils";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class AirportService {
  constructor(private api: ApiService) {}

  getAllAirports(): Observable<Airport[]> {
    return this.api.get<Airport[]>(API_ENDPOINTS.AIRPORTS).pipe(
      map((response: Airport[]) => {
        return response || [];
      })
    );
  }

  getOriginAirports(): Observable<(string | boolean)[]> {
    return this.getAllAirports().pipe(
      map((airports) =>
        ArrayUtils.getUniqueValues(airports, "OriginAirportCode")
      )
    );
  }

  // ❌ TODO: Implement these methods for the assignment
  // Candidates should follow the patterns established above

  /**
   * TODO: Get destinations for a specific origin airport
   * Should filter airports array and return unique destinations
   */
  // getDestinationsForOrigin(origin: string): Observable<string[]> {
  //   // Implementation needed
  // }

  /**
   * TODO: Get airport details for a specific airport code
   * Should call the airportDetails endpoint
   */
  // getAirportDetails(code: string): Observable<AirportDetails | null> {
  //   // Implementation needed
  // }

  /**
   * TODO: Get filtered routes based on multiple filter criteria
   * Should apply IsSeasonal, IsJetBlue, IsInterline filters
   */
  // getFilteredRoutes(origin: string, filters: RouteFilters): Observable<Airport[]> {
  //   // Implementation needed - use ArrayUtils.filterByMultipleConditions
  // }

  /**
   * TODO: Get airports that match specific meta tags (for Part 2)
   * Should filter airport details by meta field
   */
  // getAirportsByMetaTags(tags: string[]): Observable<AirportDetails[]> {
  //   // Implementation needed for live interview portion
  // }
}
