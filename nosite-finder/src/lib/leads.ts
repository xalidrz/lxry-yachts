import { useSyncExternalStore } from "react";
import type { Business, Lead, LeadStatus } from "./types";
import { LEAD_STATUSES } from "./types";

const KEY = "nosite-finder:leads:v1";

type LeadMap = Record<string, Lead>;

let cache: LeadMap | null = null;
const listeners = new Set<() => void>();

function load(): LeadMap {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "{}") as LeadMap;
    cache = {};
    for (const [id, l] of Object.entries(parsed)) {
      if (l && typeof l.name === "string" && (LEAD_STATUSES as readonly string[]).includes(l.status)) cache[id] = l;
    }
  } catch {
    cache = {};
  }
  return cache;
}

function commit(next: LeadMap): void {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode / quota: the leads still work for this session */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useLeads(): LeadMap {
  return useSyncExternalStore(subscribe, load, load);
}

export function setLeadStatus(b: Business, status: LeadStatus): void {
  const now = Date.now();
  const cur = load();
  const prev = cur[b.id];
  commit({
    ...cur,
    [b.id]: { ...b, distanceKm: undefined, ...(prev ?? {}), status, savedAt: prev?.savedAt ?? now, updatedAt: now },
  });
}

export function saveLead(b: Business): void {
  if (!load()[b.id]) setLeadStatus(b, "New");
}

export function removeLead(id: string): void {
  const { [id]: _removed, ...rest } = load();
  void _removed;
  commit(rest);
}
