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
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-10 sm:py-16">

        {/* Section header */}
        <div className="mb-10 sm:mb-14 text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-wood-500 dark:text-wood-300">
            Payment complete
          </p>
          <h1 className="heading-display text-3xl text-wood-900 sm:text-5xl lg:text-6xl dark:text-wood-900">
            Your key is ready
          </h1>
          <p className="mt-5 text-lg text-wood-600 dark:text-wood-600">
            Copy this key and keep it safe. It expires in 24 hours.
          </p>
        </div>

        {/* Card */}
        <div className="mx-auto w-full max-w-md">
          <div className="relative overflow-hidden rounded-xl border border-wood-200 bg-wood-100 p-5 sm:p-9 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            {/* Top glow line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(199,125,77,0.4), transparent)" }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px hidden dark:block"
              style={{ background: "linear-gradient(90deg, transparent, rgba(196,122,74,0.6), transparent)" }}
            />

            {/* Loading state */}
            {!data && !error && (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-wood-200 border-t-wood-400 dark:border-white/10 dark:border-t-wood-400" />
                <p className="text-sm text-wood-600 dark:text-wood-600">Generating your access key…</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center">
                <h2 className="heading-sans text-lg text-wood-900 dark:text-wood-900">Something went wrong</h2>
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Success state */}
            {data && (
              <div className="space-y-7">
                <div className="flex items-start justify-between border-b border-wood-200 pb-8 dark:border-white/[0.07]">
                  <div>
                    <h2 className="heading-sans text-lg text-wood-900 dark:text-wood-900">
                      Access Key
                    </h2>
                    <p className="mt-1 text-sm text-wood-600 dark:text-[#6B6360]">
                      Single-use &middot; 24-hour expiry
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-4xl font-bold text-wood-900 dark:text-wood-900">1</span>
                    <p className="font-mono text-[10px] text-wood-500 dark:text-[#524E4B]">session</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(data.token);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="group relative w-full cursor-pointer rounded-xl border border-wood-200 bg-wood-50 px-6 py-4 text-center transition hover:border-wood-400 dark:border-white/[0.07] dark:bg-black/30 dark:hover:border-wood-400/40"
                  aria-label="Copy access key to clipboard"
                >
                  <p className="font-mono text-xl font-bold tracking-[0.15em] text-wood-900 dark:text-wood-900">
                    {data.token}
                  </p>
                  <span className="mt-2 block font-mono text-[10px] text-wood-500 transition group-hover:text-wood-700 dark:text-[#524E4B] dark:group-hover:text-wood-300">
                    {copied ? "Copied!" : "Click to copy"}
                  </span>
                </button>

                <Link
                  href={`/session?token=${data.token}`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-wood-400 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(199,125,77,0.3)] transition hover:bg-wood-500 hover:shadow-[0_6px_20px_rgba(199,125,77,0.4)] dark:shadow-[0_0_20px_rgba(196,122,74,0.3)] dark:hover:bg-wood-300 dark:hover:shadow-[0_0_30px_rgba(196,122,74,0.5)]"
                >
                  Enter Session Room
                </Link>

                <p className="text-center font-mono text-[10px] text-wood-500 dark:text-[#524E4B]">
                  Single use &middot; 7 minutes &middot; No account needed
                </p>
              </div>
            )}
          </div>
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
