"use client";

import { useEffect, useState } from "react";
import { getShopStatus, shopNow, type ShopStatus } from "@/lib/hours";

export type ShopClock = ShopStatus & { dow: number };

/**
 * Live status in the shop's time zone. Null on the server and on first client
 * render so static HTML never goes stale or mismatches; it fills in after mount.
 */
export function useShopStatus(): ShopClock | null {
  const [clock, setClock] = useState<ShopClock | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = { ...getShopStatus(now), dow: shopNow(now).dow };
      setClock((prev) => (prev && prev.text === next.text && prev.dow === next.dow ? prev : next));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return clock;
}
