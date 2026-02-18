import { CtaButton } from "@/components/cta-button";
import { SiteShell } from "@/components/site-shell";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BackgroundBeams } from "@/components/ui/background-beams";

const included = [
  "7-minute realtime voice session",
  "VC-style interrogation prompt",
  "Immediate interruptions and direct pushback",
  "No account required",
  "Token expires in 24 hours",
];

export default function PricingPage() {
  return (
    <SiteShell>
      <div className="relative min-h-screen w-full overflow-hidden bg-wood-50 dark:bg-[#0A0A0F] transition-colors duration-300">

        {/* Dark mode background effect */}
        <div className="absolute inset-0 hidden dark:block pointer-events-none">
          <BackgroundBeams className="opacity-20" />
        </div>

        <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-10 sm:py-16">
          <div className="mb-10 sm:mb-14 text-center">
            <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-wood-500 dark:text-wood-300">
              Pricing
            </p>
            <h1 className="heading-display text-3xl text-wood-900 sm:text-5xl lg:text-6xl dark:text-wood-900">
              One session. One key.
            </h1>
            <p className="mt-5 text-lg text-wood-600 dark:text-wood-600">
              No subscriptions. No accounts. Pay once and get 7 minutes of live pressure.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <SpotlightCard className="flex-col !items-stretch p-5 sm:p-9 bg-wood-100 border-wood-200 shadow-sm dark:bg-white/[0.04] dark:border-white/10 dark:shadow-none" spotlightColor="rgba(199, 125, 77, 0.1)">
              {/* Top glow */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--top-glow, rgba(199,125,77,0.4)), transparent)" }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px hidden dark:block"
                style={{ background: "linear-gradient(90deg, transparent, rgba(196,122,74,0.6), transparent)" }}
              />

              <div className="mb-8 flex items-start justify-between border-b border-wood-200 pb-8 dark:border-white/[0.07]">
                <div>
                  <h2 className="heading-sans text-lg text-wood-900 dark:text-wood-900">
                    Pitch Interrogation
                  </h2>
                  <p className="mt-1 text-sm text-wood-600 dark:text-[#6B6360]">
                    Single-use key &middot; 24-hour expiry
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-4xl font-bold text-wood-900 dark:text-wood-900">$12</span>
                  <p className="font-mono text-[10px] text-wood-500 dark:text-[#524E4B]">one time</p>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-wood-700 dark:text-wood-600">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wood-400 shadow-[0_0_6px_rgba(199,125,77,0.4)] dark:bg-wood-400 dark:shadow-[0_0_6px_rgba(196,122,74,0.8)]" />
                    {item}
                  </li>
                ))}
              </ul>

              <CtaButton label="Buy Access Key — $12" />

              <p className="mt-5 text-center font-mono text-[10px] text-wood-500 dark:text-[#524E4B]">
                Secure checkout via Stripe
              </p>
            </SpotlightCard>
          </div>
        </main>
      </div>
    </SiteShell>
  );
}
