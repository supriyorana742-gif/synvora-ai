export default function Loading() {
  return (
    <div className="container-page flex min-h-[60dvh] items-center justify-center pt-24" role="status" aria-live="polite">
      <span className="size-8 animate-spin rounded-full border-2 border-line-strong border-t-brand" aria-hidden />
      <span className="sr-only">Loading page</span>
    </div>
  );
}
