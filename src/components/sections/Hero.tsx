import { heroContent } from "@/content/hero";
import { AnchorButton, MediaKitButton } from "@/components/ui/MediaKitButton";
import { SafeImage } from "@/components/ui/SafeImage";

export function Hero() {
  const { headline, supporting, introduction, image, ctas, credibility } =
    heroContent;

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-[calc(var(--nav-h)+1.5rem)] pb-10 md:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="reveal">
          <p className="eyebrow">{introduction}</p>
          <h1
            id="hero-heading"
            className="display mt-4 max-w-[14ch] text-[clamp(2.35rem,5.4vw,4.35rem)] text-ink"
          >
            {headline}
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted md:text-lg">
            {supporting}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
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
            <MediaKitButton variant="ghost" source="hero" label="View Media Kit" />
          </div>

          <dl className="mt-10 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {credibility.map((item) => (
              <div key={item.label} className="reveal-delay-1">
                <dt className="font-[family-name:var(--font-display)] text-xl tracking-[-0.03em] text-ink sm:text-2xl">
                  {item.value}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow)]">
            <SafeImage
              src={image.src}
              alt={image.alt}
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              placeholderLabel="Hero photograph"
              className="object-cover object-top"
            />
          </div>
          <div
            className="pointer-events-none absolute -bottom-4 -left-4 hidden h-28 w-28 rounded-full bg-accent-soft/80 blur-2xl md:block"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
