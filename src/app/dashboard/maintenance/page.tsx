"use client";

import { useState } from "react";
import { AlertTriangle, HeartPulse, Package, Wrench } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MAINTENANCE_KPIS,
  SERVICE_SCHEDULE,
  SERVICE_STATUS_LABEL,
  SERVICE_STATUS_TONE,
  WORK_ORDERS,
  WORK_ORDER_PRIORITY_TONE,
  WORK_ORDER_STATUS_LABEL,
  WORK_ORDER_STATUS_TONE,
  PARTS_INVENTORY,
  PART_STATUS_LABEL,
  PART_STATUS_TONE,
  VEHICLE_HEALTH,
  MAINTENANCE_ALERTS,
  MAINTENANCE_ALERT_TONE,
} from "@/lib/mock/maintenance";

const TABS = ["Overview", "Service Schedule", "Work Orders", "Parts Inventory", "Vehicle Health"] as const;
type Tab = (typeof TABS)[number];

export default function MaintenancePage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <Wrench className="h-5 w-5 text-blue-400" /> Maintenance
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Service schedules, work orders, parts inventory and vehicle health across the fleet.
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
            {MAINTENANCE_KPIS.map((k) => (
              <Card key={k.label}>
                <p className="mb-2 text-xs text-white/50">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </Card>
            ))}
          </div>

          <Card className="p-0">
            <div className="flex items-center justify-between p-5 pb-3">
              <CardTitle>Active Maintenance Alerts</CardTitle>
              <Badge tone="danger">{MAINTENANCE_ALERTS.length} flagged</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">Vehicle / SKU</th>
                    <th className="px-4 py-3 font-medium">Alert</th>
                    <th className="px-4 py-3 font-medium">Detail</th>
                    <th className="px-4 py-3 font-medium">Severity</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {MAINTENANCE_ALERTS.map((a, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{a.vehicle}</td>
                      <td className="px-4 py-3 text-white/70">{a.type}</td>
                      <td className="px-4 py-3 text-white/50">{a.detail}</td>
                      <td className="px-4 py-3">
                        <Badge tone={MAINTENANCE_ALERT_TONE[a.severity]}>{a.severity.toUpperCase()}</Badge>
                      </td>
                      <td className="px-4 py-3 text-white/50">{a.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === "Service Schedule" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Model</th>
                  <th className="px-4 py-3 font-medium">Service Type</th>
                  <th className="px-4 py-3 font-medium">Current KM</th>
                  <th className="px-4 py-3 font-medium">Next Service KM</th>
                  <th className="px-4 py-3 font-medium">Due Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {SERVICE_SCHEDULE.map((s) => (
                  <tr key={s.vehicle} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{s.vehicle}</td>
                    <td className="px-4 py-3 text-white/70">{s.makeModel}</td>
                    <td className="px-4 py-3 text-white/70">{s.serviceType}</td>
                    <td className="px-4 py-3 text-white/70">{s.currentKm.toLocaleString()} km</td>
                    <td className="px-4 py-3 text-white/50">{s.nextServiceKm.toLocaleString()} km</td>
                    <td className="px-4 py-3 text-white/50">{s.dueDate}</td>
                    <td className="px-4 py-3">
                      <Badge tone={SERVICE_STATUS_TONE[s.status]}>{SERVICE_STATUS_LABEL[s.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Work Orders" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Issue</th>
                  <th className="px-4 py-3 font-medium">Technician</th>
                  <th className="px-4 py-3 font-medium">Opened</th>
                  <th className="px-4 py-3 font-medium">Est. Cost</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {WORK_ORDERS.map((w) => (
                  <tr key={w.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{w.id}</td>
                    <td className="px-4 py-3 text-white/70">{w.vehicle}</td>
                    <td className="px-4 py-3 text-white/70">{w.issue}</td>
                    <td className="px-4 py-3 text-white/50">{w.technician}</td>
                    <td className="px-4 py-3 text-white/50">{w.opened}</td>
                    <td className="px-4 py-3 text-white/70">€{w.estimatedCost.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge tone={WORK_ORDER_PRIORITY_TONE[w.priority]}>{w.priority.toUpperCase()}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={WORK_ORDER_STATUS_TONE[w.status]}>{WORK_ORDER_STATUS_LABEL[w.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Parts Inventory" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTS_INVENTORY.map((p) => {
            const stockPct = Math.min(100, Math.round((p.quantity / (p.reorderThreshold * 2)) * 100));
            return (
              <Card key={p.sku}>
                <CardHeader>
                  <CardTitle>
                    <span className="flex items-center gap-1.5 text-white/80">
                      <Package className="h-3.5 w-3.5 text-blue-400" /> {p.name}
                    </span>
                  </CardTitle>
                  <Badge tone={PART_STATUS_TONE[p.status]}>{PART_STATUS_LABEL[p.status]}</Badge>
                </CardHeader>
                <p className="mb-3 font-mono text-xs text-white/40">{p.sku}</p>
                <div className="mb-3 space-y-1.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">In Stock</span>
                    <span className="font-medium">{p.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Reorder Threshold</span>
                    <span className="font-medium">{p.reorderThreshold}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Unit Cost</span>
                    <span className="font-medium">€{p.unitCost}</span>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      p.status === "out_of_stock" ? "bg-red-500" : p.status === "low_stock" ? "bg-amber-400" : "bg-blue-500"
                    }`}
                    style={{ width: `${stockPct}%` }}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "Vehicle Health" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VEHICLE_HEALTH.map((v) => (
            <Card key={v.vehicle}>
              <CardHeader>
                <CardTitle>
                  {v.vehicle} <span className="text-white/30">· {v.makeModel}</span>
                </CardTitle>
                <HeartPulse className="h-3.5 w-3.5 text-white/30" />
              </CardHeader>
              <p
                className={`text-2xl font-semibold ${
                  v.healthScore >= 90 ? "text-emerald-400" : v.healthScore >= 75 ? "text-amber-400" : "text-red-400"
                }`}
              >
                {v.healthScore}%
              </p>
              <p className="mb-3 text-xs text-white/40">Health score</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between border-b border-white/5 py-1.5">
                  <span className="text-white/60">Open Issues</span>
                  <span className="font-medium">{v.openIssues}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 py-1.5">
                  <span className="text-white/60">Last Inspection</span>
                  <span className="font-medium">{v.lastInspection}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-white/60">Next Inspection</span>
                  <span className="font-medium">{v.nextInspection}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab !== "Overview" && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-white/30">
          <AlertTriangle className="h-3 w-3" /> Figures are mock data pending live telematics and workshop
          management system integration.
        </p>
      )}
    </div>
  );
}
