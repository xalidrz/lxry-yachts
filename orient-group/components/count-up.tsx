"use client";

import { useEffect, useRef } from "react";

/**
 * A number that counts up from 0 the first time it scrolls into view.
 * The HTML always contains the final value (so search engines, no-JS and
 * reduced-motion visitors see it); the animation only rewrites the text node.
 * `value` may carry a suffix, e.g. "500+".
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(match[1]);
    const suffix = match[2];
    // Already on screen: leave the final value alone rather than flashing to 0.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.textContent = `0${suffix}`;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} dir="ltr" className={className}>
      {value}
    </span>
  );
}
