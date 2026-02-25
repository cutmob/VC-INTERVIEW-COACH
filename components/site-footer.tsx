import Link from "next/link";
import { PitchCoachLogo } from "@/components/icons/pitchcoach-logo";

export function SiteFooter() {
    return (
        <footer className="w-full border-t border-wood-200 bg-wood-50 dark:border-white/5 dark:bg-transparent">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">

                {/* Top row: brand + nav links */}
                <div className="flex flex-col items-start gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">

                    {/* Brand */}
                    <Link href="/" className="group flex items-center gap-2.5">
                        <div className="h-7 w-7 overflow-hidden rounded-full transition-opacity group-hover:opacity-80">
                            <PitchCoachLogo className="h-full w-full" />
                        </div>
                        <span className="font-display text-sm font-bold text-wood-800 dark:text-wood-700">
                            PitchCoach
                        </span>
                    </Link>

                    {/* Nav links */}
                    <nav className="flex items-center gap-6 text-[13px]" aria-label="Footer navigation">
                        <Link
                            href="/pricing"
                            className="text-wood-500 transition hover:text-wood-800 dark:text-wood-600 dark:hover:text-wood-300"
                        >
                            Pricing
                        </Link>
                        <span className="h-3 w-px bg-wood-200 dark:bg-white/10" aria-hidden="true" />
                        <a
                            href="https://github.com/cutmob/pitchcoach"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-wood-500 transition hover:text-wood-800 dark:text-wood-600 dark:hover:text-wood-300"
                        >
                            GitHub
                        </a>
                    </nav>
                </div>

                {/* Bottom row: tagline + copyright */}
                <div className="flex flex-col items-start gap-2 border-t border-wood-200/60 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.04]">
                    <p className="font-mono text-[10px] tracking-wide text-wood-400 dark:text-[#3D3A38]">
                        No accounts · No saved data · Key valid for 24 hours
                    </p>
                    <p className="font-mono text-[10px] text-wood-400 dark:text-[#2C2A29]">
                        © {new Date().getFullYear()} PitchCoach
                    </p>
                </div>
            </div>
        </footer>
    );
}
