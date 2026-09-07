import { skills, services } from "@/content/skills";

function MarkerList({
  items,
  tone = "light",
}: {
  items: readonly string[];
  tone?: "light" | "dark";
}) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-4">
          <span
            className={
              tone === "dark"
                ? "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm"
                : "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm text-accent-deep"
            }
            aria-hidden="true"
          >
            ◆
          </span>
          <span
            className={
              tone === "dark"
                ? "pt-1.5 text-[1.05rem] text-[#ddd7cd]"
                : "pt-1.5 text-[1.05rem] text-ink/85"
            }
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function SkillsServices() {
  return (
    <section id="skills" className="section-pad" aria-labelledby="skills-heading">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">Capabilities</p>
          <h2
            id="skills-heading"
            className="display mt-3 text-[clamp(2rem,4vw,3.2rem)]"
          >
            Skills &amp; Services
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-border bg-elevated/80 p-7 md:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
              Skills
            </h3>
            <MarkerList items={skills} />
          </div>
          <div className="rounded-[1.75rem] bg-ink p-7 text-[#f6f3ee] md:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
              Services
            </h3>
            <MarkerList items={services} tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
