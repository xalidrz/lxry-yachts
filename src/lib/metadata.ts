import type { Metadata } from "next";
import { site } from "@/config/site";

/** Per-page metadata. Open Graph is replaced (not merged) by Next, so the image is repeated here. */
export function pageMetadata({
  title,
  description,
  path,
  alt,
}: {
  title: string;
  description: string;
  path: string;
  alt: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: site.shortName,
      title: `${title} | ${site.shortName}`,
      description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.shortName}`, description, images: ["/og.jpg"] },
  };
}
