import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Map,
  Truck,
  ShieldCheck,
  Fuel,
  Wrench,
  Wallet,
  BarChart3,
  Bot,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteNetwork } from "@/components/marketing/route-network";

const trustMarkets = ["European Union", "United Kingdom", "EEA", "Switzerland"];

const liveStats = [
  { label: "Active Trucks", value: "248" },
  { label: "Compliance Score", value: "97.8%" },
  { label: "Countries Covered", value: "8" },
];

const problems = [
  {
    title: "Fragmented systems",
    body: "TMS, telematics, compliance and finance tools that don't talk to each other.",
    icon: Route,
  },
  {
    title: "Complex operations",
    body: "Cabotage, posting and tachograph rules that change by country and by day.",
    icon: ShieldCheck,
  },
  {
    title: "Rising costs",
    body: "Empty kilometers, idle fuel burn and reactive dispatch eating into margin.",
    icon: Wallet,
  },
];

const platformModules = [
  { label: "Live Fleet Map", body: "Real-time vehicle positions across the network.", icon: Map },
  { label: "AI Route Optimizer", body: "Multi-stop sequencing that saves kilometers and hours.", icon: Sparkles },
  { label: "Compliance OS", body: "Driver hours, tachograph, cabotage and posting, automated.", icon: ShieldCheck },
  { label: "Fuel Management", body: "Fleet spend, consumption benchmarking and card controls.", icon: Fuel },
  { label: "Maintenance", body: "Service schedules, work orders and parts inventory.", icon: Wrench },
  { label: "Finance", body: "Revenue, costs, receivables and route-level profitability.", icon: Wallet },
  { label: "Analytics", body: "Fleet, driver and corridor performance trends.", icon: BarChart3 },
  { label: "AI Logistics Agent", body: "Ask questions, get answers grounded in live data.", icon: Bot },
];

const heroStats = [
  { label: "Optimized route", value: "1,188 km" },
  { label: "Compliance score", value: "97.8%" },
  { label: "Est. monthly uplift", value: "€184K" },
  { label: "Countries live", value: "8" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0d14] text-white">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0d14]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="flex items-center gap-2 font-heading text-sm font-semibold tracking-wide">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/20">
              <Route className="h-4 w-4" />
            </span>
            European RouteWise
          </span>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <span>Platform</span>
            <span>Solutions</span>
            <span>AI Logistics</span>
            <span>Compliance</span>
            <span>Resources</span>
            <span>Pricing</span>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/70 hover:text-white">
              Login
            </Link>
            <Button size="sm">Start Free</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <RouteNetwork />
          <div
            className="float-orb absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]"
            aria-hidden
          />
          <div
            className="float-orb absolute -right-32 top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px]"
            style={{ animationDelay: "-4s" }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" /> AI Logistics Operating System
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
              The AI Operating System for{" "}
              <span className="text-gradient">European Logistics</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              Plan smarter routes, optimize your fleet, automate dispatch and stay ahead of
              European transport complexity — all from one intelligent platform.
            </p>
            <p className="mt-3 text-sm font-medium text-white/40">
              Plan smarter. Dispatch faster. Drive compliantly. Deliver on time. Optimize every kilometer.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Book a Demo
              </Button>
            </div>

            <div className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs text-white/50 backdrop-blur-sm">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
                network
              </span>
              {liveStats.map((s) => (
                <span key={s.label}>
                  <span className="font-semibold text-white">{s.value}</span> {s.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-white/[0.02] py-6">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-6 text-xs uppercase tracking-widest text-white/40">
            <span>Built for</span>
            {trustMarkets.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="mb-10 text-center font-heading text-2xl font-semibold">
            Fragmented systems. Complex operations. Rising costs.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {problems.map((p) => (
              <div
                key={p.title}
                className="glass-panel rounded-2xl p-6 transition-colors hover:border-white/20"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                  <p.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="mb-2 text-base font-medium">{p.title}</h3>
                <p className="text-sm text-white/60">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-blue-400">
                One Platform
              </span>
              <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                Every module your operation runs on
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/50">
                From live tracking to AI dispatch, compliance and finance — European RouteWise
                replaces the patchwork of tools with one connected system.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {platformModules.map((m) => (
                <div
                  key={m.label}
                  className="glass-panel rounded-2xl p-5 transition-transform hover:-translate-y-0.5 hover:border-white/20"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-amber-500/10">
                    <m.icon className="h-[18px] w-[18px] text-blue-300" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold">{m.label}</h3>
                  <p className="text-xs leading-relaxed text-white/50">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-3xl font-semibold text-gradient sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-5xl overflow-hidden px-6 pb-28 text-center">
          <div className="glass-panel relative overflow-hidden rounded-3xl px-8 py-16">
            <RouteNetwork className="opacity-40" />
            <div className="relative">
              <h2 className="font-heading text-3xl font-semibold">
                Start running logistics intelligently.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
                Join fleets across Europe already dispatching, complying and optimizing with one
                AI-powered platform.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Button size="lg">Start Free</Button>
                <Button size="lg" variant="outline">
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-white/40 sm:flex-row">
          <span className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5" /> © {new Date().getFullYear()} European RouteWise. All
            rights reserved.
          </span>
          <span className="flex items-center gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Status</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
