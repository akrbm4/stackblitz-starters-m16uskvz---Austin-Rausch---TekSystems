export interface Airport {
  OriginAirportCode: string;
  DestinationAirportCode: string;
  IsSeasonal: boolean;
  IsJetBlue: boolean;
  IsInterline: boolean;
}

export interface AirportDetails {
  fullName: string;
  cityName: string;
  description: string;
  thingsToDo: string[];
  meta: string[];
}

export interface RouteFilters {
  IsSeasonal?: boolean;
  IsJetBlue?: boolean;
  IsInterline?: boolean;
}

export interface ApiResponse<T> {
  airport?: T[];
  airportDetails?: Record<string, AirportDetails>;
}
