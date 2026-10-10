import { site } from "@/config/site";

const week = site.hours.week;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const fmt12 = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
};

const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Calendar date, weekday (0 = Sunday) and minutes since midnight in the shop's time zone, never the visitor's. */
export function shopNow(date: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.hours.timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    dow: SHORT.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const dayHours = (dow: number) => week.find((d) => d.dow === dow);

/** Minutes before closing when the badge turns from green to yellow. */
const CLOSING_SOON_MINUTES = 60;

/** progress = share of today's opening hours already gone (0 to 1); soon = inside the last hour. */
export type ShopStatus = { open: boolean; text: string; progress: number; soon: boolean };

/**
 * Open now · Closes 5 PM / Closed · Opens 9 AM today / Closed · Opens 9 AM tomorrow /
 * Closed · Opens Monday 9 AM, from the weekly schedule in config.
 */
export function getShopStatus(date: Date = new Date()): ShopStatus {
  const { dow, minutes } = shopNow(date);
  const today = dayHours(dow);

  if (today?.open && today.close) {
    const opens = toMinutes(today.open);
    const closes = toMinutes(today.close);
    if (minutes >= opens && minutes < closes) {
      return {
        open: true,
        text: `Open now · Closes ${fmt12(today.close)}`,
        progress: (minutes - opens) / (closes - opens),
        soon: closes - minutes <= CLOSING_SOON_MINUTES,
      };
    }
    if (minutes < opens) {
      return { open: false, text: `Closed · Opens ${fmt12(today.open)} today`, progress: 1, soon: false };
    }
  }

  // "Tomorrow" only follows a business day; from a weekend we name the day instead.
  for (let step = 1; step <= 7; step++) {
    const next = dayHours((dow + step) % 7);
    if (next?.open) {
      const text =
        step === 1 && today?.open
          ? `Closed · Opens ${fmt12(next.open)} tomorrow`
          : `Closed · Opens ${next.label} ${fmt12(next.open)}`;
      return { open: false, text, progress: 1, soon: false };
    }
  }
  return { open: false, text: "Closed", progress: 1, soon: false };
}

/** Static one-line summary, e.g. "Mon–Fri 9 AM – 5 PM · Sat–Sun Closed". Groups consecutive days with equal hours. */
export function hoursSummary() {
  const groups: { days: string[]; hours: string }[] = [];
  for (const d of week) {
    const hours = d.open && d.close ? `${fmt12(d.open)} – ${fmt12(d.close)}` : "Closed";
    const last = groups[groups.length - 1];
    if (last && last.hours === hours) last.days.push(d.short);
    else groups.push({ days: [d.short], hours });
  }
  return groups
    .map((g) => `${g.days.length > 1 ? `${g.days[0]}–${g.days[g.days.length - 1]}` : g.days[0]} ${g.hours}`)
    .join(" · ");
}

/** schema.org openingHoursSpecification built from the config (closed days are simply omitted). */
export function openingHoursSpec() {
  const groups: { days: string[]; open: string; close: string }[] = [];
  for (const d of week) {
    if (!d.open || !d.close) continue;
    const last = groups[groups.length - 1];
    if (last && last.open === d.open && last.close === d.close) last.days.push(d.label);
    else groups.push({ days: [d.label], open: d.open, close: d.close });
  }
  return groups.map((g) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: g.days,
    opens: g.open,
    closes: g.close,
  }));
}

/** schema.org short form, e.g. "Mo-Fr 09:00-17:00". */
export function openingHoursText() {
  const code = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const groups: { days: string[]; range: string }[] = [];
  week.forEach((d, i) => {
    if (!d.open || !d.close) return;
    const range = `${d.open}-${d.close}`;
    const last = groups[groups.length - 1];
    if (last && last.range === range) last.days.push(code[i]);
    else groups.push({ days: [code[i]], range });
  });
  return groups.map((g) => `${g.days.length > 1 ? `${g.days[0]}-${g.days[g.days.length - 1]}` : g.days[0]} ${g.range}`);
}
