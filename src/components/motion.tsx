"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import type { ReactNode } from "react";
import { revealProps } from "@/lib/reveal";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

/** Scroll-reveal: fade + slide up, staggered via `index`. Static when the user prefers reduced motion. */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = usePrefersReducedMotion();
  const Tag = m[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag className={className} data-reveal {...revealProps(index)}>
      {children}
    </Tag>
  );
}
