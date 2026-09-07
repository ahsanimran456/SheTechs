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

/** Build an on-site embed URL from Instagram / YouTube links. */
function getEmbedUrl(item: PortfolioItem): string | null {
  if (!item.externalUrl) return null;

  try {
    const url = new URL(item.externalUrl);

    if (url.hostname.includes("instagram.com")) {
      // https://www.instagram.com/p/CODE/ or /reel/CODE/
      const parts = url.pathname.split("/").filter(Boolean);
      const kind = parts[0]; // p | reel | tv
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
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md">
        {item.platform}
      </span>
      {item.brand ? (
        <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-[0.68rem] font-medium tracking-wide text-white backdrop-blur-md">
          {item.brand}
        </span>
      ) : null}
      <span className="absolute inset-x-0 bottom-0 p-5 text-white">
        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-lg transition group-hover:scale-105">
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-5 w-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5.5v13l11-6.5L8 5.5Z" />
          </svg>
        </span>
        <span className="block font-[family-name:var(--font-display)] text-[1.45rem] leading-tight tracking-[-0.03em]">
          {item.title}
        </span>
        <span className="mt-1.5 block text-sm text-white/80">
          Click to play here
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
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-elevated shadow-[0_10px_40px_rgba(20,24,31,0.05)] transition duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_20px_50px_rgba(20,24,31,0.1)]">
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
          <iframe
            src={embedUrl}
            title={item.title}
            className="h-full w-full border-0 bg-black"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
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

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-accent uppercase">
          {item.category}
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl tracking-[-0.03em] text-ink">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/80 pt-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-soft/60 px-2.5 py-1 text-[0.7rem] text-muted">
              {item.platform}
            </span>
            {item.brand ? (
              <span className="rounded-full border border-border bg-soft/60 px-2.5 py-1 text-[0.7rem] text-muted">
                {item.brand}
              </span>
            ) : null}
          </div>
          {item.externalUrl ? (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-sm font-semibold text-accent transition hover:text-accent-deep"
              onClick={() =>
                trackEvent("portfolio_click", {
                  id: item.id,
                  action: "open_external",
                  platform: item.platform,
                })
              }
            >
              Open ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
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
            className="display mt-3 text-[clamp(2rem,4vw,3.2rem)]"
          >
            My Work
          </h2>
          <p className="mt-4 text-muted">
            Selected reels and Shorts on AI, productivity, and everyday tech -
            made to explain ideas clearly, not just chase trends.
          </p>
        </div>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-2"
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
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                filter === tab
                  ? "bg-ink text-[#f8f6f2]"
                  : "border border-border bg-elevated/70 text-muted hover:text-ink",
              )}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
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
