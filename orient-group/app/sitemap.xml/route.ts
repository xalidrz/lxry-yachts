import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { categoryPath, localePath, locales, productPath } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";
import { ALLOW_INDEXING } from "@/lib/site";

export const dynamic = "force-static";

type Entry = { path: string; changefreq: string; priority: number };

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** English paths. Every page is listed in both languages, with hreflang links between them. */
function entries(): Entry[] {
  return [
    { path: "/", changefreq: "monthly", priority: 1 },
    { path: "/products", changefreq: "weekly", priority: 0.9 },
    ...categories.map((c) => ({ path: categoryPath(c.slug), changefreq: "weekly", priority: 0.8 })),
    ...products.map((p) => ({ path: productPath(p.slug), changefreq: "monthly", priority: 0.7 })),
    { path: "/faq", changefreq: "monthly", priority: 0.6 },
    { path: "/about", changefreq: "yearly", priority: 0.7 },
    { path: "/brands", changefreq: "monthly", priority: 0.7 },
    { path: "/engraving", changefreq: "monthly", priority: 0.7 },
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
    .flatMap((e) =>
      locales.map((locale) => {
        const alternates = [
          ...locales.map(
            (l) =>
              `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(absoluteUrl(localePath(l, e.path)))}"/>`,
          ),
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(localePath("en", e.path)))}"/>`,
        ].join("\n");
        return `  <url>\n    <loc>${escapeXml(absoluteUrl(localePath(locale, e.path)))}</loc>\n${alternates}\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`;
      }),
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
