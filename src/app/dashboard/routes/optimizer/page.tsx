"use client";

import { useState } from "react";
import { ArrowRight, Boxes, Check, Clock, Fuel, GripVertical, Route, Sparkles, Timer } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Stop = { type: "Warehouse" | "Pickup" | "Delivery"; label: string };

const INPUT_STOPS: Stop[] = [
  { type: "Warehouse", label: "Warehouse — Berlin" },
  { type: "Pickup", label: "Pickup A — Leipzig" },
  { type: "Pickup", label: "Pickup B — Nuremberg" },
  { type: "Pickup", label: "Pickup C — Munich" },
  { type: "Delivery", label: "Delivery A — Verona" },
  { type: "Delivery", label: "Delivery B — Milan" },
  { type: "Warehouse", label: "Warehouse — Berlin" },
];

const OPTIMIZED_STOPS: Stop[] = [
  { type: "Warehouse", label: "Warehouse — Berlin" },
  { type: "Pickup", label: "Pickup A — Leipzig" },
  { type: "Pickup", label: "Pickup C — Munich" },
  { type: "Pickup", label: "Pickup B — Nuremberg" },
  { type: "Delivery", label: "Delivery B — Milan" },
  { type: "Delivery", label: "Delivery A — Verona" },
  { type: "Warehouse", label: "Warehouse — Berlin" },
];

const TYPE_TONE: Record<Stop["type"], "default" | "info" | "success"> = {
  Warehouse: "default",
  Pickup: "info",
  Delivery: "success",
};

const FACTORS = [
  { label: "Sequence", icon: Route },
  { label: "Capacity", icon: Boxes },
  { label: "Time Windows", icon: Clock },
  { label: "Distance", icon: ArrowRight },
  { label: "Fuel", icon: Fuel },
  { label: "Driver Hours", icon: Timer },
];

export default function AIRouteOptimizerPage() {
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);

  function runOptimization() {
    setOptimizing(true);
    setOptimized(false);
    setTimeout(() => {
      setOptimizing(false);
      setOptimized(true);
    }, 1100);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="h-5 w-5 text-blue-400" /> AI Route Optimizer
          </h1>
          <p className="text-sm text-white/50">
            Multi-stop sequencing across warehouses, pickups and deliveries.
          </p>
        </div>
        <Button onClick={runOptimization} disabled={optimizing}>
          <Sparkles className="h-4 w-4" />
          {optimizing ? "Optimizing..." : optimized ? "Re-run Optimization" : "Optimize Route"}
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Order</CardTitle>
            <span className="text-xs text-white/40">Berlin → Milan corridor</span>
          </CardHeader>
          <ol className="space-y-1.5">
            {INPUT_STOPS.map((s, i) => (
              <StopRow key={i} index={i} stop={s} />
            ))}
          </ol>
        </Card>

        <Card className={optimized ? "border-blue-500/30 bg-blue-500/[0.04]" : ""}>
          <CardHeader>
            <CardTitle>{optimized ? "AI Optimized Sequence" : "Optimized Sequence"}</CardTitle>
            {optimized && <Badge tone="info">−152 km</Badge>}
          </CardHeader>
          {!optimized ? (
            <p className="py-10 text-center text-sm text-white/40">
              Click Optimize Route to compute the best stop sequence.
            </p>
          ) : (
            <ol className="space-y-1.5">
              {OPTIMIZED_STOPS.map((s, i) => (
                <StopRow key={i} index={i} stop={s} />
              ))}
            </ol>
          )}
        </Card>
      </div>

      {optimized && (
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Factors</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {FACTORS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <f.icon className="h-3.5 w-3.5 shrink-0 text-white/40" />
                  {f.label}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Route</CardTitle>
            </CardHeader>
            <div className="space-y-1.5 text-sm">
              <MetricRow label="Distance" before="1,340 km" after="1,188 km" />
              <MetricRow label="Time" before="15h 20m" after="13h 42m" />
              <MetricRow label="Estimated Cost" before="€968" after="€842" />
            </div>
            <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-center text-sm font-medium text-emerald-400">
              Potential Saving €126 · 1h 38m · 152 km
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function StopRow({ index, stop }: { index: number; stop: Stop }) {
  return (
    <li className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm">
      <GripVertical className="h-3.5 w-3.5 shrink-0 text-white/20" />
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px]">
        {index + 1}
      </span>
      <Badge tone={TYPE_TONE[stop.type]} className="shrink-0">
        {stop.type}
      </Badge>
      <span className="truncate text-white/80">{stop.label}</span>
    </li>
  );
}

function MetricRow({ label, before, after }: { label: string; before: string; after: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-1.5 last:border-0">
      <span className="text-white/60">{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-white/40 line-through">{before}</span>
        <ArrowRight className="h-3 w-3 text-white/30" />
        <span className="font-medium text-blue-300">{after}</span>
      </span>
    </div>
  );
}
