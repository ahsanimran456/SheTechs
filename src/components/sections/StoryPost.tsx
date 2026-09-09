import { storyContent } from "@/content/story";
import { SafeImage } from "@/components/ui/SafeImage";
import { HoverSelectText } from "@/components/ui/HoverSelectText";

export function StoryPost() {
  const {
    eyebrow,
    title,
    lead,
    image,
    body,
    transformation,
    contentCreation,
    closing,
  } = storyContent;

  return (
    <section
      id="story"
      className="section-pad relative overflow-hidden"
      aria-labelledby="story-heading"
    >
      <div className="container-site relative">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="story-heading"
            className="display section-heading mt-3"
          >
            {title}
          </h2>
          <p className="mt-5 text-[1.3rem] leading-relaxed text-ink/90 md:text-[1.4rem]">
            <HoverSelectText as="span">{lead}</HoverSelectText>
          </p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow)]">
              <SafeImage
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 1024px) 100vw, 55vw"
                placeholderLabel="Tech creator workspace"
              />
            </div>
          </div>

          <div className="space-y-5 text-[1.15rem] leading-relaxed text-muted md:text-[1.2rem]">
            {body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>
                <HoverSelectText as="span">{paragraph}</HoverSelectText>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="rounded-[1.75rem] border border-border bg-ink p-7 text-[#f6f3ee] md:p-8">
            <h3 className="subheading mt-2">
              {transformation.title}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {transformation.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[1.05rem] leading-relaxed text-[#d7d2c8]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(31,107,102,0.1),transparent_55%),var(--bg-elevated)] p-7 md:p-8">
              <h3 className="subheading mt-2">
                {contentCreation.title}
              </h3>
              <p className="mt-4 text-[1.15rem] leading-relaxed text-muted md:text-[1.2rem]">
                <HoverSelectText as="span">{contentCreation.copy}</HoverSelectText>
              </p>
            </div>

            <blockquote className="border-l-2 border-accent pl-5">
              <div className="space-y-4 text-[1.15rem] leading-relaxed text-ink/90 md:text-[1.2rem]">
                {closing.map((paragraph) => (
                  <p key={paragraph.slice(0, 36)}>
                    <HoverSelectText as="span">{paragraph}</HoverSelectText>
                  </p>
                ))}
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
