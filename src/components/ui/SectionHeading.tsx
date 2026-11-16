import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  children?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
}

export function SectionHeading({ title, children, as: Tag = "h2", align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto text-center" : ""}>
      <Tag className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">{title}</Tag>
      {children && (
        <p className={`prose-measure mt-5 text-lg text-muted ${align === "center" ? "mx-auto" : ""}`}>{children}</p>
      )}
    </div>
  );
}
