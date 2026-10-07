"use client";

import { useState } from "react";
import { MessageCircle, Trash2 } from "lucide-react";

import { useQuoteItems } from "@/components/quote/use-quote";
import { QtyStepper } from "@/components/quote/qty-stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { quoteStore } from "@/lib/quote-store";
import { quoteWhatsappUrl } from "@/lib/quote-message";
import { ANY_BRAND } from "@/lib/whatsapp";

/** Side drawer: the list with editable quantities, optional details, and the WhatsApp send button. */
export function QuoteDrawer({
  locale,
  open,
  onOpenChange,
}: {
  locale: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = getDictionary(locale);
  const q = t.quote;
  const items = useQuoteItems();
  const [details, setDetails] = useState({ name: "", company: "", phone: "" });
  const set = (key: keyof typeof details) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDetails((d) => ({ ...d, [key]: e.target.value.slice(0, 80) }));

  const fieldClass = "min-h-11 rounded-xl";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent closeLabel={t.productDialog.close} className="gap-0 p-0 sm:w-[440px] sm:max-w-[440px]">
        <div className="border-b p-6 pe-16">
          <SheetTitle className="font-display text-xl font-extrabold">
            {q.title}
            {items.length > 0 && (
              <span className="ms-2 text-base font-semibold text-muted-foreground">
                ({q.items(items.length)})
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="mt-1 text-sm text-muted-foreground">{q.note}</SheetDescription>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-dashed p-6 text-center text-muted-foreground">
              {q.empty}
            </p>
          ) : (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.slug} className="flex flex-col gap-3 py-4 first:pt-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug">{item.name[locale]}</p>
                      {item.brand && item.brand !== ANY_BRAND && (
                        <p dir="ltr" className="mt-0.5 text-sm text-muted-foreground">
                          {item.brand}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => quoteStore.remove(item.slug)}
                      aria-label={q.remove(item.name[locale])}
                      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-brand"
                    >
                      <Trash2 className="size-5" aria-hidden="true" />
                    </button>
                  </div>
                  <QtyStepper
                    value={item.qty}
                    onChange={(n) => quoteStore.setQty(item.slug, n)}
                    decreaseLabel={q.decrease}
                    increaseLabel={q.increase}
                    qtyLabel={`${q.qty}: ${item.name[locale]}`}
                    className="self-start"
                  />
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <fieldset className="mt-6 space-y-3 border-t pt-6">
              <legend className="mb-3 text-sm font-bold tracking-[0.1em] text-muted-foreground uppercase">
                {q.detailsTitle}
              </legend>
              <label className="block text-sm font-semibold">
                {q.name}
                <Input
                  value={details.name}
                  onChange={set("name")}
                  autoComplete="name"
                  maxLength={80}
                  className={`mt-1 ${fieldClass}`}
                />
              </label>
              <label className="block text-sm font-semibold">
                {q.company}
                <Input
                  value={details.company}
                  onChange={set("company")}
                  autoComplete="organization"
                  maxLength={80}
                  className={`mt-1 ${fieldClass}`}
                />
              </label>
              <label className="block text-sm font-semibold">
                {q.phone}
                <Input
                  type="tel"
                  inputMode="tel"
                  dir="ltr"
                  value={details.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                  maxLength={30}
                  className={`mt-1 ${fieldClass} text-start`}
                />
              </label>
            </fieldset>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t bg-white p-6">
            <Button asChild variant="whatsapp" size="lg" className="w-full">
              <a
                href={quoteWhatsappUrl(locale, items, details)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                {q.send}
              </a>
            </Button>
            <button
              type="button"
              onClick={() => quoteStore.clear()}
              className="flex min-h-11 w-full cursor-pointer items-center justify-center text-sm font-semibold text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-brand hover:decoration-brand"
            >
              {q.clear}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
