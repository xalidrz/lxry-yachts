"use client";

import { useCallback, type ReactNode } from "react";
import { LazyMotion } from "framer-motion";

let observer: IntersectionObserver | null = null;
const seen = (el: Element) => {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          observer?.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -60px 0px" },
  );
  observer.observe(el);
};

/** Scroll-reveal: fade + slide up, staggered via `index`. The motion itself is CSS (see [data-reveal]). */
export function Reveal({
  children,
  index = 0,
  className,
  as: Tag = "div",
  eager = false,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li" | "article";
  /** Above the fold: render visible straight away so it is never hidden waiting for JavaScript. */
  eager?: boolean;
}) {
  const ref = useCallback((el: HTMLElement | null) => {
    if (el) seen(el);
  }, []);
  if (eager) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag ref={ref as never} className={className} data-reveal style={{ "--d": `${Math.min(index, 8) * 80}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

/** Provides framer-motion's renderer to every `m` component (scroll progress, parallax, gauge). Features load async. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={() => import("@/lib/motion-features").then((mod) => mod.default)}>{children}</LazyMotion>;
}
