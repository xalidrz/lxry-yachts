"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dayKey, daysInMonth, isDayDisabled, monthLabel, weekdayOf, type DayKey } from "@/lib/booking";
import { site } from "@/config/site";
import type { shopNow } from "@/lib/hours";
import { cn } from "@/lib/utils";

const MONTHS_AHEAD = 3;
const weekdays = site.hours.week;

/** Month calendar, Monday first. Closed weekdays and past days are disabled (all dates in shop time). */
export function DatePicker({
  now,
  value,
  onChange,
}: {
  now: ReturnType<typeof shopNow>;
  value: DayKey;
  onChange: (key: DayKey) => void;
}) {
  const [offset, setOffset] = useState(0);
  const base = now.year * 12 + (now.month - 1) + offset;
  const year = Math.floor(base / 12);
  const month = (base % 12) + 1;

  const lead = (weekdayOf(year, month, 1) + 6) % 7; // blanks before the 1st, Monday = 0
  const total = daysInMonth(year, month);
  const cells: (number | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);

  return (
    <div className="max-w-sm rounded-2xl border border-white/10 bg-carbon p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOffset((o) => o - 1)}
          disabled={offset === 0}
          className="grid size-11 place-items-center rounded-full text-ink hover:text-signal disabled:opacity-30 disabled:hover:text-ink"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <p className="font-display text-lg font-bold uppercase tracking-wide text-ink" aria-live="polite">
          {monthLabel(year, month)}
        </p>
        <button
          type="button"
          onClick={() => setOffset((o) => o + 1)}
          disabled={offset >= MONTHS_AHEAD}
          className="grid size-11 place-items-center rounded-full text-ink hover:text-signal disabled:opacity-30 disabled:hover:text-ink"
          aria-label="Next month"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 text-center text-xs uppercase tracking-wider text-muted" aria-hidden>
        {weekdays.map((d) => (
          <span key={d.dow} className="py-1">
            {d.short.slice(0, 2)}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (d === null) return <span key={`b${i}`} />;
          const key = dayKey(year, month, d);
          const disabled = isDayDisabled(year, month, d, now);
          const selected = key === value;
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              aria-label={new Date(Date.UTC(year, month - 1, d)).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
              onClick={() => onChange(key)}
              className={cn(
                "mx-auto grid size-11 place-items-center rounded-full text-sm",
                selected
                  ? "bg-signal font-bold text-white"
                  : disabled
                    ? "cursor-not-allowed text-muted/40 line-through decoration-1"
                    : "text-ink hover:bg-white/10",
              )}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
