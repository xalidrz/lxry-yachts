/** Appointment windows, in minutes since midnight (shop time). */
export const timeSlots = [
  { id: "morning", label: "Morning", range: "9–12", start: 540, end: 720 },
  { id: "midday", label: "Midday", range: "12–2", start: 720, end: 840 },
  { id: "afternoon", label: "Afternoon", range: "2–5", start: 840, end: 1020 },
] as const;

export type SlotId = (typeof timeSlots)[number]["id"];

export const closedNotice = "We’re closed right now — Goldy will text you back next business day.";
