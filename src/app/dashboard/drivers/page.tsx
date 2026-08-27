"use client";

import { useState } from "react";
import { BadgeCheck, Clock, FileText, TrendingUp, User } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DRIVERS, STATUS_LABEL, STATUS_TONE, DOCS_TONE, type Driver } from "@/lib/mock/drivers";

const STATUS_FILTERS: { label: string; value: Driver["status"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Driving", value: "driving" },
  { label: "Resting", value: "resting" },
  { label: "On Break", value: "on_break" },
  { label: "Off Duty", value: "off_duty" },
];

export default function DriverManagementPage() {
  const [filter, setFilter] = useState<Driver["status"] | "all">("all");
  const [selected, setSelected] = useState<Driver>(DRIVERS[0]);

  const filtered = filter === "all" ? DRIVERS : DRIVERS.filter((d) => d.status === filter);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-xl font-semibold">Driver Management</h1>
          <p className="text-sm text-white/50">
            {DRIVERS.length} drivers · {DRIVERS.filter((d) => d.status === "driving").length} currently driving
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

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Driving Today</th>
                  <th className="px-4 py-3 font-medium">Compliance</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr
                    key={d.driverCard}
                    onClick={() => setSelected(d)}
                    className={`cursor-pointer border-b border-white/5 last:border-0 hover:bg-white/[0.04] ${
                      selected.driverCard === d.driverCard ? "bg-white/[0.05]" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{d.name}</td>
                    <td className="px-4 py-3 text-white/70">{d.country}</td>
                    <td className="px-4 py-3 text-white/70">{d.assignedVehicle}</td>
                    <td className="px-4 py-3">
                      <Badge tone={STATUS_TONE[d.status]}>{STATUS_LABEL[d.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-white/70">{d.drivingToday}</td>
                    <td className="px-4 py-3 text-white/70">{d.compliance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Driver Profile</CardTitle>
            <Badge tone={STATUS_TONE[selected.status]}>{STATUS_LABEL[selected.status]}</Badge>
          </CardHeader>

          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15">
              <User className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold">{selected.name}</p>
              <p className="text-xs text-white/50">{selected.country} · License {selected.license}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <DetailRow label="Driver Card" value={selected.driverCard} />
            <DetailRow label="Assigned Vehicle" value={selected.assignedVehicle} />
            <DetailRow label="Trips Completed" value={String(selected.trips)} />

            <div className="border-t border-white/5 pt-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/30">
                <Clock className="h-3 w-3" /> Hours
              </p>
              <DetailRow label="Driving Today" value={selected.drivingToday} />
              <DetailRow label="Remaining" value={selected.remainingToday} />
              <DetailRow label="Next Break" value={selected.nextBreak} />
              <DetailRow label="Daily Rest" value={selected.dailyRest} />
            </div>

            <div className="border-t border-white/5 pt-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/30">
                <TrendingUp className="h-3 w-3" /> Performance
              </p>
              <DetailRow label="On-Time %" value={`${selected.onTimePct}%`} />
              <div className="flex items-center justify-between py-1.5">
                <span className="flex items-center gap-1.5 text-white/60">
                  <BadgeCheck className="h-3.5 w-3.5" /> Compliance
                </span>
                <span className="font-medium">{selected.compliance}%</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="flex items-center gap-1.5 text-white/60">
                  <FileText className="h-3.5 w-3.5" /> Documents
                </span>
                <Badge tone={DOCS_TONE[selected.documentsStatus]}>
                  {selected.documentsStatus.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-1.5 last:border-0">
      <span className="text-white/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
