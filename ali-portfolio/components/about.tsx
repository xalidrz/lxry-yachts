import Image from "next/image";
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
        <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_17rem] md:gap-14 lg:grid-cols-[1fr_20rem]">
          <Reveal delay={80} className="max-w-3xl md:order-1">
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
          <Reveal delay={160} className="mx-auto w-full max-w-[17rem] md:order-2 md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-secondary shadow-[0_24px_60px_-28px_rgba(24,24,27,0.35)]">
              <Image
                src="/ali.jpg"
                alt="Ali, web developer"
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 272px, 272px"
                className="object-cover object-[center_38%]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
