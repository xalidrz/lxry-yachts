import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Mote {
  x: number; // 0–1
  y: number; // 0–1
  r: number;
  phase: number;
  speed: number;
  drift: number;
  warm: boolean;
}

/**
 * Twinkling fairy-light particles on a canvas. Used in the wedding sections only.
 * Pauses when off-screen, draws a single still frame under prefers-reduced-motion.
 */
export function FairyLights({ className, count = 70 }: { className?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = window.innerWidth < 640 ? Math.round(count * 0.55) : count;
    const motes: Mote[] = Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.7 + Math.random() * 2.1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.6,
      drift: 4 + Math.random() * 10,
      warm: Math.random() > 0.35,
    }));

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of motes) {
        const tw = reduced ? 0.7 : 0.5 + 0.5 * Math.sin(t * 0.001 * p.speed + p.phase);
        const a = 0.18 + tw * 0.82;
        const x = p.x * w + (reduced ? 0 : Math.sin(t * 0.0003 * p.speed + p.phase) * p.drift);
        const y = p.y * h + (reduced ? 0 : Math.cos(t * 0.00025 * p.speed + p.phase) * p.drift);
        const rgb = p.warm ? "255,182,39" : "255,214,140";
        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb},${(a * 0.12).toFixed(3)})`;
        ctx.arc(x, y, p.r * 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb},${a.toFixed(3)})`;
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let visible = true;
    const loop = (t: number) => {
      draw(t);
      if (visible) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(0);
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    let io: IntersectionObserver | undefined;
    if (!reduced) {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(loop);
      });
      io.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 size-full", className)} />;
}
