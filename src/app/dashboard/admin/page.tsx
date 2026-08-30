"use client";

import { useState } from "react";
import { Check, History, Settings, Shield, Trash2, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ADMIN_KPIS,
  INITIAL_TEAM,
  ROLES,
  MEMBER_STATUS_LABEL,
  MEMBER_STATUS_TONE,
  PERMISSIONS,
  DEFAULT_ROLE_PERMISSIONS,
  INITIAL_COMPANY_SETTINGS,
  AUDIT_LOG,
  type TeamMember,
  type CompanySettings,
} from "@/lib/mock/admin";

const TABS = ["Overview", "Team Members", "Roles & Permissions", "Company Settings", "Audit Log"] as const;
type Tab = (typeof TABS)[number];

let memberCounter = 0;

export default function AdministrationPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState(ROLES[ROLES.length - 1]);

  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [rolePermissions, setRolePermissions] =
    useState<Record<string, Record<string, boolean>>>(DEFAULT_ROLE_PERMISSIONS);

  const [settings, setSettings] = useState<CompanySettings>(INITIAL_COMPANY_SETTINGS);
  const [saved, setSaved] = useState(false);

  function inviteMember() {
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    memberCounter += 1;
    const member: TeamMember = {
      id: `u-new-${memberCounter}`,
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      status: "invited",
      lastActive: "—",
    };
    setTeam((prev) => [...prev, member]);
    setInviteName("");
    setInviteEmail("");
  }

  function changeRole(id: string, role: string) {
    setTeam((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  }

  function toggleSuspend(id: string) {
    setTeam((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === "suspended" ? "active" : "suspended" } : m,
      ),
    );
  }

  function removeMember(id: string) {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  }

  function togglePermission(role: string, permission: string) {
    setRolePermissions((prev) => ({
      ...prev,
      [role]: { ...prev[role], [permission]: !prev[role][permission] },
    }));
  }

  function updateSetting<K extends keyof CompanySettings>(key: K, value: CompanySettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function saveSettings() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <Settings className="h-5 w-5 text-blue-400" /> Administration
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Team members, roles &amp; permissions, company settings and the audit log.
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
          {ADMIN_KPIS.map((k) => (
            <Card key={k.label}>
              <p className="mb-2 text-xs text-white/50">{k.label}</p>
              <p className="text-2xl font-semibold">{k.value}</p>
            </Card>
          ))}
        </div>
      )}

      {tab === "Team Members" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-1.5">
                  <UserPlus className="h-3.5 w-3.5 text-blue-400" /> Invite Team Member
                </span>
              </CardTitle>
            </CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Full name"
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none"
              />
              <input
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white focus:border-blue-500/50 focus:outline-none"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r} className="bg-[#0a0d14]">
                    {r}
                  </option>
                ))}
              </select>
              <Button size="sm" onClick={inviteMember} disabled={!inviteName.trim() || !inviteEmail.trim()}>
                Send Invite
              </Button>
            </div>
          </Card>

          <Card className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/40">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Last Active</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {team.map((m) => (
                    <tr key={m.id} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium">{m.name}</td>
                      <td className="px-4 py-3 text-white/60">{m.email}</td>
                      <td className="px-4 py-3">
                        <select
                          value={m.role}
                          onChange={(e) => changeRole(m.id, e.target.value)}
                          className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white focus:border-blue-500/50 focus:outline-none"
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r} className="bg-[#0a0d14]">
                              {r}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-white/50">{m.lastActive}</td>
                      <td className="px-4 py-3">
                        <Badge tone={MEMBER_STATUS_TONE[m.status]}>{MEMBER_STATUS_LABEL[m.status]}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => toggleSuspend(m.id)}>
                            {m.status === "suspended" ? "Reactivate" : "Suspend"}
                          </Button>
                          <button
                            onClick={() => removeMember(m.id)}
                            title="Remove"
                            className="rounded-lg p-1.5 text-white/40 hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === "Roles & Permissions" && (
        <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
          <div className="flex flex-row gap-1.5 lg:flex-col">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  selectedRole === r
                    ? "border-blue-500 bg-blue-500/15 text-blue-300"
                    : "border-white/10 text-white/60 hover:bg-white/5"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-blue-400" /> {selectedRole} Permissions
                </span>
              </CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {PERMISSIONS.map((p) => {
                const enabled = rolePermissions[selectedRole]?.[p] ?? false;
                return (
                  <button
                    key={p}
                    onClick={() => togglePermission(selectedRole, p)}
                    disabled={selectedRole === "Admin"}
                    className="flex w-full items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm hover:bg-white/[0.04] disabled:opacity-60"
                  >
                    <span className="text-white/70">{p}</span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        enabled ? "border-blue-500 bg-blue-500/20 text-blue-300" : "border-white/15 text-transparent"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedRole === "Admin" && (
              <p className="mt-3 text-xs text-white/30">Admins always have full access.</p>
            )}
          </Card>
        </div>
      )}

      {tab === "Company Settings" && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            <Field label="Company Name" value={settings.companyName} onChange={(v) => updateSetting("companyName", v)} />
            <Field label="VAT Number" value={settings.vatNumber} onChange={(v) => updateSetting("vatNumber", v)} />
            <Field label="Address" value={settings.address} onChange={(v) => updateSetting("address", v)} />
            <Field label="Timezone" value={settings.timezone} onChange={(v) => updateSetting("timezone", v)} />
            <Field label="Currency" value={settings.currency} onChange={(v) => updateSetting("currency", v)} />
            <Field label="Primary Contact" value={settings.primaryContact} onChange={(v) => updateSetting("primaryContact", v)} />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button size="sm" onClick={saveSettings}>
              Save Changes
            </Button>
            {saved && (
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <Check className="h-3.5 w-3.5" /> Saved
              </span>
            )}
          </div>
        </Card>
      )}

      {tab === "Audit Log" && (
        <div className="space-y-2">
          {AUDIT_LOG.map((a, i) => (
            <Card key={i} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <History className="h-4 w-4 shrink-0 text-white/30" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{a.actor}</span>{" "}
                    <span className="text-white/50">{a.action.toLowerCase()}</span>{" "}
                    <span className="font-medium text-white/70">{a.target}</span>
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-xs text-white/40">{a.timestamp}</span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-white/50">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white focus:border-blue-500/50 focus:outline-none"
      />
    </label>
  );
}
