"use client";

import { ClipboardList } from "lucide-react";

import { useQuoteUI } from "@/components/quote/quote-provider";
import { useQuoteCount } from "@/components/quote/use-quote";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

/** Bottom-left "Quote (n)" button on phones and tablets, shown only when the list has items. */
export function QuoteFloat({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).quote;
  const { setOpen } = useQuoteUI();
  const count = useQuoteCount();
  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={t.open(count)}
      className="fixed start-4 bottom-4 z-40 inline-flex h-14 cursor-pointer items-center gap-2 rounded-full bg-brand ps-5 pe-4 font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-colors duration-150 hover:bg-brand-hover min-[1024px]:hidden sm:start-6 sm:bottom-6"
    >
      <ClipboardList className="size-5" aria-hidden="true" />
      {t.nav}
      <span className="flex min-w-7 items-center justify-center rounded-full bg-white px-1.5 text-sm leading-7 font-bold text-brand tabular-nums">
        {count}
      </span>
    </button>
  );
}
