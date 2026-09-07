export type Brand = {
  id: string;
  name: string;
  country: string;
  logo?: string;
  website?: string;
  category?: string;
  collaborationType?: string;
  description?: string;
  result?: string;
  featured?: boolean;
};

/**
 * Confirmed brand collaborations.
 * Logo images live in /public/images/brands/*-logo.png
 */
export const brands: Brand[] = [
  {
    id: "openbuilder",
    name: "OpenBuilder.ai",
    country: "United States",
    category: "AI Product",
    logo: "/images/brands/openbuilder-logo.png",
    website: "https://theopenbuilder.com/",
    featured: true,
  },
  {
    id: "thea-study",
    name: "Thea Study",
    country: "United States",
    category: "EdTech",
    logo: "/images/brands/thea-study-logo.png",
    website: "https://play.google.com/store/apps/details?id=study.thea.www.twa",
    featured: true,
  },
  {
    id: "torass",
    name: "Torass Global",
    country: "China",
    category: "Consumer Tech",
    logo: "/images/brands/torass-logo.png",
    website: "https://torraslife.com/",
    featured: true,
  },
  {
    id: "kai",
    name: "Kai.ai",
    country: "Switzerland",
    category: "AI",
    logo: "/images/brands/kai-logo.png",
    website: "https://kai.ai/",
  },
  {
    id: "audio-read",
    name: "Audio Read",
    country: "UK",
    category: "Audio / Productivity",
    logo: "/images/brands/audio-read-logo.png",
    website: "https://audioread.com/",
  },
  {
    id: "binance-dubai",
    name: "Binance Dubai",
    country: "UAE",
    category: "Fintech",
    logo: "/images/brands/binance-dubai-logo.png",
    website: "https://www.binance.com/en",
    featured: true,
  },
  {
    id: "durable",
    name: "Durable.ai",
    country: "United States",
    category: "AI",
    logo: "/images/brands/durable-logo.png",
    website: "https://durable.ai/",
  },
  {
    id: "linkink",
    name: "LINKINK.Ai",
    country: "India",
    category: "AI",
    logo: "/images/brands/linkink-logo.png",
    website: "https://linkink.ai/",
  },
  {
    id: "jeton",
    name: "Jeton Banking App",
    country: "Cyprus / UK",
    category: "Fintech",
    logo: "/images/brands/jeton-logo.png",
    website: "https://www.jeton.com/",
    featured: true,
  },
  {
    id: "unsent",
    name: "Unsent App",
    country: "Australia",
    category: "Consumer App",
    logo: "/images/brands/unsent-logo.png",
    website: "https://www.unsent.app/",
  },
  {
    id: "haqq",
    name: "HAQQ Legal AI",
    country: "MENA",
    category: "Legal AI",
    logo: "/images/brands/haqq-logo.png",
    website: undefined,
  },
];

export type CaseStudy = {
  id: string;
  brand: string;
  challenge?: string;
  delivered: string;
  result?: string;
  featured: boolean;
};

/** Verbatim case-study details from the Media Kit. */
export const caseStudies: CaseStudy[] = [
  {
    id: "torass",
    brand: "Torass Global",
    challenge: "Multiple campaigns as a long-term brand partner.",
    delivered:
      "Long-term collaborator - consistent delivery on briefs and timelines.",
    featured: true,
  },
  {
    id: "binance-dubai",
    brand: "Binance Dubai",
    challenge: "Fintech storytelling for a regional audience.",
    delivered:
      "Completed partnership - fintech storytelling delivered for a regional audience.",
    featured: true,
  },
];
