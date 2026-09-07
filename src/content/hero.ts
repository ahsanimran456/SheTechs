export const heroContent = {
  headline: "Hi, I'm Maham - I make AI and tech make sense.",
  supporting:
    "Tech content creator based in Dubai. I've spent the last 3 years turning AI, automation and everyday tech into videos people actually watch and understand - while working full-time in AI-driven operations myself.",
  introduction: "AI Engineer · Tech Influencer · Dubai, UAE",
  image: {
    src: "/images/person.png",
    alt: "Maham Shakeel, AI and tech content creator in Dubai",
  },
  ctas: {
    primary: { label: "Watch My Work", href: "#work" },
    secondary: { label: "Work With Me", href: "#contact" },
    tertiary: { label: "Download Media Kit", href: "media-kit" as const },
  },
  credibility: [
    { value: "2.7K+", label: "Instagram followers" },
    { value: "3+", label: "years creating content" },
    {
      value: "Brands",
      label: "Binance Dubai, Torass Global, Jeton",
    },
  ],
} as const;
