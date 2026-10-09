"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionaries, type Dictionary, type Lang } from "@/data/translations";

type Ctx = { lang: Lang; dir: "ltr" | "rtl"; t: Dictionary; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx | null>(null);
const KEY = "am-lang";

function apply(lang: Lang) {
  const el = document.documentElement;
  el.lang = lang;
  el.dir = dictionaries[lang].meta.dir;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // After hydration: ?lang=ar|en  >  saved choice  >  browser language.
  useEffect(() => {
    let next: Lang = "en";
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      const saved = localStorage.getItem(KEY);
      if (q === "ar" || q === "en") next = q;
      else if (saved === "ar" || saved === "en") next = saved;
      else if (navigator.language?.toLowerCase().startsWith("ar")) next = "ar";
    } catch {}
    setLangState(next);
    apply(next);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    apply(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(() => ({ lang, dir: dictionaries[lang].meta.dir, t: dictionaries[lang], setLang }), [lang, setLang]);

  return (
    <LangContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </MotionConfig>
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
