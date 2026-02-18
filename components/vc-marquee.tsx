"use client";

import Marquee from "react-fast-marquee";

/* ─── Logo.dev CDN config ──────────────────────────────────────────── */
/* Publishable key — safe for client-side use.                         */
/* IMPORTANT: "Allowed domains only" is ON in the Logo.dev dashboard.  */
/* Make sure localhost AND your production domain are added there.      */
const LOGO_TOKEN = "pk_OQ3qX0tbQTi9WomDAvTNZg";
const logoUrl = (domain: string) =>
    `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=120&format=png`;

/* ─── VC Firm data ─────────────────────────────────────────────────── */
interface VCFirm {
    name: string;
    domain: string;
}

const ROW_1: VCFirm[] = [
    { name: "Y Combinator", domain: "ycombinator.com" },
    { name: "Sequoia Capital", domain: "sequoiacap.com" },
    { name: "Andreessen Horowitz", domain: "a16z.com" },
    { name: "Accel", domain: "accel.com" },
    { name: "Benchmark", domain: "benchmark.com" },
    { name: "Lightspeed", domain: "lsvp.com" },
    { name: "Bessemer", domain: "bvp.com" },
    { name: "Greylock", domain: "greylock.com" },
    { name: "Kleiner Perkins", domain: "kleinerperkins.com" },
    { name: "Index Ventures", domain: "indexventures.com" },
    { name: "General Catalyst", domain: "generalcatalyst.com" },
    { name: "Founders Fund", domain: "foundersfund.com" },
    { name: "Khosla Ventures", domain: "khoslaventures.com" },
    { name: "NEA", domain: "nea.com" },
    { name: "Tiger Global", domain: "tigerglobal.com" },
    { name: "Insight Partners", domain: "insightpartners.com" },
    { name: "GV", domain: "gv.com" },
    { name: "Ribbit Capital", domain: "ribbitcap.com" },
    { name: "First Round", domain: "firstround.com" },
    { name: "Union Square Ventures", domain: "usv.com" },
    { name: "Felicis", domain: "felicis.com" },
    { name: "IVP", domain: "ivp.com" },
    { name: "Battery Ventures", domain: "battery.com" },
    { name: "Spark Capital", domain: "sparkcapital.com" },
    { name: "Lux Capital", domain: "luxcapital.com" },
];

const ROW_2: VCFirm[] = [
    { name: "Redpoint", domain: "redpoint.com" },
    { name: "Norwest", domain: "nvp.com" },
    { name: "Sapphire Ventures", domain: "sapphireventures.com" },
    { name: "Coatue", domain: "coatue.com" },
    { name: "TCV", domain: "tcv.com" },
    { name: "Craft Ventures", domain: "craftventures.com" },
    { name: "Initialized", domain: "initialized.com" },
    { name: "Emergence", domain: "emcap.com" },
    { name: "SOSV", domain: "sosv.com" },
    { name: "500 Global", domain: "500.co" },
    { name: "Techstars", domain: "techstars.com" },
    { name: "SV Angel", domain: "svangel.com" },
    { name: "Floodgate", domain: "floodgate.com" },
    { name: "True Ventures", domain: "trueventures.com" },
    { name: "Menlo Ventures", domain: "menlovc.com" },
    { name: "Scale VP", domain: "scalevp.com" },
    { name: "Bain Capital Ventures", domain: "baincapitalventures.com" },
    { name: "8VC", domain: "8vc.com" },
    { name: "Wing VC", domain: "wing.vc" },
    { name: "SignalFire", domain: "signalfire.com" },
    { name: "QED Investors", domain: "qedinvestors.com" },
    { name: "Maveron", domain: "maveron.com" },
    { name: "Shasta Ventures", domain: "shastaventures.com" },
    { name: "Foundry Group", domain: "foundrygroup.com" },
    { name: "Obvious Ventures", domain: "obvious.com" },
];

/* ─── Logo Chip ───────────────────────────────────────────────────── */

function VCLogo({ firm }: { firm: VCFirm }) {
    return (
        <div className="vc-logo-chip group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={logoUrl(firm.domain)}
                alt={`${firm.name} logo`}
                width={36}
                height={36}
                loading="lazy"
                referrerPolicy="origin"
                className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 object-contain rounded-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300 dark:brightness-90 dark:group-hover:brightness-110"
            />
            <span className="vc-logo-text">{firm.name}</span>
        </div>
    );
}

/* ─── Marquee Section ─────────────────────────────────────────────── */

export function VCMarquee() {
    return (
        <section className="relative px-0 py-14 sm:py-20 overflow-hidden bg-wood-50 dark:bg-transparent">
            {/* Top glow line */}
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(199,125,77,0.2), transparent)",
                }}
            />

            {/* Section header */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 mb-10 sm:mb-14 text-center">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-wood-500 dark:text-wood-300">
                    Trusted by founders raising from
                </span>
                <h2 className="heading-display mt-3 text-2xl text-wood-900 sm:text-4xl dark:text-wood-900">
                    Prepare for your meeting with the best.
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-[14px] sm:text-[15px] leading-relaxed text-wood-600 dark:text-wood-600">
                    Our AI is trained on how partners at these firms actually think,
                    probe, and decide — so you walk in ready.
                </p>
            </div>

            {/* Marquee rows */}
            <div className="space-y-5 sm:space-y-6">
                {/* Row 1 — scrolls left */}
                <div className="vc-marquee-fade">
                    <Marquee
                        speed={28}
                        gradient={false}
                        pauseOnHover
                        className="overflow-hidden"
                    >
                        {ROW_1.map((firm) => (
                            <VCLogo key={firm.name} firm={firm} />
                        ))}
                    </Marquee>
                </div>

                {/* Row 2 — scrolls right */}
                <div className="vc-marquee-fade">
                    <Marquee
                        speed={22}
                        gradient={false}
                        direction="right"
                        pauseOnHover
                        className="overflow-hidden"
                    >
                        {ROW_2.map((firm) => (
                            <VCLogo key={firm.name} firm={firm} />
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
}
