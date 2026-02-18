import Link from "next/link";
import ShimmerButton from "@/components/ui/shimmer-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BackgroundBeams, BackgroundBeamsLight } from "@/components/ui/background-beams";
import { ThemeToggle } from "@/components/theme-toggle";
import { SideDecor } from "@/components/ui/side-decor";
import { SiteFooter } from "@/components/site-footer";
import { VCMarquee } from "@/components/vc-marquee";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-wood-50 dark:bg-[#0A0A0F] transition-colors duration-300">
      <SideDecor />

      {/* ── Nav ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-wood-50/80 dark:bg-[#0A0A0F]/80 backdrop-blur-md border-b border-wood-200/50 dark:border-white/5 transition-colors duration-300">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-display text-[15px] sm:text-[17px] font-bold tracking-tight text-wood-900 dark:text-wood-900">
              Vantive
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-5 text-sm font-medium">
            <Link href="/pricing" className="text-wood-600 transition hover:text-wood-900 dark:text-wood-600 dark:hover:text-wood-900">
              Pricing
            </Link>
            <Link href="/session" className="overflow-hidden rounded-full">
              <ShimmerButton className="h-8 px-3 sm:px-5 py-1 text-xs shadow-sm dark:shadow-none overflow-hidden" shimmerColor="var(--btn-glow-start)" shimmerSize="2px" borderRadius="100px" background="var(--btn-bg)">
                <span className="relative z-10 text-wood-900 group-hover:text-wood-700 transition-colors dark:text-wood-800 dark:group-hover:text-wood-900">Enter Session</span>
              </ShimmerButton>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-14">

        {/* Animated canvas background (Dark Mode Only) */}
        <div className="absolute inset-0 hidden dark:block pointer-events-none">
          <BackgroundBeams className="opacity-40" />
        </div>

        {/* Animated canvas background (Light Mode Only) */}
        <div className="absolute inset-0 dark:hidden pointer-events-none">
          <BackgroundBeamsLight className="opacity-60" />
        </div>

        {/* Subtle radial gradient to center focus */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, transparent 10%, var(--background-gradient-stop, rgba(217, 182, 140, 0.05)) 90%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_50%_50%,transparent_10%,rgba(10,10,15,0.85)_90%)]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-7 text-center">

          {/* Headline — outcome-focused */}
          <h1 className="heading-display max-w-[820px] text-[clamp(40px,8vw,96px)] leading-[1.0] text-wood-900 animate-fade-in-up dark:text-wood-900" style={{ animationDelay: "0.2s" }}>
            Your pitch has holes.
            <br />
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-wood-600 via-wood-500 to-wood-400 animate-text-shimmer bg-[size:200%_auto] dark:from-wood-300 dark:via-wood-400 dark:to-wood-300"
            >
              Find them first.
            </span>
          </h1>

          {/* Sub — tighter, benefit-first */}
          <p className="max-w-[520px] text-[15px] sm:text-[17px] leading-relaxed text-wood-700/80 animate-fade-in-up dark:text-wood-600" style={{ animationDelay: "0.3s" }}>
            7 minutes. No warm-up. A VC-style AI that interrupts, challenges, and
            exposes every weak spot in your pitch — before a real investor does.
          </p>

          {/* CTAs — personalized, action-oriented */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link href="/pricing" className="z-10">
              <ShimmerButton
                shimmerColor="var(--btn-glow-start)"
                shimmerSize="2px"
                borderRadius="100px"
                background="var(--btn-glow-mid)"
                className="shadow-[0_4px_14px_rgba(199,125,77,0.3)] hover:shadow-[0_6px_20px_rgba(199,125,77,0.4)] transition-shadow duration-500 dark:shadow-[0_0_30px_rgba(196,122,74,0.3)] dark:hover:shadow-[0_0_50px_rgba(196,122,74,0.5)]"
              >
                <span className="relative z-10 font-semibold text-white px-2">Pressure-Test My Pitch — $12</span>
              </ShimmerButton>
            </Link>

            <Link
              href="/session"
              className="rounded-full border border-wood-300 bg-wood-200/50 px-7 py-3.5 text-sm font-semibold text-wood-800 transition hover:border-wood-400 hover:bg-wood-200 dark:border-white/10 dark:bg-white/5 dark:text-wood-700 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-wood-900"
            >
              I already have a key
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-1 font-mono text-[11px] tracking-wide text-wood-500 animate-fade-in-up dark:text-[#524E4B]" style={{ animationDelay: "0.5s" }}>
            No account &nbsp;·&nbsp; No recordings &nbsp;·&nbsp; No subscription &nbsp;·&nbsp; Key expires in 24h
          </p>
        </div>
      </section>

      {/* ── Stats strip — reframed around value ── */}
      <div className="relative z-10 border-y border-wood-200 bg-wood-100/50 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02]">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-wood-200 px-4 sm:px-6 dark:divide-white/5">
          {[
            ["7 min", "Harder than most real VC meetings"],
            ["$12", "vs. $500+ for a pitch coach"],
            ["0", "Accounts, subscriptions, or recordings"],
          ].map(([val, label]) => (
            <div key={label} className="flex flex-col items-center gap-1 py-5 sm:py-7">
              <span className="font-display text-lg sm:text-2xl font-bold text-wood-900 dark:text-wood-900">{val}</span>
              <span className="font-mono text-[9px] sm:text-[11px] text-wood-600 dark:text-wood-600">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── VC Firms Marquee ── */}
      <VCMarquee />

      {/* ── How it works ── */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-28 overflow-hidden bg-wood-50 dark:bg-transparent">
        {/* Section glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2"
          style={{ background: "linear-gradient(90deg, transparent, rgba(199,125,77,0.3), transparent)" }}
        />
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 hidden dark:block bg-[linear-gradient(90deg,transparent,rgba(196,122,74,0.4),transparent)]" />

        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-wood-500 dark:text-wood-300">
              What happens when you start
            </span>
          </div>
          <h2 className="heading-display mb-6 text-center text-2xl text-wood-900 sm:text-4xl dark:text-wood-900">
            Most founders fumble before they finish the intro.
          </h2>
          <p className="mx-auto mb-10 sm:mb-16 max-w-xl text-center text-[14px] sm:text-[15px] leading-relaxed text-wood-600 dark:text-wood-600">
            Real VCs decide in the first 60 seconds whether to keep listening. This session replicates that pressure — so you stop wasting real meetings finding out the hard way.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "You pitch. The clock starts.",
                desc: "No warm-up, no pleasantries. 60 seconds of uninterrupted time — exactly like a real partner meeting. What you say here sets the tone for everything that follows.",
              },
              {
                num: "02",
                title: "Every weak spot gets called out.",
                desc: "The AI cuts in the moment your framing goes vague. Buzzwords, hand-waving, unclear asks — all challenged in real time. This is where your pitch actually gets better.",
              },
              {
                num: "03",
                title: "Walk out knowing exactly what to fix.",
                desc: "In 7 minutes you'll know precisely where your pitch breaks down. No fluff, no pep talk — just the clarity you need before the meeting that actually matters.",
              },
            ].map(({ num, title, desc }) => (
              <SpotlightCard key={num} className="p-8 items-start justify-start flex-col gap-4 bg-wood-100 border-wood-200 shadow-sm dark:bg-white/[0.03] dark:border-white/5 dark:shadow-none" spotlightColor="rgba(199, 125, 77, 0.1)">
                <span className="mb-2 block font-mono text-4xl font-bold text-wood-300 dark:text-white/[0.1]">
                  {num}
                </span>
                <h3 className="heading-sans text-[17px] font-semibold text-wood-900 dark:text-wood-900">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-wood-700 dark:text-wood-600">
                  {desc}
                </p>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </section>

      {/* ── Social proof / credibility ── */}
      <section className="relative px-4 sm:px-6 py-14 sm:py-20 bg-wood-50 dark:bg-transparent">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2"
          style={{ background: "linear-gradient(90deg, transparent, rgba(199,125,77,0.2), transparent)" }}
        />
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-wood-500 dark:text-wood-300">
              After the session
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                quote: "I walked into my Sequoia meeting and nothing they asked caught me off guard. That never happened before.",
                who: "Founder pitching small VC funds",
              },
              {
                quote: "I thought my pitch was tight. Vantive found three holes in the first two minutes. Fixed them all before demo day.",
                who: "YC W25 applicant",
              },
            ].map(({ quote, who }) => (
              <div key={who} className="rounded-xl border border-wood-200 bg-wood-100/50 p-6 sm:p-8 dark:border-white/5 dark:bg-white/[0.02]">
                <p className="text-sm leading-relaxed text-wood-700 dark:text-wood-900 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="mt-4 font-mono text-[11px] text-wood-500 dark:text-wood-800">
                  — {who}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section — urgency-driven ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-32 text-center">
        <div
          className="pointer-events-none absolute inset-0 dark:hidden"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(199,125,77,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden dark:block"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(196,122,74,0.12) 0%, transparent 70%)",
          }}
        />

        <div
          className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 dark:hidden"
          style={{ background: "linear-gradient(90deg, transparent, rgba(199,125,77,0.4), transparent)" }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 hidden dark:block"
          style={{ background: "linear-gradient(90deg, transparent, rgba(196,122,74,0.5), transparent)" }}
        />

        <div className="relative z-10 mx-auto max-w-2xl space-y-8">
          <h2 className="heading-display text-3xl text-wood-900 sm:text-5xl dark:text-wood-900">
            Your next meeting won&apos;t wait.
          </h2>
          <p className="text-wood-700 text-lg dark:text-wood-600">
            Neither should your prep. $12 to find out where your pitch breaks — before a real investor does it for you.
          </p>
          <div className="flex justify-center">
            <Link href="/pricing">
              <ShimmerButton
                shimmerColor="var(--btn-glow-start)"
                shimmerSize="2px"
                borderRadius="100px"
                background="var(--btn-glow-mid)"
                className="shadow-[0_4px_14px_rgba(199,125,77,0.3)] hover:shadow-[0_6px_20px_rgba(199,125,77,0.4)] transition-shadow duration-500 py-4 px-10 dark:shadow-[0_0_40px_rgba(196,122,74,0.4)] dark:hover:shadow-[0_0_60px_rgba(196,122,74,0.6)]"
              >
                <span className="relative z-10 font-bold text-white text-base">Pressure-Test My Pitch</span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter />

    </div>
  );
}
