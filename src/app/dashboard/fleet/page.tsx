"use client";

import { useState } from "react";
import { Fuel, Gauge, MapPin, ShieldCheck, Truck } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VEHICLES, STATUS_LABEL, STATUS_TONE, type Vehicle } from "@/lib/mock/fleet";

const COMPLIANCE_LABEL: Record<Vehicle["compliance"], string> = {
  low: "LOW RISK",
  medium: "MEDIUM RISK",
  high: "HIGH RISK",
};

const COMPLIANCE_TONE: Record<Vehicle["compliance"], "info" | "warning" | "danger"> = {
  low: "info",
  medium: "warning",
  high: "danger",
};

const STATUS_FILTERS: { label: string; value: Vehicle["status"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "In Transit", value: "in_transit" },
  { label: "Idle", value: "idle" },
  { label: "Delayed", value: "delayed" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Offline", value: "offline" },
];

export default function FleetManagementPage() {
  const [filter, setFilter] = useState<Vehicle["status"] | "all">("all");
  const [selected, setSelected] = useState<Vehicle>(VEHICLES[0]);

  const filtered = filter === "all" ? VEHICLES : VEHICLES.filter((v) => v.status === filter);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-xl font-semibold">Fleet Management</h1>
          <p className="text-sm text-white/50">
            {VEHICLES.length} vehicles · {VEHICLES.filter((v) => v.status === "in_transit").length} in transit
          </p>
        </div>
        <div className="flex gap-1.5">
          {STATUS_FILTERS.map((f) => (
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
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Registration</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Route</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr
                    key={v.registration}
                    onClick={() => setSelected(v)}
                    className={`cursor-pointer border-b border-white/5 last:border-0 hover:bg-white/[0.04] ${
                      selected.registration === v.registration ? "bg-white/[0.05]" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{v.registration}</td>
                    <td className="px-4 py-3 text-white/70">{v.makeModel}</td>
                    <td className="px-4 py-3 text-white/70">{v.driver}</td>
                    <td className="px-4 py-3 text-white/70">{v.location}</td>
                    <td className="px-4 py-3">
                      <Badge tone={STATUS_TONE[v.status]}>{STATUS_LABEL[v.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-white/50">{v.route}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Profile</CardTitle>
            <Badge tone={STATUS_TONE[selected.status]}>{STATUS_LABEL[selected.status]}</Badge>
          </CardHeader>

          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15">
              <Truck className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold">{selected.registration}</p>
              <p className="text-xs text-white/50">{selected.makeModel}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <DetailRow label="Euro Class" value={selected.euroClass} />
            <DetailRow label="Weight" value={selected.weight} />
            <DetailRow label="Driver" value={selected.driver} />
            <DetailRow label="Route" value={selected.route} />
            <DetailRow label="ETA" value={selected.eta} />

            <div className="flex items-center justify-between border-b border-white/5 py-1.5">
              <span className="flex items-center gap-1.5 text-white/60">
                <Gauge className="h-3.5 w-3.5" /> Speed
              </span>
              <span className="font-medium">{selected.speed}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 py-1.5">
              <span className="flex items-center gap-1.5 text-white/60">
                <MapPin className="h-3.5 w-3.5" /> Location
              </span>
              <span className="font-medium">{selected.location}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 py-1.5">
              <span className="flex items-center gap-1.5 text-white/60">
                <Fuel className="h-3.5 w-3.5" /> Fuel
              </span>
              <span className="font-medium">{selected.fuel}%</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="flex items-center gap-1.5 text-white/60">
                <ShieldCheck className="h-3.5 w-3.5" /> Compliance
              </span>
              <Badge tone={COMPLIANCE_TONE[selected.compliance]}>
                {COMPLIANCE_LABEL[selected.compliance]}
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-1.5">
      <span className="text-white/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
