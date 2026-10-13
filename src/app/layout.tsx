import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { siteUrl } from "@/lib/url";
import { heroPhoto } from "@/data/photos";
import { MotionProvider } from "@/components/motion";
import { Nav } from "@/components/nav";
import { Loader } from "@/components/loader";
import { ScrollProgress } from "@/components/scroll-progress";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-barlow",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Variable font (one file); small data labels only, so it stays off the critical path.
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb", display: "swap", preload: false });

// Runs before first paint: show the intro only on the first visit of a session.
const loaderGate = `try{if(!sessionStorage.getItem("em-loaded"))document.documentElement.dataset.loader="on"}catch(e){}`;

const title = "Elite Motorsports | Auto Repair in Hayward, CA";
const template = "%s | Elite Motorsports";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.shortName,
    title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: heroPhoto.alt }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0E0F11",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderGate }} />
      </head>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>
          <Loader />
          <ScrollProgress />
          <Nav />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
        <JsonLd />
      </body>
    </html>
  );
}
