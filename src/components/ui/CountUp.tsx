"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  value: string;
  numeric?: number;
  className?: string;
};

export function CountUp({ value, numeric, className }: Props) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (numeric == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 900;
        const start = performance.now();
        const from = 0;
        const to = numeric;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = Math.round(from + (to - from) * eased);

          if (value.includes("%")) setDisplay(`${current}%`);
          else if (value.includes("+")) {
            if (value.includes("K")) setDisplay(`${(current / 1000).toFixed(current >= 1000 ? 1 : 0).replace(/\.0$/, "")}K+`);
            else setDisplay(`${current}+`);
          } else if (value.includes("–") || value.includes("-")) {
            setDisplay(value);
          } else if (value.includes("K")) {
            setDisplay(`${(current / 1000).toFixed(1).replace(/\.0$/, "")}K`);
          } else {
            setDisplay(String(current));
          }

          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [numeric, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}
