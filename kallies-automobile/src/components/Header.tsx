import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative py-2 text-sm font-medium text-white/80 transition-colors hover:text-white",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100",
    isActive && "text-white after:scale-x-100",
  );

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="on-dark sticky top-0 z-50 border-b border-white/10 bg-ink text-white">
      <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
        <Logo />

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-6 xl:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-semibold text-white hover:text-brand lg:inline-flex">
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
            <Link to="/kontakt">Kontakt</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost-light" size="icon" className="xl:hidden" aria-label="Menü öffnen">
                <Menu className="size-6" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="on-dark bg-ink p-6 text-white">
              <SheetTitle className="sr-only">Menü</SheetTitle>
              <SheetDescription className="sr-only">Hauptnavigation von Kallies Automobile</SheetDescription>
              <Logo className="mb-6" />
              <nav aria-label="Mobile Navigation" className="flex flex-col">
                {nav.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn("border-b border-white/10 py-4 font-display text-xl font-semibold tracking-tight", isActive ? "text-brand" : "text-white")
                      }
                    >
                      {item.label}
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
                    <Link to="/kontakt">Kontakt</Link>
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
