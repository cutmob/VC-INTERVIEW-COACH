import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { SiteFooter } from "./site-footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-10 pt-6">
      <header className="mb-12 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-[17px] font-bold tracking-tight text-wood-900">
            Vantive
          </span>
          <span className="rounded-full border border-wood-300 bg-wood-200/50 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-wood-700">
            Beta
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link href="/pricing" className="text-wood-600 transition hover:text-wood-900">
            Pricing
          </Link>
          <span className="glow-btn-wrap">
            <Link
              href="/session"
              className="glow-btn-inner border border-wood-200 px-4 py-1.5 text-sm font-medium text-wood-800 transition hover:text-wood-900 hover:bg-wood-100 dark:border-white/10 dark:text-wood-800 dark:hover:text-wood-900 dark:hover:bg-white/5"
            >
              Enter Session
            </Link>
          </span>
          <ThemeToggle />
        </nav>
      </header>
      {children}
      <SiteFooter />
    </div>
  );
}
