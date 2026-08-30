export const DRIVER_APP_KPIS = [
  { label: "Active Devices", value: "7 / 8" },
  { label: "App Adoption", value: "100%" },
  { label: "Avg. Check-in Time", value: "1m 42s" },
  { label: "Push Delivery Rate", value: "98.6%" },
  { label: "Offline Drivers", value: "1" },
  { label: "Open Support Tickets", value: "2" },
];

export type DeviceStatus = "online" | "idle" | "offline";

export type DriverDevice = {
  driver: string;
  vehicle: string;
  deviceModel: string;
  os: string;
  appVersion: string;
  lastSync: string;
  battery: number;
  status: DeviceStatus;
};

export const DEVICE_STATUS_LABEL: Record<DeviceStatus, string> = {
  online: "Online",
  idle: "Idle",
  offline: "Offline",
};

export const DEVICE_STATUS_TONE: Record<DeviceStatus, "success" | "warning" | "danger"> = {
  online: "success",
  idle: "warning",
  offline: "danger",
};

export const DRIVER_DEVICES: DriverDevice[] = [
  { driver: "Markus Weber", vehicle: "DE-4827", deviceModel: "iPhone 14", os: "iOS 18.4", appVersion: "3.2.1", lastSync: "1 min ago", battery: 82, status: "online" },
  { driver: "Claire Dubois", vehicle: "FR-1298", deviceModel: "Samsung Galaxy S23", os: "Android 15", appVersion: "3.2.1", lastSync: "3 min ago", battery: 64, status: "online" },
  { driver: "Marco Rossi", vehicle: "IT-8821", deviceModel: "Samsung Galaxy A54", os: "Android 14", appVersion: "3.1.8", lastSync: "12 min ago", battery: 41, status: "idle" },
  { driver: "Tomasz Nowak", vehicle: "PL-3311", deviceModel: "iPhone 13", os: "iOS 17.6", appVersion: "3.2.1", lastSync: "2 min ago", battery: 91, status: "online" },
  { driver: "Sanne de Vries", vehicle: "NL-7742", deviceModel: "Google Pixel 8", os: "Android 15", appVersion: "3.2.1", lastSync: "5 min ago", battery: 77, status: "online" },
  { driver: "Javier Moreno", vehicle: "ES-5510", deviceModel: "iPhone 15", os: "iOS 18.4", appVersion: "3.2.1", lastSync: "Just now", battery: 88, status: "online" },
  { driver: "Lukas Gruber", vehicle: "AT-2201", deviceModel: "Samsung Galaxy S22", os: "Android 14", appVersion: "3.0.4", lastSync: "3h 20m ago", battery: 12, status: "offline" },
  { driver: "Emma Peeters", vehicle: "BE-9034", deviceModel: "iPhone 14", os: "iOS 18.3", appVersion: "3.2.1", lastSync: "8 min ago", battery: 69, status: "online" },
];

export type CheckInType = "Pickup" | "Delivery" | "Rest Break" | "Vehicle Inspection";

export type DriverCheckIn = {
  driver: string;
  vehicle: string;
  type: CheckInType;
  location: string;
  timestamp: string;
  podAttached: boolean;
};

export const CHECKIN_TYPE_TONE: Record<CheckInType, "info" | "success" | "default" | "warning"> = {
  Pickup: "info",
  Delivery: "success",
  "Rest Break": "default",
  "Vehicle Inspection": "warning",
};

export const DRIVER_CHECKINS: DriverCheckIn[] = [
  { driver: "Markus Weber", vehicle: "DE-4827", type: "Pickup", location: "Berlin, DE", timestamp: "2026-08-30 06:12", podAttached: true },
  { driver: "Claire Dubois", vehicle: "FR-1298", type: "Rest Break", location: "A6, near Beaune, FR", timestamp: "2026-08-30 09:45", podAttached: false },
  { driver: "Marco Rossi", vehicle: "IT-8821", type: "Delivery", location: "Bologna, IT", timestamp: "2026-08-30 10:58", podAttached: true },
  { driver: "Tomasz Nowak", vehicle: "PL-3311", type: "Vehicle Inspection", location: "Poznań Depot, PL", timestamp: "2026-08-30 07:05", podAttached: false },
  { driver: "Javier Moreno", vehicle: "ES-5510", type: "Pickup", location: "Zaragoza, ES", timestamp: "2026-08-30 08:22", podAttached: true },
  { driver: "Emma Peeters", vehicle: "BE-9034", type: "Delivery", location: "Antwerp, BE", timestamp: "2026-08-30 11:14", podAttached: true },
  { driver: "Sanne de Vries", vehicle: "NL-7742", type: "Rest Break", location: "Rotterdam Ring, NL", timestamp: "2026-08-30 12:03", podAttached: false },
];

export type Broadcast = {
  title: string;
  audience: string;
  sentAt: string;
  delivered: number;
  opened: number;
};

export const BROADCASTS: Broadcast[] = [
  { title: "Updated cabotage rules — effective Sept 1", audience: "All Drivers (8)", sentAt: "2026-08-29 08:00", delivered: 100, opened: 88 },
  { title: "Planned depot maintenance — Berlin, Aug 31", audience: "DE Fleet (2)", sentAt: "2026-08-28 15:30", delivered: 100, opened: 100 },
  { title: "New app version 3.2.1 available", audience: "All Drivers (8)", sentAt: "2026-08-25 09:00", delivered: 100, opened: 75 },
  { title: "Reminder: submit weekly tachograph data", audience: "All Drivers (8)", sentAt: "2026-08-22 07:00", delivered: 88, opened: 63 },
];

export type TicketStatus = "open" | "in_progress" | "resolved";
export type TicketPriority = "low" | "medium" | "high";

export type SupportTicket = {
  id: string;
  driver: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  opened: string;
};

export const TICKET_STATUS_LABEL: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
};

export const TICKET_STATUS_TONE: Record<TicketStatus, "default" | "info" | "success"> = {
  open: "default",
  in_progress: "info",
  resolved: "success",
};

export const TICKET_PRIORITY_TONE: Record<TicketPriority, "default" | "warning" | "danger"> = {
  low: "default",
  medium: "warning",
  high: "danger",
};

export const SUPPORT_TICKETS: SupportTicket[] = [
  { id: "ST-4471", driver: "Lukas Gruber", subject: "App crashes on trip start since update", priority: "high", status: "open", opened: "2026-08-29" },
  { id: "ST-4470", driver: "Marco Rossi", subject: "GPS location drifting near tunnels", priority: "medium", status: "in_progress", opened: "2026-08-27" },
  { id: "ST-4468", driver: "Tomasz Nowak", subject: "Cannot upload POD photo — upload stuck", priority: "medium", status: "resolved", opened: "2026-08-23" },
  { id: "ST-4465", driver: "Claire Dubois", subject: "Push notifications delayed by ~10 minutes", priority: "low", status: "resolved", opened: "2026-08-19" },
];
