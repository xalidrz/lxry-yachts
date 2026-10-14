import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/i18n";

export function Faq() {
  const { t } = useI18n();
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={t.faq.eyebrow} title={<span id="faq-title">{t.faq.title}</span>} lead={t.faq.lead} />
          <Button asChild variant="outline" className="mt-8">
            <Link to="/kontakt">{t.faq.cta}</Link>
          </Button>
        </div>
        <Accordion type="single" collapsible className="border-t border-line">
          {t.faq.items.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
