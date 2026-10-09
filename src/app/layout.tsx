import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { siteUrl } from "@/lib/url";
import { heroPhoto } from "@/data/photos";
import { MotionProvider } from "@/components/motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CallFab } from "@/components/call-fab";
import { JsonLd } from "@/components/json-ld";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CallFab />
        </MotionProvider>
        <JsonLd />
      </body>
    </html>
  );
}
