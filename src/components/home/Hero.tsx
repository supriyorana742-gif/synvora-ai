import { Mail } from "lucide-react";
import { ButtonLink, buttonBase, buttonStyles } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { AgentGraph } from "./AgentGraph";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-32">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
            Transforming Businesses Through Intelligent Automation.
          </h1>
          <p className="prose-measure mt-6 text-lg text-muted">
            We build intelligent AI agents and automation systems that eliminate repetitive work, streamline business
            operations, and help companies scale smarter.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/services" arrow>
              Explore Our Services
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Let&apos;s Talk
            </ButtonLink>
            <a
              href={`mailto:${siteConfig.email}`}
              className={`${buttonBase} ${buttonStyles.secondary}`}
            >
              <Mail className="size-4" />
              Email Us
            </a>
          </div>
        </div>
        <AgentGraph />
      </div>
    </section>
  );
}
