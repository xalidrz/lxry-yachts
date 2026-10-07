import type { Metadata, Viewport } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { defaultLocale, localeDir } from "@/lib/i18n";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | HVAC, Electrical and Fixing Materials in Kuwait`,
    template: `%s | Orient Group Gulf Kuwait`,
  },
  description:
    "Orient Group Gulf supplies HVAC, electrical and fixing materials to MEP contractors in Kuwait from Shuwaikh Industrial Area since 2010.",
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_KW",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: ALLOW_INDEXING, follow: ALLOW_INDEXING },
};

export const viewport: Viewport = {
  themeColor: "#2A2B2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const logo = getLogo();
  return (
    <html
      lang={defaultLocale}
      dir={localeDir[defaultLocale]}
      className={`${archivo.variable} ${sourceSans.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader logo={logo} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter logo={logo} />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
