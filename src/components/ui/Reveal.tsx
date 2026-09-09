"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const reveal = () => setVisible(true);

    // Already on screen (e.g. short viewport / tall section) — show immediately.
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh - 12 && rect.bottom > 12) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(entry.target);
        }
      },
      // threshold 0: any visible pixel counts. Tall sections (e.g. My Work)
      // can never reach a high % threshold on short mobile viewports.
      { threshold: 0, rootMargin: "0px 0px -12px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "reveal-base",
        visible && "reveal-in",
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
