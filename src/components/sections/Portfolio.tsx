"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  portfolioFilters,
  portfolioItems,
  instagramProfileUrl,
  youtubeShortsUrl,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/content/portfolio";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { HoverSelectText } from "@/components/ui/HoverSelectText";

/** Build an on-site embed URL from Instagram / YouTube links. */
function getEmbedUrl(item: PortfolioItem): string | null {
  if (!item.externalUrl) return null;

  try {
    const url = new URL(item.externalUrl);

    if (url.hostname.includes("instagram.com")) {
      const parts = url.pathname.split("/").filter(Boolean);
      const kind = parts[0];
      const code = parts[1];
      if (code && (kind === "p" || kind === "reel" || kind === "tv")) {
        return `https://www.instagram.com/${kind}/${code}/embed`;
      }
    }

    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
      const shorts = url.pathname.match(/\/shorts\/([A-Za-z0-9_-]{11})/);
      if (shorts?.[1]) {
        return `https://www.youtube.com/embed/${shorts[1]}?autoplay=1&rel=0`;
      }
      const watch = url.searchParams.get("v");
      if (watch) {
        return `https://www.youtube.com/embed/${watch}?autoplay=1&rel=0`;
      }
      if (url.hostname.includes("youtu.be")) {
        const id = url.pathname.replace("/", "");
        if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function CardPoster({ item }: { item: PortfolioItem }) {
  return (
    <>
      <Image
        src={item.thumbnail}
        alt={`${item.title} thumbnail`}
        fill
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.08]"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Cinematic overlays */}
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,16,0.15)_0%,transparent_28%,transparent_45%,rgba(10,12,16,0.88)_100%)]" />
      <span className="work-card__shine" aria-hidden="true" />
      <span className="work-card__ring" aria-hidden="true" />

      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-white uppercase shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7dffb3] shadow-[0_0_8px_#7dffb3]" />
        {item.platform}
      </span>

      {item.brand ? (
        <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink/55 px-3 py-1.5 text-[0.68rem] font-medium tracking-wide text-white backdrop-blur-md">
          {item.brand}
        </span>
      ) : null}

      <span className="absolute inset-x-0 bottom-0 p-5 text-white">
        <span className="work-card__play mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition duration-300 group-hover:scale-110 group-hover:bg-accent-soft group-hover:text-accent-deep">
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-5 w-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5.5v13l11-6.5L8 5.5Z" />
          </svg>
        </span>
        <span className="block font-[family-name:var(--font-display)] text-[1.4rem] leading-tight tracking-[-0.03em] drop-shadow-sm">
          {item.title}
        </span>
        <span className="mt-2 inline-flex items-center gap-2 text-sm text-white/85">
          <span className="h-px w-5 bg-white/50 transition-all duration-300 group-hover:w-8 group-hover:bg-accent-soft" />
          Play on this page
        </span>
      </span>
    </>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = getEmbedUrl(item);
  const canPlayInline = Boolean(item.videoSrc || embedUrl);

  const startPlayback = () => {
    if (!canPlayInline) return;
    setPlaying(true);
    trackEvent("portfolio_click", {
      id: item.id,
      title: item.title,
      action: item.videoSrc ? "play_local" : "play_embed",
      platform: item.platform,
    });
  };

  return (
    <TiltCard className="h-full rounded-[1.85rem]" maxTilt={7} glare>
      <article className="work-card group relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-border/70 bg-elevated/95 shadow-[0_14px_40px_rgba(20,24,31,0.06)] transition duration-300 hover:border-accent/35 hover:shadow-[0_28px_60px_rgba(20,24,31,0.14)]">
        <div className="work-card__accent" aria-hidden="true" />

        <div className="relative aspect-[4/5] overflow-hidden bg-soft">
          {playing && item.videoSrc ? (
            <video
              className="h-full w-full object-cover"
              src={item.videoSrc}
              controls
              playsInline
              preload="metadata"
              autoPlay
            />
          ) : playing && embedUrl ? (
            <div className="work-embed absolute inset-0 overflow-hidden bg-black">
              <iframe
                src={embedUrl}
                title={item.title}
                className="work-embed__frame h-full w-full border-0 bg-black"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <button
              type="button"
              className="absolute inset-0 block w-full cursor-pointer text-left"
              onClick={startPlayback}
              disabled={!canPlayInline}
              aria-label={`Play ${item.title} on this page`}
            >
              <CardPoster item={item} />
            </button>
          )}
        </div>

        <div className="relative flex flex-1 flex-col bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(244,242,238,0.92))] p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-accent uppercase">
              {item.category}
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.25rem] leading-snug tracking-[-0.03em] text-ink transition group-hover:text-accent-deep">
            <HoverSelectText as="span">{item.title}</HoverSelectText>
          </h3>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            <HoverSelectText as="span">{item.description}</HoverSelectText>
          </p>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-white/80 px-2.5 py-1 text-[0.7rem] text-muted shadow-sm">
                {item.platform}
              </span>
              {item.brand ? (
                <span className="rounded-full border border-accent/20 bg-accent-soft/60 px-2.5 py-1 text-[0.7rem] text-accent-deep">
                  {item.brand}
                </span>
              ) : null}
            </div>
            {item.externalUrl ? (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card__open inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold text-[#f8f6f2] transition hover:bg-accent-deep"
                onClick={() =>
                  trackEvent("portfolio_click", {
                    id: item.id,
                    action: "open_external",
                    platform: item.platform,
                  })
                }
              >
                Open
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioCategory>("All");

  const items = useMemo(() => {
    if (filter === "All") return portfolioItems;
    return portfolioItems.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <section id="work" className="section-pad" aria-labelledby="work-heading">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">Portfolio</p>
          <h2
            id="work-heading"
            className="display section-heading mt-3"
          >
            My Work
          </h2>
          <p className="mt-4 text-muted">
            <HoverSelectText as="span">
              Selected reels and Shorts on AI, productivity, and everyday tech -
              created to explain ideas clearly and support brand storytelling.
            </HoverSelectText>
          </p>
        </div>

        <div
          className="work-filters mt-8 flex w-fit max-w-full gap-1.5 overflow-x-auto rounded-[1.35rem] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,249,0.88))] p-1.5 shadow-[0_12px_40px_rgba(20,24,31,0.06)] backdrop-blur-md"
          role="tablist"
          aria-label="Portfolio filters"
        >
          {portfolioFilters.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={filter === tab}
              className={cn(
                "work-filter shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-all duration-300",
                filter === tab
                  ? "bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-deep)_100%)] text-white shadow-[0_10px_28px_rgba(31,107,102,0.35)] ring-1 ring-white/25"
                  : "text-muted hover:-translate-y-0.5 hover:bg-accent-soft/70 hover:text-accent-deep",
              )}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              delay={Math.min(index * 55, 280)}
              className="h-full"
            >
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={instagramProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={() =>
              trackEvent("social_click", {
                network: "instagram",
                href: instagramProfileUrl,
              })
            }
          >
            More on Instagram
          </a>
          <a
            href={youtubeShortsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            onClick={() =>
              trackEvent("social_click", {
                network: "youtube",
                href: youtubeShortsUrl,
              })
            }
          >
            All YouTube Shorts
          </a>
        </div>
      </div>
    </section>
  );
}
