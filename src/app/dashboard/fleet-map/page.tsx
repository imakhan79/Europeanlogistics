"use client";

import { useEffect, useMemo, useState } from "react";
import { Map as MapIcon, Search } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VEHICLES, STATUS_LABEL, STATUS_TONE, type Vehicle, type VehicleStatus } from "@/lib/mock/fleet";
import { VEHICLE_ROUTE_POINTS } from "@/lib/mock/fleetMap";
import { CITY_COORDS, COUNTRY_LABELS, project, interpolate } from "@/lib/map/projection";

const STATUS_FILTERS: { label: string; value: VehicleStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "In Transit", value: "in_transit" },
  { label: "Idle", value: "idle" },
  { label: "Delayed", value: "delayed" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Offline", value: "offline" },
];

const DOT_COLOR: Record<VehicleStatus, string> = {
  in_transit: "bg-blue-400",
  idle: "bg-white/50",
  delayed: "bg-amber-400",
  maintenance: "bg-amber-400",
  offline: "bg-red-400",
};

const MOVING_STATUSES: VehicleStatus[] = ["in_transit", "delayed"];
const PROGRESS_STEP = 0.015;
const PROGRESS_CAP = 0.4;

export default function LiveFleetMapPage() {
  const [filter, setFilter] = useState<VehicleStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    const id = setInterval(() => {
      setProgress((prev) => {
        const next = { ...prev };
        for (const v of VEHICLES) {
          if (!MOVING_STATUSES.includes(v.status)) continue;
          const current = next[v.registration] ?? Math.random() * 0.1;
          next[v.registration] = Math.min(PROGRESS_CAP, current + PROGRESS_STEP);
        }
        return next;
      });
      setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const routeByRegistration = useMemo(() => {
    const map = new Map<string, (typeof VEHICLE_ROUTE_POINTS)[number]>();
    for (const r of VEHICLE_ROUTE_POINTS) map.set(r.registration, r);
    return map;
  }, []);

  function positionFor(v: Vehicle) {
    const route = routeByRegistration.get(v.registration);
    const origin = route ? CITY_COORDS[route.currentCity] : undefined;
    if (!origin) return project({ lat: 50, lon: 10 });
    const destination = route?.destinationCity ? CITY_COORDS[route.destinationCity] : undefined;
    if (destination && MOVING_STATUSES.includes(v.status)) {
      const t = progress[v.registration] ?? 0;
      return project(interpolate(origin, destination, t));
    }
    return project(origin);
  }

  const filtered = VEHICLES.filter((v) => {
    if (filter !== "all" && v.status !== filter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      if (!v.registration.toLowerCase().includes(q) && !v.driver.toLowerCase().includes(q) && !v.location.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
            <MapIcon className="h-5 w-5 text-blue-400" /> Live Fleet Map
          </h1>
          <p className="text-sm text-white/50">Real-time vehicle positions across the network.</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live · updated {lastUpdated || "—"}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
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
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/50">
          <Search className="h-3.5 w-3.5" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vehicle, driver or city..."
            className="w-56 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Card className="relative h-[560px] overflow-hidden p-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "10% 10%",
            }}
          />

          {COUNTRY_LABELS.map((c) => {
            const { x, y } = project(c);
            return (
              <span
                key={c.label}
                className="pointer-events-none absolute select-none text-xs font-semibold tracking-widest text-white/10"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              >
                {c.label}
              </span>
            );
          })}

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {filtered.map((v) => {
              const route = routeByRegistration.get(v.registration);
              if (!route?.destinationCity || !MOVING_STATUSES.includes(v.status)) return null;
              const origin = CITY_COORDS[route.currentCity];
              const destination = CITY_COORDS[route.destinationCity];
              const p1 = project(origin);
              const p2 = project(destination);
              return (
                <g key={v.registration}>
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="rgba(96,165,250,0.35)"
                    strokeWidth={0.3}
                    strokeDasharray="1.2,1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx={p2.x} cy={p2.y} r={0.6} fill="none" stroke="rgba(96,165,250,0.6)" strokeWidth={0.25} vectorEffect="non-scaling-stroke" />
                </g>
              );
            })}
          </svg>

          {filtered.map((v) => {
            const { x, y } = positionFor(v);
            const isSelected = selected?.registration === v.registration;
            return (
              <button
                key={v.registration}
                onClick={() => setSelected(v)}
                title={`${v.registration} · ${v.driver}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {v.status === "in_transit" && (
                  <span className={`absolute inset-0 -m-1.5 animate-ping rounded-full ${DOT_COLOR[v.status]} opacity-40`} />
                )}
                <span
                  className={`relative block h-3 w-3 rounded-full border-2 ${DOT_COLOR[v.status]} ${
                    isSelected ? "scale-150 border-white" : "border-[#0a0d14]"
                  } transition-transform`}
                />
              </button>
            );
          })}

          <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-lg border border-white/10 bg-[#0a0d14]/80 px-3 py-2 text-[11px] text-white/50 backdrop-blur-sm">
            {STATUS_FILTERS.slice(1).map((f) => (
              <span key={f.value} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${DOT_COLOR[f.value as VehicleStatus]}`} />
                {f.label}
              </span>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="p-0">
            <div className="p-4 pb-2">
              <CardTitle>Vehicles ({filtered.length})</CardTitle>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filtered.map((v) => (
                <button
                  key={v.registration}
                  onClick={() => setSelected(v)}
                  className={`flex w-full items-center justify-between border-t border-white/5 px-4 py-2.5 text-left text-sm hover:bg-white/[0.04] ${
                    selected?.registration === v.registration ? "bg-white/[0.05]" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${DOT_COLOR[v.status]}`} />
                    <span>
                      <span className="block font-medium">{v.registration}</span>
                      <span className="block text-xs text-white/40">{v.driver}</span>
                    </span>
                  </span>
                  <Badge tone={STATUS_TONE[v.status]}>{STATUS_LABEL[v.status]}</Badge>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-white/30">No vehicles match.</p>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{selected ? "Vehicle Detail" : "Select a Vehicle"}</CardTitle>
              {selected && <Badge tone={STATUS_TONE[selected.status]}>{STATUS_LABEL[selected.status]}</Badge>}
            </CardHeader>
            {selected ? (
              <div className="space-y-1.5 text-sm">
                <DetailRow label="Registration" value={selected.registration} />
                <DetailRow label="Model" value={selected.makeModel} />
                <DetailRow label="Driver" value={selected.driver} />
                <DetailRow label="Location" value={selected.location} />
                <DetailRow label="Route" value={selected.route} />
                <DetailRow label="ETA" value={selected.eta} />
                <DetailRow label="Speed" value={selected.speed} />
                <DetailRow label="Fuel" value={`${selected.fuel}%`} />
              </div>
            ) : (
              <p className="py-6 text-center text-xs text-white/30">
                Click a marker on the map or a row in the list to see details.
              </p>
            )}
          </Card>
        </div>
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
