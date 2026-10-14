import { useId } from "react";
import { motion } from "motion/react";
import { useI18n, type Lang } from "@/i18n";
import { useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

const options: Lang[] = ["de", "en"];

/** DE | EN pill. The highlight is a single shared element that slides between the two options. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const id = useId();
  const ok = useMotionOk();

  return (
    <div role="group" aria-label={t.header.language} className={cn("relative inline-flex rounded-full border border-white/25 p-0.5", className)}>
      {options.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            aria-label={`${l.toUpperCase()} – ${l === "de" ? t.header.langDe : t.header.langEn}`}
            onClick={() => setLang(l)}
            className={cn("relative z-10 min-w-10 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors", active ? "text-ink" : "text-white hover:text-brand")}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className="absolute inset-0 -z-10 rounded-full bg-brand"
                transition={ok ? { type: "spring", stiffness: 500, damping: 38 } : { duration: 0 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
