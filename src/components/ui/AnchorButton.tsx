"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

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
