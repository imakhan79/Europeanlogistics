"use client";

import { useState } from "react";
import { Check, Package, Plus, X } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SHIPMENTS,
  STATUS_LABEL,
  STATUS_TONE,
  WORKFLOW_STEPS,
  type Shipment,
  type ShipmentStatus,
} from "@/lib/mock/shipments";

const FILTERS: { label: string; value: ShipmentStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Planned", value: "planned" },
  { label: "Assigned", value: "assigned" },
  { label: "In Transit", value: "in_transit" },
  { label: "Delayed", value: "delayed" },
  { label: "Delivered", value: "delivered" },
  { label: "Completed", value: "completed" },
];

export default function ShipmentManagementPage() {
  const [filter, setFilter] = useState<ShipmentStatus | "all">("all");
  const [selected, setSelected] = useState<Shipment>(SHIPMENTS[0]);
  const [showCreate, setShowCreate] = useState(false);

  const filtered = filter === "all" ? SHIPMENTS : SHIPMENTS.filter((s) => s.status === filter);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-xl font-semibold">Shipment Management</h1>
          <p className="text-sm text-white/50">
            {SHIPMENTS.length} shipments ·{" "}
            {SHIPMENTS.filter((s) => s.status === "in_transit").length} in transit ·{" "}
            {SHIPMENTS.filter((s) => s.status === "delayed").length} delayed
          </p>
        </div>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" /> Create Shipment
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              filter === f.value
                ? "border-blue-500 bg-blue-500/15 text-blue-300"
                : "border-white/10 text-white/50 hover:bg-white/5"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">ETA</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className={`cursor-pointer border-b border-white/5 last:border-0 hover:bg-white/[0.04] ${
                      selected.id === s.id ? "bg-white/[0.05]" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{s.id}</td>
                    <td className="px-4 py-3 text-white/70">{s.customer}</td>
                    <td className="px-4 py-3 text-white/70">
                      {s.origin} → {s.destination}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={STATUS_TONE[s.status]}>{STATUS_LABEL[s.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-white/50">{s.vehicle}</td>
                    <td className="px-4 py-3 text-white/50">{s.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipment {selected.id}</CardTitle>
            <Badge tone={STATUS_TONE[selected.status]}>{STATUS_LABEL[selected.status]}</Badge>
          </CardHeader>

          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15">
              <Package className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold">{selected.customer}</p>
              <p className="text-xs text-white/50">
                {selected.origin} → {selected.destination}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 text-sm">
            <DetailRow label="Distance" value={selected.distance} />
            <DetailRow label="Cargo" value={selected.cargo} />
            <DetailRow label="Weight" value={selected.weight} />
            <DetailRow label="Vehicle" value={selected.vehicle} />
            <DetailRow label="Driver" value={selected.driver} />
            <DetailRow label="Pickup Window" value={selected.pickupWindow} />
            <DetailRow label="Delivery Window" value={selected.deliveryWindow} />
            <DetailRow label="ETA" value={selected.eta} />
            <DetailRow label="Revenue" value={selected.revenue} />
          </div>
        </Card>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create Shipment</CardTitle>
              <button onClick={() => setShowCreate(false)} className="text-white/40 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </CardHeader>
            <ol className="space-y-2">
              {WORKFLOW_STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
                    {i === 0 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : i + 1}
                  </span>
                  <span className={i === 0 ? "text-white" : "text-white/50"}>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-white/40">
              Full multi-step form not yet wired up — this shows the intended workflow.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/5 py-1.5 last:border-0">
      <span className="shrink-0 text-white/60">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
