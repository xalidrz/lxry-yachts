import { Gold } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { Converter } from "@/components/sections/Converter";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { usePageMeta } from "@/lib/seo";

const SQFT = 225;
const rows = [
  { label: "3 Marla", marla: 3 },
  { label: "5 Marla", marla: 5 },
  { label: "7 Marla", marla: 7 },
  { label: "10 Marla", marla: 10 },
  { label: "12 Marla", marla: 12 },
  { label: "1 Kanal", marla: 20 },
  { label: "2 Kanal", marla: 40 },
];
const n = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function MarlaConverterPage() {
  usePageMeta("/marla-converter");
  return (
    <>
      <PageHeader
        eyebrow="Handy Tool"
        title={
          <>
            Marla <Gold>↔</Gold> Square Feet Converter
          </>
        }
        description="Convert between Marla, Kanal and square feet instantly. Type in any box and the others update."
        crumbs={[{ label: "Marla Converter" }]}
        image="/images/prop-plot-marla.svg"
      />

      <Converter showHeading={false} />

      <section className="bg-ink py-24" aria-labelledby="chart-title">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 id="chart-title" className="text-3xl text-cream sm:text-4xl">
              Plot size <Gold>quick reference</Gold>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Based on the standard conversion: 1 Marla = 225 sq ft and 1 Kanal = 20 Marla. Local usage can vary slightly
              by area, so always confirm the exact size on the title documents.
            </p>
          </Reveal>
          <Reveal className="mt-10 overflow-x-auto border border-gold/25" delay={0.1}>
            <table className="w-full min-w-[34rem] text-left">
              <caption className="sr-only">Marla and Kanal in square feet, square yards and square metres</caption>
              <thead className="bg-surface">
                <tr className="label text-[0.85rem] text-gold">
                  {["Size", "Sq ft", "Sq yards", "Sq metres"].map((h) => (
                    <th key={h} scope="col" className="px-6 py-4 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/15 text-[1.02rem]">
                {rows.map((r) => (
                  <tr key={r.label} className="transition-colors hover:bg-surface">
                    <th scope="row" className="px-6 py-4 font-heading text-lg font-normal text-cream">
                      {r.label}
                    </th>
                    <td className="px-6 py-4 text-cream/90">{n(r.marla * SQFT)}</td>
                    <td className="px-6 py-4 text-cream/90">{n((r.marla * SQFT) / 9)}</td>
                    <td className="px-6 py-4 text-cream/90">{n(r.marla * SQFT * 0.092903)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Found your size? <Gold>Let's find the plot.</Gold>
          </>
        }
        text="Tell us the size, area and budget you have in mind and we will shortlist verified plots and houses."
        interest="Buy"
        message="I'm looking for a plot. Please share options."
      />
    </>
  );
}
