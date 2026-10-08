import { useEffect } from "react";
import pages from "@/data/pages.json";
import { siteUrl } from "@/lib/site";

const NOT_FOUND = { title: "Page not found | PB10 Electrical", description: "That page doesn't exist. Head back to the PB10 Electrical home page." };

function setMeta(selector: string, attr: "content" | "href", value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

/** Keeps <title>, description, canonical and share tags in sync with the current route (client-side navigation). */
export function usePageMeta(path: string | null) {
  useEffect(() => {
    const page = path === null ? NOT_FOUND : pages.find((p) => p.path === path) ?? NOT_FOUND;
    document.title = page.title;
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[name="twitter:title"]', "content", page.title);
    setMeta('meta[name="twitter:description"]', "content", page.description);
    if (path !== null) setMeta('link[rel="canonical"]', "href", `${siteUrl}${path === "/" ? "/" : path}`);
    setMeta('meta[name="robots"]', "content", path === null ? "noindex" : "index, follow, max-image-preview:large");
  }, [path]);
}
