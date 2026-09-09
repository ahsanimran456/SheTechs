import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Sans_3, Syne } from "next/font/google";
import { siteConfig, socialLinks } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorAura } from "@/components/ui/CursorAura";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const brand = Syne({
  variable: "--font-brand",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
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
  applicationName: siteConfig.brand,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.brand,
    locale: "en_AE",
    firstName: "Maham",
    lastName: "Shakeel",
    username: "maham_techworld",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Maham Shakeel — AI Engineer & Tech Content Creator in Dubai",
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.brand,
  category: "Technology",
  keywords: [...siteConfig.keywords],
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `${siteConfig.name} — Profile`,
  url: siteConfig.url,
  mainEntity: {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: [siteConfig.brand, "Maham Techworld"],
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/person.png`,
    jobTitle: ["AI Engineer", "Tech Content Creator", "Tech Influencer"],
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "AI content creation",
      "Technology education",
      "Tech UGC",
      "Fintech content",
      "Brand collaborations",
      "Dubai tech creator economy",
    ],
    sameAs: socialLinks.map((link) => link.href),
    worksFor: {
      "@type": "Organization",
      name: siteConfig.brand,
      url: siteConfig.url,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.brand,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en-AE",
  publisher: {
    "@id": `${siteConfig.url}/#person`,
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#services`,
  name: "Maham Shakeel — AI & Tech Content Collaborations",
  url: `${siteConfig.url}/#contact`,
  description:
    "AI content creator and tech UGC creator in Dubai offering brand campaigns, educational AI content, and technology collaborations for global brands.",
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "Country", name: "United Arab Emirates" },
    "MENA",
    "Global",
  ],
  provider: {
    "@id": `${siteConfig.url}/#person`,
  },
  serviceType: [
    "AI content creation",
    "Tech UGC",
    "Technology brand campaigns",
    "Fintech content creation",
    "Educational AI videos",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AE"
      className={`${display.variable} ${brand.variable} ${body.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        <CursorAura />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
