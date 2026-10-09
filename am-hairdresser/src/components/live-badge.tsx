"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/lang-provider";
import { isOpenNow } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** "Open now · closes 12:30 AM", computed from Asia/Bahrain time and refreshed every minute. */
export function LiveBadge({ className }: { className?: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenNow());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const label = open === null ? t.status.neutral : open ? t.status.open : t.status.closed;
  const dot = open === null ? "text-gold" : open ? "text-emerald-400" : "text-rose-400";

  return (
    <div
      role="status"
      className={cn("inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-cream/90 backdrop-blur-xl", className)}
    >
      <span aria-hidden className={cn("relative inline-block size-2 rounded-full bg-current", dot, open && "animate-pulse-dot")} />
      <span>{label}</span>
    </div>
  );
}
