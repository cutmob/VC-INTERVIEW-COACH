"use client";

import { useState } from "react";
import ShimmerButton from "@/components/ui/shimmer-button";

export function CtaButton({ label = "Start Session — $12" }: { label?: string }) {
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
    <div className="flex w-full flex-col gap-2">
      <ShimmerButton
        onClick={startCheckout}
        disabled={loading}
        className="w-full text-sm font-semibold text-white shadow-[0_4px_14px_rgba(199,125,77,0.3)] hover:shadow-[0_6px_20px_rgba(199,125,77,0.4)] transition-shadow duration-500 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0_0_30px_rgba(196,122,74,0.3)] dark:hover:shadow-[0_0_50px_rgba(196,122,74,0.5)] dark:text-white"
        shimmerColor="var(--btn-glow-start)"
        shimmerSize="2px"
        borderRadius="100px"
        background="var(--btn-glow-mid)"
      >
        <span className="relative z-10 px-8 py-1">
          {loading ? "Redirecting to checkout..." : label}
        </span>
      </ShimmerButton>
      {error && (
        <p className="text-center font-mono text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
