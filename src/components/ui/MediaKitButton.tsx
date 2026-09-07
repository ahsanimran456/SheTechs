"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
  source?: string;
};

export function MediaKitButton({
  className,
  variant = "ghost",
  label = "View Media Kit",
  source = "unknown",
}: Props) {
  return (
    <a
      href={siteConfig.mediaKitPath}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "btn",
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "ghost" && "btn-ghost",
        className,
      )}
      onClick={() => trackEvent("media_kit_download", { source, label })}
      data-analytics="media-kit"
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export function AnchorButton({
  href,
  children,
  className,
  variant = "primary",
  eventLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  eventLabel?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "btn",
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "ghost" && "btn-ghost",
        className,
      )}
      onClick={() =>
        trackEvent("cta_click", { href, label: eventLabel ?? String(children) })
      }
    >
      {children}
    </Link>
  );
}
