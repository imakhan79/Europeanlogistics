export const MAINTENANCE_KPIS = [
  { label: "Fleet Health Score", value: "91%" },
  { label: "Open Work Orders", value: "6" },
  { label: "Due Within 7 Days", value: "4" },
  { label: "Overdue Services", value: "1" },
  { label: "Maintenance Spend (MTD)", value: "€28,940" },
  { label: "Avg. Downtime", value: "1.4 days" },
];

export type ServiceStatus = "on_track" | "due_soon" | "overdue";

export type ServiceScheduleEntry = {
  vehicle: string;
  makeModel: string;
  serviceType: string;
  lastServiceKm: number;
  nextServiceKm: number;
  currentKm: number;
  dueDate: string;
  status: ServiceStatus;
};

export const SERVICE_STATUS_LABEL: Record<ServiceStatus, string> = {
  on_track: "On Track",
  due_soon: "Due Soon",
  overdue: "Overdue",
};

export const SERVICE_STATUS_TONE: Record<ServiceStatus, "success" | "warning" | "danger"> = {
  on_track: "success",
  due_soon: "warning",
  overdue: "danger",
};

export const SERVICE_SCHEDULE: ServiceScheduleEntry[] = [
  { vehicle: "DE-4827", makeModel: "Mercedes Actros", serviceType: "Full Service (B)", lastServiceKm: 210000, nextServiceKm: 240000, currentKm: 236800, dueDate: "2026-09-08", status: "due_soon" },
  { vehicle: "FR-1298", makeModel: "Volvo FH16", serviceType: "Oil & Filter Change", lastServiceKm: 185000, nextServiceKm: 215000, currentKm: 213400, dueDate: "2026-09-05", status: "due_soon" },
  { vehicle: "IT-8821", makeModel: "Iveco S-Way", serviceType: "Brake Inspection", lastServiceKm: 160000, nextServiceKm: 190000, currentKm: 192600, dueDate: "2026-08-24", status: "overdue" },
  { vehicle: "PL-3311", makeModel: "MAN TGX", serviceType: "Full Service (A)", lastServiceKm: 140000, nextServiceKm: 170000, currentKm: 148900, dueDate: "2026-10-14", status: "on_track" },
  { vehicle: "NL-7742", makeModel: "DAF XF", serviceType: "Tyre Rotation", lastServiceKm: 95000, nextServiceKm: 115000, currentKm: 109200, dueDate: "2026-09-20", status: "on_track" },
  { vehicle: "ES-5510", makeModel: "Scania R500", serviceType: "Annual MOT / Roadworthiness", lastServiceKm: 220000, nextServiceKm: 250000, currentKm: 244100, dueDate: "2026-09-11", status: "due_soon" },
  { vehicle: "AT-2201", makeModel: "Mercedes Actros", serviceType: "Full Service (B)", lastServiceKm: 175000, nextServiceKm: 205000, currentKm: 206300, dueDate: "2026-08-29", status: "overdue" },
  { vehicle: "BE-9034", makeModel: "Volvo FH", serviceType: "Oil & Filter Change", lastServiceKm: 130000, nextServiceKm: 160000, currentKm: 142700, dueDate: "2026-10-02", status: "on_track" },
];

export type WorkOrderPriority = "low" | "medium" | "high" | "critical";
export type WorkOrderStatus = "open" | "in_progress" | "awaiting_parts" | "completed";

export type WorkOrder = {
  id: string;
  vehicle: string;
  issue: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  technician: string;
  opened: string;
  estimatedCost: number;
};

export const WORK_ORDER_PRIORITY_TONE: Record<WorkOrderPriority, "default" | "warning" | "danger"> = {
  low: "default",
  medium: "warning",
  high: "danger",
  critical: "danger",
};

export const WORK_ORDER_STATUS_LABEL: Record<WorkOrderStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  awaiting_parts: "Awaiting Parts",
  completed: "Completed",
};

export const WORK_ORDER_STATUS_TONE: Record<WorkOrderStatus, "default" | "info" | "warning" | "success"> = {
  open: "default",
  in_progress: "info",
  awaiting_parts: "warning",
  completed: "success",
};

export const WORK_ORDERS: WorkOrder[] = [
  { id: "WO-3301", vehicle: "IT-8821", issue: "Brake pad wear beyond limit", priority: "high", status: "in_progress", technician: "Luca Bianchi", opened: "2026-08-25", estimatedCost: 640 },
  { id: "WO-3300", vehicle: "AT-2201", issue: "Engine warning light — DPF sensor", priority: "critical", status: "awaiting_parts", technician: "Peter Huber", opened: "2026-08-24", estimatedCost: 1180 },
  { id: "WO-3299", vehicle: "NL-7742", issue: "Trailer light connector fault", priority: "low", status: "open", technician: "Unassigned", opened: "2026-08-27", estimatedCost: 90 },
  { id: "WO-3298", vehicle: "FR-1298", issue: "Coolant leak, front radiator", priority: "medium", status: "in_progress", technician: "Émile Laurent", opened: "2026-08-26", estimatedCost: 420 },
  { id: "WO-3297", vehicle: "ES-5510", issue: "Windscreen wiper motor replacement", priority: "low", status: "open", technician: "Unassigned", opened: "2026-08-28", estimatedCost: 150 },
  { id: "WO-3296", vehicle: "DE-4827", issue: "Scheduled brake inspection", priority: "medium", status: "completed", technician: "Anna Fischer", opened: "2026-08-19", estimatedCost: 260 },
];

