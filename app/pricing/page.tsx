import { CtaButton } from "@/components/cta-button";
import { SiteShell } from "@/components/site-shell";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BackgroundBeams } from "@/components/ui/background-beams";

const included = [
  "Stops you when investors lose interest",
  "Exposes weak traction & vague asks",
  "Pressure-tests your pitch like a real VC",
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
              Your next investor meeting<br className="hidden sm:block" /> is worth more than $12.
            </h1>
            <p className="mt-5 text-lg text-wood-600 dark:text-wood-600">
              One brutal session. No account. No subscription. Just the 7 minutes that tell you exactly where your pitch breaks.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[30rem]">
            <SpotlightCard className="flex-col !items-stretch p-5 sm:p-9 bg-wood-100 border-wood-200 shadow-sm dark:bg-white/[0.04] dark:border-white/10 dark:shadow-none" spotlightColor="rgba(199, 125, 77, 0.06)" showTopGlow>
              <div className="mb-12 flex flex-col items-center border-b border-wood-200 pb-12 dark:border-white/[0.07]">
                <p className="mb-3 font-mono text-[11px] text-wood-500 dark:text-[#524E4B]">Find out if investors would pass — before they do.</p>
                <span className="font-display text-6xl font-bold text-wood-900 dark:text-wood-900">$12</span>
                <p className="mt-2 font-mono text-[10px] text-wood-500 dark:text-[#524E4B]">one time</p>
              </div>

              <ul className="mb-12 space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-wood-700 dark:text-wood-600">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wood-400 shadow-[0_0_6px_rgba(199,125,77,0.4)] dark:bg-wood-400 dark:shadow-[0_0_6px_rgba(196,122,74,0.8)]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mb-12">
                <CtaButton label="Start Session" />
              </div>

              <p className="text-center font-mono text-[10px] text-wood-500 dark:text-[#524E4B]">
                Secure checkout via <span className="text-[#635BFF]">Stripe</span> &middot; No subscription, ever
              </p>
            </SpotlightCard>
          </div>
        </main>
      </div>
    </SiteShell>
  );
}
