import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-10 pt-6">
      <header className="mb-12 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-[17px] font-bold tracking-tight text-white">
            Vantive
          </span>
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-violet-400">
            Beta
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link href="/pricing" className="text-zinc-400 transition hover:text-white">
            Pricing
          </Link>
          <span className="glow-btn-wrap">
            <Link
              href="/session"
              className="glow-btn-inner border border-zinc-700/60 px-4 py-1.5 text-sm font-medium text-zinc-200 transition hover:text-white"
            >
              Enter Session
            </Link>
          </span>
        </nav>
      </header>
      {children}
      <footer className="mt-auto border-t border-white/5 pt-8">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs font-bold text-zinc-700">Vantive</span>
          <span className="font-mono text-[10px] text-zinc-700">
            No accounts. No saved data. One session per key.
          </span>
        </div>
      </footer>
    </div>
  );
}
