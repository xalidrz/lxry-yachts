"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/** Counts from 0 to `to` when scrolled into view. Shows the final value straight away for reduced motion / before hydration. */
export function CountUp({ to, decimals = 0, duration = 1.4 }: { to: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = usePrefersReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    setValue(0);
    const controls = animate(0, to, { duration, ease: "easeOut", onUpdate: (v) => setValue(v) });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}
