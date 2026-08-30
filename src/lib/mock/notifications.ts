export type NotificationCategory =
  | "Compliance"
  | "Fuel"
  | "Maintenance"
  | "Finance"
  | "Documents"
  | "Dispatch";

export type NotificationSeverity = "low" | "medium" | "high";

export type AppNotification = {
  id: string;
  category: NotificationCategory;
  severity: NotificationSeverity;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
};

export const SEVERITY_TONE: Record<NotificationSeverity, "default" | "warning" | "danger"> = {
  low: "default",
  medium: "warning",
  high: "danger",
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "N-9001",
    category: "Maintenance",
    severity: "high",
    title: "Critical fault — AT-2201",
    message: "DPF sensor fault reported. Vehicle held pending part delivery (WO-3300).",
    timestamp: "2026-08-30 08:12",
    read: false,
    link: "/dashboard/maintenance",
  },
  {
    id: "N-9002",
    category: "Documents",
    severity: "high",
    title: "Driver document expired — Marco Rossi",
    message: "Medical Certificate expired on 2026-08-01. Driver may be non-compliant to operate.",
    timestamp: "2026-08-30 08:12",
    read: false,
    link: "/dashboard/documents",
  },
  {
    id: "N-9003",
    category: "Fuel",
    severity: "high",
    title: "Fuel card blocked — IT-8821",
    message: "Card spend exceeded monthly limit and was auto-blocked pending review.",
    timestamp: "2026-08-28 14:20",
    read: false,
    link: "/dashboard/fuel",
  },
  {
    id: "N-9004",
    category: "Compliance",
    severity: "high",
    title: "Tachograph violation — AT-2201",
    message: "Missing driver card record flagged for Lukas Gruber.",
    timestamp: "2026-08-25 09:05",
    read: false,
    link: "/dashboard/compliance",
  },
  {
    id: "N-9005",
    category: "Finance",
    severity: "medium",
    title: "Invoice overdue — Verdi Foods",
    message: "INV-20843 for €1,980 is 13 days overdue.",
    timestamp: "2026-08-30 06:00",
    read: false,
    link: "/dashboard/finance",
  },
  {
    id: "N-9006",
    category: "Dispatch",
    severity: "medium",
    title: "Shipment delayed — EU-12874",
    message: "Verdi Foods delivery (Milan → Munich) running behind schedule, revised ETA 15:40.",
    timestamp: "2026-08-30 12:10",
    read: true,
    link: "/dashboard/dispatch",
  },
  {
    id: "N-9007",
    category: "Maintenance",
    severity: "medium",
    title: "Service overdue — IT-8821",
    message: "Brake inspection overdue by 2,600 km.",
    timestamp: "2026-08-24 07:30",
    read: true,
    link: "/dashboard/maintenance",
  },
  {
    id: "N-9008",
    category: "Fuel",
    severity: "medium",
    title: "Card utilisation high — AT-2201",
    message: "Monthly fuel card spend at 93% of €2,900 limit.",
    timestamp: "2026-08-27 16:45",
    read: true,
    link: "/dashboard/fuel",
  },
  {
    id: "N-9009",
    category: "Documents",
    severity: "medium",
    title: "Insurance expiring — PL-3311",
    message: "Vehicle insurance policy expires 2026-09-15.",
    timestamp: "2026-08-26 10:00",
    read: true,
    link: "/dashboard/documents",
  },
  {
    id: "N-9010",
    category: "Compliance",
    severity: "low",
    title: "Break taken late — PL-3311",
    message: "Tomasz Nowak's break was recorded 12 minutes late.",
    timestamp: "2026-08-24 11:15",
    read: true,
    link: "/dashboard/compliance",
  },
  {
    id: "N-9011",
    category: "Finance",
    severity: "low",
    title: "New invoice issued — Atlas Retail Group",
    message: "INV-20847 for €3,120 issued, due 2026-09-19.",
    timestamp: "2026-08-20 09:00",
    read: true,
    link: "/dashboard/finance",
  },
  {
    id: "N-9012",
    category: "Dispatch",
    severity: "low",
    title: "Shipment delivered — EU-12868",
    message: "Nordwerk Industries delivery (Hamburg → Vienna) completed at 21:12.",
    timestamp: "2026-08-29 21:12",
    read: true,
    link: "/dashboard/dispatch",
  },
];

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  "Compliance",
  "Fuel",
  "Maintenance",
  "Finance",
  "Documents",
  "Dispatch",
];

export type NotificationChannelPrefs = {
  email: boolean;
  push: boolean;
};

export const DEFAULT_PREFERENCES: Record<NotificationCategory, NotificationChannelPrefs> = {
  Compliance: { email: true, push: true },
  Fuel: { email: true, push: false },
  Maintenance: { email: true, push: true },
  Finance: { email: true, push: false },
  Documents: { email: true, push: true },
  Dispatch: { email: false, push: true },
};
