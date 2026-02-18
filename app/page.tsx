import { ButtonLink } from "@/components/ui/button-link";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <main className="flex flex-1 flex-col items-center justify-center gap-8 py-12 text-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">Realtime AI Pitch Coach</p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">Practice Your Pitch. Get Interrupted.</h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-300">7 minutes. Live pressure. No fluff, no praise, no motivational filler.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/pricing">Buy Access Key</ButtonLink>
          <ButtonLink href="/session" variant="ghost">
            I Already Have a Token
          </ButtonLink>
        </div>

        <section className="grid w-full max-w-4xl gap-4 pt-8 sm:grid-cols-3">
          {[
            ["60-second opener", "The coach starts strict and cuts vague framing quickly."],
            ["Hard interruptions", "Rambling gets stopped. You are forced to be specific."],
            ["Single-session token", "Pay once, receive one key, run one live session."]
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-left">
              <h2 className="mb-2 text-sm font-semibold text-zinc-100">{title}</h2>
              <p className="text-sm text-zinc-400">{desc}</p>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
