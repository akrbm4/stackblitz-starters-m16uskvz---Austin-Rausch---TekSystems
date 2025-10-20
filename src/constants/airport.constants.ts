export const AIRPORT_CODES = {
  JFK: "John F. Kennedy International Airport",
  BOS: "Logan International Airport",
  LAX: "Los Angeles International Airport",
  SFO: "San Francisco International Airport",
  MIA: "Miami International Airport",
  ORD: "Chicago O'Hare International Airport",
  ATL: "Hartsfield-Jackson Atlanta International Airport",
  DFW: "Dallas/Fort Worth International Airport",
  CLT: "Charlotte Douglas International Airport",
  DEN: "Denver International Airport",
  DTW: "Detroit Metropolitan Wayne County Airport",
  EWR: "Newark Liberty International Airport",
  IAD: "Washington Dulles International Airport",
  LAS: "McCarran International Airport",
  MCO: "Orlando International Airport",
  MSP: "Minneapolis-Saint Paul International Airport",
  PHL: "Philadelphia International Airport",
  PHX: "Phoenix Sky Harbor International Airport",
  SAN: "San Diego International Airport",
  SEA: "Seattle-Tacoma International Airport",
} as const;

export const FILTER_KEYS = ["IsSeasonal", "IsJetBlue", "IsInterline"] as const;

export const META_TAGS = [
  "activities",
  "culture",
  "demographics",
  "food",
  "lifestyle",
  "nature",
  "specialty",
] as const;

export const API_ENDPOINTS = {
  AIRPORTS: "/airport",
  AIRPORT_DETAILS: "/airportDetails",
} as const;
