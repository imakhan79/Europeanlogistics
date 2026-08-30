"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Key, Plug, RefreshCw, Trash2, Webhook as WebhookIcon, X } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  INTEGRATION_CATEGORIES,
  INITIAL_INTEGRATIONS,
  STATUS_LABEL,
  STATUS_TONE,
  INITIAL_API_KEYS,
  INITIAL_WEBHOOKS,
  WEBHOOK_EVENTS,
  type Integration,
  type IntegrationCategory,
  type ApiKey,
  type Webhook,
} from "@/lib/mock/integrations";

const TABS = ["Overview", "Connectors", "API Keys", "Webhooks"] as const;
type Tab = (typeof TABS)[number];

let keyCounter = 0;
let webhookCounter = 0;

function nowDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function nowDateTime(): string {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

function randomKeySuffix(): string {
  return Math.random().toString(16).slice(2, 6);
}

export default function IntegrationsPage() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [categoryFilter, setCategoryFilter] = useState<IntegrationCategory | "All">("All");
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const [apiKeys, setApiKeys] = useState<ApiKey[]>(INITIAL_API_KEYS);
  const [newKeyLabel, setNewKeyLabel] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [webhooks, setWebhooks] = useState<Webhook[]>(INITIAL_WEBHOOKS);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookEvent, setWebhookEvent] = useState(WEBHOOK_EVENTS[0]);

  const connectedCount = useMemo(() => integrations.filter((i) => i.status === "connected").length, [integrations]);
  const errorCount = useMemo(() => integrations.filter((i) => i.status === "error").length, [integrations]);

  const filteredIntegrations = useMemo(
    () => (categoryFilter === "All" ? integrations : integrations.filter((i) => i.category === categoryFilter)),
    [integrations, categoryFilter],
  );

  function toggleConnection(id: string) {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? i.status === "connected"
            ? { ...i, status: "disconnected", lastSynced: "—" }
            : { ...i, status: "connected", lastSynced: nowDateTime() }
          : i,
      ),
    );
  }

  function syncNow(id: string) {
    setSyncingId(id);
    setTimeout(() => {
      setIntegrations((prev) => prev.map((i) => (i.id === id ? { ...i, lastSynced: nowDateTime(), status: "connected" } : i)));
      setSyncingId(null);
    }, 900);
  }

  function generateApiKey() {
    const label = newKeyLabel.trim() || "New API Key";
    keyCounter += 1;
    const key: ApiKey = {
      id: `key-new-${keyCounter}`,
      label,
      keyMasked: `erl_live_••••••••••••${randomKeySuffix()}`,
      createdAt: nowDate(),
      lastUsed: "Never",
    };
    setApiKeys((prev) => [key, ...prev]);
    setNewKeyLabel("");
  }

  function revokeApiKey(id: string) {
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
  }

  function copyKey(id: string, key: string) {
    navigator.clipboard?.writeText(key).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1500);
  }

  function addWebhook() {
    const url = webhookUrl.trim();
    if (!url) return;
    webhookCounter += 1;
    const hook: Webhook = { id: `wh-new-${webhookCounter}`, url, event: webhookEvent, createdAt: nowDate() };
    setWebhooks((prev) => [hook, ...prev]);
    setWebhookUrl("");
  }

  function removeWebhook(id: string) {
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
  }

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <Plug className="h-5 w-5 text-blue-400" /> Integrations
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Connect fleet, fuel, accounting and compliance systems, and manage API access.
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card>
              <p className="mb-2 text-xs text-white/50">Total Integrations</p>
              <p className="text-2xl font-semibold">{integrations.length}</p>
            </Card>
            <Card>
              <p className="mb-2 text-xs text-white/50">Connected</p>
              <p className="text-2xl font-semibold text-emerald-400">{connectedCount}</p>
            </Card>
            <Card>
              <p className="mb-2 text-xs text-white/50">Errors</p>
              <p className="text-2xl font-semibold text-red-400">{errorCount}</p>
            </Card>
            <Card>
              <p className="mb-2 text-xs text-white/50">API Keys Active</p>
              <p className="text-2xl font-semibold">{apiKeys.length}</p>
            </Card>
          </div>

          <Card className="p-0">
            <div className="p-5 pb-3">
              <CardTitle>Integration Status</CardTitle>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">Integration</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Last Synced</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {integrations.map((i) => (
                    <tr key={i.id} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{i.name}</td>
                      <td className="px-4 py-3 text-white/60">{i.category}</td>
                      <td className="px-4 py-3 text-white/50">{i.lastSynced}</td>
                      <td className="px-4 py-3">
                        <Badge tone={STATUS_TONE[i.status]}>{STATUS_LABEL[i.status]}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === "Connectors" && (
        <div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {(["All", ...INTEGRATION_CATEGORIES] as const).map((c) => (
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
            {filteredIntegrations.map((i) => (
              <Card key={i.id}>
                <CardHeader>
                  <CardTitle>{i.name}</CardTitle>
                  <Badge tone={STATUS_TONE[i.status]}>{STATUS_LABEL[i.status]}</Badge>
                </CardHeader>
                <p className="mb-1 text-xs text-white/40">{i.category}</p>
                <p className="mb-4 text-sm text-white/60">{i.description}</p>
                <p className="mb-3 text-xs text-white/40">Last synced: {i.lastSynced}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant={i.status === "connected" ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleConnection(i.id)}
                  >
                    {i.status === "connected" ? (
                      <>
                        <X className="h-3.5 w-3.5" /> Disconnect
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" /> Connect
                      </>
                    )}
                  </Button>
                  {i.status === "connected" && (
                    <Button variant="ghost" size="sm" onClick={() => syncNow(i.id)} disabled={syncingId === i.id}>
                      <RefreshCw className={`h-3.5 w-3.5 ${syncingId === i.id ? "animate-spin" : ""}`} />
                      {syncingId === i.id ? "Syncing..." : "Sync Now"}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "API Keys" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5 text-blue-400" /> Generate API Key
                </span>
              </CardTitle>
            </CardHeader>
            <div className="flex items-center gap-2">
              <input
                value={newKeyLabel}
                onChange={(e) => setNewKeyLabel(e.target.value)}
                placeholder="Key label, e.g. Reporting Warehouse"
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none"
              />
              <Button size="sm" onClick={generateApiKey}>
                Generate Key
              </Button>
            </div>
          </Card>

          <Card className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">Label</th>
                    <th className="px-4 py-3 font-medium">Key</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium">Last Used</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((k) => (
                    <tr key={k.id} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{k.label}</td>
                      <td className="px-4 py-3 font-mono text-xs text-white/60">{k.keyMasked}</td>
                      <td className="px-4 py-3 text-white/50">{k.createdAt}</td>
                      <td className="px-4 py-3 text-white/50">{k.lastUsed}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => copyKey(k.id, k.keyMasked)}
                            title="Copy"
                            className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-white"
                          >
                            {copiedId === k.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                          <button
                            onClick={() => revokeApiKey(k.id)}
                            title="Revoke"
                            className="rounded-lg p-1.5 text-white/40 hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {apiKeys.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-white/30">
                        No API keys yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === "Webhooks" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-1.5">
                  <WebhookIcon className="h-3.5 w-3.5 text-blue-400" /> Add Webhook
                </span>
              </CardTitle>
            </CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-app.com/webhooks/endpoint"
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none"
              />
              <select
                value={webhookEvent}
                onChange={(e) => setWebhookEvent(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white focus:border-blue-500/50 focus:outline-none"
              >
                {WEBHOOK_EVENTS.map((ev) => (
                  <option key={ev} value={ev} className="bg-[#0a0d14]">
                    {ev}
                  </option>
                ))}
              </select>
              <Button size="sm" onClick={addWebhook} disabled={!webhookUrl.trim()}>
                Add Webhook
              </Button>
            </div>
          </Card>

          <Card className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">Endpoint URL</th>
                    <th className="px-4 py-3 font-medium">Event</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {webhooks.map((w) => (
                    <tr key={w.id} className="border-b border-white/5 last:border-0">
                      <td className="max-w-xs truncate px-4 py-3 font-mono text-xs text-white/70">{w.url}</td>
                      <td className="px-4 py-3">
                        <Badge tone="info">{w.event}</Badge>
                      </td>
                      <td className="px-4 py-3 text-white/50">{w.createdAt}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => removeWebhook(w.id)}
                          title="Remove"
                          className="rounded-lg p-1.5 text-white/40 hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {webhooks.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-white/30">
                        No webhooks configured.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
