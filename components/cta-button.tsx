"use client";

import { useState } from "react";

type CtaButtonProps = {
  label?: string;
};

export function CtaButton({ label = "$12 — Enter the Room" }: CtaButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Unable to start checkout");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Unexpected error starting checkout");
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <button
        onClick={startCheckout}
        disabled={loading}
        className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
