import { brands, caseStudies, type Brand } from "@/content/brands";
import { HoverSelectText } from "@/components/ui/HoverSelectText";

function BrandLogo({ brand, compact = false }: { brand: Brand; compact?: boolean }) {
  if (brand.logo) {
    return (
      // Local SVG wordmarks - use <img> for reliable SVG rendering
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={compact ? 140 : 180}
        height={compact ? 48 : 60}
        className={
          compact
            ? "h-10 w-auto object-contain opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
            : "h-12 w-auto object-contain"
        }
      />
    );
  }

  return (
    <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[-0.02em] text-ink/75">
      {brand.name}
    </span>
  );
}

function BrandMark({ brand }: { brand: Brand }) {
  const className =
    "group flex h-16 min-w-[11rem] items-center justify-center rounded-2xl border border-border bg-elevated/80 px-4 transition hover:border-border-strong";

  if (brand.website) {
    return (
      <a
        href={brand.website}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`Visit ${brand.name}`}
      >
        <BrandLogo brand={brand} compact />
      </a>
    );
  }

  return (
    <div className={className}>
      <BrandLogo brand={brand} compact />
    </div>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <BrandLogo brand={brand} />
        {brand.website ? (
          <span className="shrink-0 text-xs font-medium text-accent">Visit ↗</span>
        ) : null}
      </div>
      <p className="mt-4 font-[family-name:var(--font-display)] text-lg tracking-[-0.03em]">
        {brand.name}
      </p>
      <p className="mt-1 text-sm text-muted">{brand.country}</p>
      {brand.category ? (
        <p className="mt-3 text-xs tracking-[0.08em] text-faint uppercase">
          {brand.category}
        </p>
      ) : null}
    </>
  );

  if (brand.website) {
    return (
      <a
        href={brand.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-[1.25rem] border border-border bg-elevated/70 px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white hover:shadow-[0_16px_40px_rgba(20,24,31,0.08)]"
        aria-label={`${brand.name} - open website`}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="rounded-[1.25rem] border border-border bg-elevated/70 px-5 py-4">
      {inner}
    </div>
  );
}

export function Brands() {
  const loop = [...brands, ...brands];

  return (
    <section id="brands" className="section-pad" aria-labelledby="brands-heading">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">Collaborations</p>
          <h2
            id="brands-heading"
            className="display mt-3 text-[clamp(2rem,4vw,3.2rem)]"
          >
            Brands I&apos;ve Worked With
          </h2>
          <p className="mt-4 text-muted">
            <HoverSelectText as="span">
              Confirmed technology, AI, and fintech collaborations across
              regions. Click any brand to open its website.
            </HoverSelectText>
          </p>
        </div>
      </div>

      <div className="mt-10 marquee">
        <div className="marquee-track px-4">
          {loop.map((brand, index) => (
            <BrandMark key={`${brand.id}-${index}`} brand={brand} />
          ))}
        </div>
      </div>

      <div className="container-site mt-12">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <li key={brand.id}>
              <BrandCard brand={brand} />
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
            Featured collaborations
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {caseStudies.map((study) => (
              <article
                key={study.id}
                className="rounded-[1.75rem] border border-border bg-[linear-gradient(160deg,rgba(20,24,31,0.03),transparent_50%),var(--bg-elevated)] p-7"
              >
                <p className="eyebrow">Case study</p>
                <h4 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
                  {study.brand}
                </h4>
                {study.challenge ? (
                  <div className="mt-5">
                    <p className="text-xs font-semibold tracking-[0.12em] text-faint uppercase">
                      Challenge
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {study.challenge}
                    </p>
                  </div>
                ) : null}
                <div className="mt-5">
                  <p className="text-xs font-semibold tracking-[0.12em] text-faint uppercase">
                    What Maham delivered
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/85">
                    {study.delivered}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
