import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Field } from "@/components/forms/Field";
import { ConsentCheck } from "@/components/forms/ConsentCheck";
import { FormNotice } from "@/components/forms/FormNotice";
import type { Vehicle } from "@/data/vehicles";
import { useI18n } from "@/i18n";
import { formDataToObject, submitLead, type LeadResult } from "@/lib/forms";

export function InquiryDialog({ vehicle, onClose }: { vehicle: Vehicle | null; onClose: () => void }) {
  const { t, fmt } = useI18n();
  const [result, setResult] = useState<LeadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setResult(null);
    setError(null);
    onClose();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vehicle) return;
    setBusy(true);
    setError(null);
    try {
      const data = formDataToObject(e.currentTarget);
      // The dealership reads German: field names and subject stay German whatever the site language.
      setResult(await submitLead("Fahrzeuganfrage", { Fahrzeug: `${fmt.title(vehicle)} ${vehicle.variant} (${fmt.spec(vehicle)}, ${fmt.price(vehicle.price)})`, ...data }));
    } catch (err) {
      setError(err instanceof Error ? err.message : t.forms.genericError);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Sheet open={Boolean(vehicle)} onOpenChange={handleOpenChange}>
      <SheetContent side="center" className="p-6 md:p-8" closeLabel={t.header.close}>
        {vehicle && (
          <>
            <p className="eyebrow">{t.inquiry.eyebrow}</p>
            <SheetTitle className="font-display text-2xl font-bold tracking-tight" translate="no">{fmt.title(vehicle)}</SheetTitle>
            <SheetDescription className="text-sm text-grey">
              <span translate="no" lang="de">{vehicle.variant}</span> · {fmt.spec(vehicle)} · <span className="font-semibold text-brand-ink" translate="no">{fmt.price(vehicle.price)}</span>
            </SheetDescription>
            <form onSubmit={onSubmit} className="mt-2 space-y-4">
              <Field label={t.inquiry.name}>
                <Input name="Name" autoComplete="name" required />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t.inquiry.email}>
                  <Input name="E-Mail" type="email" autoComplete="email" required />
                </Field>
                <Field label={t.inquiry.phoneOpt}>
                  <Input name="Telefon" type="tel" autoComplete="tel" />
                </Field>
              </div>
              <Field label={t.inquiry.message}>
                <Textarea name="Nachricht" defaultValue={t.inquiry.defaultMessage} />
              </Field>
              <ConsentCheck />
              <FormNotice result={result} error={error} />
              <Button type="submit" variant="brand" size="lg" className="w-full" disabled={busy}>
                {busy ? t.inquiry.sending : t.inquiry.send}
              </Button>
            </form>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
