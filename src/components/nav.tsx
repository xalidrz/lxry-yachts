"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { links, site } from "@/config/site";
import { nav } from "@/config/nav";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-graphite">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <a href="/#top" className="shrink-0">
          <Wordmark className="h-6 lg:h-7" />
        </a>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] text-muted lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="py-2 hover:text-ink">
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            href={links.tel}
            size="sm"
            label={site.phone.display}
            icon={<Phone aria-hidden />}
            className="hidden sm:inline-flex"
          />
          <a
            href={links.tel}
            aria-label={`Call ${site.phone.display}`}
            className="grid size-11 place-items-center bg-signal-deep text-white sm:hidden"
          >
            <Phone className="size-5" aria-hidden />
          </a>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="grid size-11 place-items-center border border-line text-ink hover:border-signal lg:hidden"
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </DialogTrigger>
            <DialogContent className="grid-lines px-5 pb-8 pt-3">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <DialogDescription className="sr-only">Site navigation</DialogDescription>
              <div className="flex h-16 items-center justify-between">
                <Wordmark className="h-6" />
                <DialogClose asChild>
                  <button type="button" aria-label="Close menu" className="grid size-11 place-items-center border border-line text-ink hover:border-signal">
                    <X className="size-5" aria-hidden />
                  </button>
                </DialogClose>
              </div>
              <ul className="mt-8 flex flex-1 flex-col">
                {nav.map((n, i) => (
                  <li
                    key={n.href}
                    className="border-b border-line opacity-0"
                    style={{ animation: `menu-in 0.5s cubic-bezier(0.22,1,0.36,1) ${120 + i * 70}ms forwards` }}
                  >
                    <DialogClose asChild>
                      <a href={n.href} className="flex items-baseline gap-4 py-5 font-display text-5xl font-extrabold uppercase tracking-tight text-ink hover:text-signal-bright">
                        <span className="font-mono text-xs tracking-[0.2em] text-muted">0{i + 1}</span>
                        {n.label}
                      </a>
                    </DialogClose>
                  </li>
                ))}
              </ul>
              <div
                className="opacity-0"
                style={{ animation: `menu-in 0.5s cubic-bezier(0.22,1,0.36,1) ${120 + nav.length * 70}ms forwards` }}
              >
                <Button href={links.tel} label={`Call ${site.phone.display}`} icon={<Phone aria-hidden />} className="w-full" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}
