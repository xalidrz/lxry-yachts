"use client";

import { ClipboardList } from "lucide-react";

import { useQuoteUI } from "@/components/quote/quote-provider";
import { useQuoteCount } from "@/components/quote/use-quote";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** "Quote (n)" button for the navbar; opens the quote drawer. */
export function QuoteNavButton({
  locale,
  className,
  labelClassName,
  onOpen,
}: {
  locale: Locale;
  className?: string;
  labelClassName?: string;
  /** Runs before the drawer opens (e.g. to close the mobile menu). */
  onOpen?: () => void;
}) {
  const t = getDictionary(locale).quote;
  const { setOpen } = useQuoteUI();
  const count = useQuoteCount();

  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.();
        setOpen(true);
      }}
      aria-label={t.open(count)}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-white px-4 text-[15px] font-semibold text-foreground transition-colors duration-150 hover:border-brand-grey",
        className,
      )}
    >
      <ClipboardList className="size-[18px]" aria-hidden="true" />
      <span className={labelClassName}>{t.nav}</span>
      <span
        className={cn(
          "flex min-w-6 items-center justify-center rounded-full px-1.5 text-xs leading-6 font-bold tabular-nums",
          count > 0 ? "bg-brand text-white" : "bg-muted text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
}
