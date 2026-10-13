"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { googleReviews } from "@/data/reviews";
import { openWindow, opensOn, shopNow } from "@/lib/hours";
import { useNow } from "@/lib/use-now";
import { useShopStatus } from "@/lib/use-shop-status";
import { links, site } from "@/config/site";
import { cn } from "@/lib/utils";

const C = 150;
const R = 108;
const toDeg = (min: number) => (min / 1440) * 360 + 180; // noon at the top, midnight at the bottom, clockwise
const pt = (min: number, r: number) => {
  const a = ((toDeg(min) - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};
const [ox, oy] = pt(openWindow.start, R);
const [cx, cy] = pt(openWindow.end, R);
const OPEN_ARC = `M ${ox.toFixed(2)} ${oy.toFixed(2)} A ${R} ${R} 0 0 1 ${cx.toFixed(2)} ${cy.toFixed(2)}`;

const hourTicks = Array.from({ length: 24 }, (_, h) => {
  const major = h % 6 === 0;
  const [ax, ay] = pt(h * 60, R - (major ? 22 : 13));
  const [bx, by] = pt(h * 60, R - 5);
  const [lx, ly] = pt(h * 60, R - 38);
  return { h, major, ax, ay, bx, by, lx, ly };
});

const featured = ["Ashwin Kumar", "Maria Naranjo", "Arav Parmar"].map((n) => googleReviews.find((r) => r.author === n)!);

export function Hours() {
  const now = useNow(1000);
  const clock = useShopStatus();
  const here = now ? shopNow(now) : null;
  const minutes = here ? here.minutes + now!.getSeconds() / 60 : 0;
  const openToday = clock ? opensOn(clock.dow) : true;
  const hh = here ? `${String(Math.floor(here.minutes / 60)).padStart(2, "0")}:${String(here.minutes % 60).padStart(2, "0")}` : "--:--";

  return (
    <section id="hours" className="border-b border-line bg-graphite py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead n="06" title="Hours" />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal className="border border-line bg-surface p-6 sm:p-8">
            <svg viewBox="0 0 300 300" className="mx-auto w-full max-w-[22rem]" role="img" aria-label={`24-hour dial showing the shop\u2019s open window and the current Pacific time, ${hh}.`}>
              <circle cx={C} cy={C} r={R} fill="none" stroke="#262a30" strokeWidth="10" />
              <path d={OPEN_ARC} fill="none" stroke={openToday ? "#e3262e" : "#5a2326"} strokeWidth="10" />
              {hourTicks.map((t) => (
                <g key={t.h}>
                  <line x1={t.ax} y1={t.ay} x2={t.bx} y2={t.by} stroke={t.major ? "#a4a9af" : "#3a4048"} strokeWidth={t.major ? 2 : 1} />
                  {t.major ? (
                    <text x={t.lx} y={t.ly} textAnchor="middle" dominantBaseline="central" fill="#a4a9af" fontSize="12" fontFamily="var(--font-mono-jb), monospace">
                      {String(t.h).padStart(2, "0")}
                    </text>
                  ) : null}
                </g>
              ))}
              <g
                className="transition-transform duration-1000 ease-out"
                style={{ transform: `rotate(${toDeg(minutes)}deg)`, transformOrigin: `${C}px ${C}px` }}
              >
                <line x1={C} y1={C + 14} x2={C} y2={C - R + 2} stroke="#ededed" strokeWidth="3" strokeLinecap="round" />
              </g>
              <circle cx={C} cy={C} r="7" fill="#0e0f11" stroke="#ededed" strokeWidth="3" />
            </svg>
            <p className="mt-2 text-center font-mono text-sm tracking-[0.18em] text-ink">
              {hh} <span className="text-muted">PACIFIC</span>
            </p>

            <div className="mt-6 border-t border-line pt-6">
              <p className="text-sm text-ink/85">
                {site.profile.appointments}. Pick a day and a time window and {site.owner} will text you back.
              </p>
              <div className="mt-5">
                <Button href="/book" label="Request a time" variant="outline" size="sm" />
              </div>
            </div>
          </Reveal>

          <Reveal index={1} className="flex flex-col border border-line bg-surface p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Google rating</p>
            <div className="mt-3 flex items-end gap-4">
              <p className="font-display text-8xl font-extrabold leading-none tracking-tight text-ink">{site.rating.value.toFixed(1)}</p>
              <div className="pb-2">
                <div className="flex gap-1" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={cn("size-5", i < 4 ? "fill-ink text-ink" : "text-ink")} />
                  ))}
                </div>
                <p className="mt-2 font-mono text-sm text-muted">{site.rating.count} Google reviews</p>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              {featured.map((r) => (
                <li key={r.author} className="border-l-2 border-line pl-4">
                  <blockquote className="text-sm leading-relaxed text-ink/90">&ldquo;{r.text}&rdquo;</blockquote>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {r.author}
                    {r.localGuide ? " · Local Guide" : ""} · {r.rating}★
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Button
                href={links.reviews}
                target="_blank"
                rel="noopener noreferrer"
                label="See reviews on Google"
                icon={<ArrowUpRight aria-hidden />}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
