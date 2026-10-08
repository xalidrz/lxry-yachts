/**
 * Post-build step. The app is a client-side router, but search engines and link-preview bots read the
 * raw HTML — so for every static route we emit dist/<route>.html: a copy of index.html with that page's
 * own <title>, description, canonical and social tags (from src/data/seo.json). With `cleanUrls` (see
 * vercel.json) /buy is served from buy.html. Also writes sitemap.xml when VITE_SITE_URL is set.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const seo = JSON.parse(readFileSync(resolve(root, "src/data/seo.json"), "utf8"));

function siteUrl() {
  if (process.env.VITE_SITE_URL !== undefined) return process.env.VITE_SITE_URL.replace(/\/$/, "");
  const envFile = resolve(root, ".env");
  if (existsSync(envFile)) {
    const m = readFileSync(envFile, "utf8").match(/^VITE_SITE_URL=(.*)$/m);
    if (m) return m[1].trim().replace(/\/$/, "");
  }
  return "";
}
const SITE = siteUrl();

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const base = readFileSync(resolve(dist, "index.html"), "utf8");

function swap(html, re, replacement, label) {
  if (!re.test(html)) throw new Error(`prerender: could not find ${label} in dist/index.html`);
  return html.replace(re, replacement);
}

let count = 0;
for (const [path, m] of Object.entries(seo)) {
  if (path === "/") continue;
  let html = base;
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`, "<title>");
  html = swap(html, /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/, `<meta name="description" content="${esc(m.description)}" />`, "description");
  html = swap(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(m.title)}" />`, "og:title");
  html = swap(html, /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/, `<meta property="og:description" content="${esc(m.description)}" />\n    <meta property="og:url" content="${SITE}${path}" />`, "og:description");
  html = swap(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(m.title)}" />`, "twitter:title");
  html = swap(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(m.description)}" />`, "twitter:description");
  html = swap(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${SITE}${path}" />`, "canonical");
  writeFileSync(resolve(dist, `${path.slice(1)}.html`), html);
  count++;
}
console.log(`prerender: wrote ${count} page(s) with per-route meta`);

if (SITE) {
  const ids = [...readFileSync(resolve(root, "src/data/properties.ts"), "utf8").matchAll(/^\s{4}id: "([^"]+)"/gm)].map((x) => x[1]);
  const urls = [...Object.keys(seo), ...ids.map((id) => `/property/${id}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc></url>`)
    .join("\n")}\n</urlset>\n`;
  writeFileSync(resolve(dist, "sitemap.xml"), xml);
  const robots = resolve(dist, "robots.txt");
  writeFileSync(robots, `${readFileSync(robots, "utf8").trimEnd()}\nSitemap: ${SITE}/sitemap.xml\n`);
  console.log(`prerender: wrote sitemap.xml (${urls.length} URLs)`);
} else {
  console.log("prerender: VITE_SITE_URL not set — skipped sitemap.xml");
}
