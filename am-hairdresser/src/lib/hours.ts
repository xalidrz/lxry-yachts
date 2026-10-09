import { hours } from "@/data/site";

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Minutes since midnight in Bahrain right now. */
export function bahrainMinutes(date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: hours.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

/** Open window crosses midnight (e.g. 09:00 → 00:30), so handle both cases. */
export function isOpenNow(date = new Date()): boolean {
  const now = bahrainMinutes(date);
  const open = toMin(hours.opensAt);
  const close = toMin(hours.closesAt);
  return open <= close ? now >= open && now < close : now >= open || now < close;
}
