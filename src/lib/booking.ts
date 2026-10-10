import { site } from "@/config/site";
import { shopNow } from "@/lib/hours";
import { timeSlots } from "@/data/booking";

/** A calendar day as "YYYY-MM-DD". */
export type DayKey = string;

export const dayKey = (y: number, m: number, d: number): DayKey =>
  `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export const parseKey = (key: DayKey) => {
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day };
};

/** Weekday (0 = Sunday) of a calendar day, independent of any time zone. */
export const weekdayOf = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d)).getUTCDay();

export const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();

const isOpenDow = (dow: number) => site.hours.week.some((d) => d.dow === dow && d.open && d.close);

/** True when the shop has at least one bookable slot left on this day, given "now" in shop time. */
export function slotsLeft(y: number, m: number, d: number, now = shopNow()) {
  const key = dayKey(y, m, d);
  const todayKey = dayKey(now.year, now.month, now.day);
  if (key < todayKey) return [];
  if (!isOpenDow(weekdayOf(y, m, d))) return [];
  return timeSlots.filter((s) => key > todayKey || s.end > now.minutes);
}

export const isDayDisabled = (y: number, m: number, d: number, now = shopNow()) => slotsLeft(y, m, d, now).length === 0;

export const monthLabel = (y: number, m: number) =>
  new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

export const longDay = (key: DayKey) => {
  const { year, month, day } = parseKey(key);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

export type BookingInput = {
  name: string;
  phone: string;
  vehicle: string;
  service: string;
  date: DayKey;
  slot: string;
  notes: string;
};

/** The text message the customer sends to the shop. */
export function composeMessage(b: BookingInput) {
  const slot = timeSlots.find((s) => s.id === b.slot);
  const lines = [
    `Hi ${site.owner}, I'd like to book an appointment at ${site.shortName}.`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `Vehicle: ${b.vehicle}`,
    `Service: ${b.service}`,
    `Day: ${longDay(b.date)}`,
    `Time: ${slot ? `${slot.label} (${slot.range})` : ""}`,
  ];
  if (b.notes.trim()) lines.push(`Notes: ${b.notes.trim()}`);
  return lines.join("\n");
}

export const smsHref = (body: string) => `sms:${site.phone.tel}?&body=${encodeURIComponent(body)}`;
