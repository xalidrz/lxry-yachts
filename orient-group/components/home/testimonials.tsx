import { Quote } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

/** Customer quotes are shown exactly as written, in English, on both language versions. */
const testimonials = [
  {
    quote:
      "I ordered Copper Pipe \u2013 Venture, they are of very good quality and the delivery was as per the schedule. Mr Aatif is very helpful.",
    name: "Mahendra Patel",
    role: { en: "General Manager", ar: "المدير العام" },
  },
  {
    quote:
      "Very competitive prices and quick response. I am happy with their services.",
    name: "Hussain Bashir",
    role: { en: "Overseas Sales Coordinator", ar: "منسق المبيعات الخارجية" },
  },
];

export function Testimonials({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section tone="white" id="testimonials">
      <SectionHeading eyebrow={t.home.testimonialsEyebrow} title={t.home.testimonialsTitle} />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((item) => (
          <figure
            key={item.name}
            className="flex flex-col rounded-2xl border bg-background p-6 sm:p-8"
          >
            <Quote className="size-8 text-brand" aria-hidden="true" />
            <blockquote lang="en" dir="ltr" className="mt-4 flex-1 text-start text-lg leading-relaxed">
              {item.quote}
            </blockquote>
            <figcaption className="mt-6 border-t pt-4">
              <span className="font-display block font-bold">{item.name}</span>
              <span className="text-muted-foreground">{item.role[locale]}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
