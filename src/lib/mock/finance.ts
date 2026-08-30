export const FINANCE_KPIS = [
  { label: "Revenue (MTD)", value: "€412,600" },
  { label: "Costs (MTD)", value: "€318,940" },
  { label: "Gross Margin", value: "22.7%" },
  { label: "Outstanding Receivables", value: "€6,410" },
  { label: "Outstanding Payables", value: "€38,250" },
  { label: "Cash Position", value: "€184,300" },
];

export type MonthlyPnl = {
  month: string;
  revenue: number;
  costs: number;
};

export const MONTHLY_PNL: MonthlyPnl[] = [
  { month: "Mar", revenue: 368400, costs: 296200 },
  { month: "Apr", revenue: 381900, costs: 302800 },
  { month: "May", revenue: 395200, costs: 309100 },
  { month: "Jun", revenue: 402700, costs: 314500 },
  { month: "Jul", revenue: 388600, costs: 305900 },
  { month: "Aug", revenue: 412600, costs: 318940 },
];

export type CostCategory = {
  category: string;
  amount: number;
  pctOfTotal: number;
};

export const COST_BREAKDOWN: CostCategory[] = [
  { category: "Driver Wages", amount: 142380, pctOfTotal: 44.6 },
  { category: "Fuel", amount: 87890, pctOfTotal: 27.6 },
  { category: "Maintenance & Repairs", amount: 28940, pctOfTotal: 9.1 },
  { category: "Tolls & Road Charges", amount: 24210, pctOfTotal: 7.6 },
  { category: "Insurance", amount: 19600, pctOfTotal: 6.1 },
  { category: "Admin & Overhead", amount: 15920, pctOfTotal: 5.0 },
];

export type ReceivableStatus = "paid" | "pending" | "overdue";

export type Receivable = {
  id: string;
  customer: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: ReceivableStatus;
};

export const RECEIVABLE_STATUS_LABEL: Record<ReceivableStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};

export const RECEIVABLE_STATUS_TONE: Record<ReceivableStatus, "success" | "warning" | "danger"> = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
};

export const RECEIVABLES: Receivable[] = [
  { id: "INV-20841", customer: "Nordwerk Industries", issueDate: "2026-08-01", dueDate: "2026-08-31", amount: 4820, status: "paid" },
  { id: "INV-20842", customer: "Atlas Retail Group", issueDate: "2026-08-03", dueDate: "2026-09-02", amount: 3960, status: "pending" },
  { id: "INV-20843", customer: "Verdi Foods", issueDate: "2026-07-18", dueDate: "2026-08-17", amount: 1980, status: "overdue" },
  { id: "INV-20844", customer: "Baltic Components", issueDate: "2026-08-10", dueDate: "2026-09-09", amount: 2240, status: "pending" },
  { id: "INV-20845", customer: "Van Dijk Logistics", issueDate: "2026-08-05", dueDate: "2026-09-04", amount: 920, status: "paid" },
  { id: "INV-20846", customer: "Iberia Manufacturing", issueDate: "2026-07-22", dueDate: "2026-08-21", amount: 2170, status: "overdue" },
  { id: "INV-20847", customer: "Atlas Retail Group", issueDate: "2026-08-20", dueDate: "2026-09-19", amount: 3120, status: "pending" },
];

export type PayableStatus = "paid" | "pending" | "overdue";

export type Payable = {
  id: string;
  vendor: string;
  category: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: PayableStatus;
};

export const PAYABLE_STATUS_LABEL: Record<PayableStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};

export const PAYABLE_STATUS_TONE: Record<PayableStatus, "success" | "warning" | "danger"> = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
};

export const PAYABLES: Payable[] = [
  { id: "BILL-8801", vendor: "DKV Mobility", category: "Fuel Cards", issueDate: "2026-08-01", dueDate: "2026-08-31", amount: 14280, status: "pending" },
  { id: "BILL-8802", vendor: "Continental Tyres GmbH", category: "Parts & Tyres", issueDate: "2026-07-20", dueDate: "2026-08-19", amount: 5420, status: "overdue" },
  { id: "BILL-8803", vendor: "Allianz Fleet Insurance", category: "Insurance", issueDate: "2026-08-01", dueDate: "2026-08-31", amount: 9800, status: "pending" },
  { id: "BILL-8804", vendor: "Bosch Service Partner Berlin", category: "Maintenance", issueDate: "2026-08-12", dueDate: "2026-09-11", amount: 3640, status: "pending" },
  { id: "BILL-8805", vendor: "Autobahn Toll Collect", category: "Tolls & Road Charges", issueDate: "2026-08-05", dueDate: "2026-09-04", amount: 8210, status: "paid" },
  { id: "BILL-8806", vendor: "OfficeSuite SaaS", category: "Admin & Overhead", issueDate: "2026-08-01", dueDate: "2026-08-15", amount: 900, status: "paid" },
];

export type RouteProfitability = {
  route: string;
  shipments: number;
  revenue: number;
  cost: number;
};

export const ROUTE_PROFITABILITY: RouteProfitability[] = [
  { route: "Berlin → Milan", shipments: 18, revenue: 39600, cost: 29200 },
  { route: "Paris → Barcelona", shipments: 22, revenue: 42700, cost: 34100 },
  { route: "Milan → Munich", shipments: 14, revenue: 13720, cost: 12980 },
  { route: "Warsaw → Berlin", shipments: 26, revenue: 29120, cost: 20400 },
  { route: "Rotterdam → Antwerp", shipments: 31, revenue: 14260, cost: 10800 },
  { route: "Madrid → Frankfurt", shipments: 9, revenue: 25650, cost: 21300 },
];
