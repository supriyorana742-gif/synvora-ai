import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function HowWeWork() {
  return (
    <section className="section-pad border-t border-line bg-surface/40">
      <div className="container-page">
        <Reveal>
          <SectionHeading title="How we work">
            A short, clear path from a rough idea to a system running in your business.
          </SectionHeading>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div
            aria-hidden
            className="absolute left-[1.15rem] top-2 hidden h-px w-[calc(100%-2.3rem)] bg-gradient-to-r from-brand/60 via-violet/60 to-line md:block"
          />
          {processSteps.map((step, i) => (
            <li key={step.n} className="relative flex gap-5 md:block">
              <Reveal delay={i * 0.08}>
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/60 bg-bg font-display text-sm font-semibold text-brand">
                  {step.n}
                </span>
                <h3 className="mt-0 text-xl font-semibold md:mt-6">{step.title}</h3>
                <p className="mt-2 text-muted">{step.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
