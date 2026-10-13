"use client";

import { m, useScroll } from "framer-motion";

/** Thin red line across the top that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-signal"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
