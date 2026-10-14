import { site } from "@/data/site";

export type LeadKind = "Fahrzeuganfrage" | "Ankaufanfrage" | "Kontaktanfrage" | "Suchanfrage";
export type LeadResult = "sent" | "mailto";

/**
 * Sends a lead. With VITE_FORM_ENDPOINT set (e.g. Formspree, a Vercel function, the dealer CRM) it POSTs JSON.
 * Without it, the visitor's mail client opens with a prefilled message to the dealership — so nothing is ever
 * reported as "sent" that was not.
 */
export async function submitLead(kind: LeadKind, data: Record<string, string>): Promise<LeadResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ kind, ...data }),
    });
    if (!res.ok) throw new Error(`Formular konnte nicht gesendet werden (${res.status})`);
    return "sent";
  }
  const body = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${kind} über die Website`)}&body=${encodeURIComponent(body)}`;
  return "mailto";
}

export const formDataToObject = (form: HTMLFormElement) =>
  Object.fromEntries([...new FormData(form).entries()].filter(([, v]) => typeof v === "string")) as Record<string, string>;
