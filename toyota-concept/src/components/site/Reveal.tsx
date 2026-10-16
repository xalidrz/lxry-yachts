import { createElement, type ReactNode } from "react";
import { useInViewOnce } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

/** Fade-up 16px, 400ms ease-out, once. CSS handles prefers-reduced-motion. */
export function Reveal({ as = "div", className, children }: { as?: keyof JSX.IntrinsicElements; className?: string; children: ReactNode }) {
  const [ref, seen] = useInViewOnce<HTMLElement>();
  return createElement(as, { ref, className: cn("reveal", seen && "is-in", className) }, children);
}
