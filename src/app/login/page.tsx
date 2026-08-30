"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { RouteNetwork } from "@/components/marketing/route-network";
import { Route, ShieldCheck, Sparkles, Truck } from "lucide-react";

const DEMO_ROLES = [
  { label: "Super Admin", email: "admin@europeroutewise.demo" },
  { label: "Company Admin", email: "company@europeroutewise.demo" },
  { label: "Fleet Manager", email: "fleet@europeroutewise.demo" },
  { label: "Dispatcher", email: "dispatch@europeroutewise.demo" },
  { label: "Compliance", email: "compliance@europeroutewise.demo" },
  { label: "Driver", email: "driver@europeroutewise.demo" },
  { label: "Finance", email: "finance@europeroutewise.demo" },
  { label: "Customer", email: "customer@europeroutewise.demo" },
];

const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? "";

const BRAND_HIGHLIGHTS = [
  { icon: Truck, label: "248 vehicles live across 8 countries" },
  { icon: ShieldCheck, label: "97.8% real-time compliance score" },
  { icon: Sparkles, label: "AI dispatch, routing and forecasting" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
  }

  async function handleDemoLogin(demoEmail: string) {
    setDemoLoading(demoEmail);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: demoEmail,
      password: DEMO_PASSWORD,
    });
    setDemoLoading(null);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-[#0a0d14] text-white">
      <div className="relative hidden w-1/2 overflow-hidden border-r border-white/5 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <RouteNetwork />
        <div
          className="float-orb absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]"
          aria-hidden
        />

        <Link href="/" className="relative flex items-center gap-2 font-heading text-sm font-semibold tracking-wide">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/20">
            <Route className="h-4 w-4" />
          </span>
          European RouteWise
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-heading text-3xl font-semibold leading-tight">
            The AI Operating System for <span className="text-gradient">European Logistics</span>
          </h2>
          <p className="mt-4 text-sm text-white/50">
            One platform for routing, dispatch, compliance, fuel, maintenance and finance —
            built for fleets moving freight across the continent.
          </p>
          <div className="mt-8 space-y-3">
            {BRAND_HIGHLIGHTS.map((h) => (
              <div key={h.label} className="flex items-center gap-3 text-sm text-white/70">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <h.icon className="h-4 w-4 text-blue-400" />
                </span>
                {h.label}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/30">
          Trusted across the EU, UK, EEA and Switzerland.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:hidden">
            <span className="mb-4 flex items-center justify-center gap-2 font-heading text-sm font-semibold tracking-wide">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                <Route className="h-4 w-4" />
              </span>
              European RouteWise
            </span>
            <p className="text-sm text-white/50">AI Logistics Operating System</p>
          </div>
          <div className="mb-8 hidden text-center lg:block">
            <h1 className="font-heading text-lg font-semibold">Welcome back</h1>
            <p className="text-sm text-white/50">Sign in to your operations dashboard</p>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-white/60">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/60">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="text-right text-xs text-white/40">Forgot password?</div>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-white/30">
              <div className="h-px flex-1 bg-white/10" /> OR <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full">
                Continue with Microsoft
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-white/40">
            Don&apos;t have an account?{" "}
            <Link href="#" className="text-blue-400">
              Create account
            </Link>
          </p>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="mb-3 text-center text-xs uppercase tracking-widest text-white/30">
              Explore Demo
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {DEMO_ROLES.map((r) => (
                <button
                  key={r.email}
                  type="button"
                  disabled={demoLoading !== null}
                  onClick={() => handleDemoLogin(r.email)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white disabled:opacity-50"
                >
                  {demoLoading === r.email ? "Signing in..." : r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
