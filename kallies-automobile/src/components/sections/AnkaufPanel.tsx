import { BadgeCheck, ClipboardCheck, FileCheck2, Timer } from "lucide-react";
import { Reveal } from "@/lib/motion";
import { ValuationForm } from "@/components/sections/ValuationForm";
import { useI18n } from "@/i18n";

const icons = [ClipboardCheck, Timer, BadgeCheck];

/** The standout dark panel: "Was ist Ihr Auto wert?" */
export function AnkaufPanel() {
  const { t } = useI18n();
  return (
    <section className="section" aria-labelledby="ankauf-title">
      <div className="container">
        <Reveal>
          <div className="on-dark overflow-hidden rounded-lg bg-ink text-white shadow-lift">
            <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-16">
              <div>
                <p className="eyebrow">{t.ankauf.eyebrow}</p>
                <h2 id="ankauf-title" className="display-2 mt-4">
                  {t.ankauf.title}
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">{t.ankauf.lead}</p>

                <ol className="mt-10 space-y-6">
                  {t.ankauf.steps.map((s, i) => {
                    const Icon = icons[i];
                    return (
                      <li key={s.title} className="flex gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/20 text-brand">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-semibold">
                            <span className="mr-2 text-white/70 tabular-nums">0{i + 1}</span>
                            {s.title}
                          </h3>
                          <p className="mt-1 text-sm text-white/80">{s.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <p className="mt-10 flex items-center gap-3 border-t border-white/15 pt-6 text-sm text-white/85">
                  <FileCheck2 className="size-5 shrink-0 text-brand" aria-hidden />
                  {t.ankauf.note}
                </p>
              </div>

              <ValuationForm className="lg:self-center" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
