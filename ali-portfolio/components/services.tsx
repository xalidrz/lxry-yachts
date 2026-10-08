import { Languages, LayoutTemplate, Paintbrush, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const services = [
  { icon: LayoutTemplate, title: "New business website", text: "Modern, fast, mobile-first. Built to turn visitors into enquiries." },
  { icon: Paintbrush, title: "Website redesign", text: "Turn an old or broken site into a modern one that you're proud to share." },
  { icon: Languages, title: "English + Arabic", text: "Full bilingual sites with proper right-to-left Arabic, not a bolted-on translation." },
  { icon: Search, title: "Google-ready", text: "Search Console setup and SEO basics so customers can find you." },
];

export function Services() {
  return (
    <section id="services" className="border-y border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading eyebrow="Services" title="What I can do for your business" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 70}>
              <Card className="h-full bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(24,24,27,0.25)]">
                <CardContent className="p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
