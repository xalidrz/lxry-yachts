import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Field } from "@/components/forms/Field";
import { ConsentCheck } from "@/components/forms/ConsentCheck";
import { FormNotice } from "@/components/forms/FormNotice";
import type { Vehicle } from "@/data/vehicles";
import { formatPrice, specLine, vehicleTitle } from "@/lib/format";
import { formDataToObject, submitLead, type LeadResult } from "@/lib/forms";

export function InquiryDialog({ vehicle, onClose }: { vehicle: Vehicle | null; onClose: () => void }) {
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
      setResult(await submitLead("Fahrzeuganfrage", { Fahrzeug: `${vehicleTitle(vehicle)} ${vehicle.variant} (${specLine(vehicle)}, ${formatPrice(vehicle.price)})`, ...data }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Die Anfrage konnte nicht gesendet werden.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Sheet open={Boolean(vehicle)} onOpenChange={handleOpenChange}>
      <SheetContent side="center" className="p-6 md:p-8">
        {vehicle && (
          <>
            <p className="eyebrow">Fahrzeuganfrage</p>
            <SheetTitle className="font-display text-2xl font-bold tracking-tight">{vehicleTitle(vehicle)}</SheetTitle>
            <SheetDescription className="text-sm text-grey">
              {vehicle.variant} · {specLine(vehicle)} · <span className="font-semibold text-brand-ink">{formatPrice(vehicle.price)}</span>
            </SheetDescription>
            <form onSubmit={onSubmit} className="mt-2 space-y-4">
              <Field label="Name">
                <Input name="Name" autoComplete="name" required />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="E-Mail">
                  <Input name="E-Mail" type="email" autoComplete="email" required />
                </Field>
                <Field label="Telefon (optional)">
                  <Input name="Telefon" type="tel" autoComplete="tel" />
                </Field>
              </div>
              <Field label="Nachricht">
                <Textarea name="Nachricht" defaultValue="Ich interessiere mich für dieses Fahrzeug. Bitte kontaktieren Sie mich für eine Probefahrt oder weitere Informationen." />
              </Field>
              <ConsentCheck />
              <FormNotice result={result} error={error} />
              <Button type="submit" variant="brand" size="lg" className="w-full" disabled={busy}>
                {busy ? "Wird gesendet …" : "Anfrage senden"}
              </Button>
            </form>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
