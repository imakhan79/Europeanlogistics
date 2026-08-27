"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DRIVERS } from "@/lib/mock/drivers";
import {
  COMPLIANCE_SCORES,
  TACHOGRAPH_VIOLATIONS,
  TACHOGRAPH_CAPABILITIES,
  CABOTAGE_RECORDS,
  POSTING_RECORDS,
} from "@/lib/mock/compliance";
import { RULES } from "@/lib/compliance/rules";
import { evaluateCategory, evaluateOne, parseHoursMinutes } from "@/lib/compliance/engine";
import type { RuleSeverity } from "@/lib/compliance/types";

const TABS = ["Overview", "Driver Hours", "Tachograph", "Cabotage", "Posting", "Rules Engine"] as const;
type Tab = (typeof TABS)[number];

const SEVERITY_TONE = { low: "default", medium: "warning", high: "danger" } as const;
const RULE_SEVERITY_TONE: Record<RuleSeverity, "default" | "warning" | "danger"> = {
  low: "default",
  medium: "warning",
  high: "danger",
  critical: "danger",
};
const DECLARATION_TONE = { filed: "success", pending: "warning", missing: "danger" } as const;
const DOCS_TONE = { complete: "success", incomplete: "warning" } as const;

export default function ComplianceOSPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <ShieldCheck className="h-5 w-5 text-blue-400" /> Compliance OS
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Driver hours, tachograph, cabotage and posting rules, backed by a versioned compliance
        rules engine.
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {COMPLIANCE_SCORES.map((s) => (
            <Card key={s.label}>
              <p className="mb-2 text-xs text-white/50">{s.label}</p>
              <p
                className={`text-2xl font-semibold ${
                  s.value >= 97 ? "text-emerald-400" : s.value >= 90 ? "text-amber-400" : "text-red-400"
                }`}
              >
                {s.value}%
              </p>
            </Card>
          ))}
        </div>
      )}

      {tab === "Driver Hours" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Driving Today</th>
                  <th className="px-4 py-3 font-medium">Remaining</th>
                  <th className="px-4 py-3 font-medium">Next Break</th>
                  <th className="px-4 py-3 font-medium">Daily Rest</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {DRIVERS.map((d) => {
                  const remainingMinutes = parseHoursMinutes(d.remainingToday);
                  const [evaluation] = evaluateCategory("driver", { remainingMinutes });
                  return (
                    <tr key={d.driverCard} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{d.name}</td>
                      <td className="px-4 py-3 text-white/70">{d.drivingToday}</td>
                      <td className="px-4 py-3 text-white/70">{d.remainingToday}</td>
                      <td className="px-4 py-3 text-white/70">{d.nextBreak}</td>
                      <td className="px-4 py-3 text-white/70">{d.dailyRest}</td>
                      <td className="px-4 py-3">
                        <Badge tone={evaluation.passed ? "success" : "warning"} title={evaluation.message}>
                          {evaluation.passed ? "SAFE" : "WARNING"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Tachograph" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <Card className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">Vehicle</th>
                    <th className="px-4 py-3 font-medium">Driver</th>
                    <th className="px-4 py-3 font-medium">Violation</th>
                    <th className="px-4 py-3 font-medium">Severity</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {TACHOGRAPH_VIOLATIONS.map((v, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{v.vehicle}</td>
                      <td className="px-4 py-3 text-white/70">{v.driver}</td>
                      <td className="px-4 py-3 text-white/70">{v.type}</td>
                      <td className="px-4 py-3">
                        <Badge tone={SEVERITY_TONE[v.severity]}>{v.severity.toUpperCase()}</Badge>
                      </td>
                      <td className="px-4 py-3 text-white/50">{v.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Capabilities</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-1.5">
              {TACHOGRAPH_CAPABILITIES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/60"
                >
                  {c}
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "Cabotage" && (
        <div className="space-y-4">
          {CABOTAGE_RECORDS.map((r) => {
            const [evaluation] = evaluateCategory("cabotage", {
              operations: r.operations,
              maxOperations: r.maxOperations,
            });
            const tone = !evaluation.passed ? "danger" : evaluation.severity === "medium" ? "warning" : "success";
            const label = !evaluation.passed ? "Violation" : evaluation.severity === "medium" ? "At Risk" : "Compliant";
            return (
            <Card key={r.vehicle}>
              <CardHeader>
                <CardTitle>
                  {r.vehicle} · {r.driver}
                </CardTitle>
                <Badge tone={tone} title={evaluation.message}>{label}</Badge>
              </CardHeader>
              <div className="mb-3 flex items-center gap-2 text-sm">
                {r.countries.map((c, i) => (
                  <span key={c} className="flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs">
                      <Check className="h-3 w-3 text-emerald-400" /> {c.toUpperCase()}
                    </span>
                    {i < r.countries.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-white/30" />}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Entry date: {r.entryDate}</span>
                <span className="text-white/60">
                  Operations: <span className="font-medium text-white">{r.operations}</span> / {r.maxOperations}
                </span>
              </div>
            </Card>
            );
          })}
        </div>
      )}

      {tab === "Posting" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Host Country</th>
                  <th className="px-4 py-3 font-medium">Operation</th>
                  <th className="px-4 py-3 font-medium">Start</th>
                  <th className="px-4 py-3 font-medium">End</th>
                  <th className="px-4 py-3 font-medium">Declaration</th>
                  <th className="px-4 py-3 font-medium">Documents</th>
                </tr>
              </thead>
              <tbody>
                {POSTING_RECORDS.map((p, i) => {
                  const declEval = evaluateOne("posting-declaration-01", { declaration: p.declaration });
                  const docsEval = evaluateOne("posting-documents-01", { documents: p.documents });
                  return (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{p.driver}</td>
                      <td className="px-4 py-3 text-white/70">{p.hostCountry}</td>
                      <td className="px-4 py-3 text-white/70">{p.operation}</td>
                      <td className="px-4 py-3 text-white/50">{p.startDate}</td>
                      <td className="px-4 py-3 text-white/50">{p.endDate}</td>
                      <td className="px-4 py-3">
                        <Badge tone={DECLARATION_TONE[p.declaration]} title={declEval?.message}>
                          {p.declaration.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={DOCS_TONE[p.documents]} title={docsEval?.message}>
                          {p.documents.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Rules Engine" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Rule</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Effective</th>
                  <th className="px-4 py-3 font-medium">Expiry</th>
                  <th className="px-4 py-3 font-medium">Version</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Severity</th>
                </tr>
              </thead>
              <tbody>
                {RULES.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-white/60">{r.category.replace("_", " ")}</td>
                    <td className="px-4 py-3 text-white/70">{r.country}</td>
                    <td className="px-4 py-3 text-white/50">{r.effectiveDate}</td>
                    <td className="px-4 py-3 text-white/50">{r.expiryDate ?? "—"}</td>
                    <td className="px-4 py-3 text-white/50">v{r.version}</td>
                    <td className="px-4 py-3 text-white/40">{r.source}</td>
                    <td className="px-4 py-3">
                      <Badge tone={RULE_SEVERITY_TONE[r.severity]}>{r.severity.toUpperCase()}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab !== "Overview" && tab !== "Rules Engine" && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-white/30">
          <AlertTriangle className="h-3 w-3" /> Status badges are computed by the compliance rules
          engine (see Rules Engine tab), not hard-coded in the UI. Underlying data is still mock,
          pending real fleet/driver telemetry and authoritative legal review.
        </p>
      )}
    </div>
  );
}
