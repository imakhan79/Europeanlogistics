import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";
import { NAV_MODULES } from "@/lib/modules";
import { UserMenu } from "@/components/dashboard/user-menu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0d14] text-white">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-white/[0.02] md:flex md:flex-col">
        <div className="px-5 py-5 text-sm font-semibold tracking-wide">European RouteWise</div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
          {NAV_MODULES.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"
            >
              <m.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{m.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/40">
            <Search className="h-3.5 w-3.5" />
            <span>Search everywhere...</span>
            <kbd className="ml-6 rounded border border-white/10 px-1.5 text-[10px]">Ctrl K</kbd>
          </div>
          <div className="flex items-center gap-4">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <Bell className="h-4 w-4 text-white/60" />
            <UserMenu />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
