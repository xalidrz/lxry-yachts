import { Quote } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";

const testimonials = [
  {
    quote:
      "I ordered Copper Pipe – Venture, they are of very good quality and the delivery was as per the schedule. Mr Aatif is very helpful.",
    name: "Mahendra Patel",
    role: "General Manager",
  },
  {
    quote:
      "Very competitive prices and quick response. I am happy with their services.",
    name: "Hussain Bashir",
    role: "Overseas Sales Coordinator",
  },
];

export function Testimonials() {
  return (
    <Section tone="white" id="testimonials">
      <SectionHeading eyebrow="Customers" title="What our customers say" />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border bg-background p-6 sm:p-8"
          >
            <Quote className="size-8 text-brand" aria-hidden="true" />
            <blockquote className="mt-4 flex-1 text-lg leading-relaxed">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 border-t pt-4">
              <span className="font-display block font-bold">{t.name}</span>
              <span className="text-muted-foreground">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
