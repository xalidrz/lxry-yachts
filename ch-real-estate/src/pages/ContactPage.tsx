import { Gold } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { Contact } from "@/components/sections/Contact";
import { usePageMeta } from "@/lib/seo";

export default function ContactPage() {
  usePageMeta("/contact");
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let's find or build <Gold>your next address</Gold>
          </>
        }
        description="Tell us what you need and we will come back to you the same day. Prefer to talk? Call or message us directly."
        crumbs={[{ label: "Contact" }]}
        image="/images/prop-plaza.svg"
      />
      <Contact showHeading={false} />
    </>
  );
}
