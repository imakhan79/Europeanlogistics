"use client";

import { useState } from "react";
import { AlertTriangle, Building2, Mail, Star } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CUSTOMER_KPIS,
  CUSTOMERS,
  TIER_LABEL,
  TIER_TONE,
  CUSTOMER_STATUS_LABEL,
  CUSTOMER_STATUS_TONE,
  CUSTOMER_INVOICES,
  INVOICE_STATUS_LABEL,
  INVOICE_STATUS_TONE,
  SLA_RECORDS,
  SLA_STATUS_LABEL,
  SLA_STATUS_TONE,
} from "@/lib/mock/customers";
import { SHIPMENTS, STATUS_LABEL, STATUS_TONE } from "@/lib/mock/shipments";

const TABS = ["Overview", "Customers", "Shipments", "Invoices", "SLA Performance"] as const;
type Tab = (typeof TABS)[number];

export default function CustomerPortalPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <Building2 className="h-5 w-5 text-blue-400" /> Customer Portal
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Customer accounts, shipment visibility, invoicing and SLA performance in one place.
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
            {CUSTOMER_KPIS.map((k) => (
              <Card key={k.label}>
                <p className="mb-2 text-xs text-white/50">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </Card>
            ))}
          </div>

          <Card className="p-0">
            <div className="flex items-center justify-between p-5 pb-3">
              <CardTitle>Accounts At Risk</CardTitle>
              <Badge tone="danger">
                {CUSTOMERS.filter((c) => c.status === "at_risk").length} flagged
              </Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Tier</th>
                    <th className="px-4 py-3 font-medium">SLA Compliance</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {CUSTOMERS.filter((c) => c.status !== "active").map((c) => (
                    <tr key={c.name} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3">
                        <Badge tone={TIER_TONE[c.tier]}>{TIER_LABEL[c.tier]}</Badge>
                      </td>
                      <td className="px-4 py-3 text-white/70">{c.slaCompliance.toFixed(1)}%</td>
                      <td className="px-4 py-3">
                        <Badge tone={CUSTOMER_STATUS_TONE[c.status]}>{CUSTOMER_STATUS_LABEL[c.status]}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === "Customers" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CUSTOMERS.map((c) => (
            <Card key={c.name}>
              <CardHeader>
                <CardTitle>{c.name}</CardTitle>
                <Badge tone={CUSTOMER_STATUS_TONE[c.status]}>{CUSTOMER_STATUS_LABEL[c.status]}</Badge>
              </CardHeader>
              <div className="mb-3 flex items-center gap-2">
                <Badge tone={TIER_TONE[c.tier]}>
                  <Star className="mr-1 h-3 w-3" /> {TIER_LABEL[c.tier]}
                </Badge>
                <span className="text-xs text-white/40">{c.country}</span>
              </div>
              <div className="mb-3 flex items-center gap-1.5 text-xs text-white/50">
                <Mail className="h-3 w-3" /> {c.contactName} · {c.contactEmail}
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between border-b border-white/5 py-1.5">
                  <span className="text-white/60">Active Shipments</span>
                  <span className="font-medium">{c.activeShipments}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 py-1.5">
                  <span className="text-white/60">Monthly Shipments</span>
                  <span className="font-medium">{c.monthlyShipments}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 py-1.5">
                  <span className="text-white/60">Monthly Revenue</span>
                  <span className="font-medium">€{c.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-white/60">SLA Compliance</span>
                  <span
                    className={`font-medium ${
                      c.slaCompliance >= 97 ? "text-emerald-400" : c.slaCompliance >= 90 ? "text-amber-400" : "text-red-400"
                    }`}
                  >
                    {c.slaCompliance.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "Shipments" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">ETA</th>
                  <th className="px-4 py-3 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {SHIPMENTS.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{s.id}</td>
                    <td className="px-4 py-3 text-white/70">{s.customer}</td>
                    <td className="px-4 py-3 text-white/70">
                      {s.origin} → {s.destination}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={STATUS_TONE[s.status]}>{STATUS_LABEL[s.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-white/50">{s.eta}</td>
                    <td className="px-4 py-3 text-white/70">{s.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Invoices" && (
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
                {CUSTOMER_INVOICES.map((inv) => (
                  <tr key={inv.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{inv.id}</td>
                    <td className="px-4 py-3 text-white/70">{inv.customer}</td>
                    <td className="px-4 py-3 text-white/50">{inv.issueDate}</td>
                    <td className="px-4 py-3 text-white/50">{inv.dueDate}</td>
                    <td className="px-4 py-3 text-white/70">€{inv.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge tone={INVOICE_STATUS_TONE[inv.status]}>{INVOICE_STATUS_LABEL[inv.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "SLA Performance" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Metric</th>
                  <th className="px-4 py-3 font-medium">Target</th>
                  <th className="px-4 py-3 font-medium">Actual</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {SLA_RECORDS.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{r.customer}</td>
                    <td className="px-4 py-3 text-white/70">{r.metric}</td>
                    <td className="px-4 py-3 text-white/50">{r.target}</td>
                    <td className="px-4 py-3 text-white/70">{r.actual}</td>
                    <td className="px-4 py-3">
                      <Badge tone={SLA_STATUS_TONE[r.status]}>{SLA_STATUS_LABEL[r.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab !== "Overview" && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-white/30">
          <AlertTriangle className="h-3 w-3" /> Figures are mock data pending live billing and CRM
          integration.
        </p>
      )}
    </div>
  );
}
