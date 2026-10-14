import { useId, useState, type ComponentType, type ReactNode, type AnchorHTMLAttributes } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import "@fontsource/rajdhani/600.css";
import "@fontsource/rajdhani/700.css";
import "./hud.css";

export interface HudItem {
  label: string;
  href: string;
}

/** Anything that renders an anchor: a plain <a> by default, or a router link. */
export type HudLink = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;
const PlainLink: HudLink = (props) => <a {...props} />;

export interface HudNavProps {
  logo: ReactNode;
  items: HudItem[];
  /** href of the current page; matched against `items[].href` */
  activeHref?: string;
  lang: string;
  languages: { code: string; label: string }[];
  onLangChange: (code: string) => void;
  /** Two-line phone button; `lines` are shown stacked */
  phone: { href: string; lines: [string, string]; label: string };
  cta: { href: string; label: string };
  LinkComponent?: HudLink;
  /** Breakpoint at which the nav collapses into the hamburger. Eight labels need ~1180px, so the default is xl. */
  collapseBelow?: "lg" | "xl";
  labels?: { nav: string; menu: string; openMenu: string; closeMenu: string; language: string };
}

const defaultLabels = { nav: "Main navigation", menu: "Menu", openMenu: "Open menu", closeMenu: "Close menu", language: "Language" };

/** Shared "frame" markup: a border layer and a fill layer, both clipped to the panel shape. */
const Frame = () => (
  <>
    <i className="hud-bd" aria-hidden />
    <i className="hud-bg" aria-hidden />
  </>
);

function NavButton({ item, active, Link, onClick }: { item: HudItem; active: boolean; Link: HudLink; onClick?: () => void }) {
  return (
    <Link href={item.href} className="hud-btn" aria-current={active ? "page" : undefined} onClick={onClick}>
      <i className="hud-l-halo" aria-hidden />
      <i className="hud-l-bd" aria-hidden />
      <i className="hud-l-hot" aria-hidden />
      <i className="hud-l-bg" aria-hidden />
      <i className="hud-l-glow" aria-hidden />
      <i className="hud-l-ln" aria-hidden />
      <i className="hud-l-ring" aria-hidden />
      <i className="hud-l-hl" aria-hidden />
      <i className="hud-l-spark" aria-hidden />
      <span>{item.label}</span>
    </Link>
  );
}

function LanguageToggle({ lang, languages, onChange, label }: Pick<HudNavProps, "lang" | "languages"> & { onChange: (c: string) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="hud-panel hud-capsule inline-flex items-center gap-0.5 px-1.5">
      <Frame />
      {languages.map((l) => (
        <button key={l.code} type="button" className="hud-chip" aria-pressed={lang === l.code} aria-label={`${l.code.toUpperCase()} – ${l.label}`} lang={l.code} onClick={() => onChange(l.code)}>
          {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function PhoneButton({ phone, Link }: { phone: HudNavProps["phone"]; Link: HudLink }) {
  return (
    <Link href={phone.href} className="hud-panel hud-phone inline-flex items-center gap-2.5 px-4" aria-label={phone.label}>
      <Frame />
      <Phone className="size-[18px] shrink-0" style={{ color: "var(--accent)" }} aria-hidden />
      <span className="hud-phone-text" aria-hidden>
        {phone.lines[0]}
        <br />
        {phone.lines[1]}
      </span>
    </Link>
  );
}

function CtaButton({ cta, Link, onClick }: { cta: HudNavProps["cta"]; Link: HudLink; onClick?: () => void }) {
  return (
    <Link href={cta.href} className="hud-cta" onClick={onClick}>
      <i className="hud-cta-bd" aria-hidden />
      <i className="hud-cta-fill" aria-hidden />
      <i className="hud-cta-ln hud-cta-ln-t" aria-hidden />
      <i className="hud-cta-ln hud-cta-ln-b" aria-hidden />
      <span>{cta.label}</span>
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

export function HudNav({ logo, items, activeHref, lang, languages, onLangChange, phone, cta, LinkComponent = PlainLink, collapseBelow = "xl", labels = defaultLabels }: HudNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const Link = LinkComponent;
  const wide = collapseBelow === "lg" ? { show: "hidden lg:flex", hide: "lg:hidden", grid: "lg:grid" } : { show: "hidden xl:flex", hide: "xl:hidden", grid: "xl:grid" };
  const isActive = (href: string) => activeHref !== undefined && (activeHref === href || activeHref.startsWith(`${href}/`));

  return (
    <header className="hud sticky top-0 z-50 bg-[#05080f] px-2 pb-1.5 pt-2">
      <div className="hud-panel hud-bar">
        <Frame />
        <span className="hud-bar-line" aria-hidden />
        <div className={`flex h-full items-center justify-between gap-3 px-5 ${wide.grid} grid-cols-[auto_minmax(0,1fr)_auto]`}>
          <div className="hud-panel hud-logo flex items-center px-4">
            <Frame />
            {logo}
          </div>

          <nav aria-label={labels.nav} className={`${wide.show} min-w-0 justify-center px-2`}>
            <ul className="hud-nav w-full">
              {items.map((item) => (
                <li key={item.href}>
                  <NavButton item={item} active={isActive(item.href)} Link={Link} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <div className={wide.show}>
              <LanguageToggle lang={lang} languages={languages} onChange={onLangChange} label={labels.language} />
            </div>
            <div className={wide.show}>
              <PhoneButton phone={phone} Link={Link} />
            </div>
            <div className={wide.show}>
              <CtaButton cta={cta} Link={Link} />
            </div>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger className={`hud-panel hud-burger inline-flex items-center justify-center ${wide.hide}`} aria-label={labels.openMenu} aria-controls={menuId}>
                <Frame />
                <Menu className="size-6" aria-hidden />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Content id={menuId} className="hud fixed inset-0 z-[80] p-2 outline-none" aria-describedby={undefined}>
                  <div className="hud-panel hud-menu h-full">
                    <Frame />
                    <div className="flex h-full flex-col gap-6 overflow-y-auto p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="hud-panel hud-logo flex items-center px-4">
                          <Frame />
                          {logo}
                        </div>
                        <Dialog.Close className="hud-panel hud-burger inline-flex items-center justify-center" aria-label={labels.closeMenu}>
                          <Frame />
                          <X className="size-6" aria-hidden />
                        </Dialog.Close>
                      </div>
                      <Dialog.Title className="sr-only">{labels.menu}</Dialog.Title>
                      <nav aria-label={labels.nav}>
                        <ul className="hud-menu-list">
                          {items.map((item) => (
                            <li key={item.href}>
                              <NavButton item={item} active={isActive(item.href)} Link={Link} onClick={() => setOpen(false)} />
                            </li>
                          ))}
                        </ul>
                      </nav>
                      <div className="mt-auto flex flex-wrap items-center gap-3">
                        <LanguageToggle lang={lang} languages={languages} onChange={onLangChange} label={labels.language} />
                        <PhoneButton phone={phone} Link={Link} />
                      </div>
                      <CtaButton cta={cta} Link={Link} onClick={() => setOpen(false)} />
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
