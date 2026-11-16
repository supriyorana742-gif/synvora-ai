"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[70dvh] flex-col items-start justify-center pt-24" role="alert">
      <h1 className="text-3xl font-semibold sm:text-4xl">Something went wrong.</h1>
      <p className="prose-measure mt-4 text-muted">
        The page could not load. Try again, and if it keeps happening, email us and mention what you were doing.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-(--radius-control) bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5b8aff]"
      >
        Try again
      </button>
    </section>
  );
}
