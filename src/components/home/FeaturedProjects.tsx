import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function FeaturedProjects() {
  return (
    <section className="section-pad border-t border-line bg-surface/40">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading title="Concept demos we are building.">
              These are our own prototypes, not client work. They show how we approach common problems.
            </SectionHeading>
          </Reveal>
          <ButtonLink href="/our-work" variant="secondary" arrow>
            See all projects
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                <Link
                  href={`/our-work#${p.slug}`}
                  className="group flex h-full flex-col rounded-(--radius-card) border border-line bg-bg p-7 transition-colors hover:border-brand/50"
                >
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-sm border border-violet/40 bg-violet/10 px-2 py-1 text-xs text-[#c4b0ff]">
                    <FlaskConical aria-hidden className="size-3" />
                    {p.status}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 flex-1 text-muted">{p.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                    View details
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
