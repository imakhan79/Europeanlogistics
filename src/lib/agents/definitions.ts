import { VEHICLES } from "@/lib/mock/fleet";
import { SHIPMENTS } from "@/lib/mock/shipments";
import { TACHOGRAPH_VIOLATIONS, CABOTAGE_RECORDS } from "@/lib/mock/compliance";
import { FUEL_ALERTS } from "@/lib/mock/fuel";
import { SERVICE_SCHEDULE, WORK_ORDERS } from "@/lib/mock/maintenance";
import { RECEIVABLES } from "@/lib/mock/finance";
import { DRIVER_DOCUMENTS, VEHICLE_DOCUMENTS } from "@/lib/mock/documents";
import { CUSTOMERS } from "@/lib/mock/customers";

export type AgentCategory =
  | "Dispatch"
  | "Compliance"
  | "Fuel"
  | "Maintenance"
  | "Finance"
  | "Documents"
  | "Customers"
  | "Routing";

export type AgentStatus = "active" | "paused";

export type AgentRunResult = {
  summary: string;
  status: "success" | "warning";
};

export type AgentDefinition = {
  id: string;
  name: string;
  category: AgentCategory;
  description: string;
  trigger: string;
  defaultStatus: AgentStatus;
  link: string;
  run: () => AgentRunResult;
};

export const AGENT_DEFINITIONS: AgentDefinition[] = [
  {
    id: "dispatch-matching",
    name: "Dispatch Matching Agent",
    category: "Dispatch",
    description: "Matches unassigned shipments to the nearest available vehicle and driver.",
    trigger: "Every 5 minutes",
    defaultStatus: "active",
    link: "/dashboard/dispatch",
    run: () => {
      const unassigned = SHIPMENTS.filter((s) => s.status === "booked" || s.status === "draft");
      return unassigned.length > 0
        ? { summary: `Matched ${unassigned.length} unassigned shipment${unassigned.length === 1 ? "" : "s"} to available vehicles.`, status: "success" }
        : { summary: "No unassigned shipments — dispatch queue is clear.", status: "success" };
    },
  },
  {
    id: "compliance-watchdog",
    name: "Compliance Watchdog",
    category: "Compliance",
    description: "Monitors tachograph, driver hours and cabotage limits, and flags violations.",
    trigger: "Every 15 minutes",
    defaultStatus: "active",
    link: "/dashboard/compliance",
    run: () => {
      const atLimit = CABOTAGE_RECORDS.filter((c) => c.operations >= c.maxOperations);
      const parts: string[] = [];
      if (TACHOGRAPH_VIOLATIONS.length > 0) parts.push(`${TACHOGRAPH_VIOLATIONS.length} open tachograph violation${TACHOGRAPH_VIOLATIONS.length === 1 ? "" : "s"}`);
      if (atLimit.length > 0) parts.push(`${atLimit.length} vehicle${atLimit.length === 1 ? "" : "s"} at the cabotage limit`);
      return parts.length > 0
        ? { summary: `Flagged ${parts.join(" and ")} for review.`, status: "warning" }
        : { summary: "No new compliance risks detected.", status: "success" };
    },
  },
  {
    id: "fuel-anomaly",
    name: "Fuel Anomaly Detector",
    category: "Fuel",
    description: "Scans fuel transactions and card usage for excess consumption or misuse.",
    trigger: "Hourly",
    defaultStatus: "active",
    link: "/dashboard/fuel",
    run: () => {
      const high = FUEL_ALERTS.filter((a) => a.severity === "high");
      return FUEL_ALERTS.length > 0
        ? { summary: `Detected ${FUEL_ALERTS.length} fuel alert${FUEL_ALERTS.length === 1 ? "" : "s"} (${high.length} high severity).`, status: high.length > 0 ? "warning" : "success" }
        : { summary: "No fuel anomalies detected in the latest scan.", status: "success" };
    },
  },
  {
    id: "maintenance-scheduler",
    name: "Maintenance Scheduler",
    category: "Maintenance",
    description: "Opens work orders automatically when a vehicle service falls due or overdue.",
    trigger: "Daily at 06:00",
    defaultStatus: "active",
    link: "/dashboard/maintenance",
    run: () => {
      const overdue = SERVICE_SCHEDULE.filter((s) => s.status === "overdue");
      const openOrders = WORK_ORDERS.filter((w) => w.status !== "completed");
      return overdue.length > 0
        ? { summary: `Opened work orders for ${overdue.length} overdue service${overdue.length === 1 ? "" : "s"}. ${openOrders.length} work order${openOrders.length === 1 ? "" : "s"} currently open.`, status: "warning" }
        : { summary: "All vehicles are within their service schedule.", status: "success" };
    },
  },
  {
    id: "invoice-collections",
    name: "Invoice Collections Agent",
    category: "Finance",
    description: "Sends payment reminders for overdue customer invoices.",
    trigger: "Daily at 08:00",
    defaultStatus: "active",
    link: "/dashboard/finance",
    run: () => {
      const overdue = RECEIVABLES.filter((r) => r.status === "overdue");
      const total = overdue.reduce((sum, r) => sum + r.amount, 0);
      return overdue.length > 0
        ? { summary: `Sent payment reminders for ${overdue.length} overdue invoice${overdue.length === 1 ? "" : "s"} totalling €${total.toLocaleString()}.`, status: "warning" }
        : { summary: "No overdue invoices — receivables are current.", status: "success" };
    },
  },
  {
    id: "document-expiry",
    name: "Document Expiry Monitor",
    category: "Documents",
    description: "Watches driver credentials and vehicle documents for upcoming expiry.",
    trigger: "Daily at 07:00",
    defaultStatus: "active",
    link: "/dashboard/documents",
    run: () => {
      const expiring = [...DRIVER_DOCUMENTS, ...VEHICLE_DOCUMENTS].filter((d) => d.status !== "valid");
      return expiring.length > 0
        ? { summary: `Flagged ${expiring.length} document${expiring.length === 1 ? "" : "s"} expiring or expired.`, status: "warning" }
        : { summary: "All driver and vehicle documents are valid.", status: "success" };
    },
  },
  {
    id: "customer-health",
    name: "Customer Health Agent",
    category: "Customers",
    description: "Reviews SLA compliance and account status to flag customers at risk.",
    trigger: "Weekly, Monday 09:00",
    defaultStatus: "paused",
    link: "/dashboard/customers",
    run: () => {
      const atRisk = CUSTOMERS.filter((c) => c.status !== "active");
      return atRisk.length > 0
        ? { summary: `Flagged ${atRisk.length} customer account${atRisk.length === 1 ? "" : "s"} at risk: ${atRisk.map((c) => c.name).join(", ")}.`, status: "warning" }
        : { summary: "All customer accounts are healthy.", status: "success" };
    },
  },
  {
    id: "route-optimization",
    name: "Route Optimization Agent",
    category: "Routing",
    description: "Re-optimizes active routes as traffic, weather and load conditions change.",
    trigger: "On shipment creation",
    defaultStatus: "paused",
    link: "/dashboard/routes/optimizer",
    run: () => {
      const active = VEHICLES.filter((v) => v.status === "in_transit");
      const kmSaved = active.length * 12;
      return { summary: `Re-optimized ${active.length} active route${active.length === 1 ? "" : "s"}, an estimated ${kmSaved} km saved today.`, status: "success" };
    },
  },
];
