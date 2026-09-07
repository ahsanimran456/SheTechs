import Link from "next/link";
import { siteConfig } from "@/content/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

const footerLinks = [
  { href: "#work", label: "My Work" },
  { href: "#brands", label: "Brands" },
  { href: "#skills", label: "Skills & Services" },
  { href: "#contact", label: "Work With Me" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-accent-soft/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[rgba(20,24,31,0.05)] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative section-pad !pb-10 !pt-16 md:!pt-20">
        <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-[linear-gradient(145deg,rgba(31,107,102,0.12),transparent_42%),linear-gradient(180deg,#fffcf8_0%,#f4f1eb_100%)] p-7 shadow-[0_20px_50px_rgba(20,24,31,0.06)] md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Next step</p>
              <p className="mt-3 subheading leading-tight text-ink">
                Ready to collaborate on AI &amp; tech content?
              </p>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-muted md:text-[1.1rem]">
                Campaigns, UGC, and educational storytelling for technology and
                fintech brands - based in Dubai, working globally.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="#contact" className="btn btn-primary">
                Work With Me
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn btn-secondary"
              >
                Email Maham
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_0.9fr_0.9fr] lg:gap-10">
          <div>
            <p className="brand-mark text-[clamp(2.2rem,4.2vw,3rem)] text-ink">
              {siteConfig.brand}
            </p>
            <p className="brand-mark__name mt-2 text-[0.72rem] text-muted">
              {siteConfig.name}
            </p>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-muted">
              {siteConfig.positioning}
            </p>

            <div className="mt-7">
              <p className="eyebrow mb-3 !text-faint">Follow</p>
              <SocialLinks showLabels />
            </div>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 rounded-xl px-2 py-2 text-[1.02rem] text-ink/80 transition hover:bg-elevated/80 hover:text-accent-deep"
                  >
                    <span
                      className="h-1 w-1 rounded-full bg-accent/50 transition group-hover:scale-125 group-hover:bg-accent"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block rounded-[1.25rem] border border-border/80 bg-elevated/90 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_14px_32px_rgba(20,24,31,0.08)]"
                >
                  <span className="eyebrow block !text-[0.85rem]">
                    Email
                  </span>
                  <span className="mt-1.5 block break-all text-[0.98rem] text-ink">
                    {siteConfig.email}
                  </span>
                </a>
              </li>
              <li className="rounded-[1.25rem] border border-border/70 bg-[color-mix(in_srgb,var(--bg)_45%,white)] px-4 py-4">
                <span className="eyebrow block !text-[0.85rem] !text-faint">
                  Based in
                </span>
                <span className="mt-1.5 block text-[0.98rem] text-ink/85">
                  {siteConfig.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border/80 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {year} {siteConfig.brand}. All rights reserved.
          </p>
          <p className="max-w-md text-sm leading-relaxed text-faint sm:text-right">
            Clear tech storytelling for brands that value credibility and craft.
          </p>
        </div>
      </div>
    </footer>
  );
}
