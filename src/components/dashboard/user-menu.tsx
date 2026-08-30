"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleLogout() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setSigningOut(false);
    setOpen(false);
    router.push("/login");
  }

  const initials = email ? email.slice(0, 2).toUpperCase() : "?";

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/30 text-[11px] font-semibold text-blue-200 hover:bg-blue-600/40"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-50 w-56 rounded-xl border border-white/10 bg-[#0f1320] p-2 shadow-lg">
          <div className="flex items-center gap-2 rounded-lg px-2 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-blue-200">
              <User className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{email ?? "Guest"}</p>
              <p className="text-xs text-white/40">{email ? "Signed in" : "Not signed in"}</p>
            </div>
          </div>
          <div className="my-1 h-px bg-white/10" />
          <button
            onClick={handleLogout}
            disabled={signingOut}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            {signingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      )}
    </div>
  );
}
