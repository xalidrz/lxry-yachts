/** ISO country → international dialling code. Used only to build WhatsApp links from local numbers. */
const DIAL: Record<string, string> = {
  af: "93", al: "355", dz: "213", ar: "54", am: "374", au: "61", at: "43", az: "994", bh: "973", bd: "880",
  by: "375", be: "32", bo: "591", ba: "387", br: "55", bg: "359", kh: "855", cm: "237", ca: "1", cl: "56",
  cn: "86", co: "57", cr: "506", hr: "385", cy: "357", cz: "420", dk: "45", do: "1", ec: "593", eg: "20",
  sv: "503", ee: "372", et: "251", fi: "358", fr: "33", ge: "995", de: "49", gh: "233", gr: "30", gt: "502",
  hk: "852", hu: "36", is: "354", in: "91", id: "62", ir: "98", iq: "964", ie: "353", il: "972", it: "39",
  jm: "1", jp: "81", jo: "962", kz: "7", ke: "254", kw: "965", kg: "996", la: "856", lv: "371", lb: "961",
  ly: "218", lt: "370", lu: "352", my: "60", mv: "960", mt: "356", mx: "52", md: "373", mn: "976", me: "382",
  ma: "212", mm: "95", np: "977", nl: "31", nz: "64", ng: "234", mk: "389", no: "47", om: "968", pk: "92",
  ps: "970", pa: "507", py: "595", pe: "51", ph: "63", pl: "48", pt: "351", qa: "974", ro: "40", ru: "7",
  sa: "966", rs: "381", sg: "65", sk: "421", si: "386", za: "27", kr: "82", es: "34", lk: "94", sd: "249",
  se: "46", ch: "41", sy: "963", tw: "886", tj: "992", tz: "255", th: "66", tn: "216", tr: "90", tm: "993",
  ug: "256", ua: "380", ae: "971", gb: "44", us: "1", uy: "598", uz: "998", ve: "58", vn: "84", ye: "967",
  zm: "260", zw: "263",
};

/** First number in an OSM phone value (they are often "a; b"). */
export function firstPhone(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const first = raw.split(/[;,/]/)[0]?.trim();
  return first && /\d{5,}/.test(first) ? first : undefined;
}

/** `tel:` href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Digits-only international number for wa.me, or null when we cannot tell the country. */
export function whatsappNumber(phone: string, countryCode?: string): string | null {
  const trimmed = phone.trim();
  let digits = trimmed.replace(/\D/g, "");
  if (digits.length < 6) return null;

  if (trimmed.startsWith("+")) return digits;
  if (digits.startsWith("00")) return digits.slice(2);

  const dial = countryCode ? DIAL[countryCode.toLowerCase()] : undefined;
  if (!dial) return null;
  // Already carries the country code but without the "+"
  if (digits.startsWith(dial) && digits.length > 10) return digits;
  // National format: drop the trunk "0"
  if (digits.startsWith("0")) digits = digits.slice(1);
  return dial + digits;
}

export function whatsappHref(phone: string, countryCode?: string, text?: string): string | null {
  const n = whatsappNumber(phone, countryCode);
  if (!n) return null;
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
