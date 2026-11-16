import { Mail, Clock, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig, emailIsPlaceholder } from "@/lib/site";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { buttonBase, buttonStyles } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Tell Synvora AI about the repetitive work slowing your business down. Send an inquiry and we will reply with next steps.",
  path: "/contact",
});

interface PageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const { service } = await searchParams;

  return (
    <>
      <PageHeader title="Tell us what is slowing you down.">
        <p>Share a few details about your business and the task you want to automate. We will reply by email.</p>
      </PageHeader>

      <section className="pb-24 lg:pb-32">
        <div className="container-page grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <ContactForm defaultService={service} turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined} />

          <aside className="space-y-6 lg:pt-1">
            {/* Quick Action Bar for Direct Applications */}
            <div className="rounded-2xl border border-line bg-surface/50 p-5 backdrop-blur-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Direct Channels</h2>
              <p className="mt-1 text-xs text-muted">Click any icon to launch its application and connect directly.</p>
              <div className="mt-4 flex gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Send Email"
                  title="Send Email"
                  className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-brand transition-all hover:scale-105 hover:border-brand hover:shadow-glow"
                >
                  <Mail className="size-5" />
                </a>
                <a
                  href={siteConfig.phoneUrl}
                  aria-label={`Call ${siteConfig.phone}`}
                  title="Call Us Directly"
                  className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-emerald-400 transition-all hover:scale-105 hover:border-emerald-400/60 hover:shadow-[0_0_20px_-3px_rgba(52,211,153,0.3)]"
                >
                  <Phone className="size-5" />
                </a>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  title="Chat directly on WhatsApp"
                  className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-[#25D366] transition-all hover:scale-105 hover:border-[#25D366]/60 hover:shadow-[0_0_20px_-3px_rgba(37,211,102,0.3)]"
                >
                  <WhatsAppIcon className="size-5" />
                </a>
              </div>
            </div>

            {/* Email Option */}
            <div className="rounded-xl border border-line/60 bg-surface/30 p-5">
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-brand transition-colors hover:border-brand"
                  aria-label="Email icon"
                >
                  <Mail className="size-4" />
                </a>
                <h2 className="text-base font-semibold">Email</h2>
              </div>
              <a href={`mailto:${siteConfig.email}`} className="mt-2 block text-sm text-muted transition-colors hover:text-ink">
                {siteConfig.email}
              </a>
              <div className="mt-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={`${buttonBase} ${buttonStyles.secondary} !py-2 !px-4 text-xs`}
                >
                  <Mail className="size-3.5" />
                  Send Email Directly
                </a>
              </div>
              {emailIsPlaceholder && <p className="mt-2 text-xs text-muted/70">Placeholder until configured.</p>}
            </div>

            {/* Phone Option */}
            <div className="rounded-xl border border-line/60 bg-surface/30 p-5">
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.phoneUrl}
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-emerald-400 transition-colors hover:border-emerald-400"
                  aria-label="Call directly"
                >
                  <Phone className="size-4" />
                </a>
                <h2 className="text-base font-semibold">Phone Call</h2>
              </div>
              <a href={siteConfig.phoneUrl} className="mt-2 block text-sm text-muted transition-colors hover:text-ink">
                {siteConfig.phone}
              </a>
              <div className="mt-3">
                <a
                  href={siteConfig.phoneUrl}
                  className={`${buttonBase} ${buttonStyles.secondary} !py-2 !px-4 text-xs hover:border-emerald-400/40`}
                >
                  <Phone className="size-3.5 text-emerald-400" />
                  Call Directly
                </a>
              </div>
            </div>

            {/* WhatsApp Option */}
            <div className="rounded-xl border border-line/60 bg-surface/30 p-5">
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-[#25D366] transition-colors hover:border-[#25D366]"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="size-4" />
                </a>
                <h2 className="text-base font-semibold">WhatsApp</h2>
              </div>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-muted transition-colors hover:text-ink"
              >
                {siteConfig.whatsapp}
              </a>
              <div className="mt-3">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonBase} ${buttonStyles.secondary} !py-2 !px-4 text-xs hover:border-[#25D366]/40 hover:text-[#25D366]`}
                >
                  <WhatsAppIcon className="size-3.5 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* What happens next */}
            <div>
              <Clock aria-hidden className="size-5 text-violet" />
              <h2 className="mt-3 text-lg font-semibold">What happens next</h2>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                We read every inquiry and reply by email or direct message with questions and next steps. Please do not send
                passwords or sensitive customer data through this form.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
