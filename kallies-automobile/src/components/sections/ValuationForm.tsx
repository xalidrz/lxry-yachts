import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/forms/Field";
import { ConsentCheck } from "@/components/forms/ConsentCheck";
import { FormNotice } from "@/components/forms/FormNotice";
import { formDataToObject, submitLead, type LeadResult } from "@/lib/forms";
import { cn } from "@/lib/utils";

const STEPS = ["Ihr Fahrzeug", "Ihre Kontaktdaten"];

/** Two-step, ~2 minute valuation request. Step 1 data is kept in state so the form can be submitted from step 2. */
export function ValuationForm({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [vehicle, setVehicle] = useState<Record<string, string>>({});
  const [result, setResult] = useState<LeadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const next = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVehicle(formDataToObject(e.currentTarget));
    setStep(1);
  };

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      setResult(await submitLead("Ankaufanfrage", { ...vehicle, ...formDataToObject(e.currentTarget) }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Die Anfrage konnte nicht gesendet werden.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={cn("rounded-lg bg-white p-6 text-ink shadow-lift md:p-8", className)}>
      <ol className="mb-6 grid grid-cols-2 gap-2" aria-label="Fortschritt">
        {STEPS.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <div className={cn("h-1 rounded-full", i <= step ? "bg-ink" : "bg-line")} />
            <p className={cn("mt-2 text-xs font-semibold uppercase tracking-wider", i === step ? "text-ink" : "text-grey")}>
              {i + 1}. {label}
            </p>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <form onSubmit={next} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Marke">
              <Input name="Marke" placeholder="z. B. Nissan" defaultValue={vehicle.Marke} required />
            </Field>
            <Field label="Modell">
              <Input name="Modell" placeholder="z. B. Qashqai" defaultValue={vehicle.Modell} required />
            </Field>
            <Field label="Erstzulassung (Jahr)">
              <Input name="Erstzulassung" type="number" inputMode="numeric" min={1950} max={2026} placeholder="2016" defaultValue={vehicle.Erstzulassung} required />
            </Field>
            <Field label="Kilometerstand">
              <Input name="Kilometerstand" type="number" inputMode="numeric" min={0} placeholder="120000" defaultValue={vehicle.Kilometerstand} required />
            </Field>
          </div>
          <Button type="submit" variant="brand" size="lg" className="w-full">
            Weiter <ArrowRight aria-hidden />
          </Button>
        </form>
      ) : (
        <form onSubmit={send} className="space-y-4">
          <Field label="Name">
            <Input name="Name" autoComplete="name" required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="E-Mail">
              <Input name="E-Mail" type="email" autoComplete="email" required />
            </Field>
            <Field label="Telefon">
              <Input name="Telefon" type="tel" autoComplete="tel" required />
            </Field>
          </div>
          <ConsentCheck />
          <FormNotice result={result} error={error} />
          <div className="flex gap-3">
            <Button type="button" variant="outline" size="lg" onClick={() => setStep(0)} aria-label="Zurück zu Schritt 1">
              <ArrowLeft aria-hidden />
            </Button>
            <Button type="submit" variant="brand" size="lg" className="flex-1" disabled={busy}>
              {busy ? "Wird gesendet …" : "Kostenlos bewerten lassen"}
            </Button>
          </div>
        </form>
      )}
      <p className="mt-4 text-xs text-grey">Kostenlos und unverbindlich. Ihre Daten verwenden wir ausschließlich für Ihre Anfrage.</p>
    </div>
  );
}
