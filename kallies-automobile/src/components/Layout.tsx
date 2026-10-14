import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { HudHeader } from "@/components/hud/HudHeader";
import { Footer } from "@/components/Footer";
import { PageSkeleton } from "@/components/PageSkeleton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useI18n } from "@/i18n";
import { useMotionOk } from "@/lib/motion";

export function Layout() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const ok = useMotionOk();
  return (
    <>
      <ScrollToTop />
      <a
        href="#inhalt"
        className="sr-only z-[100] rounded-lg bg-brand px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.header.skip}
      </a>
      <HudHeader />
      {/* Page transition: 200ms fade + 8px rise on every route change */}
      <motion.main
        key={pathname}
        id="inhalt"
        tabIndex={-1}
        className="outline-none"
        {...(ok ? { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, ease: "easeOut" } } : {})}
      >
        {/* Header and footer stay put while a route chunk loads */}
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </motion.main>
      <Footer />
    </>
  );
}
