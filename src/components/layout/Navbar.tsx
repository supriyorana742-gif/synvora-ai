"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Mail, ArrowRight } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";
import { buttonBase, buttonStyles } from "@/components/ui/Button";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-[#080d19]/90 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/30"
          : "bg-[#080d19]/60 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-brand focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <div className="container-page flex h-20 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
          {navItems.slice(1, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`rounded-xl px-4 py-2 text-[15px] font-medium transition-all ${
                isActive(pathname, item.href)
                  ? "text-white bg-white/10 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className="sr-only"
          >
            Home
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all"
          >
            <Mail className="size-4" />
            <span>Email Us</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-brand hover:bg-[#5b8aff] px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:shadow-[0_0_25px_-3px_rgba(71,123,255,0.5)] transition-all"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-12 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden hover:bg-white/5 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="container-page pb-8 pt-2 lg:hidden">
          <ul className="divide-y divide-line border-y border-line">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`block py-4 font-display text-2xl ${
                    isActive(pathname, item.href) ? "text-ink" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={() => setOpen(false)}
              className={`${buttonBase} ${buttonStyles.secondary} w-full`}
            >
              <Mail className="size-4" />
              Email ({siteConfig.email})
            </a>
            <Link href="/contact" onClick={() => setOpen(false)} className={`${buttonBase} ${buttonStyles.primary} w-full`}>
              Let&apos;s Talk
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
