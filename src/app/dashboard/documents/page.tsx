"use client";

import { useState } from "react";
import { AlertTriangle, FileText, History } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DOCUMENT_KPIS,
  SHIPMENT_DOCUMENTS,
  DOC_STATUS_LABEL,
  DOC_STATUS_TONE,
  DRIVER_DOCUMENTS,
  VEHICLE_DOCUMENTS,
  EXPIRY_STATUS_LABEL,
  EXPIRY_STATUS_TONE,
  DOCUMENT_ACTIVITY,
} from "@/lib/mock/documents";

const TABS = ["Overview", "Shipment Documents", "Driver Documents", "Vehicle Documents", "Recent Activity"] as const;
type Tab = (typeof TABS)[number];

export default function DocumentsPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  const attention = [
    ...SHIPMENT_DOCUMENTS.filter((d) => d.status !== "uploaded").map((d) => ({
      key: `${d.shipmentId}-${d.docType}`,
      label: `${d.shipmentId} · ${d.customer}`,
      detail: d.docType,
      status: d.status === "missing" ? "danger" : ("warning" as const),
      statusLabel: DOC_STATUS_LABEL[d.status],
    })),
    ...DRIVER_DOCUMENTS.filter((d) => d.status !== "valid").map((d) => ({
      key: `${d.driver}-${d.docType}`,
      label: d.driver,
      detail: d.docType,
      status: d.status === "expired" ? "danger" : ("warning" as const),
      statusLabel: EXPIRY_STATUS_LABEL[d.status],
    })),
    ...VEHICLE_DOCUMENTS.filter((d) => d.status !== "valid").map((d) => ({
      key: `${d.vehicle}-${d.docType}`,
      label: d.vehicle,
      detail: d.docType,
      status: d.status === "expired" ? "danger" : ("warning" as const),
      statusLabel: EXPIRY_STATUS_LABEL[d.status],
    })),
  ];

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <FileText className="h-5 w-5 text-blue-400" /> Documents
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Shipment paperwork, driver credentials and vehicle documents with expiry tracking.
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
            {DOCUMENT_KPIS.map((k) => (
              <Card key={k.label}>
                <p className="mb-2 text-xs text-white/50">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </Card>
            ))}
          </div>

          <Card className="p-0">
            <div className="flex items-center justify-between p-5 pb-3">
              <CardTitle>Needs Attention</CardTitle>
              <Badge tone="danger">{attention.length} flagged</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">Reference</th>
                    <th className="px-4 py-3 font-medium">Document</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attention.map((a) => (
                    <tr key={a.key} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{a.label}</td>
                      <td className="px-4 py-3 text-white/70">{a.detail}</td>
                      <td className="px-4 py-3">
                        <Badge tone={a.status}>{a.statusLabel}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === "Shipment Documents" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Shipment</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Document Type</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {SHIPMENT_DOCUMENTS.map((d, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{d.shipmentId}</td>
                    <td className="px-4 py-3 text-white/70">{d.customer}</td>
                    <td className="px-4 py-3 text-white/70">{d.docType}</td>
                    <td className="px-4 py-3 text-white/50">{d.date}</td>
                    <td className="px-4 py-3">
                      <Badge tone={DOC_STATUS_TONE[d.status]}>{DOC_STATUS_LABEL[d.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Driver Documents" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Document Type</th>
                  <th className="px-4 py-3 font-medium">Issued</th>
                  <th className="px-4 py-3 font-medium">Expiry</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {DRIVER_DOCUMENTS.map((d, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{d.driver}</td>
                    <td className="px-4 py-3 text-white/70">{d.docType}</td>
                    <td className="px-4 py-3 text-white/50">{d.issueDate}</td>
                    <td className="px-4 py-3 text-white/50">{d.expiryDate}</td>
                    <td className="px-4 py-3">
                      <Badge tone={EXPIRY_STATUS_TONE[d.status]}>{EXPIRY_STATUS_LABEL[d.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Vehicle Documents" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Document Type</th>
                  <th className="px-4 py-3 font-medium">Issued</th>
                  <th className="px-4 py-3 font-medium">Expiry</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {VEHICLE_DOCUMENTS.map((d, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{d.vehicle}</td>
                    <td className="px-4 py-3 text-white/70">{d.docType}</td>
                    <td className="px-4 py-3 text-white/50">{d.issueDate}</td>
                    <td className="px-4 py-3 text-white/50">{d.expiryDate}</td>
                    <td className="px-4 py-3">
                      <Badge tone={EXPIRY_STATUS_TONE[d.status]}>{EXPIRY_STATUS_LABEL[d.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Recent Activity" && (
        <div className="space-y-2">
          {DOCUMENT_ACTIVITY.map((a, i) => (
            <Card key={i} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <History className="h-4 w-4 shrink-0 text-white/30" />
                <div>
                  <p className="text-sm font-medium">
                    {a.actor} <span className="text-white/40">{a.action.toLowerCase()}</span>
                  </p>
                  <p className="text-xs text-white/50">{a.document}</p>
                </div>
              </div>
              <span className="shrink-0 text-xs text-white/40">{a.timestamp}</span>
            </Card>
          ))}
        </div>
      )}

      {tab !== "Overview" && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-white/30">
          <AlertTriangle className="h-3 w-3" /> Figures are mock data pending live document
          management system integration.
        </p>
      )}
    </div>
  );
}
