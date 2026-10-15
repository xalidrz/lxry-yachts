/** ISO country → international dialling code. */
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
  zm: "260", zw: "263", ao: "244", ad: "376", bz: "501", bj: "229", bt: "975", bw: "267", bn: "673", bf: "226",
  bi: "257", cv: "238", cf: "236", td: "235", km: "269", cg: "242", cd: "243", ci: "225", cu: "53", dj: "253",
  gq: "240", er: "291", sz: "268", fj: "679", ga: "241", gm: "220", gn: "224", gw: "245", gy: "592", ht: "509",
  hn: "504", li: "423", ls: "266", lr: "231", mo: "853", mg: "261", mw: "265", ml: "223", mr: "222", mu: "230",
  mc: "377", mz: "258", na: "264", ni: "505", ne: "227", pg: "675", rw: "250", sn: "221", sc: "248", sl: "232",
  so: "252", ss: "211", sr: "597", tl: "670", tg: "228", tt: "1",
};

export function dialCode(countryCode: string | undefined): string | undefined {
  return countryCode ? DIAL[countryCode.toLowerCase()] : undefined;
}

/** National mobile ranges, matched against the full international number (digits only, no +). */
const MOBILE: Record<string, RegExp> = {
  "92": /^923\d{9}$/,
  "971": /^9715\d{8}$/,
  "966": /^9665\d{8}$/,
  "44": /^447\d{9}$/,
  "91": /^91[6-9]\d{9}$/,
  "20": /^201\d{9}$/,
  "880": /^8801\d{9}$/,
  "90": /^905\d{9}$/,
  "60": /^601\d{8,9}$/,
  "62": /^628\d{8,11}$/,
  "63": /^639\d{9}$/,
  "49": /^491[567]\d{8,9}$/,
  "33": /^33[67]\d{8}$/,
  "61": /^614\d{8}$/,
  "65": /^65[89]\d{7}$/,
  "94": /^947\d{8}$/,
  "974": /^974[3567]\d{7}$/,
  "965": /^965[569]\d{7}$/,
  "968": /^968[79]\d{7}$/,
  "973": /^973[36]\d{7}$/,
  "962": /^9627\d{8}$/,
  "27": /^27[678]\d{8}$/,
  "234": /^234[789]\d{9}$/,
  "254": /^254[71]\d{8}$/,
};

/** True when the number is in a known mobile range for its country. Unknown countries count as "not mobile". */
export function looksMobile(e164: string): boolean {
  const digits = e164.replace(/\D/g, "");
  return Object.entries(MOBILE).some(([dial, re]) => digits.startsWith(dial) && re.test(digits));
}

/**
 * Clean one raw number into +<international digits>.
 * Strips spaces, dashes, dots and brackets; "+" numbers are kept; "00" becomes "+";
 * a leading 0 is replaced by the country's dialling code.
 */
export function normalizePhone(raw: string, countryCode: string | undefined): string | null {
  const dial = dialCode(countryCode);
  const cleaned = raw.trim().replace(/[\s\-().]/g, "");
  if (!/^\+?\d+$/.test(cleaned)) return null;

  let out: string;
  if (cleaned.startsWith("+")) out = cleaned;
  else if (cleaned.startsWith("00")) out = "+" + cleaned.slice(2);
  else {
    if (!dial) return null;
    if (cleaned.startsWith("0")) out = "+" + dial + cleaned.slice(1);
    // Already has the country code, only the "+" is missing
    else if (cleaned.startsWith(dial) && cleaned.length >= 11) out = "+" + cleaned;
    else out = "+" + dial + cleaned;
  }
  const digits = out.length - 1;
  return digits >= 7 && digits <= 15 ? out : null;
}

export interface PhoneInfo {
  primary: string;
  all: string[];
  mobile: boolean;
}

const PHONE_TAGS = ["phone", "contact:phone", "contact:mobile", "mobile"] as const;
const MOBILE_TAGS = new Set(["contact:mobile", "mobile"]);

/** Numbers from the four phone tags (split on ; and ,), cleaned. The first one found is primary. */
export function phoneInfoFromTags(tags: Record<string, string>, countryCode: string): PhoneInfo | null {
  const all: string[] = [];
  let primary: string | null = null;
  let primaryFromMobileTag = false;
  for (const tag of PHONE_TAGS) {
    const value = tags[tag];
    if (!value) continue;
    for (const part of value.split(/[;,]/)) {
      const n = normalizePhone(part, countryCode);
      if (!n || all.includes(n)) continue;
      all.push(n);
      if (!primary) {
        primary = n;
        primaryFromMobileTag = MOBILE_TAGS.has(tag);
      }
    }
  }
  return primary ? { primary, all, mobile: primaryFromMobileTag || looksMobile(primary) } : null;
}

/** `tel:` href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** wa.me link: digits only, no "+" or spaces. Older saved leads may hold a local number, so fall back to the country. */
export function whatsappHref(phone: string, countryCode?: string, text?: string): string | null {
  const trimmed = phone.trim();
  let digits = trimmed.replace(/\D/g, "");
  if (digits.length < 6) return null;
  if (trimmed.startsWith("+")) {
    /* already international */
  } else if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else {
    const dial = dialCode(countryCode);
    if (!dial) return null;
    if (!(digits.startsWith(dial) && digits.length > 10)) digits = dial + (digits.startsWith("0") ? digits.slice(1) : digits);
  }
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
