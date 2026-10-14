import { BadgeCheck, ClipboardCheck, FileCheck2, Timer } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ValuationForm } from "@/components/sections/ValuationForm";

const steps = [
  { icon: ClipboardCheck, title: "Kostenlose Online-Bewertung", text: "Fahrzeugdaten in wenigen Schritten eingeben." },
  { icon: Timer, title: "Schnelle Preisschätzung", text: "Unsere Experten melden sich in kurzer Zeit mit einem Angebot." },
  { icon: BadgeCheck, title: "Verkaufen – wenn Sie möchten", text: "Termin vereinbaren, Vertrag unterschreiben, Geld erhalten." },
];

/** The standout dark panel: "Was ist Ihr Auto wert?" */
export function AnkaufPanel() {
  return (
    <section className="section" aria-labelledby="ankauf-title">
      <div className="container">
        <Reveal>
          <div className="on-dark overflow-hidden rounded-lg bg-ink text-white shadow-lift">
            <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-16">
              <div>
                <p className="eyebrow">Ankauf</p>
                <h2 id="ankauf-title" className="display-2 mt-4">
                  Was ist Ihr Auto wert?
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
                  Fahrzeugdaten eingeben, Preis erfahren: in rund 2 Minuten, kostenlos und unverbindlich. Wir kaufen fast jedes Auto – unabhängig von Marke und Zustand.
                </p>

                <ol className="mt-10 space-y-6">
                  {steps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/20 text-brand">
                        <s.icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold">
                          <span className="mr-2 text-white/60 tabular-nums">0{i + 1}</span>
                          {s.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/75">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <p className="mt-10 flex items-center gap-3 border-t border-white/15 pt-6 text-sm text-white/80">
                  <FileCheck2 className="size-5 shrink-0 text-brand" aria-hidden />
                  Abmeldung und alle Formalitäten übernehmen wir für Sie.
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
