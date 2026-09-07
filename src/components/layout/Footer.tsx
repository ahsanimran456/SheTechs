import Link from "next/link";
import { navLinks, siteConfig } from "@/content/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[color-mix(in_srgb,var(--bg-soft)_70%,white)]">
      <div className="container-site section-pad !py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
              {siteConfig.brand}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.positioning}
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink/80 transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-ink/80 transition hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.url}
                  className="text-ink/80 transition hover:text-accent"
                >
                  mahamshakeel.tech
                </a>
              </li>
              <li className="text-muted">{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.brand}. All rights reserved.</p>
          <p>Built for collaborations, campaigns, and clear tech storytelling.</p>
        </div>
      </div>
    </footer>
  );
}
