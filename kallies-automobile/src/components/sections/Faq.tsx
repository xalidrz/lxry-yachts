import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/data/content";

export function Faq() {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="FAQ" title={<span id="faq-title">Häufige Fragen</span>} lead="Ihre Frage ist nicht dabei? Wir antworten gern persönlich." />
          <Button asChild variant="outline" className="mt-8">
            <Link to="/kontakt">Kontakt aufnehmen</Link>
          </Button>
        </div>
        <Accordion type="single" collapsible className="border-t border-line">
          {faqs.map((f, i) => (
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
