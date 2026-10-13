"use client";

import { useCallback, type ReactNode } from "react";

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
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const ref = useCallback((el: HTMLElement | null) => {
    if (el) seen(el);
  }, []);
  return (
    <Tag ref={ref as never} className={className} data-reveal style={{ "--d": `${Math.min(index, 8) * 80}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
