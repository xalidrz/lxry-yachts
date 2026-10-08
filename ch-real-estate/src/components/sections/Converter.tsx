import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const SQFT_PER_MARLA = 225;
const MARLA_PER_KANAL = 20;

type Unit = "marla" | "kanal" | "sqft";

const toMarla = (v: number, u: Unit) => (u === "marla" ? v : u === "kanal" ? v * MARLA_PER_KANAL : v / SQFT_PER_MARLA);
const fromMarla = (m: number, u: Unit) => (u === "marla" ? m : u === "kanal" ? m / MARLA_PER_KANAL : m * SQFT_PER_MARLA);
const fmt = (n: number) => String(parseFloat(n.toFixed(2)));

const presets = [
  { label: "3 Marla", marla: 3 },
  { label: "5 Marla", marla: 5 },
  { label: "7 Marla", marla: 7 },
  { label: "10 Marla", marla: 10 },
  { label: "1 Kanal", marla: 20 },
  { label: "2 Kanal", marla: 40 },
];

const fields: { unit: Unit; label: string; hint: string }[] = [
  { unit: "marla", label: "Marla", hint: "1 Marla = 225 sq ft" },
  { unit: "kanal", label: "Kanal", hint: "1 Kanal = 20 Marla" },
  { unit: "sqft", label: "Square Feet", hint: "1 Kanal = 4,500 sq ft" },
];

export function Converter() {
  const [vals, setVals] = useState<Record<Unit, string>>({ marla: "5", kanal: "0.25", sqft: "1125" });

  const update = (unit: Unit, raw: string) => {
    if (raw === "" || !/^\d*\.?\d*$/.test(raw)) {
      if (raw === "") setVals({ marla: "", kanal: "", sqft: "" });
      return;
    }
    const n = parseFloat(raw);
    if (Number.isNaN(n)) {
      setVals((v) => ({ ...v, [unit]: raw }));
      return;
    }
    const m = toMarla(n, unit);
    setVals({
      marla: unit === "marla" ? raw : fmt(fromMarla(m, "marla")),
      kanal: unit === "kanal" ? raw : fmt(fromMarla(m, "kanal")),
      sqft: unit === "sqft" ? raw : fmt(fromMarla(m, "sqft")),
    });
  };

  const setMarla = (m: number) => update("marla", String(m));
  const current = parseFloat(vals.marla);

  return (
    <section id="converter" aria-labelledby="converter-title" className="scroll-mt-20 border-t border-gold/15 bg-surface py-28">
      <div className="container">
        <SectionHeading
          id="converter-title"
          eyebrow="Handy Tool"
          title={
            <>
              Marla <Gold>↔</Gold> Sq Ft Converter
            </>
          }
          description="Compare plot sizes instantly. Type in any box and the others update."
        />

        <Reveal className="mx-auto max-w-4xl" delay={0.1}>
          <div className="border border-gold/25 bg-ink p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-10">
            <div className="mb-8 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Common sizes">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setMarla(p.marla)}
                  data-active={current === p.marla}
                  className={cn(
                    "label border px-4 py-2 text-[0.85rem] transition-colors",
                    current === p.marla
                      ? "border-gold bg-gold/15 text-gold-light"
                      : "border-gold/25 text-muted-foreground hover:border-gold/70 hover:text-cream",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="grid items-end gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {fields.map((f, i) => (
                <div key={f.unit} className="contents">
                  <div className="space-y-2">
                    <Label htmlFor={`conv-${f.unit}`}>{f.label}</Label>
                    <Input
                      id={`conv-${f.unit}`}
                      inputMode="decimal"
                      autoComplete="off"
                      value={vals[f.unit]}
                      onChange={(e) => update(f.unit, e.target.value)}
                      placeholder="0"
                      className="h-16 font-heading text-2xl"
                    />
                    <p className="text-sm text-muted-foreground">{f.hint}</p>
                  </div>
                  {i < fields.length - 1 && (
                    <ArrowLeftRight className="hidden size-5 shrink-0 self-center text-gold md:mb-9 md:block" aria-hidden />
                  )}
                </div>
              ))}
            </div>

            <p className="mt-9 border-t border-gold/20 pt-6 text-center text-[0.95rem] text-muted-foreground">
              Standard conversion used: <span className="text-cream">1 Marla = 225 sq ft</span> ·{" "}
              <span className="text-cream">1 Kanal = 20 Marla</span>. Local measurements can vary slightly by area, so
              always confirm with the title documents.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
