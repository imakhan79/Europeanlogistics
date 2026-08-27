import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Map,
  Truck,
  Users,
  Package,
  Route,
  Sparkles,
  Kanban,
  ShieldCheck,
  Fuel,
  Wrench,
  Building2,
  Smartphone,
  Wallet,
  BarChart3,
  FileText,
  Bell,
  Bot,
  Plug,
  Settings,
} from "lucide-react";

export type ModuleLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_MODULES: ModuleLink[] = [
  { label: "Executive Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Live Fleet Map", href: "/dashboard/fleet-map", icon: Map },
  { label: "Fleet Management", href: "/dashboard/fleet", icon: Truck },
  { label: "Driver Management", href: "/dashboard/drivers", icon: Users },
  { label: "Shipment Management", href: "/dashboard/shipments", icon: Package },
  { label: "Route Planner", href: "/dashboard/routes", icon: Route },
  { label: "AI Route Optimizer", href: "/dashboard/routes/optimizer", icon: Sparkles },
  { label: "Dispatch Board", href: "/dashboard/dispatch", icon: Kanban },
  { label: "Compliance OS", href: "/dashboard/compliance", icon: ShieldCheck },
  { label: "Fuel Management", href: "/dashboard/fuel", icon: Fuel },
  { label: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
  { label: "Customer Portal", href: "/dashboard/customers", icon: Building2 },
  { label: "Driver Mobile App", href: "/dashboard/driver-app", icon: Smartphone },
  { label: "Finance", href: "/dashboard/finance", icon: Wallet },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "AI Logistics Agent", href: "/dashboard/ai-agent", icon: Bot },
  { label: "Integrations", href: "/dashboard/integrations", icon: Plug },
  { label: "Administration", href: "/dashboard/admin", icon: Settings },
];
