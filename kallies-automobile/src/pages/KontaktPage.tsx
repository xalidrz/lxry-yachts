import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Field } from "@/components/forms/Field";
import { ConsentCheck } from "@/components/forms/ConsentCheck";
import { FormNotice } from "@/components/forms/FormNotice";
import { PageHeader } from "@/components/PageHeader";
import { Standort } from "@/components/sections/Standort";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formDataToObject, submitLead, type LeadKind, type LeadResult } from "@/lib/forms";

export default function KontaktPage() {
  usePageMeta("Kontakt | Kallies Automobile Zeitz", "Kontakt zu Kallies Automobile in Zeitz: Telefon +49 3441 86030, E-Mail, Öffnungszeiten und Anfahrt.");
  const [params] = useSearchParams();
  const betreff = params.get("betreff") ?? "";
  const [result, setResult] = useState<LeadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const kind: LeadKind = betreff === "Suchanfrage" ? "Suchanfrage" : "Kontaktanfrage";
      setResult(await submitLead(kind, formDataToObject(e.currentTarget)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Die Nachricht konnte nicht gesendet werden.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow="Kontakt" title="Wir sind für Sie da." lead="Rufen Sie an, schreiben Sie uns oder kommen Sie vorbei – wir freuen uns auf Ihren Besuch." />
      <section className="section pb-0">
        <div className="container max-w-3xl">
          <form onSubmit={onSubmit} className="space-y-5 rounded-lg border border-line bg-white p-6 md:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name"><Input name="Name" autoComplete="name" required /></Field>
              <Field label="Betreff"><Input name="Betreff" defaultValue={betreff} placeholder="Worum geht es?" /></Field>
              <Field label="E-Mail"><Input name="E-Mail" type="email" autoComplete="email" required /></Field>
              <Field label="Telefon (optional)"><Input name="Telefon" type="tel" autoComplete="tel" /></Field>
            </div>
            <Field label="Nachricht"><Textarea name="Nachricht" required /></Field>
            <ConsentCheck />
            <FormNotice result={result} error={error} />
            <Button type="submit" variant="brand" size="lg" disabled={busy}>{busy ? "Wird gesendet …" : "Nachricht senden"}</Button>
          </form>
        </div>
      </section>
      <Standort />
    </>
  );
}
