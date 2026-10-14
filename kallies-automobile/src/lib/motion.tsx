import { animate, useInView, useReducedMotion, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** True when the visitor has NOT asked for reduced motion. Every animation in the site checks this. */
export const useMotionOk = () => !useReducedMotion();

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger in seconds (use index * 0.08 for children of a group). */
  delay?: number;
  /** Horizontal start offset in px for slide-in cards */
  x?: number;
}

/** Fades + lifts its content in once (24px, 0.5s ease-out) when it scrolls into view. Static under reduced motion. */
export function Reveal({ children, className, delay = 0, x = 0 }: RevealProps) {
  const ok = useMotionOk();
  if (!ok) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

interface CountUpProps {
  to: number;
  format: (n: number) => string;
  /** seconds */
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 to `to` once, when it enters the viewport. The final text is rendered invisibly underneath so the
 * width never changes (no layout shift) and screen readers get the final value immediately.
 */
export function CountUp({ to, format, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const ok = useMotionOk();
  const [value, setValue] = useState(ok ? 0 : to);

  useEffect(() => {
    if (!ok) return setValue(to);
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: setValue });
    return () => controls.stop();
  }, [inView, ok, to, duration]);

  return (
    <span ref={ref} className={cn("inline-grid", className)}>
      <span className="invisible col-start-1 row-start-1">{format(to)}</span>
      <span aria-hidden className="col-start-1 row-start-1">{format(Number.isInteger(to) ? Math.round(value) : value)}</span>
      <span className="sr-only">{format(to)}</span>
    </span>
  );
}
