"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { links, site } from "@/config/site";
import { nav } from "@/config/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-3 top-3 z-50 mx-auto max-w-6xl lg:inset-x-6 lg:top-5">
      <nav
        aria-label="Main"
        className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-nav/95 py-2 pl-5 pr-2 shadow-[0_10px_30px_rgba(0,0,0,0.45)] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:pl-7 lg:pr-2.5"
      >
        <Link href="/" aria-label="Elite Motorsports home" className="justify-self-start">
          <Wordmark className="h-6 lg:h-7" />
        </Link>

        <ul className="hidden items-center gap-9 font-display text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-ink lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className={cn("nav-link", isActive(n.href) && "text-signal")} aria-current={isActive(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Button asChild size="sm" className="hidden justify-self-end lg:inline-flex">
          <a href={links.tel}>
            <Phone className="phone-icon size-4" aria-hidden />
            {site.phone.display}
          </a>
        </Button>

        {/* Mobile: phone icon + menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="icon" aria-label={`Call ${site.phone.display}`}>
            <a href={links.tel} aria-label={`Call ${site.phone.display}`}>
              <Phone className="phone-icon size-5" aria-hidden />
            </a>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" aria-hidden />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-carbon px-6 pb-8 pt-5">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <DialogDescription className="sr-only">Site navigation</DialogDescription>
              <div className="flex items-center justify-between">
                <Wordmark className="h-6" />
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X className="size-5" aria-hidden />
                  </Button>
                </DialogClose>
              </div>
              <ul className="mt-14 flex flex-1 flex-col gap-2">
                {nav.map((n) => (
                  <li key={n.href} className="border-b border-white/10">
                    <DialogClose asChild>
                      <Link
                        href={n.href}
                        aria-current={isActive(n.href) ? "page" : undefined}
                        className={cn(
                          "block py-5 font-display text-5xl font-extrabold uppercase tracking-tight hover:text-signal",
                          isActive(n.href) ? "text-signal" : "text-ink",
                        )}
                      >
                        {n.label}
                      </Link>
                    </DialogClose>
                  </li>
                ))}
              </ul>
              <Button asChild className="h-14 w-full text-lg">
                <a href={links.tel}>
                  <Phone className="phone-icon size-5" aria-hidden />
                  {site.phone.display}
                </a>
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}
