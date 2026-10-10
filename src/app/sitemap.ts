import type { MetadataRoute } from "next";
import { nav } from "@/config/nav";
import { siteUrl } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...[...nav, { href: "/book" }].map((n) => ({ url: `${siteUrl}${n.href}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
