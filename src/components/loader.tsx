"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

const KEY = "em-loaded";
const DURATION = 1300;
const LETTERS = site.name.split("");

/**
 * First-visit intro: letters rise, counter runs 000 to 100, "Bays open" line. Under 1.5 s,
 * skippable, and never shown again in the same session. The inline script in the layout head
 * decides whether to show it (html[data-loader="on"]) before first paint, so repeat visits
 * never flash it.
 */
export function Loader() {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.loader !== "on") {
      setGone(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      cancelAnimationFrame(raf);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setPct(100);
      setLeaving(true);
      html.dataset.loader = "off";
      timer = setTimeout(() => setGone(true), 600);
    };
    finishRef.current = finish;
    if (reduce) {
      finish();
      return () => clearTimeout(timer);
    }
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else finish();
    };
    raf = requestAnimationFrame(step);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`loader fixed inset-0 z-[100] place-items-center bg-graphite grid-lines ${leaving ? "loader-out" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="w-full max-w-5xl px-5">
        <p aria-hidden className="font-display text-[clamp(2.6rem,10.5vw,8rem)] font-extrabold uppercase leading-none tracking-tight text-ink">
          {LETTERS.map((c, i) => (
            <span key={i} className="letter">
              <span style={{ animationDelay: `${i * 35}ms` }}>{c === " " ? " " : c}</span>
            </span>
          ))}
        </p>
        <div className="mt-8 flex items-end justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted sm:text-sm">
          <span className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-signal" aria-hidden />
            Bays open
          </span>
          <span className="text-3xl text-ink sm:text-5xl" aria-hidden>
            {String(pct).padStart(3, "0")}%
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-line" aria-hidden>
          <div className="h-px bg-signal" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => finishRef.current()}
        className="absolute bottom-6 right-5 border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:border-signal hover:text-ink"
      >
        Skip
      </button>
    </div>
  );
}
