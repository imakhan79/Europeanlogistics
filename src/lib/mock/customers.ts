export const CUSTOMER_KPIS = [
  { label: "Active Customers", value: "6" },
  { label: "Open Shipments", value: "5" },
  { label: "Outstanding Invoices", value: "€6,410" },
  { label: "Avg. SLA Compliance", value: "96.2%" },
  { label: "MTD Revenue", value: "€11,710" },
  { label: "Customer Satisfaction", value: "4.6 / 5" },
];

export type CustomerTier = "gold" | "silver" | "bronze";
export type CustomerStatus = "active" | "at_risk" | "onboarding";

export type Customer = {
  name: string;
  contactName: string;
  contactEmail: string;
  country: string;
  tier: CustomerTier;
  status: CustomerStatus;
  activeShipments: number;
  monthlyShipments: number;
  monthlyRevenue: number;
  slaCompliance: number;
};

export const TIER_LABEL: Record<CustomerTier, string> = {
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

export const TIER_TONE: Record<CustomerTier, "warning" | "default" | "info"> = {
  gold: "warning",
  silver: "default",
  bronze: "info",
};

export const CUSTOMER_STATUS_LABEL: Record<CustomerStatus, string> = {
  active: "Active",
  at_risk: "At Risk",
  onboarding: "Onboarding",
};

export const CUSTOMER_STATUS_TONE: Record<CustomerStatus, "success" | "danger" | "info"> = {
  active: "success",
  at_risk: "danger",
  onboarding: "info",
};

export const CUSTOMERS: Customer[] = [
  {
    name: "Nordwerk Industries",
    contactName: "Hannah Richter",
    contactEmail: "h.richter@nordwerk-ind.de",
    country: "DE",
    tier: "gold",
    status: "active",
    activeShipments: 1,
    monthlyShipments: 34,
    monthlyRevenue: 58200,
    slaCompliance: 98.4,
  },
  {
    name: "Atlas Retail Group",
    contactName: "Oliver Bennett",
    contactEmail: "o.bennett@atlasretail.co",
    country: "FR",
    tier: "gold",
    status: "active",
    activeShipments: 1,
    monthlyShipments: 41,
    monthlyRevenue: 67900,
    slaCompliance: 97.1,
  },
  {
    name: "Verdi Foods",
    contactName: "Giulia Conti",
    contactEmail: "g.conti@verdifoods.it",
    country: "IT",
    tier: "silver",
    status: "at_risk",
    activeShipments: 1,
    monthlyShipments: 22,
    monthlyRevenue: 24800,
    slaCompliance: 89.5,
  },
  {
    name: "Baltic Components",
    contactName: "Anna Kowalska",
    contactEmail: "a.kowalska@balticcomp.pl",
    country: "PL",
    tier: "silver",
    status: "active",
    activeShipments: 1,
    monthlyShipments: 18,
    monthlyRevenue: 19300,
    slaCompliance: 96.8,
  },
  {
    name: "Van Dijk Logistics",
    contactName: "Bram Willems",
    contactEmail: "b.willems@vandijklog.nl",
    country: "NL",
    tier: "bronze",
    status: "active",
    activeShipments: 1,
    monthlyShipments: 12,
    monthlyRevenue: 8900,
    slaCompliance: 99.2,
  },
  {
    name: "Iberia Manufacturing",
    contactName: "Carlos Fernández",
    contactEmail: "c.fernandez@iberiamfg.es",
    country: "ES",
    tier: "gold",
    status: "onboarding",
    activeShipments: 1,
    monthlyShipments: 6,
    monthlyRevenue: 15400,
    slaCompliance: 96.0,
  },
];

export type InvoiceStatus = "paid" | "pending" | "overdue";

export type CustomerInvoice = {
  id: string;
  customer: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
};

export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};

export const INVOICE_STATUS_TONE: Record<InvoiceStatus, "success" | "warning" | "danger"> = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
};

export const CUSTOMER_INVOICES: CustomerInvoice[] = [
  { id: "INV-20841", customer: "Nordwerk Industries", issueDate: "2026-08-01", dueDate: "2026-08-31", amount: 4820, status: "paid" },
  { id: "INV-20842", customer: "Atlas Retail Group", issueDate: "2026-08-03", dueDate: "2026-09-02", amount: 3960, status: "pending" },
  { id: "INV-20843", customer: "Verdi Foods", issueDate: "2026-07-18", dueDate: "2026-08-17", amount: 1980, status: "overdue" },
  { id: "INV-20844", customer: "Baltic Components", issueDate: "2026-08-10", dueDate: "2026-09-09", amount: 2240, status: "pending" },
  { id: "INV-20845", customer: "Van Dijk Logistics", issueDate: "2026-08-05", dueDate: "2026-09-04", amount: 920, status: "paid" },
  { id: "INV-20846", customer: "Iberia Manufacturing", issueDate: "2026-07-22", dueDate: "2026-08-21", amount: 2170, status: "overdue" },
  { id: "INV-20847", customer: "Atlas Retail Group", issueDate: "2026-08-20", dueDate: "2026-09-19", amount: 3120, status: "pending" },
];

export type SlaMetric = "On-Time Delivery" | "Damage-Free Rate" | "Documentation Accuracy" | "Response Time";
export type SlaStatus = "meeting" | "at_risk" | "breached";

export type SlaRecord = {
  customer: string;
  metric: SlaMetric;
  target: string;
  actual: string;
  status: SlaStatus;
};

export const SLA_STATUS_LABEL: Record<SlaStatus, string> = {
  meeting: "Meeting",
  at_risk: "At Risk",
  breached: "Breached",
};

export const SLA_STATUS_TONE: Record<SlaStatus, "success" | "warning" | "danger"> = {
  meeting: "success",
  at_risk: "warning",
  breached: "danger",
};

export const SLA_RECORDS: SlaRecord[] = [
  { customer: "Nordwerk Industries", metric: "On-Time Delivery", target: "≥ 97%", actual: "98.4%", status: "meeting" },
  { customer: "Atlas Retail Group", metric: "On-Time Delivery", target: "≥ 95%", actual: "97.1%", status: "meeting" },
  { customer: "Verdi Foods", metric: "On-Time Delivery", target: "≥ 95%", actual: "89.5%", status: "breached" },
  { customer: "Verdi Foods", metric: "Damage-Free Rate", target: "≥ 99%", actual: "96.2%", status: "at_risk" },
  { customer: "Baltic Components", metric: "Documentation Accuracy", target: "≥ 98%", actual: "99.1%", status: "meeting" },
  { customer: "Van Dijk Logistics", metric: "Response Time", target: "≤ 2h", actual: "1h 10m", status: "meeting" },
  { customer: "Iberia Manufacturing", metric: "On-Time Delivery", target: "≥ 95%", actual: "96.0%", status: "meeting" },
];
