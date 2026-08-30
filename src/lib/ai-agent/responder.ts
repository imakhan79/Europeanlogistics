import { VEHICLES } from "@/lib/mock/fleet";
import { DRIVERS } from "@/lib/mock/drivers";
import { SHIPMENTS } from "@/lib/mock/shipments";
import { COMPLIANCE_SCORES, TACHOGRAPH_VIOLATIONS, CABOTAGE_RECORDS } from "@/lib/mock/compliance";
import { FUEL_KPIS, FUEL_ALERTS } from "@/lib/mock/fuel";
import { MAINTENANCE_ALERTS, SERVICE_SCHEDULE, WORK_ORDERS } from "@/lib/mock/maintenance";
import { FINANCE_KPIS, RECEIVABLES, PAYABLES } from "@/lib/mock/finance";
import { CUSTOMERS } from "@/lib/mock/customers";

export type ChatRole = "user" | "agent";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
};

export const AGENT_CAPABILITIES = [
  "Fleet & vehicle status",
  "Driver hours & performance",
  "Compliance & tachograph risk",
  "Fuel spend & alerts",
  "Maintenance & work orders",
  "Finance: receivables & payables",
  "Shipment & delivery status",
  "Customer account health",
];

export const SUGGESTED_PROMPTS = [
  "How many vehicles are in transit?",
  "Any compliance violations this week?",
  "Which invoices are overdue?",
  "Show me fuel alerts",
  "What maintenance is overdue?",
  "Are any shipments delayed?",
  "Which customers are at risk?",
  "Summarize driver performance",
];

export const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "agent",
  content:
    "Hi, I'm your AI Logistics Agent. Ask me about fleet status, driver compliance, fuel spend, maintenance, finance or shipments — I'll pull live figures from across the platform.",
  timestamp: "Just now",
};

