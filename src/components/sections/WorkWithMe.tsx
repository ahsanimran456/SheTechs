import { contactContent } from "@/content/skills";
import { siteConfig } from "@/content/site";
import { MediaKitButton } from "@/components/ui/MediaKitButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactForm } from "@/components/sections/ContactForm";
import { HoverSelectText } from "@/components/ui/HoverSelectText";

export function WorkWithMe() {
  return (
    <section
      id="contact"
      className="section-pad"
      aria-labelledby="contact-heading"
    >
      <div className="container-site grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
          <p className="eyebrow">Collaborate</p>
          <h2
            id="contact-heading"
            className="display mt-3 text-[clamp(2rem,4vw,3.2rem)]"
          >
            {contactContent.title}
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            <HoverSelectText as="span">{contactContent.intro}</HoverSelectText>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MediaKitButton variant="primary" source="work-with-me" label="View Media Kit" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn btn-secondary"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-border bg-elevated/70 p-6">
            <p className="text-sm font-medium text-ink">Collaboration paths</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>UGC and sponsored campaigns</li>
              <li>Educational AI / tech content</li>
              <li>Social media collaborations</li>
              <li>Also bookable via Collabstr</li>
            </ul>
            <div className="mt-6">
              <SocialLinks showLabels />
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
