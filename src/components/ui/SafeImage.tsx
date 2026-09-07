"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholderLabel?: string;
};

export function SafeImage({
  src,
  alt,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  placeholderLabel = "Add photograph",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col justify-end bg-[linear-gradient(160deg,#d9e7e5,#ebe7e0_45%,#d7d2c8)] p-6 text-left",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <p className="eyebrow">Photography</p>
        <p className="mt-2 max-w-xs font-[family-name:var(--font-display)] text-2xl text-ink">
          {placeholderLabel}
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Replace this placeholder with an authentic photo of Maham. Path:{" "}
          <code className="text-xs">{src}</code>
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
