const rawPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 7219687310";
const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+91 7219687310";
const cleanWhatsAppDigits = rawWhatsApp.replace(/\D/g, "");

export const siteConfig = {
  name: "Synvora AI",
  tagline: "Intelligent Automation. Real Business Impact.",
  description:
    "Synvora AI builds intelligent AI agents and automation systems that remove repetitive work, streamline operations, and help companies scale smarter.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "synovoraai@gmail.com",
  phone: rawPhone,
  phoneUrl: `tel:${rawPhone.replace(/\s+/g, "")}`,
  whatsapp: rawWhatsApp,
  whatsappUrl: `https://wa.me/${cleanWhatsAppDigits}?text=${encodeURIComponent("Hello Synvora AI, I'd like to inquire about your automation services.")}`,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Our Work", href: "/our-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** True when the email is still the documented placeholder. */
export const emailIsPlaceholder = siteConfig.email.includes("YOUR-DOMAIN");
