import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { LangProvider } from "@/components/lang-provider";
import { baseUrl } from "@/lib/base-url";
import { hairSalonJsonLd } from "@/lib/json-ld";
import "./globals.css";

const serif = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});
const arabic = localFont({
  src: [
    { path: "./fonts/tajawal-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/tajawal-arabic-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/tajawal-arabic-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
  preload: false, // only needed after the visitor switches to Arabic
});

const title = "AM Hairdresser Salon | Men's Barber in Muharraq, Bahrain";
const description =
  "AM Hairdresser Salon (إي إم هيردريسر صالون) — rated 4.9★ from 83 Google reviews. Men's haircuts, beard trims and kids' cuts on Road 55, Muharraq, Bahrain. Open daily until 12:30 AM. WhatsApp +973 3563 4883.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  alternates: { canonical: "/" },
  keywords: ["barber Muharraq", "men's hair salon Bahrain", "haircut Muharraq", "حلاق المحرق", "صالون رجالي البحرين", "AM Hairdresser"],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "AM Hairdresser Salon",
    title,
    description,
    locale: "en_US",
    alternateLocale: ["ar_BH"],
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AM Hairdresser Salon — Men's Barber in Muharraq, Bahrain" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0B0B0B", colorScheme: "dark" };

// Apply the saved language before first paint so Arabic visitors don't see the layout flip.
const langBoot = `try{var l=new URLSearchParams(location.search).get("lang")||localStorage.getItem("am-lang");if(l==="ar"){var d=document.documentElement;d.lang="ar";d.dir="rtl"}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${arabic.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langBoot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hairSalonJsonLd(baseUrl)) }} />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
