export type LatLon = { lat: number; lon: number };

export const MAP_BOUNDS = { lonMin: -10, lonMax: 25, latMin: 35, latMax: 58 };

export function project({ lat, lon }: LatLon): { x: number; y: number } {
  const { lonMin, lonMax, latMin, latMax } = MAP_BOUNDS;
  const x = ((lon - lonMin) / (lonMax - lonMin)) * 100;
  const y = ((latMax - lat) / (latMax - latMin)) * 100;
  return { x, y };
}

export function interpolate(a: LatLon, b: LatLon, t: number): LatLon {
  return { lat: a.lat + (b.lat - a.lat) * t, lon: a.lon + (b.lon - a.lon) * t };
}

export const CITY_COORDS: Record<string, LatLon> = {
  Stuttgart: { lat: 48.78, lon: 9.18 },
  Lyon: { lat: 45.76, lon: 4.85 },
  Bologna: { lat: 44.49, lon: 11.34 },
  "Poznań": { lat: 52.41, lon: 16.93 },
  Rotterdam: { lat: 51.92, lon: 4.48 },
  Zaragoza: { lat: 41.65, lon: -0.88 },
  Innsbruck: { lat: 47.27, lon: 11.39 },
  Antwerp: { lat: 51.22, lon: 4.4 },
  Milan: { lat: 45.46, lon: 9.19 },
  Barcelona: { lat: 41.39, lon: 2.17 },
  Munich: { lat: 48.14, lon: 11.58 },
  Berlin: { lat: 52.52, lon: 13.4 },
  Frankfurt: { lat: 50.11, lon: 8.68 },
  Verona: { lat: 45.44, lon: 10.99 },
  Cologne: { lat: 50.94, lon: 6.96 },
  Paris: { lat: 48.8566, lon: 2.3522 },
  Warsaw: { lat: 52.2297, lon: 21.0122 },
  Madrid: { lat: 40.4168, lon: -3.7038 },
  Vienna: { lat: 48.2082, lon: 16.3738 },
  Hamburg: { lat: 53.5511, lon: 9.9937 },
  London: { lat: 51.5074, lon: -0.1278 },
};

export const ROUTE_NETWORK_EDGES: [string, string][] = [
  ["London", "Paris"],
  ["London", "Rotterdam"],
  ["Paris", "Antwerp"],
  ["Paris", "Lyon"],
  ["Lyon", "Milan"],
  ["Lyon", "Barcelona"],
  ["Barcelona", "Zaragoza"],
  ["Zaragoza", "Madrid"],
  ["Rotterdam", "Antwerp"],
  ["Rotterdam", "Hamburg"],
  ["Hamburg", "Berlin"],
  ["Berlin", "Warsaw"],
  ["Berlin", "Munich"],
  ["Munich", "Vienna"],
  ["Munich", "Milan"],
  ["Munich", "Stuttgart"],
  ["Stuttgart", "Frankfurt"],
  ["Frankfurt", "Cologne"],
  ["Milan", "Verona"],
  ["Milan", "Bologna"],
];

export const COUNTRY_LABELS: { label: string; lat: number; lon: number }[] = [
  { label: "DE", lat: 51, lon: 10.4 },
  { label: "FR", lat: 46.6, lon: 2.2 },
  { label: "IT", lat: 43, lon: 12.2 },
  { label: "PL", lat: 52, lon: 19.1 },
  { label: "NL", lat: 52.1, lon: 5.3 },
  { label: "ES", lat: 40.4, lon: -3.7 },
  { label: "AT", lat: 47.5, lon: 14.5 },
  { label: "BE", lat: 50.6, lon: 4.5 },
];
