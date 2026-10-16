import { Phone } from "lucide-react";
import { links, offers } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function Offers() {
  return (
    <section id="soins" className="bg-mist px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <SectionHeading eyebrow={offers.eyebrow} title={offers.title} />
      </Reveal>
      <ul className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {offers.items.map(({ icon: Icon, title, description, price }, i) => (
          <Reveal as="li" key={title} delay={i * 120} className="list-none">
            <Card className="h-full">
              <CardHeader>
                <span className="flex size-14 items-center justify-center rounded-full bg-mist text-sage-deep">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-7" />
                </span>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-charcoal-soft">{description}</p>
              </CardContent>
              <CardFooter>
                <Badge>{price}</Badge>
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-12 text-center">
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
