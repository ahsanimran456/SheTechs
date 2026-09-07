"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
};

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<CSSProperties>({});
  const enabled = useRef(true);

  useEffect(() => {
    enabled.current = !window.matchMedia(
      "(prefers-reduced-motion: reduce), (pointer: coarse)",
    ).matches;
  }, []);

  const onMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - y) * maxTilt * 2;

      setStyle({
        transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      });

      if (glare) {
        setGlareStyle({
          opacity: 0.35,
          background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.55), transparent 55%)`,
        });
      }
    },
    [glare, maxTilt],
  );

  const onLeave = useCallback(() => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });
    setGlareStyle({ opacity: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={cn("tilt-card relative transform-gpu", className)}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      {glare ? (
        <span
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
          style={glareStyle}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
