import { growthContent } from "@/content/growth";
import { SafeImage } from "@/components/ui/SafeImage";
import { HoverSelectText } from "@/components/ui/HoverSelectText";
import { Reveal } from "@/components/ui/Reveal";

export function GrowthJourney() {
  const { eyebrow, title, lead, image, body, milestones, closing } =
    growthContent;

  return (
    <section
      id="growth"
      className="section-pad relative overflow-hidden"
      aria-labelledby="growth-heading"
    >
      <div
        className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-accent-soft/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="space-y-6">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow)]">
                <SafeImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  placeholderLabel="Portrait photograph"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 px-1">
                <p className="text-xs tracking-[0.12em] text-faint uppercase">
                  Dubai · UAE
                </p>
                <p className="text-xs text-muted">Tech · AI · Growth</p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="rounded-[1.75rem] border border-border/80 bg-[linear-gradient(145deg,rgba(31,107,102,0.1),transparent_50%),#fffcf8] p-6 md:p-7">
                <h3 className="subheading">{milestones.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {milestones.items.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[1.02rem] leading-snug text-ink/85 md:text-[1.08rem]"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold tabular-nums text-accent-deep">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <HoverSelectText as="span">{item}</HoverSelectText>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2
              id="growth-heading"
              className="display section-heading mt-3"
            >
              {title}
            </h2>
            <p className="mt-5 text-[1.2rem] leading-relaxed text-ink/90 md:text-[1.28rem]">
              <HoverSelectText as="span">{lead}</HoverSelectText>
            </p>

            <div className="mt-8 space-y-5 text-[1.12rem] leading-relaxed text-muted md:text-[1.18rem]">
              {body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>
                  <HoverSelectText as="span">{paragraph}</HoverSelectText>
                </p>
              ))}
            </div>

            <blockquote className="mt-10 border-l-2 border-accent pl-5">
              <p className="text-[1.12rem] leading-relaxed text-ink/90 md:text-[1.18rem]">
                <HoverSelectText as="span">{closing}</HoverSelectText>
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
