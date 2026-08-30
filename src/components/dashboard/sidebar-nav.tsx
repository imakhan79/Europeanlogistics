"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_MODULES } from "@/lib/modules";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
      {NAV_MODULES.map((m) => {
        const active = m.href === "/dashboard" ? pathname === m.href : pathname.startsWith(m.href);
        return (
          <Link
            key={m.href}
            href={m.href}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              active ? "bg-blue-500/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-blue-400" />
            )}
            <m.icon className={`h-4 w-4 shrink-0 ${active ? "text-blue-400" : ""}`} />
            <span className="truncate">{m.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
