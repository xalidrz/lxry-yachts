import { site } from "@/config/site";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const fmt12 = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Current weekday + minutes since midnight in the shop's time zone. */
function shopNow(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.hours.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    day: DAY_NAMES.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function getOpenStatus(date: Date = new Date()) {
  const { day, minutes } = shopNow(date);
  const days: readonly number[] = site.hours.days;
  const open = days.includes(day) && minutes >= toMinutes(site.hours.opens) && minutes < toMinutes(site.hours.closes);
  return open;
}

/** Text for the live badge. */
export function openBadgeText(open: boolean) {
  if (open) return `Open now · closes ${site.hours.closesLabel}`;
  return site.hours.confirmed
    ? `Closed now · opens ${fmt12(site.hours.opens)}`
    : "Closed now · call for hours";
}

/** Static hours text. Only claims the 5 PM close until the owner confirms the rest. */
export function hoursSummary() {
  if (!site.hours.confirmed) return `Closes ${site.hours.closesLabel}`;
  const days = [...site.hours.days].sort((a, b) => a - b);
  const contiguous = days.every((d, i) => i === 0 || d === days[i - 1] + 1);
  const range =
    days.length === 7
      ? "Daily"
      : contiguous && days.length > 1
        ? `${DAY_NAMES[days[0]]}–${DAY_NAMES[days[days.length - 1]]}`
        : days.map((d) => DAY_NAMES[d]).join(", ");
  return `${range} · ${fmt12(site.hours.opens)} – ${fmt12(site.hours.closes)}`;
}

/** schema.org openingHoursSpecification built from the config. */
export function openingHoursSpec() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days.map((d) => DAY_LONG[d]),
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ];
}
