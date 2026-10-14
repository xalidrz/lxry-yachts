import { Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

const metaKey = { "ueber-uns": "about", impressum: "imprint", datenschutz: "privacy", agb: "terms" } as const;
export type LegalSlug = keyof typeof metaKey;

/**
 * Legal texts are never machine-translated: in English they stay German and are labelled as such.
 * "Über uns" is ordinary marketing copy and is translated.
 */
export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const { t, lang } = useI18n();
  const key = metaKey[slug];
  const page = t.pages.legal[key];
  usePageMeta(t.meta[key].title, t.meta[key].desc);
  const germanOnly = lang === "en" && slug !== "ueber-uns";
  return (
    <>
      <PageHeader title={page.title} lead={page.lead} />
      <section className="section">
        <div className="container max-w-3xl space-y-5 text-lg leading-relaxed text-grey">
          {germanOnly && (
            <p className="flex items-center gap-3 rounded-lg border border-line bg-white p-4 text-base font-medium text-ink" lang="de">
              <Info className="size-5 shrink-0 text-brand-ink" aria-hidden />
              {t.pages.legal.germanOnly}
            </p>
          )}
          <div className="space-y-5" {...(germanOnly ? { lang: "de" } : {})}>
            {page.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
