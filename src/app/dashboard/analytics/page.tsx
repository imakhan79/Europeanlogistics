"use client";

import { useState } from "react";
import { AlertTriangle, BarChart3, Star } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ANALYTICS_KPIS,
  SHIPMENT_VOLUME_TREND,
  FLEET_UTILIZATION,
  DRIVER_PERFORMANCE,
  CORRIDOR_ANALYTICS,
} from "@/lib/mock/analytics";

const TABS = ["Overview", "Fleet Performance", "Driver Performance", "Shipment Trends", "Corridor Analytics"] as const;
type Tab = (typeof TABS)[number];

export default function AnalyticsPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <BarChart3 className="h-5 w-5 text-blue-400" /> Analytics
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Cross-fleet performance trends across shipments, vehicles, drivers and corridors.
      </p>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              tab === t
                ? "border-blue-500 bg-blue-500/15 text-blue-300"
                : "border-white/10 text-white/50 hover:bg-white/5"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ANALYTICS_KPIS.map((k) => (
              <Card key={k.label}>
                <p className="mb-2 text-xs text-white/50">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Shipment Volume & On-Time Rate (Last 6 Months)</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {SHIPMENT_VOLUME_TREND.map((m) => {
                const maxVal = Math.max(...SHIPMENT_VOLUME_TREND.map((x) => x.shipments));
                const volumePct = Math.round((m.shipments / maxVal) * 100);
                return (
                  <div key={m.month}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-white/70">{m.month}</span>
                      <span className="text-white/50">
                        {m.shipments} shipments ·{" "}
                        <span className={m.onTimePct >= 95 ? "text-emerald-400" : "text-amber-400"}>
                          {m.onTimePct}% on-time
                        </span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${volumePct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {tab === "Fleet Performance" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Model</th>
                  <th className="px-4 py-3 font-medium">Utilization</th>
                  <th className="px-4 py-3 font-medium">KM Driven</th>
                  <th className="px-4 py-3 font-medium">Revenue</th>
                  <th className="px-4 py-3 font-medium">Idle Hours</th>
                </tr>
              </thead>
              <tbody>
                {FLEET_UTILIZATION.map((v) => (
                  <tr key={v.vehicle} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{v.vehicle}</td>
                    <td className="px-4 py-3 text-white/70">{v.makeModel}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full ${
                              v.utilizationPct >= 80 ? "bg-emerald-400" : v.utilizationPct >= 65 ? "bg-amber-400" : "bg-red-400"
                            }`}
                            style={{ width: `${v.utilizationPct}%` }}
                          />
                        </div>
                        <span className="text-white/70">{v.utilizationPct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/70">{v.kmDriven.toLocaleString()} km</td>
                    <td className="px-4 py-3 text-white/70">€{v.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3 text-white/50">{v.idleHours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Driver Performance" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">On-Time %</th>
                  <th className="px-4 py-3 font-medium">Trips</th>
                  <th className="px-4 py-3 font-medium">Compliance</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {DRIVER_PERFORMANCE.map((d) => (
                  <tr key={d.name} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{d.name}</td>
                    <td className="px-4 py-3 text-white/50">{d.country}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-medium ${
                          d.onTimePct >= 95 ? "text-emerald-400" : d.onTimePct >= 85 ? "text-amber-400" : "text-red-400"
                        }`}
                      >
                        {d.onTimePct}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/70">{d.tripsCompleted}</td>
                    <td className="px-4 py-3 text-white/70">{d.complianceScore}%</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-white/70">
                        <Star className="h-3.5 w-3.5 text-amber-400" /> {d.rating.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Shipment Trends" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Month</th>
                  <th className="px-4 py-3 font-medium">Shipments</th>
                  <th className="px-4 py-3 font-medium">On-Time Rate</th>
                  <th className="px-4 py-3 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {SHIPMENT_VOLUME_TREND.map((m, i) => {
                  const prev = SHIPMENT_VOLUME_TREND[i - 1];
                  const delta = prev ? m.shipments - prev.shipments : 0;
                  return (
                    <tr key={m.month} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{m.month}</td>
                      <td className="px-4 py-3 text-white/70">{m.shipments}</td>
                      <td className="px-4 py-3">
                        <Badge tone={m.onTimePct >= 95 ? "success" : "warning"}>{m.onTimePct}%</Badge>
                      </td>
                      <td className="px-4 py-3 text-white/50">
                        {i === 0 ? "—" : delta >= 0 ? `+${delta} vs prev month` : `${delta} vs prev month`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Corridor Analytics" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Corridor</th>
                  <th className="px-4 py-3 font-medium">Shipments</th>
                  <th className="px-4 py-3 font-medium">On-Time Rate</th>
                  <th className="px-4 py-3 font-medium">Avg. Transit Time</th>
                  <th className="px-4 py-3 font-medium">Revenue Share</th>
                </tr>
              </thead>
              <tbody>
                {CORRIDOR_ANALYTICS.map((c) => (
                  <tr key={c.corridor} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{c.corridor}</td>
                    <td className="px-4 py-3 text-white/70">{c.shipments}</td>
                    <td className="px-4 py-3">
                      <Badge tone={c.onTimePct >= 95 ? "success" : "warning"}>{c.onTimePct.toFixed(1)}%</Badge>
                    </td>
                    <td className="px-4 py-3 text-white/50">{c.avgTransitTime}</td>
                    <td className="px-4 py-3 text-white/70">{c.revenueShare.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab !== "Overview" && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-white/30">
          <AlertTriangle className="h-3 w-3" /> Figures are mock data pending live telematics and
          reporting warehouse integration.
        </p>
      )}
    </div>
  );
}
