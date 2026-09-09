"use client";

import Image from "next/image";
import { reviews } from "@/content/metrics";
import { HoverSelectText } from "@/components/ui/HoverSelectText";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/cn";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={cn(
            "h-3.5 w-3.5",
            i < Math.round(rating) ? "text-[#e8a317]" : "text-border",
          )}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.71l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function BrandMark({
  brand,
  logo,
}: {
  brand: string;
  logo?: string;
}) {
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border/80 shadow-sm">
      {logo ? (
        <Image
          src={logo}
          alt={`${brand} logo`}
          width={40}
          height={40}
          className="h-8 w-8 object-contain"
        />
      ) : (
        <span className="text-sm font-bold tracking-wide text-accent-deep">
          {brand.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

export function PerformanceStats() {
  return (
    <section
      id="reviews"
      className="section-pad relative overflow-hidden !pt-0"
      aria-labelledby="proof-heading"
    >
      <div className="container-site relative">
        <div className="max-w-2xl">
          <p className="eyebrow">Client love</p>
          <h2 id="proof-heading" className="display section-heading mt-3">
            Brands that trusted the collab
          </h2>
          <p className="mt-4 text-muted">
            <HoverSelectText as="span">
              Brands find me on Collabstr for reels and UGC - then leave reviews
              after we wrap. Here&apos;s how happy they were with the work.
            </HoverSelectText>
          </p>
        </div>

        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-[linear-gradient(145deg,rgba(31,107,102,0.1),transparent_40%),linear-gradient(180deg,#fffcf8_0%,#f5f2ec_100%)] p-6 shadow-[0_20px_50px_rgba(20,24,31,0.07)] md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-[5.5rem] w-[5.5rem] shrink-0 flex-col items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,var(--accent),var(--accent-deep))] text-white shadow-[0_14px_32px_rgba(31,107,102,0.35)]">
                  <span className="font-[family-name:var(--font-display)] text-[2.35rem] leading-none tracking-[-0.04em]">
                    {reviews.averageRating.toFixed(1)}
                  </span>
                  <Stars rating={reviews.averageRating} />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] text-ink">
                    Perfect score on {reviews.source}
                  </p>
                  <p className="mt-1.5 text-sm text-muted">
                    {reviews.reviewCount} verified brand reviews ·{" "}
                    <a
                      href={reviews.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent hover:text-accent-deep"
                    >
                      View Collabstr profile
                    </a>
                  </p>
                </div>
              </div>

              <ul className="grid grid-cols-3 gap-3 sm:gap-4">
                {reviews.scores.map((score) => (
                  <li
                    key={score.label}
                    className="rounded-[1.15rem] border border-border/70 bg-white/75 px-3 py-3 text-center shadow-sm backdrop-blur-sm sm:px-4"
                  >
                    <p className="font-[family-name:var(--font-display)] text-xl tracking-[-0.03em] text-accent-deep sm:text-2xl">
                      {score.value.toFixed(1)}
                    </p>
                    <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.06em] text-muted uppercase sm:text-xs">
                      {score.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {reviews.items.map((item, index) => (
            <li key={`${item.brand}-${item.date}`} className="h-full">
              <Reveal delay={index * 70} className="h-full">
                <TiltCard className="h-full rounded-[1.6rem]" maxTilt={4} glare>
                  <article className="proof-card group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border/80 bg-[linear-gradient(165deg,#fffcf8_0%,#f6f3ed_100%)] p-6 shadow-[0_14px_36px_rgba(20,24,31,0.05)] transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_24px_48px_rgba(20,24,31,0.1)]">
                    <div className="proof-card__shine" aria-hidden="true" />

                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <BrandMark brand={item.brand} logo={item.logo} />
                        <div>
                          <p className="font-[family-name:var(--font-display)] text-xl tracking-[-0.03em] text-ink">
                            {item.brand}
                          </p>
                          <p className="mt-0.5 text-sm text-muted">{item.service}</p>
                        </div>
                      </div>
                      <span className="rounded-full border border-border/70 bg-white/70 px-2.5 py-1 text-[0.68rem] font-medium text-faint">
                        {item.date}
                      </span>
                    </div>

                    <div className="relative mt-5 flex items-center gap-2">
                      <Stars rating={item.rating} />
                      <span className="text-sm font-semibold text-accent-deep">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>

                    <p className="relative mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink/80">
                      “{item.text}”
                    </p>

                    <p className="relative mt-5 text-xs font-medium tracking-[0.08em] text-faint uppercase">
                      Verified on Collabstr
                    </p>
                  </article>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
