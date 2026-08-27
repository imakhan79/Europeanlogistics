import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const trustMarkets = ["EU", "UK", "EEA", "Switzerland"];

const problems = [
  { title: "Fragmented systems", body: "TMS, telematics, compliance and finance tools that don't talk to each other." },
  { title: "Complex operations", body: "Cabotage, posting and tachograph rules that change by country and by day." },
  { title: "Rising costs", body: "Empty kilometers, idle fuel burn and reactive dispatch eating into margin." },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0d14] text-white">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0d14]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold tracking-wide">European RouteWise</span>
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
        <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
          <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" /> AI Logistics Operating System
          </span>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            The AI Operating System for European Logistics
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
          <h2 className="mb-10 text-center text-2xl font-semibold">
            Fragmented systems. Complex operations. Rising costs.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {problems.map((p) => (
              <Card key={p.title}>
                <h3 className="mb-2 text-base font-medium">{p.title}</h3>
                <p className="text-sm text-white/60">{p.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-28 text-center">
          <h2 className="text-3xl font-semibold">Start running logistics intelligently.</h2>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button size="lg">Start Free</Button>
            <Button size="lg" variant="outline">
              Book a Demo
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
