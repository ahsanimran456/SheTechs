"use client";

import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  lag: number;
  radius: number;
  color: string;
};

/**
 * Advanced Gemini-style interactive aurora.
 * Multi-color liquid glow trails the pointer on a canvas layer.
 */
export function CursorAura() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const blobs = useRef<Blob[]>([]);
  const time = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const w = window.innerWidth;
    const h = window.innerHeight;
    pointer.current = { x: w * 0.62, y: h * 0.32, active: false };

    // Gemini-adjacent palette: cyan / sky / soft violet / warm peach
    blobs.current = [
      {
        x: pointer.current.x,
        y: pointer.current.y,
        tx: pointer.current.x,
        ty: pointer.current.y,
        lag: 0.14,
        radius: 280,
        color: "94, 210, 230",
      },
      {
        x: pointer.current.x,
        y: pointer.current.y,
        tx: pointer.current.x,
        ty: pointer.current.y,
        lag: 0.09,
        radius: 230,
        color: "130, 150, 255",
      },
      {
        x: pointer.current.x,
        y: pointer.current.y,
        tx: pointer.current.x,
        ty: pointer.current.y,
        lag: 0.07,
        radius: 210,
        color: "186, 140, 255",
      },
      {
        x: pointer.current.x,
        y: pointer.current.y,
        tx: pointer.current.x,
        ty: pointer.current.y,
        lag: 0.11,
        radius: 190,
        color: "255, 186, 150",
      },
      {
        x: pointer.current.x,
        y: pointer.current.y,
        tx: pointer.current.x,
        ty: pointer.current.y,
        lag: 0.16,
        radius: 160,
        color: "80, 190, 170",
      },
    ];

    const onMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.active = true;
      root.dataset.active = "true";

      blobs.current.forEach((blob, i) => {
        const spread = 18 + i * 10;
        const angle = time.current * (0.5 + i * 0.12) + i * 1.1;
        blob.tx = event.clientX + Math.cos(angle) * spread;
        blob.ty = event.clientY + Math.sin(angle) * spread * 0.7;
      });
    };

    const onLeave = () => {
      pointer.current.active = false;
      root.dataset.active = "false";
    };

    const draw = () => {
      time.current += 0.016;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < blobs.current.length; i += 1) {
        const blob = blobs.current[i];
        blob.x += (blob.tx - blob.x) * blob.lag;
        blob.y += (blob.ty - blob.y) * blob.lag;

        const pulse = 1 + Math.sin(time.current * 1.4 + i) * 0.08;
        const radius = blob.radius * pulse;

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          radius,
        );
        const alphaCore = pointer.current.active ? 0.42 : 0.18;
        const alphaMid = pointer.current.active ? 0.2 : 0.08;

        gradient.addColorStop(0, `rgba(${blob.color}, ${alphaCore})`);
        gradient.addColorStop(0.35, `rgba(${blob.color}, ${alphaMid})`);
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(blob.x, blob.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf.current = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="cursor-aura"
      data-active="false"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="cursor-aura__canvas" />
      <div className="cursor-aura__veil" />
      <div className="cursor-aura__mesh" />
    </div>
  );
}
