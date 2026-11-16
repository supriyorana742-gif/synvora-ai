import Image from "next/image";
import { Compass, Target, ShieldCheck, Layers } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { founders } from "@/data/founder";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { LinkedInIcon } from "@/components/ui/SocialIcons";

export const metadata = buildMetadata({
  title: "About Synvora AI",
  description:
    "Synvora AI is an emerging technology venture building practical AI agents and automation systems for businesses.",
  path: "/about",
});

const principles = [
  {
    icon: Layers,
    title: "Start small, prove it",
    text: "We build a working first version on your real data before anyone commits to a larger system.",
  },
  {
    icon: ShieldCheck,
    title: "People stay in charge",
    text: "Sensitive actions go through a person. Automation handles the routine, not the judgement.",
  },
  {
    icon: Target,
    title: "Honest about results",
    text: "We do not promise numbers we cannot measure. We agree how success is judged before we build.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="We Believe Technology Should Work Smarter.">
        <p>
          Synvora AI is an emerging technology venture. We are early, and we are building carefully: practical AI
          systems that solve a defined problem for a real business.
        </p>
      </PageHeader>

      <section className="section-pad border-t border-line">
        <div className="container-page grid gap-14 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Compass aria-hidden className="size-6 text-brand" />
            <h2 className="mt-4 text-2xl font-semibold">Our vision</h2>
            <p className="prose-measure mt-3 text-muted">
              A business of any size should be able to use intelligent automation without a large technical team.
              Routine work runs itself, and people spend their time on the work only people can do.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Target aria-hidden className="size-6 text-violet" />
            <h2 className="mt-4 text-2xl font-semibold">Our mission</h2>
            <p className="prose-measure mt-3 text-muted">
              Help businesses eliminate repetitive manual work, improve operational efficiency, and scale through
              intelligent AI-powered systems.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-line bg-surface/40">
        <div className="container-page">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">Our approach to practical AI</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line md:grid-cols-3">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.title} className="bg-bg p-7">
                  <Icon aria-hidden className="size-5 text-brand" />
                  <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section-pad border-t border-line">
        <div className="container-page">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-4xl">Meet the leadership</h2>
            <p className="mt-3 text-muted">
              The team building intelligent AI solutions and automation systems at Synvora AI.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-14">
            {founders.map((person, idx) => (
              <Reveal key={person.name} delay={idx * 0.08}>
                <div className="grid items-start gap-8 sm:grid-cols-[13rem_1fr]">
                  <div className="flex aspect-[4/5] w-full max-w-[13rem] items-center justify-center overflow-hidden rounded-(--radius-card) border border-line bg-surface">
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={`Portrait of ${person.name}`}
                        width={480}
                        height={600}
                        className="size-full object-cover"
                      />
                    ) : (
                      <span className="px-4 text-center text-xs text-muted">
                        {person.name === "Supriyo Rana" ? "Founder Photo" : "Co-Founder Photo"}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{person.name}</h3>
                    <p className="mt-1 font-display text-sm font-medium text-brand">
                      {person.role}
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-muted leading-relaxed">
                      {person.bio.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                    </div>
                    {person.linkedin && (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-ink"
                      >
                        <LinkedInIcon className="size-3.5" /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
