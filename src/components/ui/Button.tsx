import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-(--radius-control) px-5 py-3 text-sm font-medium transition-[background,border-color,box-shadow,transform] duration-200 active:translate-y-px";

export const buttonStyles: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-[#5b8aff] hover:shadow-glow",
  secondary:
    "border border-line-strong text-ink hover:border-white/40 hover:bg-white/5",
  ghost: "text-muted hover:text-ink",
};

export function ButtonLink({ variant = "primary", arrow = false, children, className = "", ...props }: ButtonLinkProps) {
  return (
    <Link className={`${base} ${buttonStyles[variant]} ${className}`} {...props}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  );
}

export { base as buttonBase };
