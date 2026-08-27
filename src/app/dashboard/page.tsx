import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const KPIS = [
  { label: "Active Trucks", value: "248" },
  { label: "Active Drivers", value: "276" },
  { label: "Deliveries Today", value: "684" },
  { label: "Delayed", value: "17" },
  { label: "Compliance", value: "97.8%" },
  { label: "Fleet Utilization", value: "86%" },
  { label: "Empty KM", value: "8.7%" },
  { label: "Estimated Profit", value: "€184K" },
];

export default function ExecutiveDashboard() {
  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold">Executive Dashboard</h1>
      <p className="mb-6 text-sm text-white/50">
        Live overview across fleet, compliance and financial performance.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardTitle>{kpi.label}</CardTitle>
            </CardHeader>
            <p className="text-2xl font-semibold">{kpi.value}</p>
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
