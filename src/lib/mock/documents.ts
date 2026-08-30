export const DOCUMENT_KPIS = [
  { label: "Total Documents", value: "1,284" },
  { label: "Expiring Within 30 Days", value: "6" },
  { label: "Missing / Incomplete", value: "3" },
  { label: "Digitized", value: "98.4%" },
  { label: "Avg. Processing Time", value: "4m 12s" },
  { label: "Pending Review", value: "5" },
];

export type ShipmentDocType = "CMR" | "Commercial Invoice" | "Proof of Delivery" | "Customs Declaration";
export type DocStatus = "uploaded" | "pending" | "missing";

export type ShipmentDocument = {
  shipmentId: string;
  customer: string;
  docType: ShipmentDocType;
  status: DocStatus;
  date: string;
};

export const DOC_STATUS_LABEL: Record<DocStatus, string> = {
  uploaded: "Uploaded",
  pending: "Pending",
  missing: "Missing",
};

export const DOC_STATUS_TONE: Record<DocStatus, "success" | "warning" | "danger"> = {
  uploaded: "success",
  pending: "warning",
  missing: "danger",
};

export const SHIPMENT_DOCUMENTS: ShipmentDocument[] = [
  { shipmentId: "EU-12872", customer: "Nordwerk Industries", docType: "CMR", status: "uploaded", date: "2026-08-30" },
  { shipmentId: "EU-12872", customer: "Nordwerk Industries", docType: "Commercial Invoice", status: "uploaded", date: "2026-08-30" },
  { shipmentId: "EU-12873", customer: "Atlas Retail Group", docType: "CMR", status: "uploaded", date: "2026-08-30" },
  { shipmentId: "EU-12873", customer: "Atlas Retail Group", docType: "Proof of Delivery", status: "pending", date: "—" },
  { shipmentId: "EU-12874", customer: "Verdi Foods", docType: "Customs Declaration", status: "missing", date: "—" },
  { shipmentId: "EU-12875", customer: "Baltic Components", docType: "CMR", status: "uploaded", date: "2026-08-29" },
  { shipmentId: "EU-12868", customer: "Nordwerk Industries", docType: "Proof of Delivery", status: "uploaded", date: "2026-08-28" },
  { shipmentId: "EU-12861", customer: "Atlas Retail Group", docType: "Proof of Delivery", status: "uploaded", date: "2026-08-27" },
];

export type DriverDocType = "Driving License" | "Driver Card" | "ADR Certificate" | "Medical Certificate";
export type ExpiryStatus = "valid" | "expiring" | "expired";

export type DriverDocument = {
  driver: string;
  docType: DriverDocType;
  issueDate: string;
  expiryDate: string;
  status: ExpiryStatus;
};

export const EXPIRY_STATUS_LABEL: Record<ExpiryStatus, string> = {
  valid: "Valid",
  expiring: "Expiring Soon",
  expired: "Expired",
};

export const EXPIRY_STATUS_TONE: Record<ExpiryStatus, "success" | "warning" | "danger"> = {
  valid: "success",
  expiring: "warning",
  expired: "danger",
};

export const DRIVER_DOCUMENTS: DriverDocument[] = [
  { driver: "Markus Weber", docType: "Driving License", issueDate: "2021-04-12", expiryDate: "2031-04-12", status: "valid" },
  { driver: "Markus Weber", docType: "Driver Card", issueDate: "2024-02-01", expiryDate: "2029-02-01", status: "valid" },
  { driver: "Claire Dubois", docType: "ADR Certificate", issueDate: "2023-06-15", expiryDate: "2026-06-15", status: "expired" },
  { driver: "Marco Rossi", docType: "Driver Card", issueDate: "2021-09-20", expiryDate: "2026-09-20", status: "expiring" },
  { driver: "Marco Rossi", docType: "Medical Certificate", issueDate: "2024-08-01", expiryDate: "2026-08-01", status: "expired" },
  { driver: "Tomasz Nowak", docType: "Driving License", issueDate: "2019-11-05", expiryDate: "2029-11-05", status: "valid" },
  { driver: "Sanne de Vries", docType: "Medical Certificate", issueDate: "2024-09-10", expiryDate: "2026-09-10", status: "expiring" },
  { driver: "Lukas Gruber", docType: "Driver Card", issueDate: "2020-03-18", expiryDate: "2025-03-18", status: "expired" },
  { driver: "Emma Peeters", docType: "ADR Certificate", issueDate: "2024-01-22", expiryDate: "2029-01-22", status: "valid" },
];

export type VehicleDocType = "Registration" | "Insurance" | "Roadworthiness (MOT)" | "Tachograph Calibration";

export type VehicleDocument = {
  vehicle: string;
  docType: VehicleDocType;
  issueDate: string;
  expiryDate: string;
  status: ExpiryStatus;
};

export const VEHICLE_DOCUMENTS: VehicleDocument[] = [
  { vehicle: "DE-4827", docType: "Insurance", issueDate: "2026-01-01", expiryDate: "2026-12-31", status: "valid" },
  { vehicle: "DE-4827", docType: "Roadworthiness (MOT)", issueDate: "2025-08-19", expiryDate: "2027-02-19", status: "valid" },
  { vehicle: "FR-1298", docType: "Registration", issueDate: "2020-05-14", expiryDate: "2030-05-14", status: "valid" },
  { vehicle: "IT-8821", docType: "Tachograph Calibration", issueDate: "2024-06-12", expiryDate: "2026-06-12", status: "expired" },
  { vehicle: "PL-3311", docType: "Insurance", issueDate: "2026-02-01", expiryDate: "2026-09-15", status: "expiring" },
  { vehicle: "NL-7742", docType: "Roadworthiness (MOT)", issueDate: "2025-07-21", expiryDate: "2027-01-21", status: "valid" },
  { vehicle: "AT-2201", docType: "Insurance", issueDate: "2025-05-28", expiryDate: "2026-09-05", status: "expiring" },
  { vehicle: "BE-9034", docType: "Registration", issueDate: "2021-11-02", expiryDate: "2031-11-02", status: "valid" },
];

export type ActivityAction = "Uploaded" | "Reviewed" | "Flagged" | "Renewed";

export type DocumentActivity = {
  actor: string;
  action: ActivityAction;
  document: string;
  timestamp: string;
};

export const DOCUMENT_ACTIVITY: DocumentActivity[] = [
  { actor: "System", action: "Flagged", document: "IT-8821 · Tachograph Calibration", timestamp: "2026-08-30 08:12" },
  { actor: "System", action: "Flagged", document: "Marco Rossi · Medical Certificate", timestamp: "2026-08-30 08:12" },
  { actor: "Hannah Richter (Nordwerk)", action: "Uploaded", document: "EU-12872 · Commercial Invoice", timestamp: "2026-08-30 07:40" },
  { actor: "Markus Weber", action: "Uploaded", document: "EU-12872 · CMR", timestamp: "2026-08-30 06:15" },
  { actor: "Ops — Anna Fischer", action: "Reviewed", document: "EU-12868 · Proof of Delivery", timestamp: "2026-08-28 21:30" },
  { actor: "Fleet Admin", action: "Renewed", document: "DE-4827 · Insurance", timestamp: "2026-08-27 10:05" },
  { actor: "Emma Peeters", action: "Uploaded", document: "EU-12861 · Proof of Delivery", timestamp: "2026-08-27 09:52" },
];
