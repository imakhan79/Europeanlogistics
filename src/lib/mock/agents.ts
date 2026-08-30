import { AGENT_DEFINITIONS, type AgentCategory } from "@/lib/agents/definitions";

export const AGENT_KPIS = [
  { label: "Active Agents", value: `${AGENT_DEFINITIONS.filter((a) => a.defaultStatus === "active").length} / ${AGENT_DEFINITIONS.length}` },
  { label: "Tasks Automated (30d)", value: "1,842" },
  { label: "Est. Time Saved (30d)", value: "126 hrs" },
  { label: "Avg. Success Rate", value: "97.4%" },
  { label: "Runs Today", value: "58" },
  { label: "Alerts Raised (30d)", value: "34" },
];

export const CATEGORY_TONE: Record<AgentCategory, "info" | "danger" | "warning" | "success" | "default"> = {
  Dispatch: "info",
  Compliance: "danger",
  Fuel: "warning",
  Maintenance: "warning",
  Finance: "success",
  Documents: "default",
  Customers: "info",
  Routing: "success",
};

export type SeedRun = {
  agentId: string;
  agentName: string;
  category: AgentCategory;
  summary: string;
  status: "success" | "warning";
  timestamp: string;
};

export const SEED_RUNS: SeedRun[] = [
  { agentId: "compliance-watchdog", agentName: "Compliance Watchdog", category: "Compliance", summary: "Flagged 2 open tachograph violations and 1 vehicle at the cabotage limit for review.", status: "warning", timestamp: "2026-08-31 07:45" },
  { agentId: "fuel-anomaly", agentName: "Fuel Anomaly Detector", category: "Fuel", summary: "Detected 4 fuel alerts (2 high severity).", status: "warning", timestamp: "2026-08-31 07:00" },
  { agentId: "document-expiry", agentName: "Document Expiry Monitor", category: "Documents", summary: "Flagged 6 documents expiring or expired.", status: "warning", timestamp: "2026-08-31 07:00" },
  { agentId: "invoice-collections", agentName: "Invoice Collections Agent", category: "Finance", summary: "Sent payment reminders for 2 overdue invoices totalling €4,150.", status: "warning", timestamp: "2026-08-31 08:00" },
  { agentId: "maintenance-scheduler", agentName: "Maintenance Scheduler", category: "Maintenance", summary: "Opened work orders for 2 overdue services. 5 work orders currently open.", status: "warning", timestamp: "2026-08-31 06:00" },
  { agentId: "dispatch-matching", agentName: "Dispatch Matching Agent", category: "Dispatch", summary: "Matched 1 unassigned shipment to an available vehicle.", status: "success", timestamp: "2026-08-31 09:10" },
  { agentId: "dispatch-matching", agentName: "Dispatch Matching Agent", category: "Dispatch", summary: "No unassigned shipments — dispatch queue is clear.", status: "success", timestamp: "2026-08-31 09:05" },
  { agentId: "compliance-watchdog", agentName: "Compliance Watchdog", category: "Compliance", summary: "No new compliance risks detected.", status: "success", timestamp: "2026-08-31 07:30" },
];
