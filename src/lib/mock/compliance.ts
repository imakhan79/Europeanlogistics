export const COMPLIANCE_SCORES = [
  { label: "Driver Hours", value: 98 },
  { label: "Tachograph", value: 99 },
  { label: "Cabotage", value: 100 },
  { label: "Posting", value: 97 },
  { label: "Documents", value: 95 },
  { label: "Vehicle Compliance", value: 99 },
];

export type TachographViolation = {
  vehicle: string;
  driver: string;
  type: string;
  severity: "low" | "medium" | "high";
  date: string;
};

export const TACHOGRAPH_VIOLATIONS: TachographViolation[] = [
  { vehicle: "IT-8821", driver: "Marco Rossi", type: "Insufficient daily rest", severity: "medium", date: "2026-08-26" },
  { vehicle: "AT-2201", driver: "Lukas Gruber", type: "Missing driver card record", severity: "high", date: "2026-08-25" },
  { vehicle: "PL-3311", driver: "Tomasz Nowak", type: "Break taken 12 min late", severity: "low", date: "2026-08-24" },
];

export const TACHOGRAPH_CAPABILITIES = [
  "Data import",
  "Activity records",
  "Driver hours",
  "Rest",
  "Breaks",
  "Violations",
  "Alerts",
  "Historical analysis",
];

export type CabotageRecord = {
  vehicle: string;
  driver: string;
  countries: string[];
  entryDate: string;
  operations: number;
  maxOperations: number;
  status: "compliant" | "at_risk" | "violation";
};

export const CABOTAGE_RECORDS: CabotageRecord[] = [
  {
    vehicle: "DE-4827",
    driver: "Markus Weber",
    countries: ["Germany", "Austria", "Italy"],
    entryDate: "2026-08-25",
    operations: 2,
    maxOperations: 3,
    status: "compliant",
  },
  {
    vehicle: "FR-1298",
    driver: "Claire Dubois",
    countries: ["France", "Spain"],
    entryDate: "2026-08-24",
    operations: 1,
    maxOperations: 3,
    status: "compliant",
  },
  {
    vehicle: "IT-8821",
    driver: "Marco Rossi",
    countries: ["Italy", "Germany"],
    entryDate: "2026-08-20",
    operations: 3,
    maxOperations: 3,
    status: "at_risk",
  },
];

export type PostingRecord = {
  driver: string;
  hostCountry: string;
  operation: string;
  startDate: string;
  endDate: string;
  declaration: "filed" | "pending" | "missing";
  documents: "complete" | "incomplete";
};

export const POSTING_RECORDS: PostingRecord[] = [
  { driver: "Markus Weber", hostCountry: "Italy", operation: "Berlin → Milan delivery run", startDate: "2026-08-27", endDate: "2026-08-29", declaration: "filed", documents: "complete" },
  { driver: "Claire Dubois", hostCountry: "Spain", operation: "Paris → Barcelona delivery run", startDate: "2026-08-27", endDate: "2026-08-28", declaration: "filed", documents: "complete" },
  { driver: "Javier Moreno", hostCountry: "Germany", operation: "Madrid → Frankfurt delivery run", startDate: "2026-08-28", endDate: "2026-08-31", declaration: "pending", documents: "incomplete" },
];
