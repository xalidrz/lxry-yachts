export interface Country {
  /** ISO 3166-1 alpha-2, uppercase */
  code: string;
  name: string;
  flag: string;
}

const CODES =
  "AF AL DZ AD AO AR AM AU AT AZ BH BD BY BE BZ BJ BT BO BA BW BR BN BG BF BI KH CM CA CV CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GT GN GW GY HT HN HK HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MR MU MX MD MC MN ME MA MZ MM NA NP NL NZ NI NE NG MK NO OM PK PS PA PG PY PE PH PL PT QA RO RU RW SA SN RS SC SL SG SK SI SO ZA KR SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TT TN TR TM UG UA AE GB US UY UZ VE VN YE ZM ZW".split(
    " ",
  );

/** Pinned to the top of the dropdown, in this order. */
export const TOP_CODES = ["PK", "AE", "SA"];

let displayNames: Intl.DisplayNames | null = null;
try {
  displayNames = new Intl.DisplayNames(["en"], { type: "region" });
} catch {
  /* very old browser: fall back to the code */
}

/** Regional-indicator letters, which render as a flag where the OS has flag glyphs. */
function flagOf(code: string): string {
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

function make(code: string): Country {
  let name = code;
  try {
    name = displayNames?.of(code) ?? code;
  } catch {
    /* keep code */
  }
  return { code, name, flag: flagOf(code) };
}

export const TOP_COUNTRIES: Country[] = TOP_CODES.map(make);
export const OTHER_COUNTRIES: Country[] = CODES.filter((c) => !TOP_CODES.includes(c))
  .map(make)
  .sort((a, b) => a.name.localeCompare(b.name, "en"));

const BY_CODE = new Map([...TOP_COUNTRIES, ...OTHER_COUNTRIES].map((c) => [c.code, c]));

export function countryByCode(code: string | undefined): Country | undefined {
  return code ? BY_CODE.get(code.toUpperCase()) : undefined;
}

/** [south, west, north, east] for the countries people search most. Others are fetched once from Nominatim and cached. */
export type Box = [number, number, number, number];
export const STATIC_BOXES: Record<string, Box> = {
  PK: [23.6, 60.8, 37.2, 77.9],
  AE: [22.5, 51.4, 26.2, 56.5],
  SA: [15.5, 34.4, 32.3, 55.8],
  GB: [49.8, -8.7, 60.9, 1.9],
  US: [18.8, -179.3, 71.6, -66.8],
  IN: [6.5, 68.0, 35.8, 97.5],
};

export function inBox(lat: number, lon: number, box: Box): boolean {
  return lat >= box[0] && lat <= box[2] && lon >= box[1] && lon <= box[3];
}
