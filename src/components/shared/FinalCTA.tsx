import { Mail } from "lucide-react";
import { ButtonLink, buttonBase, buttonStyles } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

interface FinalCTAProps {
  title?: string;
  text?: string;
  button?: string;
}

export function FinalCTA({
  title = "Your Business Deserves Smarter Systems.",
  text = "Let's identify the repetitive tasks slowing your business down and build intelligent solutions that move you forward.",
  button = "Start a Conversation",
}: FinalCTAProps) {
  return (
    <section className="section-pad relative overflow-hidden border-t border-line bg-gradient-to-b from-transparent via-[#0d1424]/40 to-transparent">
      {/* 3D Atmospheric Aura */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-80 w-[50rem] max-w-full rounded-full bg-gradient-to-r from-brand/15 via-violet/20 to-emerald-500/15 blur-[120px]"
      />
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl text-white">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300 leading-relaxed">{text}</p>
            <div className="mt-9 flex flex-wrap justify-center items-center gap-3">
              <ButtonLink href="/contact" arrow>
                {button}
              </ButtonLink>
              <a
                href={`mailto:${siteConfig.email}`}
                className={`${buttonBase} ${buttonStyles.secondary}`}
              >
                <Mail className="size-4" />
                Email Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
