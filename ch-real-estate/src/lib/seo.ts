import { useEffect } from "react";
import seo from "@/data/seo.json";

type Meta = { title: string; description: string };
const table = seo as Record<string, Meta>;
const SITE = (import.meta.env.VITE_SITE_URL as string | undefined) ?? "";

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}
const meta = (name: string, content: string, prop = false) =>
  setTag(
    `meta[${prop ? "property" : "name"}="${name}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute(prop ? "property" : "name", name);
      return m;
    },
    "content",
    content,
  );

/**
 * Sets the document title / description / canonical / social tags for a route.
 * Static routes are also pre-rendered into HTML at build time (scripts/prerender.mjs)
 * so crawlers and link previews see the right tags without running JS.
 */
export function usePageMeta(path: string, override?: Partial<Meta>) {
  const base = table[path] ?? table["/"];
  const title = override?.title ?? base.title;
  const description = override?.description ?? base.description;
  useEffect(() => {
    document.title = title;
    meta("description", description);
    meta("og:title", title, true);
    meta("og:description", description, true);
    meta("twitter:title", title);
    meta("twitter:description", description);
    const url = `${SITE}${path === "/" ? "/" : path}`;
    setTag('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", url);
    meta("og:url", url, true);
  }, [title, description, path]);
}
