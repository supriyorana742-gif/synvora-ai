import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/data/solutions";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function IndustrySection() {
  return (
    <section className="section-pad border-t border-line relative overflow-hidden">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.3fr] items-center">
        <Reveal>
          <SectionHeading title="Architected For Your Industry.">
            Proven AI agent frameworks and autonomous pipelines tailored to the operational realities of high-growth sectors.
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-3">
            {solutions.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id}>
                  <Link
                    href={`/solutions#${s.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/60 hover:bg-white/10 hover:shadow-[0_10px_30px_-5px_rgba(71,123,255,0.2)]"
                  >
                    <span className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-brand group-hover:border-brand group-hover:scale-110 transition-all">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="flex-1 font-display text-base sm:text-lg font-semibold text-white group-hover:text-brand transition-colors">
                      {s.title}
                    </span>
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 text-slate-400 group-hover:border-brand group-hover:text-white transition-all">
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
