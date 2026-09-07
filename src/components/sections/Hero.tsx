"use client";

import { heroContent } from "@/content/hero";
import { AnchorButton } from "@/components/ui/AnchorButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { HoverSelectText } from "@/components/ui/HoverSelectText";
import { TiltCard } from "@/components/ui/TiltCard";

export function Hero() {
  const { headline, supporting, introduction, image, ctas, credibility } =
    heroContent;

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-[calc(var(--nav-h)+1.5rem)] pb-10 md:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="hero-orb -left-16 top-24 h-56 w-56 bg-accent-soft/70" aria-hidden="true" />
      <div
        className="hero-orb right-[-4rem] top-40 h-64 w-64 bg-[rgba(20,24,31,0.08)]"
        style={{ animationDelay: "1.4s" }}
        aria-hidden="true"
      />

      <div className="container-site relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className="eyebrow reveal">{introduction}</p>
          <h1
            id="hero-heading"
            className="display reveal reveal-delay-1 mt-4 max-w-[14ch] text-[clamp(2.15rem,4.8vw,3.85rem)] text-ink"
          >
            {headline}
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted md:text-lg">
            <HoverSelectText as="span">{supporting}</HoverSelectText>
          </p>

          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <AnchorButton href={ctas.primary.href} eventLabel={ctas.primary.label}>
              {ctas.primary.label}
            </AnchorButton>
            <AnchorButton
              href={ctas.secondary.href}
              variant="secondary"
              eventLabel={ctas.secondary.label}
            >
              {ctas.secondary.label}
            </AnchorButton>
          </div>

          <dl className="reveal reveal-delay-3 mt-10 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {credibility.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-transparent p-2 transition hover:border-border hover:bg-elevated/70"
              >
                <dt className="font-[family-name:var(--font-display)] text-xl tracking-[-0.03em] text-ink sm:text-2xl">
                  {item.value}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="hero-float">
            <TiltCard className="rounded-[2rem]" maxTilt={7}>
              <div className="hero-photo-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow)]">
                <SafeImage
                  src={image.src}
                  alt={image.alt}
                  priority
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  placeholderLabel="Hero photograph"
                  className="object-cover object-top"
                />
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
