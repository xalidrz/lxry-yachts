"use client";

import { useEffect, useRef } from "react";

/**
 * Fades its content up once, the first time it scrolls into view.
 * Content that is already on screen (or when the visitor prefers reduced
 * motion, or JavaScript is off) is simply shown, never hidden.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.classList.add("reveal-hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.classList.remove("reveal-hidden");
        el.classList.add("reveal-shown");
        observer.disconnect();
      },
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
