"use client";

import Image from "next/image";
import { brands, caseStudies, type Brand } from "@/content/brands";
import { HoverSelectText } from "@/components/ui/HoverSelectText";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

function BrandLogo({
  brand,
  size = "md",
}: {
  brand: Brand;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const map = {
    sm: { px: 40, className: "h-10 w-10 rounded-xl" },
    md: { px: 56, className: "h-14 w-14 rounded-2xl" },
    lg: { px: 72, className: "h-[4.5rem] w-[4.5rem] rounded-2xl" },
    xl: { px: 88, className: "h-[5.5rem] w-[5.5rem] rounded-[1.35rem]" },
  } as const;
  const cfg = map[size];

  if (brand.logo) {
    return (
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={cfg.px}
        height={cfg.px}
        className={`${cfg.className} object-cover shadow-[0_10px_24px_rgba(20,24,31,0.1)]`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center justify-center bg-accent-soft font-[family-name:var(--font-display)] text-sm font-semibold text-accent-deep ${cfg.className}`}>
      {brand.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const content = (
    <>
      <div className="brand-card__shine" aria-hidden="true" />
      <div className="brand-card__glow" aria-hidden="true" />
      <div className="brand-card__edge" aria-hidden="true" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="brand-card__logo-well">
          <BrandLogo brand={brand} size="xl" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-[family-name:var(--font-display)] text-sm tabular-nums text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          {brand.featured ? (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.08em] text-[#f8f6f2] uppercase">
              Featured
            </span>
          ) : null}
        </div>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col">
        {brand.category ? (
          <p className="eyebrow">{brand.category}</p>
        ) : null}
        <p className="mt-2 font-[family-name:var(--font-display)] text-[1.35rem] leading-tight tracking-[-0.03em] text-ink transition duration-300 group-hover:text-accent-deep">
          {brand.name}
        </p>
        <p className="mt-2 text-sm text-muted">{brand.country}</p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
          <span className="text-xs tracking-[0.08em] text-faint uppercase">
            Partner
          </span>
          {brand.website ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-[#f8f6f2] transition duration-300 group-hover:bg-accent-deep group-hover:shadow-[0_10px_22px_rgba(20,24,31,0.18)]">
              Visit site
              <span aria-hidden="true">↗</span>
            </span>
          ) : (
            <span className="rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs text-muted">
              Link pending
            </span>
          )}
        </div>
      </div>
    </>
  );

  const cardClass =
    "brand-card group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[1.85rem] border border-border/75 bg-[linear-gradient(165deg,#fffcf8_0%,#f7f4ef_48%,#f1eee8_100%)] p-5 shadow-[0_16px_40px_rgba(20,24,31,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_30px_60px_rgba(20,24,31,0.14)]";

  return (
    <Reveal delay={Math.min(index * 45, 220)} className="h-full">
      <TiltCard className="h-full rounded-[1.85rem]" maxTilt={6} glare>
        {brand.website ? (
          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClass}
            aria-label={`${brand.name} - open website`}
          >
            {content}
          </a>
        ) : (
          <div className={cardClass}>{content}</div>
        )}
      </TiltCard>
    </Reveal>
  );
}

export function Brands() {
  return (
    <section
      id="brands"
      className="section-pad relative overflow-hidden"
      aria-labelledby="brands-heading"
    >
      <div
        className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-accent-soft/45 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-40 h-64 w-64 rounded-full bg-[rgba(20,24,31,0.05)] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="max-w-2xl">
          <p className="eyebrow">Collaborations</p>
          <h2
            id="brands-heading"
            className="display section-heading mt-3"
          >
            Brands I&apos;ve Worked With
          </h2>
          <p className="mt-4 text-muted">
            <HoverSelectText as="span">
              Trusted by technology, AI, and fintech teams across the US, UAE,
              Europe, and beyond - from product storytelling to long-term
              campaign partnerships.
            </HoverSelectText>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-border bg-elevated/95 px-3.5 py-1.5 text-sm text-muted shadow-sm">
            {brands.length} confirmed partners
          </span>
          <span className="rounded-full border border-accent/20 bg-accent-soft/80 px-3.5 py-1.5 text-sm text-accent-deep">
            Tech · AI · Fintech
          </span>
          <span className="rounded-full border border-border bg-elevated/95 px-3.5 py-1.5 text-sm text-muted shadow-sm">
            Global reach
          </span>
        </div>
      </div>

      <div className="container-site relative mt-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Directory</p>
            <h3 className="subheading mt-2">
              Brand partners
            </h3>
          </div>
          <p className="hidden text-sm text-muted md:block">
            Hover for depth · click to visit
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, index) => (
            <li key={brand.id} className="h-full">
              <BrandCard brand={brand} index={index} />
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <div className="mb-6 max-w-xl">
            <p className="eyebrow">Proof</p>
            <h3 className="subheading mt-2">
              Featured collaborations
            </h3>
            <p className="mt-3 text-sm text-muted">
              <HoverSelectText as="span">
              Verified campaign work with clear outcomes from delivered
              partnerships.
              </HoverSelectText>
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {caseStudies.map((study, index) => {
              const matched = brands.find((b) => b.id === study.id);
              return (
                <Reveal key={study.id} delay={index * 80}>
                  <TiltCard className="h-full rounded-[1.85rem]" maxTilt={4} glare>
                    <article className="brand-case group relative h-full overflow-hidden rounded-[1.85rem] border border-border/80 bg-[linear-gradient(160deg,rgba(20,24,31,0.03),transparent_45%),#fffcf8] p-7 shadow-[0_14px_36px_rgba(20,24,31,0.06)] transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_26px_52px_rgba(20,24,31,0.12)]">
                      <div className="brand-card__shine" aria-hidden="true" />
                      <div className="relative flex items-center gap-4">
                        {matched ? <BrandLogo brand={matched} size="lg" /> : null}
                        <div>
                          <p className="eyebrow">Case study</p>
                          <h4 className="mt-1 font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
                            {study.brand}
                          </h4>
                        </div>
                      </div>
                      {study.challenge ? (
                        <div className="relative mt-6">
                          <p className="text-xs font-semibold tracking-[0.12em] text-faint uppercase">
                            Challenge
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            <HoverSelectText as="span">
                              {study.challenge}
                            </HoverSelectText>
                          </p>
                        </div>
                      ) : null}
                      <div className="relative mt-5">
                        <p className="text-xs font-semibold tracking-[0.12em] text-faint uppercase">
                          What Maham delivered
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink/85">
                          <HoverSelectText as="span">
                            {study.delivered}
                          </HoverSelectText>
                        </p>
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
