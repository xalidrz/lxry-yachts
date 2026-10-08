import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Bath, BedDouble, Check, MapPin, Phone, Maximize } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { categoryLabel, formatPKR, getProperty, properties } from "@/data/properties";
import { contactLink, site, whatsappLink } from "@/lib/site";
import { usePageMeta } from "@/lib/seo";
import NotFound from "./NotFound";

export default function PropertyDetail() {
  const { id } = useParams();
  const p = id ? getProperty(id) : undefined;
  usePageMeta(p ? `/property/${p.id}` : "/", p ? {
    title: `${p.title} — ${p.size} in ${p.area} | CH Real Estate & Builder's`,
    description: `${p.title}, ${p.size}, ${p.location}. ${p.listing === "rent" ? "For rent" : "For sale"} at PKR ${formatPKR(p.price)}${p.listing === "rent" ? " per month" : ""}. ${p.description.slice(0, 110)}`,
  } : undefined);

  if (!p) return <NotFound />;

  const isRent = p.listing === "rent";
  const section = isRent ? { label: "Rent", to: "/rent" } : { label: "Buy", to: "/buy" };
  const similar = properties.filter((x) => x.id !== p.id && x.listing === p.listing && (x.category === p.category || x.area === p.area)).slice(0, 3);
  const enquiry = `Hello, I'm interested in "${p.title}" (${p.size}, ${p.location}) listed ${isRent ? "for rent" : "for sale"} at PKR ${formatPKR(p.price)}. Please share more details.`;

  const specs: [string, string][] = [
    ["Type", categoryLabel[p.category]],
    ["Listing", isRent ? "For rent" : "For sale"],
    ["Size", p.size],
    ["Area", p.area],
    ...(p.beds !== undefined ? ([["Bedrooms", String(p.beds)]] as [string, string][]) : []),
    ...(p.baths !== undefined ? ([["Bathrooms", String(p.baths)]] as [string, string][]) : []),
  ];

  return (
    <>
      <PageHeader
        eyebrow={`${categoryLabel[p.category]} ${isRent ? "for rent" : "for sale"}`}
        title={p.title}
        description={
          <span className="flex items-center gap-2">
            <MapPin className="size-5 shrink-0 text-gold" /> {p.location}
          </span>
        }
        crumbs={[section, { label: p.title }]}
      />

      <section className="bg-ink py-16 sm:py-20">
        <div className="container grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Reveal>
              <div className="relative overflow-hidden border border-gold/25 bg-surface">
                <img src={p.image} alt={`${p.title} — ${p.size} in ${p.area}`} width={800} height={600} className="aspect-[16/10] w-full object-cover" />
                <Badge variant={isRent ? "dark" : "outline"} className="absolute left-5 top-5">
                  {isRent ? "For Rent" : "For Sale"}
                </Badge>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="text-3xl text-cream">About this property</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.description}</p>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="text-3xl text-cream">Features</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[1.02rem] text-cream/90">
                    <Check className="mt-1 size-4 shrink-0 text-gold" /> {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="border border-gold/30 bg-surface p-7 sm:p-8">
                <p className="label text-[0.8rem] text-muted-foreground">{isRent ? "Monthly rent" : "Asking price"}</p>
                <p className="mt-1 font-heading text-4xl">
                  <span className="text-gold-gradient">PKR {formatPKR(p.price)}</span>
                  {isRent && <span className="label ml-2 text-sm text-muted-foreground">/ month</span>}
                </p>

                <dl className="mt-7 divide-y divide-gold/15 border-y border-gold/15">
                  {specs.map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-3.5 text-[0.98rem]">
                      <dt className="label text-[0.82rem] text-muted-foreground">{k}</dt>
                      <dd className="flex items-center gap-2 text-cream">
                        {k === "Size" && <Maximize className="size-4 text-gold" />}
                        {k === "Bedrooms" && <BedDouble className="size-4 text-gold" />}
                        {k === "Bathrooms" && <Bath className="size-4 text-gold" />}
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 space-y-3">
                  <Button asChild size="lg" className="w-full">
                    <a href={whatsappLink(enquiry)} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon /> Enquire on WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link to={contactLink({ interest: isRent ? "Rent" : "Buy", message: `I'd like to book a visit for "${p.title}" (${p.location}).` })}>
                      Book a site visit
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="ghost" className="w-full">
                    <a href={`tel:${site.phoneTel}`}>
                      <Phone /> {site.phoneDisplay}
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="border-t border-gold/15 bg-surface py-20" aria-labelledby="similar-title">
          <div className="container">
            <h2 id="similar-title" className="mb-10 text-3xl text-cream">
              Similar properties
            </h2>
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {similar.map((x, i) => (
                <PropertyCard key={x.id} p={x} index={i} />
              ))}
            </div>
            <div className="mt-10">
              <Button asChild variant="outline">
                <Link to={section.to}>
                  <ArrowLeft /> Back to all {isRent ? "rentals" : "properties for sale"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
