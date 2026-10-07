"use client";

import { useSyncExternalStore } from "react";

import { quoteStore, type QuoteItem } from "@/lib/quote-store";

/** The quote list (empty on the server) and its total quantity of lines. */
export function useQuoteItems(): QuoteItem[] {
  return useSyncExternalStore(
    quoteStore.subscribe,
    quoteStore.getSnapshot,
    quoteStore.getServerSnapshot,
  );
}

export function useQuoteCount(): number {
  return useQuoteItems().length;
}
