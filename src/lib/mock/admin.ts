export const ADMIN_KPIS = [
  { label: "Team Members", value: "7" },
  { label: "Active Roles", value: "5" },
  { label: "Pending Invites", value: "1" },
  { label: "Storage Used", value: "4.2 GB / 50 GB" },
  { label: "Last Backup", value: "2026-08-30 03:00" },
  { label: "Audit Events (30d)", value: "184" },
];

export type MemberStatus = "active" | "invited" | "suspended";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: MemberStatus;
  lastActive: string;
};

export const MEMBER_STATUS_LABEL: Record<MemberStatus, string> = {
  active: "Active",
  invited: "Invited",
  suspended: "Suspended",
};

export const MEMBER_STATUS_TONE: Record<MemberStatus, "success" | "warning" | "danger"> = {
  active: "success",
  invited: "warning",
  suspended: "danger",
};

export const ROLES = ["Admin", "Fleet Manager", "Dispatcher", "Finance", "Compliance Officer", "Viewer"];

export const INITIAL_TEAM: TeamMember[] = [
  { id: "u-1", name: "Petra Lindqvist", email: "petra.lindqvist@europeanroutewise.com", role: "Admin", status: "active", lastActive: "2026-08-30 12:40" },
  { id: "u-2", name: "Anna Fischer", email: "anna.fischer@europeanroutewise.com", role: "Fleet Manager", status: "active", lastActive: "2026-08-30 11:15" },
  { id: "u-3", name: "Émile Laurent", email: "emile.laurent@europeanroutewise.com", role: "Dispatcher", status: "active", lastActive: "2026-08-30 09:50" },
  { id: "u-4", name: "Isabel Reyes", email: "isabel.reyes@europeanroutewise.com", role: "Finance", status: "active", lastActive: "2026-08-29 17:20" },
  { id: "u-5", name: "Peter Huber", email: "peter.huber@europeanroutewise.com", role: "Compliance Officer", status: "active", lastActive: "2026-08-28 16:05" },
  { id: "u-6", name: "Luca Bianchi", email: "luca.bianchi@europeanroutewise.com", role: "Dispatcher", status: "suspended", lastActive: "2026-08-10 08:30" },
  { id: "u-7", name: "Nils Andersen", email: "nils.andersen@europeanroutewise.com", role: "Viewer", status: "invited", lastActive: "—" },
];

export const PERMISSIONS = [
  "View Dashboard",
  "Manage Shipments",
  "Manage Fleet",
  "Manage Drivers",
  "Approve Invoices",
  "Manage Compliance Rules",
  "Manage Integrations",
  "Manage Users",
  "View Financials",
];

export const DEFAULT_ROLE_PERMISSIONS: Record<string, Record<string, boolean>> = {
  Admin: Object.fromEntries(PERMISSIONS.map((p) => [p, true])),
  "Fleet Manager": {
    "View Dashboard": true,
    "Manage Shipments": true,
    "Manage Fleet": true,
    "Manage Drivers": true,
    "Approve Invoices": false,
    "Manage Compliance Rules": false,
    "Manage Integrations": false,
    "Manage Users": false,
    "View Financials": false,
  },
  Dispatcher: {
    "View Dashboard": true,
    "Manage Shipments": true,
    "Manage Fleet": false,
    "Manage Drivers": false,
    "Approve Invoices": false,
    "Manage Compliance Rules": false,
    "Manage Integrations": false,
    "Manage Users": false,
    "View Financials": false,
  },
  Finance: {
    "View Dashboard": true,
    "Manage Shipments": false,
    "Manage Fleet": false,
    "Manage Drivers": false,
    "Approve Invoices": true,
    "Manage Compliance Rules": false,
    "Manage Integrations": false,
    "Manage Users": false,
    "View Financials": true,
  },
  "Compliance Officer": {
    "View Dashboard": true,
    "Manage Shipments": false,
    "Manage Fleet": false,
    "Manage Drivers": true,
    "Approve Invoices": false,
    "Manage Compliance Rules": true,
    "Manage Integrations": false,
    "Manage Users": false,
    "View Financials": false,
  },
  Viewer: {
    "View Dashboard": true,
    "Manage Shipments": false,
    "Manage Fleet": false,
    "Manage Drivers": false,
    "Approve Invoices": false,
    "Manage Compliance Rules": false,
    "Manage Integrations": false,
    "Manage Users": false,
    "View Financials": false,
  },
};

export type CompanySettings = {
  companyName: string;
  vatNumber: string;
  address: string;
  timezone: string;
  currency: string;
  primaryContact: string;
};

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  companyName: "European RouteWise GmbH",
  vatNumber: "DE 312 456 789",
  address: "Torstraße 140, 10119 Berlin, Germany",
  timezone: "Europe/Berlin (UTC+1)",
  currency: "EUR (€)",
  primaryContact: "petra.lindqvist@europeanroutewise.com",
};

export type AuditLogEntry = {
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export const AUDIT_LOG: AuditLogEntry[] = [
  { actor: "Petra Lindqvist", action: "Updated role permissions", target: "Dispatcher", timestamp: "2026-08-30 09:12" },
  { actor: "Petra Lindqvist", action: "Suspended user", target: "Luca Bianchi", timestamp: "2026-08-29 14:05" },
  { actor: "Anna Fischer", action: "Connected integration", target: "Webfleet Telematics", timestamp: "2026-08-28 10:44" },
  { actor: "Isabel Reyes", action: "Approved invoice", target: "INV-20841", timestamp: "2026-08-28 08:30" },
  { actor: "Peter Huber", action: "Updated compliance rule", target: "Cabotage — DE/AT/IT", timestamp: "2026-08-27 15:50" },
  { actor: "Petra Lindqvist", action: "Invited user", target: "Nils Andersen", timestamp: "2026-08-26 11:20" },
  { actor: "System", action: "Ran nightly backup", target: "Production database", timestamp: "2026-08-30 03:00" },
];
