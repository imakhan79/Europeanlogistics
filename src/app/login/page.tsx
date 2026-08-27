"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

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
    <div className="flex min-h-screen items-center justify-center bg-[#0a0d14] px-6 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-semibold">European RouteWise</h1>
          <p className="text-sm text-white/50">AI Logistics Operating System</p>
        </div>

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
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:bg-white/5 disabled:opacity-50"
              >
                {demoLoading === r.email ? "Signing in..." : r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
