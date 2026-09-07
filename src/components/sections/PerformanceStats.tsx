import { metrics, reviews } from "@/content/metrics";
import { CountUp } from "@/components/ui/CountUp";

export function PerformanceStats() {
  return (
    <section
      className="section-pad !pt-0"
      aria-labelledby="proof-heading"
    >
      <div className="container-site">
        <div className="rounded-[2rem] border border-border bg-ink px-6 py-10 text-[#f6f3ee] md:px-10 md:py-12">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-[#9fd0cb] uppercase">
              Social proof
            </p>
            <h2
              id="proof-heading"
              className="display mt-3 text-[clamp(1.9rem,3.5vw,2.8rem)]"
            >
              Performance, without the dashboard noise.
            </h2>
            <p className="mt-4 text-[#c9c4b8]">
              Figures from the current Media Kit. Updateable when new numbers
              are confirmed.
            </p>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 px-5 py-5"
              >
                <dt className="text-sm text-[#b7b2a7]">{metric.label}</dt>
                <dd className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em]">
                  <CountUp value={metric.value} numeric={metric.numeric} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-border bg-elevated/80 p-7 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Creator reviews</p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
                Trusted on {reviews.source}
              </h3>
              <p className="mt-2 text-sm text-muted">
                Profile strength: {reviews.profileStrength} · {reviews.reviewCount}{" "}
                reviews. Attribution:{" "}
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
                  className="rounded-full border border-border px-3 py-1.5 text-sm"
                >
                  {score.label}{" "}
                  <span className="font-semibold text-accent">{score.value}/5</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.items.map((item) => (
              <li
                key={`${item.brand}-${item.date}`}
                className="rounded-[1.25rem] border border-border bg-[color-mix(in_srgb,var(--bg)_55%,white)] px-4 py-4"
              >
                <p className="font-medium">{item.brand}</p>
                <p className="mt-1 text-sm text-muted">
                  {item.rating.toFixed(1)} · {item.date}
                </p>
                {"text" in item && item.text ? (
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">
                    {item.text}
                  </p>
                ) : null}
                <p className="mt-3 text-xs text-faint">Source: Collabstr</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
