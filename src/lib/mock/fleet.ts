export type VehicleStatus = "in_transit" | "idle" | "delayed" | "maintenance" | "offline";

export type Vehicle = {
  registration: string;
  makeModel: string;
  euroClass: string;
  weight: string;
  driver: string;
  location: string;
  status: VehicleStatus;
  route: string;
  eta: string;
  speed: string;
  fuel: number;
  compliance: "low" | "medium" | "high";
};

export const STATUS_LABEL: Record<VehicleStatus, string> = {
  in_transit: "In Transit",
  idle: "Idle",
  delayed: "Delayed",
  maintenance: "Maintenance",
  offline: "Offline",
};

export const STATUS_TONE: Record<VehicleStatus, "info" | "default" | "warning" | "danger"> = {
  in_transit: "info",
  idle: "default",
  delayed: "warning",
  maintenance: "warning",
  offline: "danger",
};

export const VEHICLES: Vehicle[] = [
  {
    registration: "DE-4827",
    makeModel: "Mercedes Actros",
    euroClass: "VI",
    weight: "40t",
    driver: "Markus Weber",
    location: "Stuttgart, DE",
    status: "in_transit",
    route: "Berlin → Milan",
    eta: "17:25",
    speed: "87 km/h",
    fuel: 62,
    compliance: "low",
  },
  {
    registration: "FR-1298",
    makeModel: "Volvo FH16",
    euroClass: "VI",
    weight: "40t",
    driver: "Claire Dubois",
    location: "Lyon, FR",
    status: "in_transit",
    route: "Paris → Barcelona",
    eta: "16:55",
    speed: "91 km/h",
    fuel: 48,
    compliance: "low",
  },
  {
    registration: "IT-8821",
    makeModel: "Iveco S-Way",
    euroClass: "VI",
    weight: "38t",
    driver: "Marco Rossi",
    location: "Bologna, IT",
    status: "delayed",
    route: "Milan → Munich",
    eta: "15:40",
    speed: "34 km/h",
    fuel: 29,
    compliance: "medium",
  },
  {
    registration: "PL-3311",
    makeModel: "MAN TGX",
    euroClass: "V",
    weight: "40t",
    driver: "Tomasz Nowak",
    location: "Poznań, PL",
    status: "idle",
    route: "Warsaw → Berlin",
    eta: "—",
    speed: "0 km/h",
    fuel: 81,
    compliance: "low",
  },
  {
    registration: "NL-7742",
    makeModel: "DAF XF",
    euroClass: "VI",
    weight: "36t",
    driver: "Sanne de Vries",
    location: "Rotterdam, NL",
    status: "maintenance",
    route: "—",
    eta: "—",
    speed: "0 km/h",
    fuel: 55,
    compliance: "high",
  },
  {
    registration: "ES-5510",
    makeModel: "Scania R500",
    euroClass: "VI",
    weight: "40t",
    driver: "Javier Moreno",
    location: "Zaragoza, ES",
    status: "in_transit",
    route: "Madrid → Frankfurt",
    eta: "21:10",
    speed: "88 km/h",
    fuel: 71,
    compliance: "low",
  },
  {
    registration: "AT-2201",
    makeModel: "Mercedes Actros",
    euroClass: "VI",
    weight: "40t",
    driver: "Lukas Gruber",
    location: "Innsbruck, AT",
    status: "offline",
    route: "Munich → Verona",
    eta: "—",
    speed: "0 km/h",
    fuel: 12,
    compliance: "medium",
  },
  {
    registration: "BE-9034",
    makeModel: "Volvo FH",
    euroClass: "VI",
    weight: "34t",
    driver: "Emma Peeters",
    location: "Antwerp, BE",
    status: "idle",
    route: "Antwerp → Cologne",
    eta: "—",
    speed: "0 km/h",
    fuel: 93,
    compliance: "low",
  },
];
