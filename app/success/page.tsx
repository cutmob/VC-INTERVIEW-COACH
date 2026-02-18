"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { SiteShell } from "@/components/site-shell";

type SessionLookup = { token: string; sessions_remaining: number };

function SuccessInner() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SessionLookup | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) { setError("Missing session_id in redirect URL."); return; }
    fetch(`/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((json: SessionLookup | { error: string }) => {
        if ("error" in json) { setError(json.error); return; }
        setData(json);
      })
      .catch(() => setError("Unable to load your token."));
  }, [searchParams]);

  return (
    <SiteShell>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center py-12 text-center">
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-sm">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(196,122,74,0.6), transparent)" }}
          />

          {!data && !error && (
            <div className="space-y-3">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#3D3A38] border-t-wood-400" />
              <p className="text-sm text-wood-600">Generating your access key...</p>
            </div>
          )}

          {error && (
            <div className="space-y-2">
              <p className="heading-sans text-lg text-wood-900">Something went wrong</p>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {data && (
            <div className="space-y-7">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-wood-300">
                  Payment complete
                </p>
                <h1 className="heading-display mt-3 text-3xl text-wood-900">
                  Your key is ready
                </h1>
                <p className="mt-2 text-sm text-wood-600">
                  Copy this key and keep it safe. It expires in 24 hours.
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(data.token);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="group relative w-full cursor-pointer rounded-xl border border-wood-200 bg-wood-100/50 px-6 py-4 transition hover:border-wood-400 dark:border-white/[0.07] dark:bg-black/30 dark:hover:border-wood-400/40"
                aria-label="Copy access key to clipboard"
              >
                <p className="font-mono text-xl font-bold tracking-[0.15em] text-wood-900">
                  {data.token}
                </p>
                <span className="mt-2 block font-mono text-[10px] text-wood-500 transition group-hover:text-wood-700 dark:text-[#524E4B] dark:group-hover:text-wood-300">
                  {copied ? "Copied!" : "Click to copy"}
                </span>
              </button>

              <Link
                href={`/session?token=${data.token}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-wood-400 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(196,122,74,0.35)] transition hover:bg-wood-300"
              >
                Enter Session Room
              </Link>

              <p className="font-mono text-[10px] text-[#524E4B]">
                Single use &middot; 7 minutes &middot; No account needed
              </p>
            </div>
          )}
        </div>
      </main>
    </SiteShell>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessInner />
    </Suspense>
  );
}
