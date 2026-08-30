"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell, Check, Mail, Smartphone, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  INITIAL_NOTIFICATIONS,
  NOTIFICATION_CATEGORIES,
  DEFAULT_PREFERENCES,
  SEVERITY_TONE,
  type AppNotification,
  type NotificationCategory,
  type NotificationChannelPrefs,
} from "@/lib/mock/notifications";

type Filter = "All" | "Unread" | NotificationCategory;

const FILTERS: Filter[] = ["All", "Unread", ...NOTIFICATION_CATEGORIES];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<Filter>("All");
  const [preferences, setPreferences] =
    useState<Record<NotificationCategory, NotificationChannelPrefs>>(DEFAULT_PREFERENCES);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const filtered = useMemo(() => {
    if (filter === "All") return notifications;
    if (filter === "Unread") return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.category === filter);
  }, [notifications, filter]);

  function markAsRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  function toggleChannel(category: NotificationCategory, channel: keyof NotificationChannelPrefs) {
    setPreferences((prev) => ({
      ...prev,
      [category]: { ...prev[category], [channel]: !prev[category][channel] },
    }));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
            <Bell className="h-5 w-5 text-blue-400" /> Notifications
          </h1>
          <p className="text-sm text-white/50">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}` : "You're all caught up"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
          <Check className="h-3.5 w-3.5" /> Mark all as read
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {FILTERS.map((f) => {
              const count = f === "All" ? notifications.length : f === "Unread" ? unreadCount : notifications.filter((n) => n.category === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    filter === f
                      ? "border-blue-500 bg-blue-500/15 text-blue-300"
                      : "border-white/10 text-white/50 hover:bg-white/5"
                  }`}
                >
                  {f} {count > 0 && <span className="text-white/30">({count})</span>}
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            {filtered.map((n) => (
              <Card
                key={n.id}
                className={`p-4 transition-colors ${n.read ? "opacity-60" : "border-blue-500/20 bg-blue-500/[0.03]"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={n.link}
                    onClick={() => markAsRead(n.id)}
                    className="flex min-w-0 flex-1 items-start gap-3"
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-blue-400"}`}
                    />
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <p className={`text-sm ${n.read ? "font-normal text-white/70" : "font-semibold text-white"}`}>
                          {n.title}
                        </p>
                        <Badge tone={SEVERITY_TONE[n.severity]}>{n.severity.toUpperCase()}</Badge>
                        <span className="text-xs text-white/30">{n.category}</span>
                      </div>
                      <p className="text-xs text-white/50">{n.message}</p>
                      <p className="mt-1 text-[11px] text-white/30">{n.timestamp}</p>
                    </div>
                  </Link>
                  <div className="flex shrink-0 items-center gap-1">
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        title="Mark as read"
                        className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-white"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => dismiss(n.id)}
                      title="Dismiss"
                      className="rounded-lg p-1.5 text-white/40 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="py-16 text-center text-sm text-white/30">No notifications here.</p>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {NOTIFICATION_CATEGORIES.map((cat) => (
              <div key={cat} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <p className="mb-2 text-sm font-medium text-white/80">{cat}</p>
                <div className="flex items-center gap-2">
                  <ChannelToggle
                    icon={Mail}
                    label="Email"
                    enabled={preferences[cat].email}
                    onClick={() => toggleChannel(cat, "email")}
                  />
                  <ChannelToggle
                    icon={Smartphone}
                    label="Push"
                    enabled={preferences[cat].push}
                    onClick={() => toggleChannel(cat, "push")}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ChannelToggle({
  icon: Icon,
  label,
  enabled,
  onClick,
}: {
  icon: typeof Mail;
  label: string;
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
        enabled
          ? "border-blue-500/40 bg-blue-500/15 text-blue-300"
          : "border-white/10 text-white/40 hover:bg-white/5"
      }`}
    >
      <Icon className="h-3 w-3" /> {label}
    </button>
  );
}
