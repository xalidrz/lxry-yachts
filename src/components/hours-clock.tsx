"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { getShopStatus, opensOn, openWindow, shopNow } from "@/lib/hours";
import { needleStyle } from "@/lib/clock-style";
import { useNow } from "@/lib/use-now";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const C = 260;
const RING_OUT = 238;
const RING_IN = 224;
const TICK_OUT = 214;

/** 0 = top (00:00), clockwise. */
const angleOf = (minutes: number) => (minutes / 1440) * 360;
const point = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};

/** Closed shape between two radii over an angle range. */
function bandPath(a0: number, a1: number, r0: number, r1: number) {
  const [x0, y0] = point(a0, r1);
  const [x1, y1] = point(a1, r1);
  const [x2, y2] = point(a1, r0);
  const [x3, y3] = point(a0, r0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r1} ${r1} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)} A ${r0} ${r0} 0 ${large} 0 ${x3.toFixed(2)} ${y3.toFixed(2)} Z`;
}
const BAND = bandPath(angleOf(openWindow.start), angleOf(openWindow.end), RING_IN, RING_OUT);

/** 96 ticks (every 15 minutes), longer each hour, longest at 00 / 06 / 12 / 18. Static, so it is built once. */
const Ticks = memo(function Ticks() {
  const ticks = useMemo(
    () =>
      Array.from({ length: 96 }, (_, i) => {
        const hour = i % 4 === 0;
        const quarter = i % 24 === 0;
        const len = quarter ? 30 : hour ? 18 : 8;
        const [x1, y1] = point(i * 3.75, TICK_OUT);
        const [x2, y2] = point(i * 3.75, TICK_OUT - len);
        return { i, x1, y1, x2, y2, hour, quarter };
      }),
    [],
  );
  const labels = [0, 6, 12, 18].map((h) => ({ h, pos: point(h * 15, 150) }));
  return (
    <g>
      {ticks.map((t) => (
        <line
          key={t.i}
          className="tick"
          pathLength={1}
          style={{ ["--i" as string]: t.i }}
          x1={t.x1.toFixed(2)}
          y1={t.y1.toFixed(2)}
          x2={t.x2.toFixed(2)}
          y2={t.y2.toFixed(2)}
          stroke={t.quarter ? "#ededed" : t.hour ? "#a4a9af" : "#4a515a"}
          strokeWidth={t.quarter ? 2.5 : t.hour ? 1.75 : 1}
        />
      ))}
      {labels.map((l) => (
        <text
          key={l.h}
          x={l.pos[0]}
          y={l.pos[1]}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#a4a9af"
          fontSize="18"
          fontFamily="var(--font-mono-jb), monospace"
        >
          {String(l.h).padStart(2, "0")}
        </text>
      ))}
    </g>
  );
});

const pad = (n: number) => String(n).padStart(2, "0");

/** Large 24-hour clock in Pacific time. Open window as a red band, live needle, hours-left readout. */
export function HoursClock({ className }: { className?: string }) {
  const now = useNow(1000);
  const reduce = usePrefersReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [sweeping, setSweeping] = useState(true);
  const lastAngle = useRef(0);
  const turns = useRef(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (reduce) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!seen || !now) return;
    if (reduce) {
      setSweeping(false);
      return;
    }
    const t = setTimeout(() => setSweeping(false), 1300);
    return () => clearTimeout(t);
  }, [seen, now, reduce]);

  const here = now ? shopNow(now) : null;
  const status = now ? getShopStatus(now) : null;
  const openToday = here ? opensOn(here.dow) : true;
  const fractional = here && now ? here.minutes + now.getSeconds() / 60 : 0;

  // Keep the angle increasing across midnight so the needle never spins backwards.
  let angle = angleOf(fractional) + turns.current;
  if (here && angle < lastAngle.current - 180) {
    turns.current += 360;
    angle += 360;
  }
  lastAngle.current = angle;
  const shown = seen && now ? angle : 0;

  const left = status?.open ? openWindow.end - fractional : 0;
  const headline = !status
    ? "--"
    : status.open
      ? left >= 60
        ? `${Math.floor(left / 60)}h ${pad(Math.floor(left % 60))}m`
        : `${Math.floor(left)}m`
      : "Opens 9 AM";
  const sub = !status || status.open ? "" : status.text.includes("tomorrow") ? "tomorrow" : status.text.includes("today") ? "" : status.text.split(" ").slice(-3, -2)[0];
  const statusWord = !status ? "" : status.open ? "OPEN NOW" : openToday ? "CLOSED" : "CLOSED TODAY";
  const summary = !status
    ? "24-hour clock in Pacific time"
    : status.open
      ? `Open now, ${Math.floor(left / 60)} hours ${Math.floor(left % 60)} minutes until close`
      : `${statusWord.toLowerCase()}. ${status.text.replace("Closed · ", "")}`;

  return (
    <div ref={wrap} className={cn("mx-auto w-[300px] max-w-full sm:w-[420px] lg:w-[520px]", className)}>
      <svg viewBox="0 0 520 520" className={cn("clock block w-full", seen && "in")} role="img" aria-label={summary}>
        <circle cx={C} cy={C} r={(RING_OUT + RING_IN) / 2} fill="none" stroke="#1d2024" strokeWidth={RING_OUT - RING_IN} />
        <path
          className="band"
          d={BAND}
          fill={openToday ? "#e3262e" : "none"}
          stroke={openToday ? "none" : "#6b2a2e"}
          strokeWidth={openToday ? 0 : 1.5}
        />
        <Ticks />

        <g style={needleStyle(shown, reduce ? "none" : sweeping ? "sweep" : "live", C)}>
          <line x1={C} y1={C - 120} x2={C} y2={C - 204} stroke="#ededed" strokeWidth="3" strokeLinecap="round" />
          <circle cx={C} cy={C - 204} r="7" fill="#e3262e" stroke="#0e0f11" strokeWidth="2" />
        </g>

        <g aria-hidden>
          <text
            x={C}
            y={sub ? C - 2 : C + 8}
            textAnchor="middle"
            fill="#ededed"
            fontSize={status?.open || !status ? 72 : 52}
            fontWeight="800"
            fontFamily="var(--font-barlow), 'Arial Narrow', sans-serif"
            style={{ textTransform: "uppercase" }}
          >
            {headline}
          </text>
          {sub ? (
            <text x={C} y={C + 24} textAnchor="middle" fill="#a4a9af" fontSize="15" letterSpacing="3" fontFamily="var(--font-mono-jb), monospace">
              {sub.toUpperCase()}
            </text>
          ) : null}
          {status ? (
            <g>
              <circle cx={C + 6 - statusWord.length * 6 - 14} cy={C + 54} r="5" fill={status.open ? "#2fbf71" : "#e3262e"} />
              <text x={C + 6} y={C + 59} textAnchor="middle" fill="#ededed" fontSize="15" letterSpacing="3" fontFamily="var(--font-mono-jb), monospace">
                {statusWord}
              </text>
            </g>
          ) : null}
        </g>
      </svg>
    </div>
  );
}

/** DAY ──●── NIGHT bar plus a live "Now in Hayward" readout. */
export function DayNight() {
  const now = useNow(1000);
  const here = now ? shopNow(now) : null;
  const hours = here && now ? here.minutes / 60 + now.getSeconds() / 3600 : null;
  // Left half is day (06:00–18:00), right half is night (18:00–06:00).
  const x = hours === null ? 0 : (((hours - 6 + 24) % 24) / 24) * 100;
  const clock =
    now === null
      ? "--:--:--"
      : new Intl.DateTimeFormat("en-GB", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).format(now);

  return (
    <div className="max-w-sm">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span>Day</span>
        <span className="relative h-px flex-1 bg-line" aria-hidden>
          <span className="absolute left-1/2 top-1/2 h-2 w-px -translate-y-1/2 bg-line" />
          <span
            className="daydot absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
            style={{ left: `${x}%` }}
          />
        </span>
        <span>Night</span>
      </div>
      <p className="mt-4 font-mono text-sm text-ink" suppressHydrationWarning>
        Now in Hayward: <span className="tabular-nums">{clock}</span>
      </p>
    </div>
  );
}
