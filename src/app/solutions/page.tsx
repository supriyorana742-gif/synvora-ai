import { Check, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { solutions } from "@/data/solutions";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCTA } from "@/components/shared/FinalCTA";

export const metadata = buildMetadata({
  title: "AI Automation Solutions by Industry",
  description:
    "How AI automation can help startups, marketing agencies, real estate, e-commerce, recruitment agencies, and small and medium businesses.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader title="Solutions for the way your industry works.">
        <p>
          The examples below show what we can design for each kind of business. They are proposals for discussion, not
          descriptions of finished deployments or existing integrations.
        </p>
      </PageHeader>

      <div className="container-page pb-24 lg:pb-32">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <section key={s.id} id={s.id} className="grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-start">
                <Reveal>
                  <span className="flex size-12 items-center justify-center rounded-xl border border-brand/40 bg-brand/10 text-brand shadow-[0_0_20px_-3px_rgba(71,123,255,0.3)]">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold sm:text-3xl text-white">{s.title}</h2>
                  <p className="mt-3 text-slate-300 leading-relaxed">{s.intro}</p>
                  <div className="mt-8">
                    <ButtonLink href="/contact" variant="secondary" arrow>
                      Discuss your case
                    </ButtonLink>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="rounded-2xl border border-white/10 bg-surface/50 p-7 sm:p-9 backdrop-blur-sm transition-colors hover:border-brand/40">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                        Automated Capabilities
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <Sparkles className="size-3 text-brand" /> Synvora Blueprint
                      </span>
                    </div>
                    <ul className="space-y-6">
                      {s.examples.map((ex) => (
                        <li key={ex.title} className="flex gap-4 items-start">
                          <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <Check aria-hidden className="size-3" />
                          </span>
                          <div>
                            <h3 className="text-base font-semibold text-white">{ex.title}</h3>
                            <p className="mt-1 text-sm text-muted leading-relaxed">{ex.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </div>
      <FinalCTA />
    </>
  );
}
