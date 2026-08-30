"use client";

import { useState } from "react";
import { AlertTriangle, BatteryMedium, MapPin, Send, Smartphone } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DRIVER_APP_KPIS,
  DRIVER_DEVICES,
  DEVICE_STATUS_LABEL,
  DEVICE_STATUS_TONE,
  DRIVER_CHECKINS,
  CHECKIN_TYPE_TONE,
  BROADCASTS,
  SUPPORT_TICKETS,
  TICKET_STATUS_LABEL,
  TICKET_STATUS_TONE,
  TICKET_PRIORITY_TONE,
} from "@/lib/mock/driverApp";

const TABS = ["Overview", "Devices", "Check-ins", "Broadcasts", "Support Tickets"] as const;
type Tab = (typeof TABS)[number];

export default function DriverMobileAppPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <Smartphone className="h-5 w-5 text-blue-400" /> Driver Mobile App
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Device fleet, trip check-ins, broadcast messaging and support for the driver mobile app.
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
            {DRIVER_APP_KPIS.map((k) => (
              <Card key={k.label}>
                <p className="mb-2 text-xs text-white/50">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </Card>
            ))}
          </div>

          <Card className="p-0">
            <div className="flex items-center justify-between p-5 pb-3">
              <CardTitle>Open Support Tickets</CardTitle>
              <Badge tone="default">
                {SUPPORT_TICKETS.filter((t) => t.status !== "resolved").length} active
              </Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Driver</th>
                    <th className="px-4 py-3 font-medium">Subject</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {SUPPORT_TICKETS.filter((t) => t.status !== "resolved").map((t) => (
                    <tr key={t.id} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{t.id}</td>
                      <td className="px-4 py-3 text-white/70">{t.driver}</td>
                      <td className="px-4 py-3 text-white/50">{t.subject}</td>
                      <td className="px-4 py-3">
                        <Badge tone={TICKET_PRIORITY_TONE[t.priority]}>{t.priority.toUpperCase()}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={TICKET_STATUS_TONE[t.status]}>{TICKET_STATUS_LABEL[t.status]}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === "Devices" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Device</th>
                  <th className="px-4 py-3 font-medium">OS</th>
                  <th className="px-4 py-3 font-medium">App Version</th>
                  <th className="px-4 py-3 font-medium">Last Sync</th>
                  <th className="px-4 py-3 font-medium">Battery</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {DRIVER_DEVICES.map((d) => (
                  <tr key={d.driver} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{d.driver}</td>
                    <td className="px-4 py-3 text-white/70">{d.vehicle}</td>
                    <td className="px-4 py-3 text-white/70">{d.deviceModel}</td>
                    <td className="px-4 py-3 text-white/50">{d.os}</td>
                    <td className="px-4 py-3 text-white/50">{d.appVersion}</td>
                    <td className="px-4 py-3 text-white/50">{d.lastSync}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`flex items-center gap-1 ${
                          d.battery <= 20 ? "text-red-400" : d.battery <= 40 ? "text-amber-400" : "text-white/70"
                        }`}
                      >
                        <BatteryMedium className="h-3.5 w-3.5" /> {d.battery}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={DEVICE_STATUS_TONE[d.status]}>{DEVICE_STATUS_LABEL[d.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Check-ins" && (
        <div className="space-y-2">
          {DRIVER_CHECKINS.map((c, i) => (
            <Card key={i} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <Badge tone={CHECKIN_TYPE_TONE[c.type]} className="shrink-0">
                  {c.type}
                </Badge>
                <div>
                  <p className="text-sm font-medium">
                    {c.driver} <span className="text-white/40">· {c.vehicle}</span>
                  </p>
                  <p className="flex items-center gap-1 text-xs text-white/50">
                    <MapPin className="h-3 w-3" /> {c.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/40">
                {c.podAttached && <Badge tone="success">POD Attached</Badge>}
                <span>{c.timestamp}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "Broadcasts" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">Message</th>
                  <th className="px-4 py-3 font-medium">Audience</th>
                  <th className="px-4 py-3 font-medium">Sent</th>
                  <th className="px-4 py-3 font-medium">Delivered</th>
                  <th className="px-4 py-3 font-medium">Opened</th>
                </tr>
              </thead>
              <tbody>
                {BROADCASTS.map((b, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Send className="h-3.5 w-3.5 text-blue-400" /> {b.title}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/70">{b.audience}</td>
                    <td className="px-4 py-3 text-white/50">{b.sentAt}</td>
                    <td className="px-4 py-3 text-white/70">{b.delivered}%</td>
                    <td className="px-4 py-3 text-white/70">{b.opened}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Support Tickets" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Opened</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {SUPPORT_TICKETS.map((t) => (
                  <tr key={t.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 font-medium">{t.id}</td>
                    <td className="px-4 py-3 text-white/70">{t.driver}</td>
                    <td className="px-4 py-3 text-white/50">{t.subject}</td>
                    <td className="px-4 py-3 text-white/50">{t.opened}</td>
                    <td className="px-4 py-3">
                      <Badge tone={TICKET_PRIORITY_TONE[t.priority]}>{t.priority.toUpperCase()}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={TICKET_STATUS_TONE[t.status]}>{TICKET_STATUS_LABEL[t.status]}</Badge>
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
          <AlertTriangle className="h-3 w-3" /> Figures are mock data pending live mobile device
          management (MDM) and push notification service integration.
        </p>
      )}
    </div>
  );
}
