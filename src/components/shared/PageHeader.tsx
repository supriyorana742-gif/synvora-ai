import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div className="container-page">
        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl">{title}</h1>
        {children && <div className="prose-measure mt-6 text-lg text-muted">{children}</div>}
      </div>
    </header>
  );
}
