"use client";

import { useState } from "react";
import { AlertTriangle, CreditCard, Fuel, Gauge, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FUEL_KPIS,
  FUEL_CARDS,
  FUEL_CARD_STATUS_LABEL,
  FUEL_CARD_STATUS_TONE,
  FUEL_TRANSACTIONS,
  CONSUMPTION_RECORDS,
  COUNTRY_PRICES,
  FUEL_ALERTS,
  FUEL_ALERT_TONE,
} from "@/lib/mock/fuel";

const TABS = ["Overview", "Consumption", "Fuel Cards", "Transactions", "Price Intelligence"] as const;
type Tab = (typeof TABS)[number];

export default function FuelManagementPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <Fuel className="h-5 w-5 text-blue-400" /> Fuel Management
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Fleet fuel spend, consumption benchmarking, fuel cards and price intelligence across the network.
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
            {FUEL_KPIS.map((k) => (
              <Card key={k.label}>
                <p className="mb-2 text-xs text-white/50">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </Card>
            ))}
          </div>

          <Card className="p-0">
            <div className="flex items-center justify-between p-5 pb-3">
              <CardTitle>Active Fuel Alerts</CardTitle>
              <Badge tone="danger">{FUEL_ALERTS.length} flagged</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">Vehicle</th>
                    <th className="px-4 py-3 font-medium">Driver</th>
                    <th className="px-4 py-3 font-medium">Alert</th>
                    <th className="px-4 py-3 font-medium">Detail</th>
                    <th className="px-4 py-3 font-medium">Severity</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {FUEL_ALERTS.map((a, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{a.vehicle}</td>
                      <td className="px-4 py-3 text-white/70">{a.driver}</td>
                      <td className="px-4 py-3 text-white/70">{a.type}</td>
                      <td className="px-4 py-3 text-white/50">{a.detail}</td>
                      <td className="px-4 py-3">
                        <Badge tone={FUEL_ALERT_TONE[a.severity]}>{a.severity.toUpperCase()}</Badge>
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

      {tab === "Consumption" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Avg. Consumption</th>
                  <th className="px-4 py-3 font-medium">Target</th>
                  <th className="px-4 py-3 font-medium">Distance</th>
                  <th className="px-4 py-3 font-medium">Litres Used</th>
                  <th className="px-4 py-3 font-medium">Variance</th>
                </tr>
              </thead>
              <tbody>
                {CONSUMPTION_RECORDS.map((c) => (
                  <tr key={c.vehicle} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{c.vehicle}</td>
                    <td className="px-4 py-3 text-white/70">{c.driver}</td>
                    <td className="px-4 py-3 text-white/70">{c.avgConsumption.toFixed(1)} L/100km</td>
                    <td className="px-4 py-3 text-white/50">{c.targetConsumption.toFixed(1)} L/100km</td>
                    <td className="px-4 py-3 text-white/70">{c.distanceKm.toLocaleString()} km</td>
                    <td className="px-4 py-3 text-white/70">{c.litresUsed.toLocaleString()} L</td>
                    <td className="px-4 py-3">
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          c.variancePct > 5
                            ? "text-red-400"
                            : c.variancePct > 0
                              ? "text-amber-400"
                              : "text-emerald-400"
                        }`}
                      >
                        {c.variancePct > 0 ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" />
                        )}
                        {c.variancePct > 0 ? "+" : ""}
                        {c.variancePct.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Fuel Cards" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUEL_CARDS.map((c) => {
            const utilisation = Math.min(100, Math.round((c.spentThisMonth / c.monthlyLimit) * 100));
            return (
              <Card key={c.cardNumber}>
                <CardHeader>
                  <CardTitle>
                    <span className="flex items-center gap-1.5 text-white/80">
                      <CreditCard className="h-3.5 w-3.5 text-blue-400" /> {c.provider}
                    </span>
                  </CardTitle>
                  <Badge tone={FUEL_CARD_STATUS_TONE[c.status]}>{FUEL_CARD_STATUS_LABEL[c.status]}</Badge>
                </CardHeader>
                <p className="mb-3 font-mono text-sm text-white/60">{c.cardNumber}</p>
                <div className="mb-3 space-y-1.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Vehicle</span>
                    <span className="font-medium">{c.vehicle}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Driver</span>
                    <span className="font-medium">{c.driver}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Expiry</span>
                    <span className="font-medium">{c.expiry}</span>
                  </div>
                </div>
                <div className="mb-1 flex items-center justify-between text-xs text-white/50">
                  <span>
                    €{c.spentThisMonth.toLocaleString()} / €{c.monthlyLimit.toLocaleString()}
                  </span>
                  <span>{utilisation}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      utilisation >= 100 ? "bg-red-500" : utilisation >= 85 ? "bg-amber-400" : "bg-blue-500"
                    }`}
                    style={{ width: `${utilisation}%` }}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "Transactions" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Station</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Litres</th>
                  <th className="px-4 py-3 font-medium">Price/L</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {FUEL_TRANSACTIONS.map((t) => (
                  <tr key={t.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{t.id}</td>
                    <td className="px-4 py-3 text-white/50">{t.date}</td>
                    <td className="px-4 py-3 text-white/70">{t.vehicle}</td>
                    <td className="px-4 py-3 text-white/70">{t.driver}</td>
                    <td className="px-4 py-3 text-white/70">{t.station}</td>
                    <td className="px-4 py-3 text-white/50">{t.country}</td>
                    <td className="px-4 py-3 text-white/70">{t.litres} L</td>
                    <td className="px-4 py-3 text-white/50">€{t.pricePerLitre.toFixed(2)}</td>
                    <td className="px-4 py-3 font-medium">€{t.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Price Intelligence" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTRY_PRICES.map((p) => (
            <Card key={p.code}>
              <CardHeader>
                <CardTitle>
                  {p.country} <span className="text-white/30">({p.code})</span>
                </CardTitle>
                <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/60">
                  <Gauge className="h-3 w-3" />
                </span>
              </CardHeader>
              <p className="text-2xl font-semibold">€{p.pricePerLitre.toFixed(2)}</p>
              <p className="mb-1 text-xs text-white/40">per litre, diesel</p>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  p.weeklyChangePct > 0 ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {p.weeklyChangePct > 0 ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {p.weeklyChangePct > 0 ? "+" : ""}
                {p.weeklyChangePct.toFixed(1)}% this week
              </span>
            </Card>
          ))}
        </div>
      )}

      {tab !== "Overview" && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-white/30">
          <AlertTriangle className="h-3 w-3" /> Figures are mock data pending live fuel card and telematics
          feed integration.
        </p>
      )}
    </div>
  );
}
