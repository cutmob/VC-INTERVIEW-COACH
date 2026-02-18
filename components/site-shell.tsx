import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-8 pt-6">
      <header className="mb-12 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          PitchCoach
        </Link>
        <nav className="flex items-center gap-5 text-sm text-zinc-300">
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/session" className="hover:text-white">
            Session
          </Link>
        </nav>
      </header>
      {children}
      <footer className="mt-auto border-t border-zinc-800 pt-6 text-xs text-zinc-500">
        Live pitch interrogation tool. No accounts. No saved data.
      </footer>
    </div>
  );
}
