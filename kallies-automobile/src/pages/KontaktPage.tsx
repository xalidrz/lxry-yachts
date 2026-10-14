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
import { useI18n } from "@/i18n";
import { formDataToObject, submitLead, type LeadKind, type LeadResult } from "@/lib/forms";

export default function KontaktPage() {
  const { t } = useI18n();
  const p = t.pages.kontakt;
  usePageMeta(t.meta.kontakt.title, t.meta.kontakt.desc);
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
      setError(err instanceof Error ? err.message : p.genericError);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <section className="section pb-0">
        <div className="container max-w-3xl">
          <form onSubmit={onSubmit} className="space-y-5 rounded-lg border border-line bg-white p-6 md:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={p.name}><Input name="Name" autoComplete="name" required /></Field>
              <Field label={p.subject}><Input name="Betreff" defaultValue={betreff} placeholder={p.subjectPh} /></Field>
              <Field label={p.email}><Input name="E-Mail" type="email" autoComplete="email" required /></Field>
              <Field label={p.phone}><Input name="Telefon" type="tel" autoComplete="tel" /></Field>
            </div>
            <Field label={p.message}><Textarea name="Nachricht" required /></Field>
            <ConsentCheck />
            <FormNotice result={result} error={error} />
            <Button type="submit" variant="brand" size="lg" disabled={busy}>{busy ? p.sending : p.send}</Button>
          </form>
        </div>
      </section>
      <Standort />
    </>
  );
}
