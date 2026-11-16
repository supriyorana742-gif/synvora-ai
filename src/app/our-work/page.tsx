import { ArrowRight, FlaskConical, Info, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/data/projects";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/shared/FinalCTA";

export const metadata = buildMetadata({
  title: "Our Work: AI Concept Demos",
  description:
    "Concept demos and prototypes from Synvora AI: lead management, a WhatsApp assistant, recruitment workflow, and a business research assistant.",
  path: "/our-work",
});

export default function OurWorkPage() {
  return (
    <>
      <PageHeader title="Concept demos and prototypes.">
        <p>How we would approach four common problems, shown as architecture and scope.</p>
      </PageHeader>

      <div className="container-page">
        <div
          role="note"
          className="flex gap-3 rounded-(--radius-card) border border-violet/40 bg-violet/10 p-5 text-sm text-[#d6c9ff]"
        >
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          <p>
            Everything on this page is a Synvora AI concept demo or prototype. None of it is client work, and we do
            not publish results we have not measured. Screenshots will be added here as each demo is built and
            published.
          </p>
        </div>
      </div>

      <div className="container-page pb-24 pt-14 lg:pb-32">
        <div className="space-y-20">
          {projects.map((p) => (
            <article key={p.slug} id={p.slug} className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 rounded-sm border border-violet/40 bg-violet/10 px-2 py-1 text-xs text-[#c4b0ff]">
                  <FlaskConical aria-hidden className="size-3" />
                  {p.status}
                </span>
                <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">{p.title}</h2>
                <p className="mt-4 text-muted">{p.summary}</p>

                <h3 className="mt-8 text-sm font-semibold">Problem</h3>
                <p className="mt-2 text-muted">{p.problem}</p>

                <h3 className="mt-6 text-sm font-semibold">Technology stack</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <li key={t} className="rounded-sm border border-line px-2.5 py-1 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 sm:p-8 backdrop-blur-sm transition-colors hover:border-brand/40">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Solution Architecture
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <Sparkles className="size-3" /> Autonomous Flow
                    </span>
                  </div>
                  <ol className="flex flex-col">
                    {p.architecture.map((stage, i) => (
                      <li key={stage} className="flex flex-col">
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 font-medium shadow-sm hover:border-brand/50 transition-colors">
                          {stage}
                        </div>
                        {i < p.architecture.length - 1 && (
                          <ArrowRight aria-hidden className="my-2 ml-5 size-4 rotate-90 text-brand animate-pulse" />
                        )}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 border-t border-white/10 pt-4 text-xs text-muted">
                    Full production architecture &bull; Custom integrations available upon request.
                  </p>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
      <FinalCTA
        title="Want one of these built for your business?"
        text="Tell us about your workflow and we will scope what a first version could look like."
        button="Start a Conversation"
      />
    </>
  );
}
