import type { MetadataRoute } from "next";
import { nav } from "@/config/nav";
import { siteUrl } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...[...nav.map((n) => n.href), "/book"].map((href) => ({
      url: `${siteUrl}${href}`,
      changeFrequency: "monthly" as const,
      priority: href === "/book" ? 0.7 : 0.8,
    })),
  ];
}
