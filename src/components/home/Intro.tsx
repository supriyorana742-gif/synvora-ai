import { X, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const manual = [
  "Requests sit in an inbox until someone has time",
  "Data is copied between tools by hand",
  "Follow-ups depend on someone remembering",
  "Reports are rebuilt every week",
];

const intelligent = [
  "Requests are read, sorted, and routed on arrival",
  "Systems pass data to each other automatically",
  "Reminders and drafts are prepared for you",
  "Reports assemble themselves from live data",
];

export function Intro() {
  return (
    <section className="section-pad border-t border-line">
      <div className="container-page">
        <Reveal>
          <SectionHeading title="The Future of Work Is Intelligent.">
            Most businesses already know which tasks drain their week. Synvora AI replaces those manual steps with
            automated workflows, so your team spends its time on decisions and customers instead of copying, sorting,
            and chasing.
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#111928]/90 to-[#0b101c]/90 backdrop-blur-xl shadow-2xl md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Manual processes */}
            <div className="p-8 sm:p-10 relative overflow-hidden bg-black/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-red-400/90 flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-red-500/15 text-red-400">
                    <X className="size-4" />
                  </span>
                  Manual Bottlenecks
                </h3>
                <span className="text-[10px] uppercase tracking-wider font-mono text-red-400/80 border border-red-500/30 rounded px-2 py-0.5 bg-red-500/10">
                  Legacy Operations
                </span>
              </div>
              <ul className="space-y-4">
                {manual.map((t) => (
                  <li key={t} className="flex gap-3 text-slate-400 text-sm">
                    <X aria-hidden className="mt-1 size-4 shrink-0 text-red-400/80" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Intelligent workflows */}
            <div className="p-8 sm:p-10 relative overflow-hidden bg-gradient-to-br from-brand/10 via-emerald-500/5 to-transparent">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-emerald-500/10 blur-3xl"
              />
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_-3px_rgba(52,211,153,0.4)]">
                    <Check className="size-4" />
                  </span>
                  Intelligent Workflows
                </h3>
                <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-400 border border-emerald-500/30 rounded px-2 py-0.5 bg-emerald-500/15">
                  Synvora Powered
                </span>
              </div>
              <ul className="space-y-4">
                {intelligent.map((t) => (
                  <li key={t} className="flex gap-3 text-white text-sm font-medium">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-emerald-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
