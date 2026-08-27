"use client";

import { useState } from "react";
import { Check, MapPin, Plus, Sparkles, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VEHICLES } from "@/lib/mock/fleet";
import { DRIVERS } from "@/lib/mock/drivers";

type Comparison = {
  label: string;
  distance: string;
  time: string;
  fuel: string;
  toll: string;
  driver: string;
  total: string;
  highlight?: boolean;
};

const COMPARISON: Comparison[] = [
  { label: "Fastest", distance: "1,160 km", time: "12h 58m", fuel: "€420", toll: "€280", driver: "€250", total: "€950" },
  { label: "Cheapest", distance: "1,270 km", time: "14h 22m", fuel: "€415", toll: "€120", driver: "€290", total: "€825" },
  { label: "AI Optimal", distance: "1,188 km", time: "13h 42m", fuel: "€386", toll: "€214", driver: "€242", total: "€842", highlight: true },
];

const VALIDATION_CHECKS = ["Traffic", "Tolls", "Driver Hours", "Truck Restrictions", "Delivery Window"];

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-blue-500";
const labelClass = "mb-1 block text-xs text-white/60";

export default function RoutePlannerPage() {
  const [pickup, setPickup] = useState("Berlin, DE");
  const [delivery, setDelivery] = useState("Milan, IT");
  const [stops, setStops] = useState<string[]>([]);
  const [cargo, setCargo] = useState("Machine parts, 18 pallets");
  const [weight, setWeight] = useState("12.4t");
  const [volume, setVolume] = useState("34 m³");
  const [vehicle, setVehicle] = useState(VEHICLES[0].registration);
  const [driver, setDriver] = useState(DRIVERS[0].name);
  const [deliveryWindow, setDeliveryWindow] = useState("Today 18:00–20:00");
  const [calculated, setCalculated] = useState(false);
  const [calculating, setCalculating] = useState(false);

  function addStop() {
    setStops((s) => [...s, ""]);
  }

  function updateStop(i: number, value: string) {
    setStops((s) => s.map((st, idx) => (idx === i ? value : st)));
  }

  function removeStop(i: number) {
    setStops((s) => s.filter((_, idx) => idx !== i));
  }

  function calculate() {
    setCalculating(true);
    setCalculated(false);
    setTimeout(() => {
      setCalculating(false);
      setCalculated(true);
    }, 900);
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold">Route Planner</h1>
      <p className="mb-6 text-sm text-white/50">
        Plan a route, add stops, and let AI compare fastest, cheapest and optimal options.
      </p>

      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Route Inputs</CardTitle>
          </CardHeader>

          <div className="space-y-3">
            <div>
              <label className={labelClass}>Pickup</label>
              <input value={pickup} onChange={(e) => setPickup(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Delivery</label>
              <input value={delivery} onChange={(e) => setDelivery(e.target.value)} className={inputClass} />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className={labelClass}>Stops</label>
                <button
                  type="button"
                  onClick={addStop}
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                >
                  <Plus className="h-3 w-3" /> Add stop
                </button>
              </div>
              <div className="space-y-2">
                {stops.map((stop, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-white/30" />
                    <input
                      value={stop}
                      onChange={(e) => updateStop(i, e.target.value)}
                      placeholder={`Stop ${i + 1}`}
                      className={inputClass}
                    />
                    <button onClick={() => removeStop(i)} className="text-white/30 hover:text-red-400">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {stops.length === 0 && (
                  <p className="text-xs text-white/30">Direct route, no intermediate stops.</p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>Cargo</label>
              <input value={cargo} onChange={(e) => setCargo(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Weight</label>
                <input value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Volume</label>
                <input value={volume} onChange={(e) => setVolume(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Vehicle</label>
                <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={inputClass}>
                  {VEHICLES.map((v) => (
                    <option key={v.registration} value={v.registration}>
                      {v.registration}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Driver</label>
                <select value={driver} onChange={(e) => setDriver(e.target.value)} className={inputClass}>
                  {DRIVERS.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Delivery Window</label>
              <input
                value={deliveryWindow}
                onChange={(e) => setDeliveryWindow(e.target.value)}
                className={inputClass}
              />
            </div>

            <Button className="w-full" onClick={calculate} disabled={calculating}>
              <Sparkles className="h-4 w-4" />
              {calculating ? "Calculating..." : "Calculate AI Route"}
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Comparison</CardTitle>
              {calculated && <Badge tone="info">AI Optimal recommended</Badge>}
            </CardHeader>

            {!calculated ? (
              <p className="py-8 text-center text-sm text-white/40">
                Fill in the route inputs and click Calculate AI Route to compare options.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-xs text-white/40">
                      <th className="py-2 pr-4 font-medium"></th>
                      <th className="py-2 pr-4 font-medium">Distance</th>
                      <th className="py-2 pr-4 font-medium">Time</th>
                      <th className="py-2 pr-4 font-medium">Fuel</th>
                      <th className="py-2 pr-4 font-medium">Toll</th>
                      <th className="py-2 pr-4 font-medium">Driver</th>
                      <th className="py-2 pr-0 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr
                        key={row.label}
                        className={`border-b border-white/5 last:border-0 ${
                          row.highlight ? "bg-blue-500/[0.06]" : ""
                        }`}
                      >
                        <td className="py-2.5 pr-4 font-medium">
                          {row.highlight ? (
                            <span className="flex items-center gap-1.5 text-blue-300">
                              <Sparkles className="h-3.5 w-3.5" /> {row.label}
                            </span>
                          ) : (
                            row.label
                          )}
                        </td>
                        <td className="py-2.5 pr-4 text-white/70">{row.distance}</td>
                        <td className="py-2.5 pr-4 text-white/70">{row.time}</td>
                        <td className="py-2.5 pr-4 text-white/70">{row.fuel}</td>
                        <td className="py-2.5 pr-4 text-white/70">{row.toll}</td>
                        <td className="py-2.5 pr-4 text-white/70">{row.driver}</td>
                        <td className={`py-2.5 pr-0 font-semibold ${row.highlight ? "text-blue-300" : ""}`}>
                          {row.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {calculated && (
            <Card>
              <CardHeader>
                <CardTitle>AI Validation</CardTitle>
              </CardHeader>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {VALIDATION_CHECKS.map((check) => (
                  <div
                    key={check}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {check}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-white/60">
                Recommended route: <span className="font-medium text-white">{pickup} → {delivery}</span>{" "}
                {stops.filter(Boolean).length > 0 && `via ${stops.filter(Boolean).join(", ")} `}
                — 1,188 km, 13h 42m, estimated cost €842, potential saving €126 vs. fastest option.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
