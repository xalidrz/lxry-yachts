/**
 * The quote basket. It lives in localStorage so it survives reloads, and is
 * exposed through useSyncExternalStore (see components/quote/use-quote.ts) so
 * the server render is always an empty list and nothing mismatches on hydration.
 * There is no payment or checkout: the list is only sent as a WhatsApp message.
 */
export type QuoteItem = {
  slug: string;
  /** Product name in each language, so the list can be shown and sent in either. */
  name: { en: string; ar: string };
  /** "Various brands" for multi-brand products. */
  brand: string;
  qty: number;
};

export const QUOTE_STORAGE_KEY = "ogg-quote-v1";
export const MAX_QTY = 999;
const MAX_ITEMS = 100;
const EMPTY: QuoteItem[] = [];

let items: QuoteItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

const text = (v: unknown, max = 200) => (typeof v === "string" ? v.slice(0, max) : "");

/** localStorage is untrusted input: keep only well-formed items with sane values. */
function sanitize(raw: unknown): QuoteItem[] {
  if (!Array.isArray(raw)) return EMPTY;
  const out: QuoteItem[] = [];
  for (const r of raw.slice(0, MAX_ITEMS)) {
    if (!r || typeof r !== "object") continue;
    const o = r as Record<string, unknown>;
    const names = (o.name ?? {}) as Record<string, unknown>;
    const slug = text(o.slug, 120);
    const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(o.qty)) || 1));
    if (!slug) continue;
    out.push({
      slug,
      name: { en: text(names.en) || slug, ar: text(names.ar) || text(names.en) || slug },
      brand: text(o.brand, 80),
      qty,
    });
  }
  return out.length ? out : EMPTY;
}

function readStorage(): QuoteItem[] {
  try {
    const raw = window.localStorage.getItem(QUOTE_STORAGE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  items = readStorage();
  // Another tab changed the list.
  window.addEventListener("storage", (e) => {
    if (e.key === QUOTE_STORAGE_KEY || e.key === null) {
      items = readStorage();
      emit();
    }
  });
}

function commit(next: QuoteItem[]) {
  items = next.length ? next : EMPTY;
  try {
    window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage full or blocked: the list still works for this visit */
  }
  emit();
}

export const quoteStore = {
  subscribe(listener: () => void) {
    load();
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot(): QuoteItem[] {
    load();
    return items;
  },
  getServerSnapshot(): QuoteItem[] {
    return EMPTY;
  },
  add(item: Omit<QuoteItem, "qty">, qty = 1) {
    load();
    const amount = Math.min(MAX_QTY, Math.max(1, Math.floor(qty) || 1));
    const existing = items.find((i) => i.slug === item.slug);
    if (existing) {
      commit(
        items.map((i) =>
          i.slug === item.slug ? { ...i, qty: Math.min(MAX_QTY, i.qty + amount) } : i,
        ),
      );
    } else if (items.length < MAX_ITEMS) {
      commit([...items, { ...item, qty: amount }]);
    }
  },
  setQty(slug: string, qty: number) {
    load();
    const amount = Math.min(MAX_QTY, Math.max(1, Math.floor(qty) || 1));
    commit(items.map((i) => (i.slug === slug ? { ...i, qty: amount } : i)));
  },
  remove(slug: string) {
    load();
    commit(items.filter((i) => i.slug !== slug));
  },
  clear() {
    load();
    commit(EMPTY);
  },
};
