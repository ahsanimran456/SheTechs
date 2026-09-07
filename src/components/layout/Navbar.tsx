"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/content/site";
import { MediaKitButton } from "@/components/ui/MediaKitButton";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-[color-mix(in_srgb,var(--bg)_88%,white)]/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-site flex items-center justify-between transition-[height] duration-300",
          scrolled ? "h-14" : "h-[var(--nav-h)]",
        )}
      >
        <Link
          href="#home"
          className="group flex min-w-0 flex-col"
          onClick={() => setOpen(false)}
        >
          <span className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold tracking-[-0.03em] text-ink sm:text-lg">
            {siteConfig.brand}
          </span>
          <span className="hidden text-[0.68rem] tracking-[0.08em] text-muted uppercase sm:block">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm transition",
                active === link.href
                  ? "bg-ink text-[#f8f6f2]"
                  : "text-muted hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <MediaKitButton variant="secondary" source="nav" className="!min-h-10 !px-4 !text-sm" />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-elevated/80 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-full bg-ink transition",
                open && "top-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 h-0.5 w-full bg-ink transition",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-0.5 w-full bg-ink transition",
                open && "top-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-[var(--nav-h)] bottom-0 z-40 bg-[color-mix(in_srgb,var(--bg)_96%,white)] px-5 pb-10 pt-4 transition lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        hidden={!open}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-2xl px-4 py-3 text-lg font-medium",
                active === link.href ? "bg-accent-soft text-accent-deep" : "text-ink",
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6">
          <MediaKitButton
            variant="primary"
            source="mobile-nav"
            className="w-full"
          />
        </div>
      </div>
    </header>
  );
}
