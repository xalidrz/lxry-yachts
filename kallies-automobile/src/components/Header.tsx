import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav, site } from "@/data/site";
import { useI18n } from "@/i18n";
import { useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useI18n();
  const ok = useMotionOk();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = nav.find((n) => pathname === n.to || pathname.startsWith(`${n.to}/`))?.to ?? null;
  /** One shared indicator: it follows hover/focus and rests on the current page. */
  const target = hovered ?? active;

  return (
    <header className={cn("on-dark sticky top-0 z-50 border-b border-white/10 bg-ink text-white transition-shadow duration-300", scrolled && "shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)]")}>
      <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
        <Logo />

        <nav aria-label={t.header.mainNav} className="hidden items-center gap-6 xl:flex" onMouseLeave={() => setHovered(null)}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onMouseEnter={() => setHovered(item.to)}
              onFocus={() => setHovered(item.to)}
              onBlur={() => setHovered(null)}
              className={({ isActive }) => cn("relative py-2 text-sm font-medium transition-colors", isActive || hovered === item.to ? "text-white" : "text-white/85")}
            >
              {t.nav[item.key]}
              {target === item.to && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand"
                  transition={ok ? { type: "spring", stiffness: 520, damping: 40 } : { duration: 0 }}
                />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSwitch />
          <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-semibold text-white hover:text-brand lg:inline-flex">
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
            <Link to="/kontakt">{t.header.contact}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost-light" size="icon" className="xl:hidden" aria-label={t.header.openMenu}>
                <Menu className="size-6" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="on-dark bg-ink p-6 text-white" closeLabel={t.header.close}>
              <SheetTitle className="sr-only">{t.header.menu}</SheetTitle>
              <SheetDescription className="sr-only">{t.header.menuDesc}</SheetDescription>
              <Logo className="mb-6" />
              <nav aria-label={t.header.mobileNav} className="flex flex-col">
                {nav.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => cn("border-b border-white/10 py-4 font-display text-xl font-semibold tracking-tight", isActive ? "text-brand" : "text-white")}
                    >
                      {t.nav[item.key]}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <Button asChild variant="outline-light" size="lg">
                  <a href={site.phoneHref}>
                    <Phone aria-hidden /> {site.phone}
                  </a>
                </Button>
                <SheetClose asChild>
                  <Button asChild variant="brand" size="lg">
                    <Link to="/kontakt">{t.header.contact}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
