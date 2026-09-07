"use client";

import { metrics, reviews } from "@/content/metrics";
import { CountUp } from "@/components/ui/CountUp";
import { HoverSelectText } from "@/components/ui/HoverSelectText";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

const spotlightIds = ["followers", "profile-views", "top-branded"] as const;
const timelineIds = [
  "interactions",
  "new-followers",
  "reel-avg",
  "brands",
  "collabstr",
] as const;

export function PerformanceStats() {
  const spotlight = spotlightIds
    .map((id) => metrics.find((m) => m.id === id))
    .filter((m): m is (typeof metrics)[number] => Boolean(m));

  const timeline = timelineIds
    .map((id) => metrics.find((m) => m.id === id))
    .filter((m): m is (typeof metrics)[number] => Boolean(m));

  return (
    <section
      className="section-pad relative overflow-hidden !pt-0"
      aria-labelledby="proof-heading"
    >
      <div
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent-soft/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="max-w-2xl">
          <p className="eyebrow">Social proof</p>
          <h2
            id="proof-heading"
            className="display section-heading mt-3"
          >
            Performance built on verified results.
          </h2>
          <p className="mt-4 text-muted">
            <HoverSelectText as="span">
              Figures from confirmed performance insights. Updateable when new
              numbers are verified.
            </HoverSelectText>
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {spotlight.map((metric, index) => (
            <li key={metric.id} className="h-full">
              <Reveal delay={index * 70} className="h-full">
                <TiltCard className="h-full rounded-[1.75rem]" maxTilt={5} glare>
                  <article className="proof-card group relative flex h-full min-h-[210px] flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-[linear-gradient(165deg,#fffcf8_0%,#f4f1eb_55%,#ebe7e0_100%)] p-6 shadow-[0_16px_40px_rgba(20,24,31,0.06)] transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_26px_52px_rgba(20,24,31,0.12)]">
                    <div className="proof-card__shine" aria-hidden="true" />
                    <div className="relative flex items-start justify-between gap-3">
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-accent-deep uppercase">
                        Highlight
                      </span>
                      <span className="font-[family-name:var(--font-display)] text-sm tabular-nums text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="relative mt-8 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,3.2rem)] leading-none tracking-[-0.04em] text-ink">
                      <CountUp value={metric.value} numeric={metric.numeric} />
                    </p>
                    <p className="relative mt-4 text-[0.95rem] leading-snug text-muted">
                      {metric.label}
                    </p>
                  </article>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-border/80 bg-[linear-gradient(160deg,rgba(31,107,102,0.08),transparent_42%),linear-gradient(180deg,#fffcf8_0%,#f7f4ef_100%)] px-6 py-10 shadow-[0_18px_48px_rgba(20,24,31,0.05)] md:px-10 md:py-12">
          <div
            className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-accent-soft/55 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Growth timeline</p>
              <h3 className="subheading mt-2 text-ink">
                From insights to brand trust
              </h3>
            </div>
            <p className="max-w-sm text-[1.05rem] leading-relaxed text-muted">
              <HoverSelectText as="span">
                A clear path through confirmed performance numbers - engagement,
                reach, and partnership strength.
              </HoverSelectText>
            </p>
          </div>

          <div className="relative mt-10">
            <div
              className="pointer-events-none absolute top-4 bottom-4 left-[1.2rem] w-px bg-[linear-gradient(180deg,var(--accent),rgba(31,107,102,0.18))] md:left-[1.4rem]"
              aria-hidden="true"
            />

            <ol className="space-y-0">
              {timeline.map((metric, index) => (
                <li key={metric.id} className="relative">
                  <Reveal delay={index * 60}>
                    <div className="grid gap-4 py-3.5 md:grid-cols-[3.4rem_1fr] md:items-stretch md:gap-6 md:py-4">
                      <div className="relative z-[1] flex items-start justify-start pt-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-elevated font-[family-name:var(--font-display)] text-sm tabular-nums text-accent-deep shadow-[0_0_0_6px_#f7f4ef,0_8px_20px_rgba(31,107,102,0.12)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <article className="group rounded-[1.5rem] border border-border/80 bg-elevated/95 px-5 py-5 shadow-[0_10px_28px_rgba(20,24,31,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_18px_40px_rgba(20,24,31,0.1)] md:flex md:items-center md:justify-between md:gap-8 md:px-7 md:py-6">
                        <div className="min-w-0">
                          <p className="eyebrow">Checkpoint</p>
                          <p className="mt-2 text-[1.12rem] leading-snug text-ink/85 md:text-[1.18rem]">
                            {metric.label}
                          </p>
                        </div>
                        <p className="mt-4 shrink-0 font-[family-name:var(--font-display)] text-[clamp(2.1rem,3.6vw,2.7rem)] tracking-[-0.04em] text-accent-deep md:mt-0 md:text-right">
                          <CountUp
                            value={metric.value}
                            numeric={metric.numeric}
                          />
                        </p>
                      </article>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-border bg-elevated/80 p-7 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Creator reviews</p>
              <h3 className="subheading mt-2">
                Trusted on {reviews.source}
              </h3>
              <p className="mt-2 text-sm text-muted">
                Profile strength: {reviews.profileStrength} ·{" "}
                {reviews.reviewCount} reviews. Attribution:{" "}
                <a
                  href={reviews.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-deep"
                >
                  Collabstr
                </a>
                .
              </p>
            </div>
            <ul className="flex flex-wrap gap-3">
              {reviews.scores.map((score) => (
                <li
                  key={score.label}
                  className="rounded-full border border-border bg-white/60 px-3.5 py-1.5 text-sm shadow-sm"
                >
                  {score.label}{" "}
                  <span className="font-semibold text-accent">
                    {score.value}/5
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {reviews.items.map((item, index) => (
              <li key={`${item.brand}-${item.date}`} className="h-full">
                <Reveal delay={index * 70} className="h-full">
                  <article className="h-full rounded-[1.35rem] border border-border bg-[color-mix(in_srgb,var(--bg)_55%,white)] px-5 py-5 transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_18px_40px_rgba(20,24,31,0.08)]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-deep">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-semibold text-accent">
                        {item.rating.toFixed(1)} ★
                      </p>
                    </div>
                    <p className="mt-4 font-[family-name:var(--font-display)] text-xl tracking-[-0.03em]">
                      {item.brand}
                    </p>
                    <p className="mt-1 text-sm text-muted">{item.date}</p>
                    {"text" in item && item.text ? (
                      <p className="mt-3 text-sm leading-relaxed text-ink/80">
                        {item.text}
                      </p>
                    ) : null}
                    <p className="mt-4 text-xs text-faint">Source: Collabstr</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
