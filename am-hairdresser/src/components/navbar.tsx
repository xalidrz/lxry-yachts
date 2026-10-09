"use client";

import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { LangToggle } from "@/components/lang-toggle";
import { useLang } from "@/components/lang-provider";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { site, whatsappLink } from "@/data/site";

const links = [
  { id: "services", key: "services" },
  { id: "gallery", key: "gallery" },
  { id: "why-us", key: "whyUs" },
  { id: "location", key: "location" },
] as const;

export function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-6 sm:top-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 bg-black/40 ps-3 pe-2 shadow-nav backdrop-blur-xl md:h-16 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:ps-4 lg:pe-3">
        {/* Left: badge + name */}
        <a href="#top" className="flex min-w-0 items-center gap-2.5 rounded-full" aria-label={t.brand.short}>
          <Logo size={40} className="size-9 shrink-0 md:size-10" />
          <span className="font-display truncate text-lg font-semibold text-cream md:text-xl">{t.brand.short}</span>
        </a>

        {/* Center: links (desktop) */}
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="tracking-wide-ui group/link relative py-2 text-[0.72rem] font-medium uppercase rtl:text-sm text-cream/70 transition-colors hover:text-gold"
            >
              {t.nav[l.key]}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 scale-x-0 group-hover/link:scale-x-100 rtl:origin-right" />
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1.5 lg:justify-end lg:gap-3">
          <LangToggle className="hidden sm:inline-flex" />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={`tel:${site.phoneTel}`} aria-label={`${t.nav.callUs} ${site.phoneDisplay}`}>
              <Phone />
              <span dir="ltr">{site.phoneShort}</span>
            </a>
          </Button>

          {/* Mobile: phone icon + menu */}
          <Button asChild size="icon" className="sm:hidden">
            <a href={`tel:${site.phoneTel}`} aria-label={`${t.nav.callUs} ${site.phoneDisplay}`}>
              <Phone />
            </a>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t.nav.openMenu}>
                <Menu />
              </Button>
            </DialogTrigger>
            <DialogContent overlayClassName="bg-black/70 backdrop-blur-2xl" className="inset-0 flex flex-col overflow-y-auto bg-ink/60 p-5 backdrop-blur-2xl">
              <DialogTitle className="sr-only">{t.nav.menu}</DialogTitle>
              <DialogDescription className="sr-only">{t.brand.name}</DialogDescription>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <Logo size={40} className="size-10" />
                  <span className="font-display text-xl font-semibold">{t.brand.short}</span>
                </span>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" aria-label={t.nav.close}>
                    <X />
                  </Button>
                </DialogClose>
              </div>
              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {links.map((l) => (
                  <DialogClose asChild key={l.id}>
                    <a href={`#${l.id}`} className="tracking-wide-ui font-display border-b border-white/10 py-5 text-2xl uppercase text-cream transition-colors hover:text-gold">
                      {t.nav[l.key]}
                    </a>
                  </DialogClose>
                ))}
              </nav>
              <div className="mt-auto space-y-3 pt-10">
                <div className="flex justify-center pb-2">
                  <LangToggle className="[&_button]:text-base" />
                </div>
                <Button asChild size="lg" className="w-full">
                  <a href={whatsappLink(t.whatsappMessages.general)} target="_blank" rel="noopener noreferrer">
                    {t.hero.book}
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg" className="w-full">
                  <a href={`tel:${site.phoneTel}`}>
                    <Phone />
                    <span dir="ltr">{site.phoneDisplay}</span>
                  </a>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
