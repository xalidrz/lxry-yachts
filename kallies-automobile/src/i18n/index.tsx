import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Vehicle } from "@/data/vehicles";
import { de, type Dict } from "./de";
import { en } from "./en";

export type Lang = "de" | "en";
const dictionaries: Record<Lang, Dict> = { de, en };
const STORAGE_KEY = "kallies-lang";
const LOCALES: Record<Lang, string> = { de: "de-DE", en: "en-GB" };

const readStored = (): Lang => {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "en" || v === "de" ? v : "de";
  } catch {
    return "de";
  }
};

/** Locale-aware formatting. € and PS in German, € and hp in English. */
export function makeFormatters(lang: Lang, t: Dict) {
  const locale = LOCALES[lang];
  const int = new Intl.NumberFormat(locale);
  const eur = new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const dec = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const ezNum = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false });
  const day = new Intl.DateTimeFormat(locale, { dateStyle: "long" });
  const nbsp = " ";

  const f = {
    locale,
    int: (n: number) => int.format(n),
    decimal: (n: number) => dec.format(n),
    price: (n: number) => eur.format(n).replace(/\s/g, nbsp),
    km: (n: number) => `${int.format(n)}${nbsp}km`,
    power: (n: number) => `${n}${nbsp}${lang === "de" ? "PS" : "hp"}`,
    /** MM/YYYY is the listing convention in both languages. */
    ez: (v: Vehicle) => (v.ez ? `${ezNum.format(v.ez.month)}/${v.ez.year}` : t.vehicle.new),
    date: (iso: string) => day.format(new Date(iso)),
    title: (v: Vehicle) => `${v.make} ${v.model}`.trim(),
    /** "09/2008 · 114.355 km · 69 PS" (de) / "09/2008 · 114,355 km · 69 hp" (en) */
    spec: (v: Vehicle) => `${f.ez(v)} · ${f.km(v.km)} · ${f.power(v.ps)}`,
    drive: (v: Vehicle) => `${t.vehicle.fuels[v.fuel] ?? v.fuel} · ${t.vehicle.gearboxes[v.gearbox] ?? v.gearbox}`,
    emission: (v: Vehicle) => {
      const parts: string[] = [];
      if (v.consumption != null) parts.push(t.vehicle.consumption(new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(v.consumption)));
      if (v.co2 != null) parts.push(t.vehicle.co2(v.co2));
      if (v.co2Class) parts.push(t.vehicle.co2Class(v.co2Class));
      return parts.length ? parts.join("; ") : t.vehicle.emissionsOnRequest;
    },
  };
  return f;
}

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  fmt: ReturnType<typeof makeFormatters>;
}
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* private mode or blocked storage: the choice just won't persist */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const t = dictionaries[lang];
    return { lang, setLang, t, fmt: makeFormatters(lang, t) };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
