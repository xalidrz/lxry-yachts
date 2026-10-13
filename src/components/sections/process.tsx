"use client";

import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/motion";
import { steps } from "@/data/process";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const C = 200;
const R = 150;
const START = 135; // degrees, 0 = east, clockwise (SVG y points down)
const SWEEP = 270;
/** Gauge value the needle rests at for each step: 0, 25, 50, 75, 100. */
const STEP_VALUES = [0, 25, 50, 75, 100] as const;

const polar = (deg: number, radius: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + radius * Math.cos(a), C + radius * Math.sin(a)] as const;
};
const valueToDeg = (v: number) => START + (SWEEP * v) / 100;
const [x0, y0] = polar(START, R);
const [x1, y1] = polar(START + SWEEP, R);
const ARC = `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 1 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;

const GREY = "#4a515a";
const GREY_LABEL = "#a4a9af";
const WHITE = "#ededed";

const ticks = Array.from({ length: 21 }, (_, i) => {
  const major = i % 4 === 0;
  const value = i * 5;
  const deg = valueToDeg(value);
  const [ax, ay] = polar(deg, R - (major ? 26 : 16));
  const [bx, by] = polar(deg, R - 6);
  const [lx, ly] = polar(deg, R - 46);
  return { major, value, ax, ay, bx, by, lx, ly };
});

/** A tick turns white once the needle has reached it, grey otherwise. */
function Tick({ t, gauge }: { t: (typeof ticks)[number]; gauge: MotionValue<number> }) {
  const stroke = useTransform(gauge, (v) => (v > 0 && v >= t.value ? WHITE : t.major ? GREY_LABEL : GREY));
  const fill = useTransform(gauge, (v) => (v > 0 && v >= t.value ? WHITE : GREY_LABEL));
  return (
    <g>
      <m.line x1={t.ax} y1={t.ay} x2={t.bx} y2={t.by} strokeWidth={t.major ? 2 : 1} style={{ stroke }} />
      {t.major ? (
        <m.text
          x={t.lx}
          y={t.ly}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontFamily="var(--font-mono-jb), monospace"
          style={{ fill }}
        >
          {t.value}
        </m.text>
      ) : null}
    </g>
  );
}

/**
 * Stepped rev gauge. The needle only moves when the active step changes, snapping to its
 * fixed position with a short spring (small overshoot, settles in about half a second).
 * The red arc and the white ticks follow the needle.
 */
function Tachometer({ step, reduce }: { step: number; reduce: boolean }) {
  const value = STEP_VALUES[step];
  const target = useMotionValue(0);
  const gauge = useSpring(target, { stiffness: 260, damping: 20, mass: 1 });

  useEffect(() => {
    target.set(value);
    if (reduce) gauge.jump(value);
  }, [value, reduce, target, gauge]);

  const needleX = useTransform(gauge, (v) => polar(valueToDeg(v), R - 30)[0]);
  const needleY = useTransform(gauge, (v) => polar(valueToDeg(v), R - 30)[1]);
  const fill = useTransform(gauge, (v) => Math.min(1, Math.max(0, v / 100)));

  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-[28rem]" role="img" aria-label={`Repair progress, step ${step + 1} of ${steps.length}, ${value} percent`}>
      <path d={ARC} fill="none" stroke="#262a30" strokeWidth="10" />
      <m.path d={ARC} fill="none" stroke="#e3262e" strokeWidth="10" style={{ pathLength: fill }} />
      {ticks.map((t) => (
        <Tick key={t.value} t={t} gauge={gauge} />
      ))}
      <m.line x1={C} y1={C} x2={needleX} y2={needleY} stroke={WHITE} strokeWidth="3" strokeLinecap="round" />
      <circle cx={C} cy={C} r="9" fill="#0e0f11" stroke={WHITE} strokeWidth="3" />
      <text x={C} y="312" textAnchor="middle" fill={WHITE} fontSize="40" fontWeight="500" fontFamily="var(--font-mono-jb), monospace">
        {String(step + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
      </text>
      <text x={C} y="340" textAnchor="middle" fill={GREY_LABEL} fontSize="14" letterSpacing="3" fontFamily="var(--font-mono-jb), monospace">
        {value}%
      </text>
    </svg>
  );
}

/** Index of the last element whose vertical centre has scrolled above the middle of the screen. */
function useActiveAtMiddle(refs: React.RefObject<(HTMLElement | null)[]>) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let idx = 0;
      refs.current.forEach((el, i) => {
        if (!el || el.offsetParent === null) return; // hidden at this breakpoint
        const r = el.getBoundingClientRect();
        if (r.top + r.height / 2 <= mid) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [refs]);
  return active;
}

export function Process({ h1 = false }: { h1?: boolean }) {
  const Title = h1 ? "h2" : "h3"; // no skipped heading level under the page h1
  const reduce = usePrefersReducedMotion();
  const deskTitles = useRef<(HTMLElement | null)[]>([]);
  const mobileTitles = useRef<(HTMLElement | null)[]>([]);
  const listRef = useRef<HTMLOListElement>(null);
  const active = useActiveAtMiddle(deskTitles);
  const mobileActive = useActiveAtMiddle(mobileTitles);
  const { scrollYProgress: list } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });

  return (
    <section id="process" className="border-b border-line bg-graphite">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:pt-28 lg:px-8">
        <SectionHead n="04" as={h1 ? "h1" : "h2"} title="How a repair works" intro="Five steps from the moment you hand over the keys." />
      </div>

      {/* Tablet and desktop: the gauge stays put while the steps scroll past it */}
      <div className="hidden md:block">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 lg:px-8">
          <div>
            <div className="sticky" style={{ top: "calc(50svh - 15rem)" }}>
              <Tachometer step={active} reduce={reduce} />
            </div>
          </div>
          <ol aria-label="Repair steps" className="pb-[18vh]">
            {steps.map((s, i) => (
              <li key={s.title} className="flex min-h-[62vh] items-center">
                <div className={cn("border-l-2 py-4 pl-6", i === active ? "border-signal" : "border-line")}>
                  <p className={cn("font-mono text-xs tracking-[0.2em]", i === active ? "text-signal-bright" : "text-muted")}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <Title
                    ref={(el) => {
                      deskTitles.current[i] = el;
                    }}
                    className={cn(
                      "mt-1 font-display text-4xl font-extrabold uppercase leading-none tracking-tight",
                      i === active ? "text-ink" : "text-muted",
                    )}
                  >
                    {s.title}
                  </Title>
                  <p className={cn("mt-2 max-w-md text-sm leading-relaxed", i === active ? "text-ink/85" : "text-muted/70")}>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Phones: vertical timeline */}
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 md:hidden">
        <ol ref={listRef} className="relative space-y-8 pl-8" aria-label="Repair steps">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line" aria-hidden />
          <m.span className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-signal" style={{ scaleY: list }} aria-hidden />
          {steps.map((s, i) => (
            <Reveal key={s.title} as="li" index={0} className="relative">
              <span
                aria-hidden
                className={cn("absolute -left-8 top-1.5 size-[15px] border-2", i <= mobileActive ? "border-signal bg-signal" : "border-line bg-graphite")}
              />
              <p className="font-mono text-xs tracking-[0.2em] text-signal-bright">{String(i + 1).padStart(2, "0")} / 05</p>
              <Title
                ref={(el) => {
                  mobileTitles.current[i] = el;
                }}
                className="mt-1 font-display text-3xl font-extrabold uppercase leading-none tracking-tight text-ink"
              >
                {s.title}
              </Title>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
