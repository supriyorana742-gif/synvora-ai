import Image from "next/image";
import Link from "next/link";

/** Synvora AI brand mark with glowing orbital ribbon */
export function LogoMark({ className = "size-11" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-brand/40 bg-slate-900 shadow-[0_0_20px_-3px_rgba(71,123,255,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:border-brand/80 group-hover:shadow-[0_0_25px_-2px_rgba(71,123,255,0.55)] ${className}`}
    >
      <Image
        src="/logo.jpg"
        alt="Synvora AI Logo"
        width={80}
        height={80}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3.5" aria-label="Synvora AI home">
      <LogoMark />
      <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
        Synvora{" "}
        <span className="font-semibold text-brand text-gradient">AI</span>
      </span>
    </Link>
  );
}
