import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

/** Floating contact button, bottom-right. Gold (not WhatsApp green) to keep the palette strict. */
export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink("Hello CH Real Estate & Builder's, I'd like to know more about your properties and construction services.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="label pointer-events-none hidden translate-x-2 border border-gold/40 bg-ink/90 px-4 py-2 text-xs text-gold-light opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-[0_12px_32px_-6px_rgba(201,160,74,0.7)] transition-transform duration-300 group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 [animation-duration:2.8s]" aria-hidden />
        <MessageCircle className="relative size-6" strokeWidth={2} />
      </span>
    </motion.a>
  );
}
