"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ClipboardList } from "lucide-react";

import { QtyStepper } from "@/components/quote/qty-stepper";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { quoteStore } from "@/lib/quote-store";
import { cn } from "@/lib/utils";

/** Quantity stepper plus an "Add to quote" button. Adds to the basket; nothing is bought online. */
export function AddToQuote({
  slug,
  name,
  brand,
  locale,
  size = "sm",
  className,
}: {
  slug: string;
  name: { en: string; ar: string };
  brand: string;
  locale: Locale;
  size?: "sm" | "lg";
  className?: string;
}) {
  const t = getDictionary(locale).quote;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const add = () => {
    quoteStore.add({ slug, name, brand }, qty);
    setAdded(true);
    setQty(1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <QtyStepper
        value={qty}
        onChange={setQty}
        size={size === "lg" ? "md" : "sm"}
        decreaseLabel={t.decrease}
        increaseLabel={t.increase}
        qtyLabel={t.qty}
      />
      <Button
        type="button"
        variant="primary"
        size={size === "lg" ? "lg" : "sm"}
        className="min-w-0 flex-1 px-3"
        onClick={add}
      >
        {added ? <Check aria-hidden="true" /> : <ClipboardList aria-hidden="true" />}
        <span className="truncate">{added ? t.added : t.add}</span>
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {added ? `${t.added}: ${name[locale]}` : ""}
      </span>
    </div>
  );
}
