"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/motion";
import { steps } from "@/data/process";
import { cn } from "@/lib/utils";

const C = 200;
const R = 150;
const START = 135; // degrees, 0 = east, clockwise (SVG y points down)
const SWEEP = 270;
const polar = (deg: number, radius: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + radius * Math.cos(a), C + radius * Math.sin(a)] as const;
};
const [x0, y0] = polar(START, R);
const [x1, y1] = polar(START + SWEEP, R);
const ARC = `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 1 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;

const ticks = Array.from({ length: 21 }, (_, i) => {
  const major = i % 4 === 0;
  const deg = START + (SWEEP * i) / 20;
  const [ax, ay] = polar(deg, R - (major ? 26 : 16));
  const [bx, by] = polar(deg, R - 6);
  const [lx, ly] = polar(deg, R - 46);
  return { major, ax, ay, bx, by, lx, ly, label: i * 5 };
});

function Tachometer({ progress, active }: { progress: MotionValue<number>; active: number }) {
  const needleX = useTransform(progress, (p) => polar(START + SWEEP * p, R - 30)[0]);
  const needleY = useTransform(progress, (p) => polar(START + SWEEP * p, R - 30)[1]);
  const [pct, setPct] = useState(0);
  useMotionValueEvent(progress, "change", (p) => setPct(Math.round(p * 100)));

  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-[28rem]" role="img" aria-label={`Repair progress, step ${active + 1} of ${steps.length}`}>
      <path d={ARC} fill="none" stroke="#262a30" strokeWidth="10" />
      <m.path d={ARC} fill="none" stroke="#e3262e" strokeWidth="10" style={{ pathLength: progress }} />
      {ticks.map((t) => (
        <g key={t.label}>
          <line x1={t.ax} y1={t.ay} x2={t.bx} y2={t.by} stroke={t.major ? "#a4a9af" : "#3a4048"} strokeWidth={t.major ? 2 : 1} />
          {t.major ? (
            <text x={t.lx} y={t.ly} textAnchor="middle" dominantBaseline="central" fill="#a4a9af" fontSize="12" fontFamily="var(--font-mono-jb), monospace">
              {t.label}
            </text>
          ) : null}
        </g>
      ))}
      <m.line x1={C} y1={C} x2={needleX} y2={needleY} stroke="#ededed" strokeWidth="3" strokeLinecap="round" />
      <circle cx={C} cy={C} r="9" fill="#0e0f11" stroke="#ededed" strokeWidth="3" />
      <text x={C} y="312" textAnchor="middle" fill="#ededed" fontSize="40" fontWeight="500" fontFamily="var(--font-mono-jb), monospace">
        {String(active + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
      </text>
      <text x={C} y="340" textAnchor="middle" fill="#a4a9af" fontSize="13" letterSpacing="3" fontFamily="var(--font-mono-jb), monospace">
        {String(pct).padStart(3, "0")}%
      </text>
    </svg>
  );
}

function StepRow({ i, active }: { i: number; active: boolean }) {
  const s = steps[i];
  return (
    <li className={cn("border-l-2 py-4 pl-6", active ? "border-signal" : "border-line")}>
      <p className={cn("font-mono text-xs tracking-[0.2em]", active ? "text-signal-bright" : "text-muted")}>
        {String(i + 1).padStart(2, "0")}
      </p>
      <h3 className={cn("mt-1 font-display text-3xl font-extrabold uppercase leading-none tracking-tight", active ? "text-ink" : "text-muted")}>
        {s.title}
      </h3>
      <p className={cn("mt-2 max-w-md text-sm leading-relaxed", active ? "text-ink/85" : "text-muted/70")}>{s.text}</p>
    </li>
  );
}

const stepFor = (p: number) => Math.min(steps.length - 1, Math.floor(p * steps.length));

export function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);

  const { scrollYProgress: pin } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  useMotionValueEvent(pin, "change", (p) => setActive(stepFor(p)));

  const { scrollYProgress: list } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  useMotionValueEvent(list, "change", (p) => setMobileActive(stepFor(p)));

  return (
    <section id="process" className="border-b border-line bg-graphite">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:pt-28 lg:px-8">
        <SectionHead n="04" title="How a repair works" intro="Five steps from the moment you hand over the keys." />
      </div>

      {/* Tablet and desktop: pinned, scroll-linked tachometer */}
      <div ref={pinRef} className="relative hidden h-[360vh] md:block">
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:grid-cols-2 lg:px-8">
            <Tachometer progress={pin} active={active} />
            <ol className="space-y-2" aria-label="Repair steps">
              {steps.map((_, i) => (
                <StepRow key={i} i={i} active={i === active} />
              ))}
            </ol>
          </div>
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
              <h3 className="mt-1 font-display text-3xl font-extrabold uppercase leading-none tracking-tight text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
