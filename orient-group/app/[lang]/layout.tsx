import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, Cairo, Source_Sans_3 } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { QuoteFloat } from "@/components/quote/quote-float";
import { QuoteProvider } from "@/components/quote/quote-provider";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localeDir, locales } from "@/lib/i18n";
import { getLogo } from "@/lib/logo";
import { ALLOW_INDEXING, SITE_NAME, SITE_URL } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  weight: "variable",
  variable: "--font-archivo",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

/** Arabic text (headings and body) on /ar pages. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: "variable",
  variable: "--font-cairo",
  display: "swap",
  // Arabic only: English pages should not download it up front.
  preload: false,
});

// Only /en (served at the plain URLs) and /ar exist; both are prerendered.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.seo.homeTitle, template: `%s | ${t.seo.titleSuffix}` },
    description: t.seo.defaultDescription,
    applicationName: SITE_NAME,
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.png", type: "image/png" }],
      apple: "/apple-icon.png",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: ALLOW_INDEXING, follow: ALLOW_INDEXING },
  };
}

export const viewport: Viewport = {
  themeColor: "#1F1F1F",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const logo = getLogo("logo-mark.png");
  const logoWhite = getLogo("logo-mark-white.png");

  return (
    <html
      lang={lang}
      dir={localeDir[lang]}
      className={`${archivo.variable} ${sourceSans.variable} ${cairo.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t.skipToContent}
        </a>
        <QuoteProvider locale={lang}>
          <SiteHeader locale={lang} logo={logo} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter locale={lang} logo={logoWhite} />
          <WhatsAppFloat locale={lang} />
          <QuoteFloat locale={lang} />
        </QuoteProvider>
      </body>
    </html>
  );
}
