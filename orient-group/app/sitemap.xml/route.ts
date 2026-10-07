import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";
import { ALLOW_INDEXING } from "@/lib/site";

export const dynamic = "force-static";

type Entry = { path: string; changefreq: string; priority: number };

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function entries(): Entry[] {
  return [
    { path: "/", changefreq: "monthly", priority: 1 },
    { path: "/products", changefreq: "weekly", priority: 0.9 },
    { path: "/brands", changefreq: "monthly", priority: 0.7 },
    { path: "/engraving", changefreq: "monthly", priority: 0.7 },
    ...categories.map((c) => ({
      path: `/products/${c.slug}`,
      changefreq: "weekly",
      priority: 0.8,
    })),
    ...products.map((p) => ({
      path: `/products/${p.slug}`,
      changefreq: "monthly",
      priority: 0.7,
    })),
    { path: "/contact", changefreq: "yearly", priority: 0.6 },
  ];
}

/** sitemap.xml exists only when indexing is allowed; otherwise it is a 404. */
export function GET() {
  if (!ALLOW_INDEXING) {
    return new Response("Not found", { status: 404 });
  }

  const lastmod = new Date().toISOString();
  const urls = entries()
    .map(
      (e) =>
        `  <url>\n    <loc>${escapeXml(absoluteUrl(e.path))}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
