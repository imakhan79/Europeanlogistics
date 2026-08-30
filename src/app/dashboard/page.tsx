import {
  AlertTriangle,
  Fuel as FuelIcon,
  Gauge,
  ShieldCheck,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const KPIS = [
  { label: "Active Trucks", value: "248", icon: Truck, tone: "text-blue-400 bg-blue-500/15" },
  { label: "Active Drivers", value: "276", icon: Users, tone: "text-blue-400 bg-blue-500/15" },
  { label: "Deliveries Today", value: "684", icon: Gauge, tone: "text-emerald-400 bg-emerald-500/15" },
  { label: "Delayed", value: "17", icon: AlertTriangle, tone: "text-amber-400 bg-amber-500/15" },
  { label: "Compliance", value: "97.8%", icon: ShieldCheck, tone: "text-emerald-400 bg-emerald-500/15" },
  { label: "Fleet Utilization", value: "86%", icon: Gauge, tone: "text-blue-400 bg-blue-500/15" },
  { label: "Empty KM", value: "8.7%", icon: FuelIcon, tone: "text-amber-400 bg-amber-500/15" },
  { label: "Estimated Profit", value: "€184K", icon: Wallet, tone: "text-emerald-400 bg-emerald-500/15" },
];

export default function ExecutiveDashboard() {
  return (
    <div>
      <div className="glass-panel relative mb-6 overflow-hidden rounded-2xl px-6 py-6">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-600/20 blur-[80px]"
          aria-hidden
        />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="font-heading mb-1 text-xl font-semibold">Executive Dashboard</h1>
            <p className="text-sm text-white/50">
              Live overview across fleet, compliance and financial performance.
            </p>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live network
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <Card key={kpi.label}>
            <div className="mb-3 flex items-center justify-between">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${kpi.tone}`}>
                <kpi.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="text-2xl font-semibold">{kpi.value}</p>
            <p className="text-xs text-white/50">{kpi.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Route Comparison</CardTitle>
            <Badge tone="info">AI Optimal</Badge>
          </CardHeader>
          <div className="space-y-2 text-sm">
            <Row label="Berlin → Milan (AI Optimal)" value="1,188 km · 13h 42m · €842" />
            <Row label="Fastest" value="1,160 km · 12h 58m · €950" />
            <Row label="Cheapest" value="1,270 km · 14h 22m · €825" />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <div className="space-y-2 text-sm">
            <Row label="Driver Hours" value="98%" />
            <Row label="Tachograph" value="99%" />
            <Row label="Cabotage" value="100%" />
            <Row label="Posting" value="97%" />
            <Row label="Documents" value="95%" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-1.5 last:border-0">
      <span className="text-white/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
