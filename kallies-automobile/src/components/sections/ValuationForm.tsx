import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field } from "@/components/forms/Field";
import { ConsentCheck } from "@/components/forms/ConsentCheck";
import { FormNotice } from "@/components/forms/FormNotice";
import { useI18n } from "@/i18n";
import { formDataToObject, submitLead, type LeadResult } from "@/lib/forms";
import { useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Three-step, ~2 minute valuation request. Earlier steps are kept in state so the last one can submit everything. */
export function ValuationForm({ className }: { className?: string }) {
  const { t } = useI18n();
  const f = t.ankauf.form;
  const ok = useMotionOk();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [condition, setCondition] = useState("");
  const [result, setResult] = useState<LeadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const last = f.stepNames.length - 1;

  const advance = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData((d) => ({ ...d, ...formDataToObject(e.currentTarget), ...(step === 1 ? { Zustand: condition } : {}) }));
    setStep((s) => s + 1);
  };

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      setResult(await submitLead("Ankaufanfrage", { ...data, ...formDataToObject(e.currentTarget) }));
    } catch (err) {
      setError(err instanceof Error ? err.message : t.forms.genericError);
    } finally {
      setBusy(false);
    }
  };

  const slide = ok ? { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 }, transition: { duration: 0.22, ease: "easeOut" as const } } : {};

  return (
    <div className={cn("rounded-lg bg-white p-6 text-ink shadow-lift md:p-8", className)}>
      {/* Progress: the line fills between steps; each dot turns into a check once done */}
      <ol className="relative mb-8 flex justify-between" aria-label={f.progress}>
        <span aria-hidden className="absolute left-4 right-4 top-4 h-0.5 -translate-y-1/2 bg-line" />
        <motion.span
          aria-hidden
          className="absolute left-4 top-4 h-0.5 -translate-y-1/2 bg-ink"
          style={{ right: "1rem", transformOrigin: "left" }}
          initial={false}
          animate={{ scaleX: step / last }}
          transition={ok ? { duration: 0.4, ease: "easeOut" } : { duration: 0 }}
        />
        {f.stepNames.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined} className="relative z-10 flex w-20 flex-col items-center gap-2 text-center first:items-start first:text-left last:items-end last:text-right">
            <span className={cn("flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-300", i < step ? "border-ink bg-ink text-paper" : i === step ? "border-ink bg-white text-ink" : "border-line bg-white text-grey")}>
              {i < step ? <Check className="size-4" aria-hidden /> : i + 1}
            </span>
            <span className={cn("text-xs font-semibold uppercase tracking-wider", i === step ? "text-ink" : "text-grey")}>
              <span className="sr-only">{f.stepOf(i + 1, f.stepNames.length)}: </span>
              {label}
            </span>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        {step === 0 && (
          <motion.form key="s0" onSubmit={advance} className="space-y-4" {...slide}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={f.make}><Input name="Marke" placeholder={f.makePh} defaultValue={data.Marke} required /></Field>
              <Field label={f.model}><Input name="Modell" placeholder={f.modelPh} defaultValue={data.Modell} required /></Field>
            </div>
            <Field label={f.year}>
              <Input name="Erstzulassung" type="number" inputMode="numeric" min={1950} max={2026} placeholder="2016" defaultValue={data.Erstzulassung} required />
            </Field>
            <Button type="submit" variant="brand" size="lg" className="pulse-ring w-full">
              {f.next} <ArrowRight aria-hidden />
            </Button>
          </motion.form>
        )}
        {step === 1 && (
          <motion.form key="s1" onSubmit={advance} className="space-y-4" {...slide}>
            <Field label={f.km}><Input name="Kilometerstand" type="number" inputMode="numeric" min={0} placeholder="120000" defaultValue={data.Kilometerstand} required /></Field>
            <Field label={f.condition}>
              <Select value={condition} onValueChange={setCondition} required>
                <SelectTrigger><SelectValue placeholder={f.conditionPh} /></SelectTrigger>
                <SelectContent>
                  {f.conditions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" onClick={() => setStep(0)} aria-label={f.backAria(1)}><ArrowLeft aria-hidden /></Button>
              <Button type="submit" variant="brand" size="lg" className="pulse-ring flex-1" disabled={!condition}>{f.next} <ArrowRight aria-hidden /></Button>
            </div>
          </motion.form>
        )}
        {step === 2 && (
          <motion.form key="s2" onSubmit={send} className="space-y-4" {...slide}>
            <Field label={f.name}><Input name="Name" autoComplete="name" required /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={f.email}><Input name="E-Mail" type="email" autoComplete="email" required /></Field>
              <Field label={f.phone}><Input name="Telefon" type="tel" autoComplete="tel" required /></Field>
            </div>
            <ConsentCheck />
            <FormNotice result={result} error={error} />
            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} aria-label={f.backAria(2)}><ArrowLeft aria-hidden /></Button>
              <Button type="submit" variant="brand" size="lg" className="pulse-ring flex-1" disabled={busy}>{busy ? f.sending : f.submit}</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <p className="mt-4 text-xs text-grey">{f.small}</p>
    </div>
  );
}