export type PartStatus = "in_stock" | "low_stock" | "out_of_stock";

export type PartInventoryItem = {
  sku: string;
  name: string;
  quantity: number;
  reorderThreshold: number;
  unitCost: number;
  status: PartStatus;
};

export const PART_STATUS_LABEL: Record<PartStatus, string> = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
};

export const PART_STATUS_TONE: Record<PartStatus, "success" | "warning" | "danger"> = {
  in_stock: "success",
  low_stock: "warning",
  out_of_stock: "danger",
};

export const PARTS_INVENTORY: PartInventoryItem[] = [
  { sku: "BRK-PAD-40T", name: "Brake Pad Set (40t axle)", quantity: 18, reorderThreshold: 10, unitCost: 145, status: "in_stock" },
  { sku: "OIL-15W40-20L", name: "Engine Oil 15W-40 (20L drum)", quantity: 6, reorderThreshold: 8, unitCost: 98, status: "low_stock" },
  { sku: "FLT-AIR-STD", name: "Air Filter, Standard", quantity: 24, reorderThreshold: 12, unitCost: 32, status: "in_stock" },
  { sku: "DPF-SENSOR-01", name: "DPF Pressure Sensor", quantity: 0, reorderThreshold: 3, unitCost: 210, status: "out_of_stock" },
  { sku: "TYRE-315-80R22", name: "Tyre 315/80 R22.5", quantity: 9, reorderThreshold: 8, unitCost: 285, status: "in_stock" },
  { sku: "WPR-MOTOR-EU", name: "Wiper Motor, EU Standard", quantity: 2, reorderThreshold: 4, unitCost: 76, status: "low_stock" },
  { sku: "COOL-RAD-FR", name: "Radiator, Front-mount", quantity: 3, reorderThreshold: 3, unitCost: 410, status: "in_stock" },
];

export type VehicleHealth = {
  vehicle: string;
  makeModel: string;
  healthScore: number;
  openIssues: number;
  lastInspection: string;
  nextInspection: string;
};

export const VEHICLE_HEALTH: VehicleHealth[] = [
  { vehicle: "DE-4827", makeModel: "Mercedes Actros", healthScore: 96, openIssues: 0, lastInspection: "2026-08-19", nextInspection: "2027-02-19" },
  { vehicle: "FR-1298", makeModel: "Volvo FH16", healthScore: 84, openIssues: 1, lastInspection: "2026-07-30", nextInspection: "2027-01-30" },
  { vehicle: "IT-8821", makeModel: "Iveco S-Way", healthScore: 71, openIssues: 1, lastInspection: "2026-06-12", nextInspection: "2026-12-12" },
  { vehicle: "PL-3311", makeModel: "MAN TGX", healthScore: 93, openIssues: 0, lastInspection: "2026-08-02", nextInspection: "2027-02-02" },
  { vehicle: "NL-7742", makeModel: "DAF XF", healthScore: 89, openIssues: 1, lastInspection: "2026-07-21", nextInspection: "2027-01-21" },
  { vehicle: "ES-5510", makeModel: "Scania R500", healthScore: 90, openIssues: 1, lastInspection: "2026-08-05", nextInspection: "2027-02-05" },
  { vehicle: "AT-2201", makeModel: "Mercedes Actros", healthScore: 58, openIssues: 1, lastInspection: "2026-05-28", nextInspection: "2026-11-28" },
  { vehicle: "BE-9034", makeModel: "Volvo FH", healthScore: 95, openIssues: 0, lastInspection: "2026-08-14", nextInspection: "2027-02-14" },
];

export type MaintenanceAlertSeverity = "low" | "medium" | "high";

export type MaintenanceAlert = {
  vehicle: string;
  type: string;
  detail: string;
  severity: MaintenanceAlertSeverity;
  date: string;
};

export const MAINTENANCE_ALERT_TONE: Record<MaintenanceAlertSeverity, "default" | "warning" | "danger"> = {
  low: "default",
  medium: "warning",
  high: "danger",
};

export const MAINTENANCE_ALERTS: MaintenanceAlert[] = [
  { vehicle: "AT-2201", type: "Critical Fault", detail: "DPF sensor fault — vehicle held pending part delivery", severity: "high", date: "2026-08-24" },
  { vehicle: "IT-8821", type: "Overdue Service", detail: "Brake inspection overdue by 2,600 km", severity: "high", date: "2026-08-24" },
  { vehicle: "AT-2201", type: "Overdue Service", detail: "Full Service (B) overdue by 1,300 km", severity: "medium", date: "2026-08-29" },
  { vehicle: "DPF-SENSOR-01", type: "Parts Shortage", detail: "DPF Pressure Sensor out of stock — blocking WO-3300", severity: "medium", date: "2026-08-25" },
];
