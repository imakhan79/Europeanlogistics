import Link from "next/link";
import { Bell, Route, Search, Sparkles } from "lucide-react";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { UserMenu } from "@/components/dashboard/user-menu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0d14] text-white">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-white/[0.02] md:flex md:flex-col">
        <Link href="/dashboard" className="flex items-center gap-2 px-5 py-5 font-heading text-sm font-semibold tracking-wide">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/20">
            <Route className="h-4 w-4" />
          </span>
          European RouteWise
        </Link>
        <SidebarNav />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-white/10 bg-[#0a0d14]/80 px-6 backdrop-blur-xl">
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
