import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { getService, services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/shared/FinalCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative overflow-hidden pt-36 pb-14 sm:pt-44">
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/services" className="transition-colors hover:text-ink">
              Services
            </Link>
            <span aria-hidden className="mx-2">/</span>
            <span className="text-ink">{service.title}</span>
          </nav>
          <span className="mt-8 flex size-12 items-center justify-center rounded-(--radius-control) border border-brand/50 bg-brand/10 text-brand">
            <Icon aria-hidden className="size-6" />
          </span>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p className="prose-measure mt-6 text-lg text-muted">{service.short}</p>
          <div className="mt-8">
            <ButtonLink href={`/contact?service=${service.slug}`} arrow>
              Discuss this service
            </ButtonLink>
          </div>
        </div>
      </header>

      <section className="section-pad border-t border-line">
        <div className="container-page grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold">The business problem</h2>
            <p className="prose-measure mt-4 text-muted">{service.problem}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-2xl font-semibold">Our proposed solution</h2>
            <p className="prose-measure mt-4 text-muted">{service.solution}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-line bg-surface/30 relative overflow-hidden">
        <div className="container-page">
          <div className="mb-10 max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              System Architecture
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl text-white mt-1">How the workflow runs</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.workflow.map((step, i) => (
              <div
                key={step.title}
                className="relative h-full flex flex-col justify-between rounded-2xl border border-white/10 bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand/40 hover:bg-surface"
              >
                <div>
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand font-mono text-xs font-bold border border-brand/20">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{step.detail}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-500">
                  Automated Step
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-line">
        <div className="container-page grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-2xl font-semibold">Key features</h2>
            <ul className="mt-6 space-y-4">
              {service.features.map((f) => (
                <li key={f} className="flex gap-3 text-muted">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Potential business benefits</h2>
            <ul className="mt-6 space-y-4">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-muted">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-violet" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted/80">
              Results depend on your process, data, and how the system is adopted. We scope and measure them with you.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-14">
        <div className="container-page">
          <h2 className="text-lg font-semibold">Other services</h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-muted">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
                  {s.title}
                  <ArrowRight aria-hidden className="size-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        title={`Talk to us about ${service.title}.`}
        text="Tell us about the workflow you want to improve. We will reply with questions and a suggested next step."
        button="Start a Conversation"
      />
    </>
  );
}
