export type VehicleRoutePoints = {
  registration: string;
  currentCity: string;
  destinationCity: string | null;
};

export const VEHICLE_ROUTE_POINTS: VehicleRoutePoints[] = [
  { registration: "DE-4827", currentCity: "Stuttgart", destinationCity: "Milan" },
  { registration: "FR-1298", currentCity: "Lyon", destinationCity: "Barcelona" },
  { registration: "IT-8821", currentCity: "Bologna", destinationCity: "Munich" },
  { registration: "PL-3311", currentCity: "Poznań", destinationCity: "Berlin" },
  { registration: "NL-7742", currentCity: "Rotterdam", destinationCity: null },
  { registration: "ES-5510", currentCity: "Zaragoza", destinationCity: "Frankfurt" },
  { registration: "AT-2201", currentCity: "Innsbruck", destinationCity: "Verona" },
  { registration: "BE-9034", currentCity: "Antwerp", destinationCity: "Cologne" },
];
