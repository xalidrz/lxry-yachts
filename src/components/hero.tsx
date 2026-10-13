"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { heroPhoto } from "@/data/photos";
import { formatShopClock } from "@/lib/hours";
import { useNow } from "@/lib/use-now";
import { links, site } from "@/config/site";

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l border-line px-4 py-4 first:border-l-0 sm:px-6 sm:py-5">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted">{label}</p>
      <div className="mt-1.5 font-mono text-sm text-ink sm:text-base">{children}</div>
    </div>
  );
}

export function Hero() {
  const now = useNow(1000);

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-graphite">
      <Image
        src={heroPhoto.file}
        alt={heroPhoto.alt}
        fill
        priority
        fetchPriority="high"
        quality={75}
        sizes="100vw"
        className="object-cover object-[64%_50%] lg:object-center"
      />
      <div className="hero-shade absolute inset-0" aria-hidden />
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-24 lg:px-8 lg:pb-14">
        <p className="animate-rise inline-flex w-fit items-center gap-2.5 border border-line bg-graphite px-3.5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-ink">
          <span className="size-2 rounded-full bg-signal" aria-hidden />
          Owner-run · Hayward, CA
        </p>
        <h1
          id="hero-title"
          className="animate-rise mt-6 max-w-5xl font-display text-[clamp(3.25rem,10.5vw,8.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-ink [animation-delay:80ms]"
        >
          Every car.
          <br />
          Diagnosed right the first time.
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-ink/85 [animation-delay:160ms]">
          Honest, fast auto repair in Hayward, run by {site.owner}. Come by the shop or call before you drive over.
        </p>
        <div className="animate-rise mt-8 flex flex-wrap gap-3 [animation-delay:240ms]">
          <Button href={links.tel} label="Call the shop" />
          <Button href="/location" variant="outline" label="Find us" />
        </div>
      </div>

      <div className="relative border-t border-line bg-graphite">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          <Cell label="Location">
            <a
              href={links.business}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 hover:text-signal-bright"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-signal-bright" aria-hidden />
              <span className="underline decoration-signal decoration-1 underline-offset-4">
                {site.address.street} · {site.address.plusCode.split(" ")[0]}
                <span className="sr-only"> (opens in Google Maps)</span>
              </span>
            </a>
          </Cell>
          <Cell label="Google rating">
            <span className="flex items-center gap-2">
              <Star className="size-4 fill-ink text-ink" aria-hidden />
              {site.rating.value.toFixed(1)}★
              <span className="text-xs text-muted">{site.rating.count} reviews</span>
            </span>
          </Cell>
          <Cell label="Local time · Pacific">
            <span className="tabular-nums" suppressHydrationWarning>
              {now ? formatShopClock(now) : "--:--:--"}
            </span>
          </Cell>
          <Cell label="Status">
            <StatusBadge className="font-mono text-sm text-ink sm:text-base" />
          </Cell>
        </div>
      </div>
    </section>
  );
}
