import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/** Scroll to top on navigation, or to the #hash target if there is one. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait a frame so lazily-loaded page content has mounted
      const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 120);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-4 z-[100] -translate-y-24 bg-gold px-4 py-2 text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <motion.main
        id="main"
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="min-h-[70vh]"
      >
        <Outlet />
      </motion.main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
