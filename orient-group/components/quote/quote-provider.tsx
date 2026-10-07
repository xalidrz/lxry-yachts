"use client";

import { createContext, useContext, useState } from "react";

import { QuoteDrawer } from "@/components/quote/quote-drawer";
import type { Locale } from "@/lib/i18n";

type QuoteUI = { open: boolean; setOpen: (open: boolean) => void };
const QuoteUIContext = createContext<QuoteUI>({ open: false, setOpen: () => {} });

/** Holds whether the quote drawer is open, and renders the drawer once for the whole site. */
export function QuoteProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <QuoteUIContext.Provider value={{ open, setOpen }}>
      {children}
      <QuoteDrawer locale={locale} open={open} onOpenChange={setOpen} />
    </QuoteUIContext.Provider>
  );
}

export function useQuoteUI() {
  return useContext(QuoteUIContext);
}
