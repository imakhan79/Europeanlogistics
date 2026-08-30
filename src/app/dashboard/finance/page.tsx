"use client";

import { useState } from "react";
import { AlertTriangle, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FINANCE_KPIS,
  MONTHLY_PNL,
  COST_BREAKDOWN,
  RECEIVABLES,
  RECEIVABLE_STATUS_LABEL,
  RECEIVABLE_STATUS_TONE,
  PAYABLES,
  PAYABLE_STATUS_LABEL,
  PAYABLE_STATUS_TONE,
  ROUTE_PROFITABILITY,
} from "@/lib/mock/finance";

const TABS = ["Overview", "Revenue & Costs", "Receivables", "Payables", "Route Profitability"] as const;
type Tab = (typeof TABS)[number];

export default function FinancePage() {
  const [tab, setTab] = useState<Tab>("Overview");

  const overdueReceivables = RECEIVABLES.filter((r) => r.status === "overdue");
  const overduePayables = PAYABLES.filter((p) => p.status === "overdue");

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <Wallet className="h-5 w-5 text-blue-400" /> Finance
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Revenue, costs, receivables, payables and route-level profitability across the fleet.
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
            {FINANCE_KPIS.map((k) => (
              <Card key={k.label}>
                <p className="mb-2 text-xs text-white/50">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-0">
              <div className="flex items-center justify-between p-5 pb-3">
                <CardTitle>Overdue Receivables</CardTitle>
                <Badge tone="danger">{overdueReceivables.length}</Badge>
              </div>
              <div className="space-y-2 px-5 pb-5">
                {overdueReceivables.map((r) => (
                  <div key={r.id} className="flex items-center justify-between border-b border-white/5 py-1.5 text-sm last:border-0">
                    <span className="text-white/70">{r.customer}</span>
                    <span className="font-medium text-red-400">€{r.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-0">
              <div className="flex items-center justify-between p-5 pb-3">
                <CardTitle>Overdue Payables</CardTitle>
                <Badge tone="danger">{overduePayables.length}</Badge>
              </div>
              <div className="space-y-2 px-5 pb-5">
                {overduePayables.map((p) => (
                  <div key={p.id} className="flex items-center justify-between border-b border-white/5 py-1.5 text-sm last:border-0">
                    <span className="text-white/70">{p.vendor}</span>
                    <span className="font-medium text-red-400">€{p.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "Revenue & Costs" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <Card className="p-0">
            <div className="p-5 pb-3">
              <CardTitle>Revenue vs. Costs (Last 6 Months)</CardTitle>
            </div>
            <div className="space-y-3 px-5 pb-5">
              {MONTHLY_PNL.map((m) => {
                const maxVal = Math.max(...MONTHLY_PNL.map((x) => x.revenue));
                const revenuePct = Math.round((m.revenue / maxVal) * 100);
                const costPct = Math.round((m.costs / maxVal) * 100);
                const profit = m.revenue - m.costs;
                return (
                  <div key={m.month}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-white/70">{m.month}</span>
                      <span className="text-white/50">
                        €{m.revenue.toLocaleString()} rev · €{m.costs.toLocaleString()} cost ·{" "}
                        <span className="text-emerald-400">€{profit.toLocaleString()} profit</span>
                      </span>
                    </div>
                    <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${revenuePct}%` }} />
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-white/25" style={{ width: `${costPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown (MTD)</CardTitle>
            </CardHeader>
            <div className="space-y-2.5">
              {COST_BREAKDOWN.map((c) => (
                <div key={c.category}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-white/70">{c.category}</span>
                    <span className="text-white/50">
                      €{c.amount.toLocaleString()} · {c.pctOfTotal}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${c.pctOfTotal}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "Receivables" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Invoice</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Issued</th>
                  <th className="px-4 py-3 font-medium">Due</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECEIVABLES.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{r.id}</td>
                    <td className="px-4 py-3 text-white/70">{r.customer}</td>
                    <td className="px-4 py-3 text-white/50">{r.issueDate}</td>
                    <td className="px-4 py-3 text-white/50">{r.dueDate}</td>
                    <td className="px-4 py-3 text-white/70">€{r.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge tone={RECEIVABLE_STATUS_TONE[r.status]}>{RECEIVABLE_STATUS_LABEL[r.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Payables" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Bill</th>
                  <th className="px-4 py-3 font-medium">Vendor</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Issued</th>
                  <th className="px-4 py-3 font-medium">Due</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {PAYABLES.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{p.id}</td>
                    <td className="px-4 py-3 text-white/70">{p.vendor}</td>
                    <td className="px-4 py-3 text-white/50">{p.category}</td>
                    <td className="px-4 py-3 text-white/50">{p.issueDate}</td>
                    <td className="px-4 py-3 text-white/50">{p.dueDate}</td>
                    <td className="px-4 py-3 text-white/70">€{p.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge tone={PAYABLE_STATUS_TONE[p.status]}>{PAYABLE_STATUS_LABEL[p.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Route Profitability" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium">Shipments</th>
                  <th className="px-4 py-3 font-medium">Revenue</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                  <th className="px-4 py-3 font-medium">Margin</th>
                </tr>
              </thead>
              <tbody>
                {ROUTE_PROFITABILITY.map((r) => {
                  const profit = r.revenue - r.cost;
                  const marginPct = (profit / r.revenue) * 100;
                  return (
                    <tr key={r.route} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{r.route}</td>
                      <td className="px-4 py-3 text-white/70">{r.shipments}</td>
                      <td className="px-4 py-3 text-white/70">€{r.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3 text-white/50">€{r.cost.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`flex items-center gap-1 font-medium ${
                            marginPct >= 20 ? "text-emerald-400" : marginPct >= 10 ? "text-amber-400" : "text-red-400"
                          }`}
                        >
                          {marginPct >= 15 ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                          )}
                          {marginPct.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab !== "Overview" && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-white/30">
          <AlertTriangle className="h-3 w-3" /> Figures are mock data pending live accounting system
          integration.
        </p>
      )}
    </div>
  );
}
