import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/base-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: baseUrl, changeFrequency: "monthly", priority: 1 }];
}
