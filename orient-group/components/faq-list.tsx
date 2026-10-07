import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/data/faq";

/** Questions as a shadcn Accordion. Answers are in the HTML even while collapsed. */
export function FaqList({ faqs, idPrefix = "faq" }: { faqs: Faq[]; idPrefix?: string }) {
  return (
    <Accordion type="single" collapsible className="rounded-2xl border bg-white px-5 sm:px-8">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={`${idPrefix}-${i}`}>
          <AccordionTrigger className="text-base sm:text-lg">{faq.q}</AccordionTrigger>
          <AccordionContent className="leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
