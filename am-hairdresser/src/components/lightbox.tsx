"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useLang } from "@/components/lang-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { gallery } from "@/data/gallery";

/** Loaded on demand (next/dynamic) the first time a photo is opened. */
export function Lightbox({ index, onIndex }: { index: number; onIndex: (i: number | null) => void }) {
  const { t, dir } = useLang();
  const total = gallery.length;
  const go = useCallback((d: number) => onIndex((index + d + total) % total), [index, total, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Arrow keys follow reading direction.
      const f = dir === "rtl" ? -1 : 1;
      if (e.key === "ArrowRight") go(f);
      if (e.key === "ArrowLeft") go(-f);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, dir]);

  const item = gallery[index];
  const caption = t.gallery.captions[item.id] ?? "";

  return (
    <Dialog open onOpenChange={(o) => !o && onIndex(null)}>
      <DialogContent className="inset-0 flex items-center justify-center p-3 sm:p-8" overlayClassName="bg-black/90">
        <DialogTitle className="sr-only">{caption || t.gallery.title}</DialogTitle>
        <DialogDescription className="sr-only">{t.gallery.title}</DialogDescription>
        {item.src ? (
          <figure className="relative flex max-h-full max-w-full flex-col items-center gap-3">
            <Image src={item.src} alt={caption} width={item.w} height={item.h} sizes="90vw" className="max-h-[80svh] w-auto max-w-full rounded-2xl border border-white/10 object-contain" priority />
            <figcaption className="text-sm text-cream/75">{caption}</figcaption>
          </figure>
        ) : null}

        <DialogClose asChild>
          <Button variant="ghost" size="icon" aria-label={t.gallery.close} className="absolute end-3 top-3 sm:end-6 sm:top-6">
            <X />
          </Button>
        </DialogClose>
        <Button variant="ghost" size="icon" aria-label={t.gallery.prev} onClick={() => go(-1)} className="absolute start-2 top-1/2 -translate-y-1/2 sm:start-6">
          <ChevronLeft className="rtl:-scale-x-100" />
        </Button>
        <Button variant="ghost" size="icon" aria-label={t.gallery.next} onClick={() => go(1)} className="absolute end-2 top-1/2 -translate-y-1/2 sm:end-6">
          <ChevronRight className="rtl:-scale-x-100" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
