import { contactContent } from "@/content/skills";
import { siteConfig } from "@/content/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactForm } from "@/components/sections/ContactForm";
import { HoverSelectText } from "@/components/ui/HoverSelectText";
import { Reveal } from "@/components/ui/Reveal";

const collaborationPaths = [
  "UGC and sponsored campaigns",
  "Educational AI / tech content",
  "Social media collaborations",
  "Also bookable via Collabstr",
] as const;

export function WorkWithMe() {
  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="container-site relative">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Collaborate</p>
          <h2
            id="contact-heading"
            className="display section-heading mt-3"
          >
            {contactContent.title}
          </h2>
          <p className="mt-5 text-[1.15rem] leading-relaxed text-muted md:text-[1.22rem]">
            <HoverSelectText as="span">{contactContent.intro}</HoverSelectText>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div className="space-y-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-[1.85rem] border border-border/80 bg-[linear-gradient(155deg,rgba(31,107,102,0.1),transparent_48%),#fffcf8] p-7 shadow-[0_16px_40px_rgba(20,24,31,0.05)] md:p-8">
                <p className="eyebrow">Start here</p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-[1.45rem] tracking-[-0.03em] text-ink md:text-[1.6rem]">
                  Reach out directly
                </p>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">
                  <HoverSelectText as="span">
                    Share your campaign goals, timeline, and partnership ideas -
                    or email Maham for a faster conversation.
                  </HoverSelectText>
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="btn btn-primary"
                  >
                    Email Maham
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="rounded-[1.85rem] border border-border/80 bg-elevated/90 p-7 shadow-[0_12px_32px_rgba(20,24,31,0.04)] md:p-8">
                <p className="eyebrow">Collaboration paths</p>
                <h3 className="subheading mt-2">
                  Common partnership formats
                </h3>

                <ul className="mt-6 space-y-3">
                  {collaborationPaths.map((path, index) => (
                    <li
                      key={path}
                      className="flex items-start gap-3 rounded-[1.2rem] border border-border/70 bg-[color-mix(in_srgb,var(--bg)_40%,white)] px-4 py-3.5 transition duration-300 hover:border-accent/30"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold tabular-nums text-accent-deep">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-1 text-[1.05rem] leading-snug text-ink/85">
                        {path}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-border/70 pt-6">
                  <p className="mb-3 text-sm text-muted">Connect online</p>
                  <SocialLinks showLabels />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
