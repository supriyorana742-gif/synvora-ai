import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70dvh] flex-col items-start justify-center pt-24">
      <p className="font-display text-7xl font-semibold text-gradient sm:text-8xl">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">This page does not exist.</h1>
      <p className="prose-measure mt-4 text-muted">
        The link may be broken or the page may have moved. Go back home or browse our services.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          View services
        </ButtonLink>
      </div>
    </section>
  );
}
