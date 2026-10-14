import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { DirectionsActions } from "@/components/DirectionsActions";
import { Logo } from "@/components/Logo";
import { SoundToggle } from "@/components/SoundToggle";
import { footerLinks, nav, site } from "@/data/site";
import { useI18n } from "@/i18n";
import { useMotionOk } from "@/lib/motion";

import type { Variants } from "motion/react";
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item: Variants = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } };

export function Footer() {
  const { t } = useI18n();
  const ok = useMotionOk();
  const heading = "mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/80";
  const link = "text-white/90 hover:text-brand";
  /** Under reduced motion no initial/whileInView props are set, so everything renders in its final state. */
  const enter = ok ? { initial: "hidden", whileInView: "show", viewport: { once: true } } : {};

  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container">
        {/* Hairline orange divider: draws across once when the footer enters */}
        <motion.div
          aria-hidden
          className="h-px origin-left bg-brand"
          {...(ok ? { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: { once: true }, transition: { duration: 1, ease: "easeOut" } } : {})}
        />
      </div>
      <div className="container grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/85">{t.footer.tagline(site.since)}</p>
        </div>

        <nav aria-label={t.footer.discover} className="md:col-span-2">
          <h2 className={heading}>{t.footer.discover}</h2>
          <motion.ul className="space-y-3 text-sm" variants={list} {...enter}>
            {nav.slice(0, 6).map((n) => (
              <motion.li key={n.to} variants={item}>
                <Link to={n.to} className={link}>
                  {t.nav[n.key]}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <nav aria-label={t.footer.company} className="md:col-span-2">
          <h2 className={heading}>{t.footer.company}</h2>
          <motion.ul className="space-y-3 text-sm" variants={list} {...enter}>
            {footerLinks.map((n) => (
              <motion.li key={n.to} variants={item}>
                <Link to={n.to} className={link} {...(n.legal ? { lang: "de" } : {})}>
                  {t.footer.links[n.key]}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className={heading}>{t.footer.contact}</h2>
          <address className="space-y-3 text-sm not-italic text-white/90">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span translate="no">
                {site.legalName}
                <br />
                {site.address.street}, {site.address.zip} {site.address.city}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <a href={site.phoneHref} className="hover:text-brand">{site.phone}</a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>{t.footer.hours}</span>
            </p>
          </address>
          <DirectionsActions variant="outline-light" size="sm" className="mt-6" />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 text-xs text-white/80 sm:flex-row sm:justify-between">
          <p translate="no">{t.footer.rights(site.since)}</p>
          <p>{t.footer.note}</p>
          <SoundToggle />
        </div>
      </div>
    </footer>
  );
}