export function nowLabel(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function bullets(lines: string[]): string {
  return lines.map((l) => `• ${l}`).join("\n");
}

export function generateAgentReply(rawInput: string): string {
  const q = rawInput.toLowerCase();

  if (/\b(hi|hello|hey)\b/.test(q)) {
    return "Hello! Ask me about fleet, drivers, compliance, fuel, maintenance, finance or shipments and I'll pull the current figures.";
  }

  if (/\bfuel\b/.test(q)) {
    const spend = FUEL_KPIS.find((k) => k.label.includes("Fleet Fuel Cost"))?.value ?? "—";
    return [
      `Fleet fuel cost is ${spend} month-to-date, with ${FUEL_ALERTS.length} active fuel alert${FUEL_ALERTS.length === 1 ? "" : "s"}:`,
      bullets(FUEL_ALERTS.map((a) => `${a.vehicle} (${a.driver}) — ${a.type}: ${a.detail}`)),
    ].join("\n\n");
  }

  if (/\b(maintenance|service|repair|work order)\b/.test(q)) {
    const overdue = SERVICE_SCHEDULE.filter((s) => s.status === "overdue");
    const openOrders = WORK_ORDERS.filter((w) => w.status !== "completed");
    return [
      `${overdue.length} vehicle${overdue.length === 1 ? " is" : "s are"} overdue for service, and ${openOrders.length} work order${openOrders.length === 1 ? " is" : "s are"} open:`,
      bullets(overdue.map((s) => `${s.vehicle} — ${s.serviceType}, due ${s.dueDate}`)),
      MAINTENANCE_ALERTS.length > 0
        ? `\nTop alert: ${MAINTENANCE_ALERTS[0].vehicle} — ${MAINTENANCE_ALERTS[0].detail}`
        : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  if (/\b(compliance|tachograph|violation|cabotage|posting)\b/.test(q)) {
    const driverHours = COMPLIANCE_SCORES.find((s) => s.label === "Driver Hours")?.value ?? 0;
    const atRiskCabotage = CABOTAGE_RECORDS.filter((c) => c.operations >= c.maxOperations);
    return [
      `Overall driver-hours compliance is ${driverHours}%, with ${TACHOGRAPH_VIOLATIONS.length} open tachograph violation${TACHOGRAPH_VIOLATIONS.length === 1 ? "" : "s"}:`,
      bullets(TACHOGRAPH_VIOLATIONS.map((v) => `${v.vehicle} (${v.driver}) — ${v.type} [${v.severity}]`)),
      atRiskCabotage.length > 0
        ? `\n${atRiskCabotage.length} vehicle${atRiskCabotage.length === 1 ? "" : "s"} at the cabotage operation limit: ${atRiskCabotage.map((c) => c.vehicle).join(", ")}.`
        : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  if (/\b(invoice|receivable|payable|finance|revenue|cost|margin|cash)\b/.test(q)) {
    const overdueRec = RECEIVABLES.filter((r) => r.status === "overdue");
    const overduePay = PAYABLES.filter((p) => p.status === "overdue");
    const margin = FINANCE_KPIS.find((k) => k.label === "Gross Margin")?.value ?? "—";
    return [
      `Gross margin is currently ${margin}. ${overdueRec.length} receivable${overdueRec.length === 1 ? "" : "s"} and ${overduePay.length} payable${overduePay.length === 1 ? "" : "s"} are overdue:`,
      bullets(overdueRec.map((r) => `Receivable ${r.id} — ${r.customer}, €${r.amount.toLocaleString()}`)),
      bullets(overduePay.map((p) => `Payable ${p.id} — ${p.vendor}, €${p.amount.toLocaleString()}`)),
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  if (/\bdriver/.test(q)) {
    const driving = DRIVERS.filter((d) => d.status === "driving").length;
    const lowCompliance = DRIVERS.filter((d) => d.compliance < 90);
    return [
      `${driving} of ${DRIVERS.length} drivers are currently driving.`,
      lowCompliance.length > 0
        ? `Drivers below 90% compliance:\n${bullets(lowCompliance.map((d) => `${d.name} — ${d.compliance}% compliance, documents ${d.documentsStatus}`))}`
        : "All drivers are at or above 90% compliance.",
    ].join("\n\n");
  }

  if (/\b(vehicle|fleet|truck)\b/.test(q)) {
    const byStatus = VEHICLES.reduce<Record<string, number>>((acc, v) => {
      acc[v.status] = (acc[v.status] ?? 0) + 1;
      return acc;
    }, {});
    return [
      `Fleet of ${VEHICLES.length} vehicles:`,
      bullets(Object.entries(byStatus).map(([status, count]) => `${count} ${status.replace("_", " ")}`)),
    ].join("\n\n");
  }

  if (/\b(shipment|delivery|delayed|dispatch)\b/.test(q)) {
    const delayed = SHIPMENTS.filter((s) => s.status === "delayed");
    const inTransit = SHIPMENTS.filter((s) => s.status === "in_transit");
    return [
      `${inTransit.length} shipment${inTransit.length === 1 ? "" : "s"} in transit, ${delayed.length} delayed:`,
      bullets(delayed.map((s) => `${s.id} — ${s.customer}, ${s.origin} → ${s.destination}, ETA ${s.eta}`)),
    ]
      .filter((l) => l)
      .join("\n\n");
  }

  if (/\bcustomer/.test(q)) {
    const atRisk = CUSTOMERS.filter((c) => c.status !== "active");
    return atRisk.length > 0
      ? [
          `${atRisk.length} customer account${atRisk.length === 1 ? "" : "s"} need attention:`,
          bullets(atRisk.map((c) => `${c.name} — ${c.status.replace("_", " ")}, SLA ${c.slaCompliance.toFixed(1)}%`)),
        ].join("\n\n")
      : "All customer accounts are currently active and in good standing.";
  }

  if (/\b(help|capabilit|what can you)\b/.test(q)) {
    return `I can answer questions about:\n\n${bullets(AGENT_CAPABILITIES)}`;
  }

  return "I don't have a specific answer for that yet — try asking about fleet status, driver compliance, fuel, maintenance, finance, shipments or customers.";
}
