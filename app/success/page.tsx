"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site-shell";

type SessionLookup = { token: string; sessions_remaining: number };

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SessionLookup | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setError("Missing session_id in redirect URL.");
      return;
    }

    fetch(`/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((json: SessionLookup | { error: string }) => {
        if ("error" in json) {
          setError(json.error);
          return;
        }
        setData(json);
      })
      .catch(() => setError("Unable to load your token."));
  }, [searchParams]);

  return (
    <SiteShell>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center py-10 text-center">
        <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
          <h1 className="text-3xl font-bold">Payment Complete</h1>
          <p className="mt-2 text-sm text-zinc-400">Your access key is generated from your completed checkout session.</p>

          {error ? <p className="mt-6 text-sm text-red-400">{error}</p> : null}

          {data ? (
            <div className="mt-6 space-y-4">
              <p className="text-zinc-300">Copy this key and enter your session room:</p>
              <code className="inline-block rounded bg-black/40 px-4 py-2 text-lg font-semibold">{data.token}</code>
              <div>
                <Link href={`/session?token=${data.token}`} className="inline-flex rounded-md bg-white px-6 py-3 text-sm font-semibold text-black">
                  Start Session
                </Link>
              </div>
            </div>
          ) : !error ? (
            <p className="mt-6 text-sm text-zinc-400">Generating key…</p>
          ) : null}
        </section>
      </main>
    </SiteShell>
  );
}
