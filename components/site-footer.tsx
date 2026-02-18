import Link from "next/link";
import { VantiveLogo } from "@/components/icons/vantive-logo";

export function SiteFooter() {
    return (
        <footer className="w-full border-t border-wood-200 bg-wood-50 px-4 sm:px-6 py-8 sm:py-12 dark:border-white/5 dark:bg-transparent">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">

                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                        <VantiveLogo className="h-full w-full" />
                    </div>
                    <span className="font-display text-sm font-bold text-wood-800 dark:text-[#524E4B]">
                        Vantive
                    </span>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                    <Link
                        href="/terms"
                        className="text-wood-600 transition hover:text-wood-900 dark:text-wood-500 dark:hover:text-wood-300"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        href="/privacy"
                        className="text-wood-600 transition hover:text-wood-900 dark:text-wood-500 dark:hover:text-wood-300"
                    >
                        Privacy Policy
                    </Link>

                </div>

                {/* Copyright / Info */}
                <div className="text-left md:text-right">
                    <p className="font-mono text-[10px] text-wood-500 dark:text-[#3D3A38]">
                        No accounts. No saved data. One session per key.
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-wood-400 dark:text-[#2C2A29]">
                        © {new Date().getFullYear()} Vantive. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
