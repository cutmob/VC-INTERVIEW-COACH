import { CtaButton } from "@/components/cta-button";
import { SiteShell } from "@/components/site-shell";

export default function PricingPage() {
  return (
    <SiteShell>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
          <p className="mt-3 text-zinc-300">Buy one access key and run one 7-minute live session.</p>
        </div>

        <section className="mx-auto w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl shadow-black/20">
          <div className="mb-6 flex items-baseline justify-between border-b border-zinc-800 pb-6">
            <div>
              <h2 className="text-xl font-semibold">Pitch Interrogation Session</h2>
              <p className="mt-1 text-sm text-zinc-400">Single use token · Expires in 24 hours</p>
            </div>
            <p className="text-3xl font-bold">$12</p>
          </div>

          <ul className="mb-8 space-y-3 text-sm text-zinc-300">
            <li>• 7-minute realtime voice session</li>
            <li>• VC-style interrogation prompt</li>
            <li>• Immediate interruption + direct pushback</li>
            <li>• No account required</li>
          </ul>

          <CtaButton label="$12 — Buy Access Key" />
        </section>
      </main>
    </SiteShell>
  );
}
