import { aboutContent } from "@/content/about";
import { SafeImage } from "@/components/ui/SafeImage";
import { HoverSelectText } from "@/components/ui/HoverSelectText";

export function About() {
  const {
    title,
    image,
    body,
    technical,
    creator,
    whatIDo,
    whereImHeaded,
    personalLine,
  } = aboutContent;

  return (
    <section id="about" className="section-pad" aria-labelledby="about-heading">
      <div className="container-site">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow)]">
              <SafeImage
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholderLabel="Tech workspace image"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 px-1">
              <p className="text-xs tracking-[0.12em] text-faint uppercase">
                Good tech · Brighter people
              </p>
              <p className="text-xs text-muted">AI · Tools · Systems</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">About</p>
            <h2
              id="about-heading"
              className="display mt-3 text-[clamp(2rem,4vw,3.2rem)]"
            >
              {title}
            </h2>

            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted">
              {body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>
                  <HoverSelectText as="span">{paragraph}</HoverSelectText>
                </p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border bg-elevated/70 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl tracking-[-0.03em]">
                  {technical.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {technical.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-border bg-ink p-6 text-[#f6f3ee]">
                <h3 className="font-[family-name:var(--font-display)] text-xl tracking-[-0.03em]">
                  {creator.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {creator.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-[#d7d2c8]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(31,107,102,0.08),transparent_55%),var(--bg-elevated)] p-7 md:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
                <HoverSelectText as="span">{whatIDo.title}</HoverSelectText>
              </h3>
              <ul className="mt-5 space-y-4">
                {whatIDo.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[1.02rem] leading-relaxed text-muted"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <HoverSelectText as="span">{item}</HoverSelectText>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="mt-10 border-l-2 border-accent pl-5">
              <h3 className="eyebrow">{whereImHeaded.title}</h3>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink/90">
                <HoverSelectText as="span">{whereImHeaded.copy}</HoverSelectText>
              </p>
            </blockquote>

            <p className="mt-10 max-w-xl text-sm italic leading-relaxed text-muted">
              <HoverSelectText as="span">{personalLine}</HoverSelectText>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
