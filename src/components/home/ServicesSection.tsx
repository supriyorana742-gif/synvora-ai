import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.slug} className="bg-bg">
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col p-7 transition-colors hover:bg-surface sm:p-8"
            >
              <span className="flex size-11 items-center justify-center rounded-(--radius-control) border border-line-strong text-brand transition-colors group-hover:border-brand/60 group-hover:bg-brand/10">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 flex-1 text-muted">{s.short}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                Learn more
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ServicesSection() {
  return (
    <section className="section-pad border-t border-line">
      <div className="container-page">
        <Reveal>
          <SectionHeading title="Six ways we put automation to work.">
            Each service starts with your process, not a template. Choose one, or combine them.
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <ServiceGrid />
        </Reveal>
      </div>
    </section>
  );
}
