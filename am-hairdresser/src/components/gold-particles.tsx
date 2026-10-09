"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; ph: number };

/** ~40 slow-drifting gold specks on one canvas. Pauses off-screen / in background tabs; skipped under reduced motion. */
export default function GoldParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, visible = true, parts: P[] = [];

    // One pre-rendered soft gold glow, stamped per particle (far cheaper than shadowBlur every frame).
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 32;
    const sc = sprite.getContext("2d")!;
    const grad = sc.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,236,170,1)");
    grad.addColorStop(0.25, "rgba(230,200,120,0.85)");
    grad.addColorStop(1, "rgba(230,200,120,0)");
    sc.fillStyle = grad;
    sc.fillRect(0, 0, 32, 32);

    const make = (): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.08 + Math.random() * 0.22),
      a: 0.25 + Math.random() * 0.55,
      ph: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 640 ? 22 : 42;
      parts = Array.from({ length: n }, make);
    };

    const tick = (t: number) => {
      raf = 0;
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;
        const tw = 0.6 + 0.4 * Math.sin(t / 1400 + p.ph);
        const size = p.r * 7;
        ctx.globalAlpha = p.a * tw;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0 });
    const onVis = () => (document.hidden ? (cancelAnimationFrame(raf), (raf = 0)) : start());
    const ro = new ResizeObserver(resize);

    resize();
    io.observe(canvas);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 size-full" />;
}
