"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Workflow,
  Kanban,
  ShieldCheck,
  Fuel,
  Wrench,
  Wallet,
  FileText,
  Building2,
  Route,
  Play,
  History,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AGENT_DEFINITIONS, type AgentCategory, type AgentStatus } from "@/lib/agents/definitions";
import { AGENT_KPIS, CATEGORY_TONE, SEED_RUNS, type SeedRun } from "@/lib/mock/agents";

const TABS = ["Overview", "Agents", "Activity Log"] as const;
type Tab = (typeof TABS)[number];

const CATEGORY_ICON: Record<AgentCategory, LucideIcon> = {
  Dispatch: Kanban,
  Compliance: ShieldCheck,
  Fuel: Fuel,
  Maintenance: Wrench,
  Finance: Wallet,
  Documents: FileText,
  Customers: Building2,
  Routing: Route,
};

const CATEGORIES: (AgentCategory | "All")[] = [
  "All",
  "Dispatch",
  "Compliance",
  "Fuel",
  "Maintenance",
  "Finance",
  "Documents",
  "Customers",
  "Routing",
];

function nowLabel(): string {
  return new Date().toLocaleString([], { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).replace(",", "");
}

export default function AgentsPage() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [statuses, setStatuses] = useState<Record<string, AgentStatus>>(
    () => Object.fromEntries(AGENT_DEFINITIONS.map((a) => [a.id, a.defaultStatus])),
  );
  const [runCounts, setRunCounts] = useState<Record<string, number>>({});
  const [lastRuns, setLastRuns] = useState<Record<string, string>>({});
  const [runningId, setRunningId] = useState<string | null>(null);
  const [runs, setRuns] = useState<SeedRun[]>(SEED_RUNS);
  const [categoryFilter, setCategoryFilter] = useState<AgentCategory | "All">("All");

  function toggleStatus(id: string) {
    setStatuses((prev) => ({ ...prev, [id]: prev[id] === "active" ? "paused" : "active" }));
  }

  function runAgent(id: string) {
    const agent = AGENT_DEFINITIONS.find((a) => a.id === id);
    if (!agent || runningId) return;
    setRunningId(id);
    setTimeout(() => {
      const result = agent.run();
      const entry: SeedRun = {
        agentId: agent.id,
        agentName: agent.name,
        category: agent.category,
        summary: result.summary,
        status: result.status,
        timestamp: nowLabel(),
      };
      setRuns((prev) => [entry, ...prev]);
      setRunCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
      setLastRuns((prev) => ({ ...prev, [id]: entry.timestamp }));
      setRunningId(null);
    }, 900);
  }

  const filteredAgents =
    categoryFilter === "All" ? AGENT_DEFINITIONS : AGENT_DEFINITIONS.filter((a) => a.category === categoryFilter);

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <Workflow className="h-5 w-5 text-blue-400" /> AI Agents & Workflows
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Autonomous agents that watch the platform&apos;s live data and automate recurring
        operational work.
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
            {AGENT_KPIS.map((k) => (
              <Card key={k.label}>
                <p className="mb-2 text-xs text-white/50">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </Card>
            ))}
          </div>

          <Card className="p-0">
            <div className="flex items-center justify-between p-5 pb-3">
              <CardTitle>Recent Agent Activity</CardTitle>
              <button
                onClick={() => setTab("Activity Log")}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
              >
                View all <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {runs.slice(0, 5).map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Badge tone={CATEGORY_TONE[r.category]}>{r.category}</Badge>
                    <span className="font-medium">{r.agentName}</span>
                    <span className="text-white/50">{r.summary}</span>
                  </div>
                  <span className="shrink-0 text-xs text-white/30">{r.timestamp}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "Agents" && (
        <div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  categoryFilter === c
                    ? "border-blue-500 bg-blue-500/15 text-blue-300"
                    : "border-white/10 text-white/50 hover:bg-white/5"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => {
              const Icon = CATEGORY_ICON[agent.category];
              const status = statuses[agent.id];
              const isRunning = runningId === agent.id;
              const runCount = runCounts[agent.id] ?? 0;
              const lastRun = lastRuns[agent.id];
              return (
                <Card key={agent.id}>
                  <CardHeader>
                    <CardTitle>
                      <span className="flex items-center gap-1.5 text-white/80">
                        <Icon className="h-3.5 w-3.5 text-blue-400" /> {agent.name}
                      </span>
                    </CardTitle>
                    <Badge tone={status === "active" ? "success" : "default"}>
                      {status === "active" ? "Active" : "Paused"}
                    </Badge>
                  </CardHeader>
                  <p className="mb-3 text-xs text-white/40">{agent.category} · {agent.trigger}</p>
                  <p className="mb-4 text-sm text-white/60">{agent.description}</p>
                  <div className="mb-4 flex items-center justify-between text-xs text-white/40">
                    <span>Runs: {runCount}</span>
                    <span>Last run: {lastRun ?? "—"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(agent.id)}
                    >
                      {status === "active" ? "Pause" : "Activate"}
                    </Button>
                    <Button size="sm" onClick={() => runAgent(agent.id)} disabled={runningId !== null}>
                      <Play className={`h-3.5 w-3.5 ${isRunning ? "animate-pulse" : ""}`} />
                      {isRunning ? "Running..." : "Run Now"}
                    </Button>
                    <Link
                      href={agent.link}
                      className="ml-auto flex items-center gap-1 text-xs text-white/40 hover:text-white"
                    >
                      Open module <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {tab === "Activity Log" && (
        <Card className="p-0">
          <div className="flex items-center gap-1.5 p-5 pb-3 text-white/60">
            <History className="h-3.5 w-3.5" />
            <CardTitle>Full Activity Log</CardTitle>
          </div>
          <div className="divide-y divide-white/5">
            {runs.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                <div className="flex min-w-0 items-center gap-3">
                  <Badge tone={CATEGORY_TONE[r.category]}>{r.category}</Badge>
                  <span className="shrink-0 font-medium">{r.agentName}</span>
                  <span className="truncate text-white/50">{r.summary}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge tone={r.status === "warning" ? "warning" : "success"}>{r.status.toUpperCase()}</Badge>
                  <span className="text-xs text-white/30">{r.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
