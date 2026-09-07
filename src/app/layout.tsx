import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import { siteConfig } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorAura } from "@/components/ui/CursorAura";
import "./globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.brand}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.brand,
    locale: "en_AE",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Maham Shakeel - AI & Tech Content Creator, Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Maham Shakeel",
    "Maham Techworld",
    "AI",
    "Tech Content Creator",
    "Dubai",
    "UGC",
    "fintech creator",
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.brand,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "AI Engineer & Tech Content Creator",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [
      "https://www.instagram.com/maham_techworld",
      "https://www.linkedin.com/in/maham-shakeel-951827252",
      "https://www.youtube.com/@mahamshakeel4352",
      "https://collabstr.com/mahamtechworld",
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.brand,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@type": "Person",
    name: siteConfig.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CursorAura />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
