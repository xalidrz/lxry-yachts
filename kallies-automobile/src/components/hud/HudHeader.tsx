import { forwardRef, type AnchorHTMLAttributes } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HudNav, type HudLink } from "@/components/hud/HudNav";
import { nav, site } from "@/data/site";
import { useI18n } from "@/i18n";

const RouterAnchor: HudLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>(({ href, ...rest }, ref) => (
  <RouterLink ref={ref} to={href} {...rest} />
)) as unknown as HudLink;

/** The HUD bar wired to the Kallies router, dictionary and language state. Drop-in alternative to <Header />. */
/** Long German compounds get a soft hyphen so they wrap cleanly in the narrow buttons. */
const hyphenate = (s: string) => s.replace("Werkstattservice", "Werkstatt\u00ADservice");

export function HudHeader({ activeHref }: { activeHref?: string } = {}) {
  const { t, lang, setLang } = useI18n();
  const { pathname } = useLocation();
  const [a, b] = [site.phone.slice(0, site.phone.lastIndexOf(" ")), site.phone.slice(site.phone.lastIndexOf(" ") + 1)];

  return (
    <HudNav
      logo={
        <a href="/" className="hud-wordmark flex flex-col text-white" aria-label={t.header.home} translate="no">
          <span className="text-[22px] leading-none">Kallies</span>
          <span className="mt-0.5 text-[10px] tracking-[0.34em]" style={{ color: "var(--accent)" }}>Automobile</span>
        </a>
      }
      items={nav.map((n) => ({ label: hyphenate(t.nav[n.key]), href: n.to }))}
      activeHref={activeHref ?? pathname}
      lang={lang}
      languages={[{ code: "de", label: t.header.langDe }, { code: "en", label: t.header.langEn }]}
      onLangChange={(c) => setLang(c as "de" | "en")}
      phone={{ href: site.phoneHref, lines: [a, b], label: `${site.phone}` }}
      cta={{ href: "/kontakt", label: `${t.header.contact}` }}
      LinkComponent={RouterAnchor}
      labels={{ nav: t.header.mainNav, menu: t.header.menu, openMenu: t.header.openMenu, closeMenu: t.header.close, language: t.header.language }}
    />
  );
}
