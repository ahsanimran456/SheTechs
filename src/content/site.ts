export const siteConfig = {
  name: "Maham Shakeel",
  brand: "Maham Techworld",
  title: "Maham Shakeel — AI Engineer & Tech Content Creator | Dubai",
  description:
    "Maham Shakeel is an AI Engineer and tech content creator based in Dubai, creating engaging AI, technology and UGC content for global brands.",
  url: "https://mahamshakeel.tech",
  email: "mahamshakeel546@gmail.com",
  location: "Dubai, UAE",
  positioning:
    "AI Engineer · Tech Content Creator · Tech Influencer · Dubai, UAE",
  logo: "/images/brand/maham-techworld-logo.png",
  ogImage: "/opengraph-image",
  /** Core SEO targets only — do not expand into keyword stuffing on-page. */
  keywords: [
    "Maham Shakeel",
    "Maham Shakeel Dubai",
    "AI Content Creator Dubai",
    "Tech Content Creator Dubai",
    "AI Engineer Dubai",
    "Tech Influencer Dubai",
    "Technology Content Creator Dubai",
    "AI Tech Influencer Dubai",
    "AI Creator Dubai",
    "Tech Creator Dubai",
    "UGC Creator Dubai",
    "Fintech Content Creator Dubai",
    "Maham Techworld",
  ],
} as const;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "My Work" },
  { href: "#brands", label: "Brands" },
  { href: "#story", label: "Story" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Work With Me" },
] as const;

export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/maham_techworld",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maham-shakeel-951827252",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@mahamshakeel4352",
  },
  {
    id: "collabstr",
    label: "Collabstr",
    href: "https://collabstr.com/mahamtechworld",
  },
] as const;
