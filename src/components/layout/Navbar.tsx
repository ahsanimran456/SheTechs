"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

const headerLinks = navLinks.filter((link) => link.href !== "#contact");

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[];

    const multi = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach((s) => multi.observe(s));
    return () => multi.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={cn(
          "container-site relative flex items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300 sm:px-4",
          scrolled
            ? "border-border/90 bg-[color-mix(in_srgb,var(--bg-elevated)_92%,white)]/95 shadow-[0_16px_40px_rgba(20,24,31,0.1)] backdrop-blur-xl"
            : "border-border/60 bg-elevated/75 shadow-[0_10px_30px_rgba(20,24,31,0.05)] backdrop-blur-md",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <div className="absolute -left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-accent-soft/50 blur-2xl" />
        </div>

        <Link
          href="#home"
          className="group relative z-[1] flex min-w-0 items-center gap-2.5 pl-1"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-[family-name:var(--font-brand)] text-[0.78rem] font-bold tracking-[-0.04em] text-[#f8f6f2] shadow-[0_8px_18px_rgba(20,24,31,0.18)] transition duration-300 group-hover:bg-accent-deep sm:h-10 sm:w-10 sm:text-[0.85rem]">
            MT
          </span>
          <span className="min-w-0">
            <span className="brand-mark block truncate text-[1.05rem] text-ink sm:text-[1.2rem]">
              {siteConfig.brand}
            </span>
            <span className="brand-mark__name mt-0.5 hidden text-[0.62rem] text-muted sm:block">
              {siteConfig.name}
            </span>
          </span>
        </Link>

        <nav
          className="relative z-[1] hidden items-center gap-0.5 rounded-full border border-border/70 bg-[color-mix(in_srgb,var(--bg)_55%,white)]/80 p-1 xl:flex"
          aria-label="Primary"
        >
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[0.84rem] font-medium tracking-[-0.01em] transition duration-250",
                active === link.href
                  ? "bg-ink text-[#f8f6f2] shadow-[0_8px_18px_rgba(20,24,31,0.16)]"
                  : "text-muted hover:bg-white/80 hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-[1] hidden items-center gap-2 lg:flex">
          <nav className="hidden items-center gap-0.5 xl:hidden" aria-label="Compact">
            {headerLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-2.5 py-1.5 text-[0.8rem] font-medium transition",
                  active === link.href
                    ? "bg-ink text-[#f8f6f2]"
                    : "text-muted hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="#contact"
            className="btn btn-primary !min-h-10 !px-5 !text-sm shadow-[0_10px_24px_rgba(31,107,102,0.22)]"
          >
            Work With Me
          </Link>
        </div>

        <button
          type="button"
          className="relative z-[1] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 shadow-sm transition hover:border-accent/40 hover:bg-accent-soft/60 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-full rounded-full bg-ink transition",
                open && "top-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-ink transition",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-0.5 w-full rounded-full bg-ink transition",
                open && "top-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-3 top-[4.75rem] z-40 overflow-hidden rounded-[1.75rem] border border-border/80 bg-[color-mix(in_srgb,var(--bg-elevated)_96%,white)] p-4 shadow-[0_24px_60px_rgba(20,24,31,0.14)] backdrop-blur-xl transition duration-300 lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        hidden={!open}
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="eyebrow !text-[0.78rem]">Navigate</p>
          <p className="text-xs text-muted">{siteConfig.location}</p>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-2xl px-4 py-3.5 font-[family-name:var(--font-display)] text-lg tracking-[-0.02em] transition",
                active === link.href
                  ? "bg-accent-soft text-accent-deep"
                  : "text-ink hover:bg-[color-mix(in_srgb,var(--bg)_60%,white)]",
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 border-t border-border/70 pt-4">
          <Link
            href="#contact"
            className="btn btn-primary w-full"
            onClick={() => setOpen(false)}
          >
            Work With Me
          </Link>
        </div>
      </div>
    </header>
  );
}
