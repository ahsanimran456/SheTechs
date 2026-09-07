import { pressEmptyState, pressItems } from "@/content/press";

export function PressRecognition() {
  const hasItems = pressItems.length > 0;

  return (
    <section id="press" className="section-pad" aria-labelledby="press-heading">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">Media</p>
          <h2
            id="press-heading"
            className="display mt-3 text-[clamp(2rem,4vw,3.2rem)]"
          >
            {pressEmptyState.title}
          </h2>
        </div>

        {hasItems ? (
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {pressItems.map((item) => (
              <li
                key={item.id}
                className="rounded-[1.5rem] border border-border bg-elevated/80 p-6"
              >
                <p className="text-xs tracking-[0.12em] text-faint uppercase">
                  {item.outlet}
                  {item.date ? ` · ${item.date}` : ""}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl tracking-[-0.03em]">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                ) : null}
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex text-sm font-medium text-accent hover:text-accent-deep"
                  >
                    Read source →
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-[1.75rem] border border-dashed border-border-strong bg-elevated/50 px-6 py-12 text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
              {pressEmptyState.message}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              {pressEmptyState.note}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
