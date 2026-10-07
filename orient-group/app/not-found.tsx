import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { GENERAL_MESSAGE } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found">
        The page you are looking for does not exist or has moved.
      </PageHero>
      <Section>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/products">Browse products</Link>
          </Button>
          <WhatsAppButton message={GENERAL_MESSAGE}>Ask us on WhatsApp</WhatsAppButton>
        </div>
      </Section>
    </>
  );
}
