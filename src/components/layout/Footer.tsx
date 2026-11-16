import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { siteConfig, navItems, emailIsPlaceholder } from "@/lib/site";
import { Logo } from "./Logo";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-semibold">Navigate</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold">Contact</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-(--radius-control) border border-line bg-surface-2 px-3.5 py-2 text-xs text-ink transition-colors hover:border-line-strong hover:bg-white/5"
            >
              <Mail className="size-3.5 text-brand" />
              <span>{siteConfig.email}</span>
            </a>
            <a
              href={siteConfig.phoneUrl}
              className="inline-flex items-center gap-2 rounded-(--radius-control) border border-line bg-surface-2 px-3.5 py-2 text-xs text-ink transition-colors hover:border-line-strong hover:bg-white/5"
            >
              <Phone className="size-3.5 text-emerald-400" />
              <span>{siteConfig.phone}</span>
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-(--radius-control) border border-line bg-surface-2 px-3.5 py-2 text-xs text-ink transition-colors hover:border-line-strong hover:bg-white/5"
            >
              <WhatsAppIcon className="size-3.5 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
          <ul className="mt-5 flex gap-2.5">
            <li>
              <a
                href={siteConfig.phoneUrl}
                aria-label={`Call ${siteConfig.phone}`}
                title="Call Directly"
                className="inline-flex size-10 items-center justify-center rounded border border-line text-muted transition-colors hover:border-emerald-400 hover:text-emerald-400"
              >
                <Phone className="size-4" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="WhatsApp Direct Chat"
                className="inline-flex size-10 items-center justify-center rounded border border-line text-muted transition-colors hover:border-[#25D366] hover:text-[#25D366]"
              >
                <WhatsAppIcon className="size-4" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Synvora AI on LinkedIn"
                className="inline-flex size-10 items-center justify-center rounded border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <LinkedInIcon className="size-4" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Synvora AI on GitHub"
                className="inline-flex size-10 items-center justify-center rounded border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <GitHubIcon className="size-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-6 text-xs text-muted">
          &copy; {year} Synvora AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
