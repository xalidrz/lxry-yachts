import { GraduationCap, Globe, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const facts = [
  { icon: MapPin, label: "Based in Pakistan" },
  { icon: Globe, label: "Working with Gulf clients" },
  { icon: GraduationCap, label: "ACCA student" },
];

export function About() {
  return (
    <section id="about" className="border-y border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading eyebrow="About" title="Who you'll be working with" />
        <Reveal delay={80} className="mt-8 max-w-3xl">
          <p className="text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
            I&apos;m Ali, a web developer based in Pakistan, working with businesses across the Gulf. I&apos;m also studying ACCA, so I understand how
            businesses think about cost, value and customers, not just design. I reply fast on WhatsApp and I don&apos;t disappear after launch.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Badge variant="outline" className="gap-2 bg-background px-4 py-2 text-sm text-foreground">
                  <Icon className="size-4 text-primary" aria-hidden />
                  {label}
                </Badge>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
