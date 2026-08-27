export type DriverStatus = "driving" | "resting" | "off_duty" | "on_break";

export type Driver = {
  name: string;
  country: string;
  license: string;
  driverCard: string;
  assignedVehicle: string;
  status: DriverStatus;
  drivingToday: string;
  remainingToday: string;
  nextBreak: string;
  dailyRest: string;
  trips: number;
  compliance: number;
  documentsStatus: "valid" | "expiring" | "expired";
  onTimePct: number;
};

export const STATUS_LABEL: Record<DriverStatus, string> = {
  driving: "Driving",
  resting: "Resting",
  off_duty: "Off Duty",
  on_break: "On Break",
};

export const STATUS_TONE: Record<DriverStatus, "info" | "default" | "warning" | "success"> = {
  driving: "info",
  resting: "default",
  off_duty: "default",
  on_break: "warning",
};

export const DOCS_TONE: Record<Driver["documentsStatus"], "success" | "warning" | "danger"> = {
  valid: "success",
  expiring: "warning",
  expired: "danger",
};

export const DRIVERS: Driver[] = [
  {
    name: "Markus Weber",
    country: "DE",
    license: "DE-LKW-88213",
    driverCard: "1000401928374655",
    assignedVehicle: "DE-4827",
    status: "driving",
    drivingToday: "05h 42m",
    remainingToday: "03h 18m",
    nextBreak: "00h 48m",
    dailyRest: "08h 30m",
    trips: 342,
    compliance: 98,
    documentsStatus: "valid",
    onTimePct: 96,
  },
  {
    name: "Claire Dubois",
    country: "FR",
    license: "FR-PL-55210",
    driverCard: "1000488213765400",
    assignedVehicle: "FR-1298",
    status: "driving",
    drivingToday: "04h 10m",
    remainingToday: "04h 50m",
    nextBreak: "01h 40m",
    dailyRest: "09h 00m",
    trips: 288,
    compliance: 100,
    documentsStatus: "valid",
    onTimePct: 98,
  },
  {
    name: "Marco Rossi",
    country: "IT",
    license: "IT-C-77341",
    driverCard: "1000355129887641",
    assignedVehicle: "IT-8821",
    status: "on_break",
    drivingToday: "06h 55m",
    remainingToday: "02h 05m",
    nextBreak: "00h 00m",
    dailyRest: "07h 45m",
    trips: 401,
    compliance: 91,
    documentsStatus: "expiring",
    onTimePct: 89,
  },
  {
    name: "Tomasz Nowak",
    country: "PL",
    license: "PL-KAT-30217",
    driverCard: "1000772319845502",
    assignedVehicle: "PL-3311",
    status: "resting",
    drivingToday: "00h 00m",
    remainingToday: "09h 00m",
    nextBreak: "—",
    dailyRest: "11h 00m",
    trips: 210,
    compliance: 100,
    documentsStatus: "valid",
    onTimePct: 94,
  },
  {
    name: "Sanne de Vries",
    country: "NL",
    license: "NL-RTM-19042",
    driverCard: "1000618223740981",
    assignedVehicle: "NL-7742",
    status: "off_duty",
    drivingToday: "00h 00m",
    remainingToday: "09h 00m",
    nextBreak: "—",
    dailyRest: "11h 00m",
    trips: 176,
    compliance: 97,
    documentsStatus: "valid",
    onTimePct: 93,
  },
  {
    name: "Javier Moreno",
    country: "ES",
    license: "ES-MAD-64128",
    driverCard: "1000904471238865",
    assignedVehicle: "ES-5510",
    status: "driving",
    drivingToday: "03h 20m",
    remainingToday: "05h 40m",
    nextBreak: "02h 20m",
    dailyRest: "09h 15m",
    trips: 255,
    compliance: 95,
    documentsStatus: "valid",
    onTimePct: 91,
  },
  {
    name: "Lukas Gruber",
    country: "AT",
    license: "AT-INN-40217",
    driverCard: "1000123998764321",
    assignedVehicle: "AT-2201",
    status: "off_duty",
    drivingToday: "00h 00m",
    remainingToday: "09h 00m",
    nextBreak: "—",
    dailyRest: "11h 00m",
    trips: 198,
    compliance: 82,
    documentsStatus: "expired",
    onTimePct: 78,
  },
  {
    name: "Emma Peeters",
    country: "BE",
    license: "BE-ANT-22156",
    driverCard: "1000556213409877",
    assignedVehicle: "BE-9034",
    status: "resting",
    drivingToday: "00h 00m",
    remainingToday: "09h 00m",
    nextBreak: "—",
    dailyRest: "11h 00m",
    trips: 302,
    compliance: 99,
    documentsStatus: "valid",
    onTimePct: 97,
  },
];
