import { Phone } from "lucide-react";
import { links, offers } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function Offers() {
  return (
    <section id="soins" data-tone="dark" className="bg-espresso px-5 py-24 text-cream sm:px-8 md:py-36">
      <Reveal>
        <SectionHeading tone="dark" eyebrow={offers.eyebrow} title={offers.title} />
      </Reveal>
      <ul className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
        {offers.items.map(({ icon: Icon, title, description, price }, i) => (
          <Reveal as="li" key={title} delay={i * 120} className="list-none">
            <Card className="h-full">
              <CardHeader>
                <span className="flex size-14 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon aria-hidden="true" strokeWidth={1.25} className="size-7" />
                </span>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-cream-dim">{description}</p>
              </CardContent>
              <CardFooter>
                <Badge>{price}</Badge>
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-14 text-center">
        <Button asChild variant="outline">
          <a href={links.tel}>
            <Phone aria-hidden="true" strokeWidth={1.5} />
            {offers.cta}
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
