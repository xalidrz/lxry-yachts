import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Highlights the nav link of the section currently in the middle of the viewport. */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const top = () => window.scrollY < 200 && setActive("");
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, [ids]);
  return active;
}

const ids = navLinks.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
        scrolled ? "border-b border-white/10 bg-ink/65 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.9)] backdrop-blur-xl" : "border-b border-transparent bg-gradient-to-b from-black/70 to-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-5 md:h-20">
        <a href="#top" aria-label={`${site.shortName} — home`} className="shrink-0 rounded-sm">
          <Logo variant="wordmark" className="h-6 w-auto sm:h-7 xl:h-8" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navLinks.map((l) => {
            const on = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "label relative py-2 text-[0.92rem] transition-colors hover:text-volt-light after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brandred after:transition-transform after:duration-300 hover:after:scale-x-100",
                  on ? "text-volt-light after:scale-x-100" : "text-white/90",
                )}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <a href="#contact">Get a Free Quote</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white transition-colors hover:border-volt hover:text-volt-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-light lg:hidden"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent title="Menu" description="Site navigation">
              <div className="mt-2 pr-12">
                <Logo variant="wordmark" className="h-6 w-auto" />
              </div>
              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <a href={l.href} className="label border-b border-white/10 py-4 text-xl text-white transition-colors hover:text-volt-light">
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto space-y-3 pt-8">
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <a href="#contact">Get a Free Quote</a>
                  </Button>
                </SheetClose>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={telHref}>
                    <Phone /> {site.phoneDisplay}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
