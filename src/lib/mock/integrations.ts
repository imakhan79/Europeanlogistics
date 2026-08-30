export type IntegrationCategory =
  | "Fleet & Telematics"
  | "Fuel"
  | "Finance & Accounting"
  | "Compliance & Customs"
  | "Communication"
  | "Mapping & Traffic"
  | "Database";

export type IntegrationStatus = "connected" | "disconnected" | "error";

export type Integration = {
  id: string;
  name: string;
  category: IntegrationCategory;
  description: string;
  status: IntegrationStatus;
  lastSynced: string;
};

export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  "Fleet & Telematics",
  "Fuel",
  "Finance & Accounting",
  "Compliance & Customs",
  "Communication",
  "Mapping & Traffic",
  "Database",
];

export const STATUS_LABEL: Record<IntegrationStatus, string> = {
  connected: "Connected",
  disconnected: "Not Connected",
  error: "Error",
};

export const STATUS_TONE: Record<IntegrationStatus, "success" | "default" | "danger"> = {
  connected: "success",
  disconnected: "default",
  error: "danger",
};

export const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: "supabase",
    name: "Supabase",
    category: "Database",
    description: "Primary application database, auth and storage backend.",
    status: "connected",
    lastSynced: "2026-08-30 09:12",
  },
  {
    id: "webfleet",
    name: "Webfleet Telematics",
    category: "Fleet & Telematics",
    description: "Live GPS position, speed and engine data for the fleet.",
    status: "connected",
    lastSynced: "2026-08-30 12:05",
  },
  {
    id: "dkv",
    name: "DKV Mobility",
    category: "Fuel",
    description: "Fuel card transactions and station network pricing.",
    status: "connected",
    lastSynced: "2026-08-30 06:30",
  },
  {
    id: "uta",
    name: "UTA",
    category: "Fuel",
    description: "Alternative fuel card provider for cross-border refuelling.",
    status: "disconnected",
    lastSynced: "—",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    category: "Finance & Accounting",
    description: "Sync invoices, bills and ledger entries with accounting.",
    status: "connected",
    lastSynced: "2026-08-29 22:00",
  },
  {
    id: "sixfold",
    name: "Sixfold Customs",
    category: "Compliance & Customs",
    description: "Electronic customs declarations and EORI validation.",
    status: "error",
    lastSynced: "2026-08-27 14:41",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description: "Push ops alerts and dispatch updates to Slack channels.",
    status: "disconnected",
    lastSynced: "—",
  },
  {
    id: "googlemaps",
    name: "Google Maps Platform",
    category: "Mapping & Traffic",
    description: "Live traffic, geocoding and route ETA calculations.",
    status: "connected",
    lastSynced: "2026-08-30 12:10",
  },
  {
    id: "docusign",
    name: "DocuSign",
    category: "Compliance & Customs",
    description: "E-signatures for CMR notes and customer contracts.",
    status: "disconnected",
    lastSynced: "—",
  },
];

export type ApiKey = {
  id: string;
  label: string;
  keyMasked: string;
  createdAt: string;
  lastUsed: string;
};

export const INITIAL_API_KEYS: ApiKey[] = [
  { id: "key-1", label: "Production — Ops Dashboard", keyMasked: "erl_live_••••••••••••8f2a", createdAt: "2026-06-14", lastUsed: "2026-08-30" },
  { id: "key-2", label: "Reporting Warehouse", keyMasked: "erl_live_••••••••••••c110", createdAt: "2026-07-02", lastUsed: "2026-08-29" },
];

export type Webhook = {
  id: string;
  url: string;
  event: string;
  createdAt: string;
};

export const WEBHOOK_EVENTS = [
  "shipment.delayed",
  "shipment.delivered",
  "compliance.violation",
  "maintenance.overdue",
  "invoice.overdue",
];

export const INITIAL_WEBHOOKS: Webhook[] = [
  { id: "wh-1", url: "https://ops.nordwerk-ind.de/hooks/shipment", event: "shipment.delivered", createdAt: "2026-07-20" },
  { id: "wh-2", url: "https://hooks.slack.com/services/T0/ops-alerts", event: "compliance.violation", createdAt: "2026-08-01" },
];
