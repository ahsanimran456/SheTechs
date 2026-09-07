export const siteConfig = {
  name: "Maham Shakeel",
  brand: "Maham Techworld",
  title: "Maham Shakeel - AI & Tech Content Creator, Dubai",
  description:
    "Maham Shakeel is an AI engineer and tech content creator based in Dubai. She creates clear, engaging content on AI, automation, and everyday tech - and collaborates with technology and fintech brands.",
  url: "https://mahamshakeel.tech",
  email: "mahamshakeel546@gmail.com",
  location: "Dubai, UAE",
  positioning: "AI Engineer · Tech Influencer · Tech Content Creator · Dubai, UAE",
  /** Official Media Kit (HTML) abstracted from the supplied kit. */
  mediaKitPath: "/media-kit/index.html",
  ogImage: "/opengraph-image",
} as const;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "My Work" },
  { href: "#brands", label: "Brands" },
  { href: "#press", label: "Press & Recognition" },
  { href: "#skills", label: "Skills & Services" },
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
