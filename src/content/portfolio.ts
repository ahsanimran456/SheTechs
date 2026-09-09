export type PortfolioCategory =
  | "All"
  | "Productive Tech Lifestyle"
  | "UAE & AI Course"
  | "Brand Collaborations"
  | "Tech Explainers";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: Exclude<PortfolioCategory, "All">;
  platform: "Instagram" | "YouTube";
  videoSrc?: string;
  externalUrl?: string;
  thumbnail: string;
  views?: string;
  likes?: string;
  brand?: string;
  featured?: boolean;
};

export const portfolioFilters: PortfolioCategory[] = [
  "All",
  "Productive Tech Lifestyle",
  "UAE & AI Course",
  "Brand Collaborations",
  "Tech Explainers",
];

/**
 * Instagram-first portfolio.
 * Lifestyle, UAE & AI course, brand collabs, and Tech Explainers on YouTube.
 */
export const portfolioItems: PortfolioItem[] = [
  // -- Productive Tech Lifestyle (Instagram) --
  {
    id: "ig-crypto-uae",
    title: "Crypto in the UAE feels simpler than it used to",
    description:
      "AED integration and a more streamlined experience make getting started with crypto more accessible.",
    category: "Productive Tech Lifestyle",
    platform: "Instagram",
    thumbnail: "/images/work/ig-DZfMC9XgBnB.jpg",
    externalUrl: "https://www.instagram.com/reel/DZfMC9XgBnB/",
    featured: true,
  },
  {
    id: "ig-consistency",
    title: "Consistency over comfort",
    description:
      "A short reminder that progress comes from showing up - even when comfort feels easier.",
    category: "Productive Tech Lifestyle",
    platform: "Instagram",
    thumbnail: "/images/work/ig-DSpZNWWAd5i.jpg",
    externalUrl: "https://www.instagram.com/reel/DSpZNWWAd5i/",
    featured: true,
  },

  // -- UAE & AI Course (Instagram) --
  {
    id: "ig-cv-freshers",
    title: "Freshers - make your CV stand out with AI",
    description:
      "Practical CV tips for freshers using AI skills to stand out in tech and career applications.",
    category: "UAE & AI Course",
    platform: "Instagram",
    thumbnail: "/images/work/ig-Db-6-Zsg4zg.jpg",
    externalUrl: "https://www.instagram.com/reel/Db-6-Zsg4zg/",
    featured: true,
  },
  {
    id: "ig-falcon-uae",
    title: "UAE’s AI ecosystem & Falcon AI",
    description:
      "While the world talks about OpenAI, Google & Meta, the UAE is building its own AI ecosystem - including Falcon AI.",
    category: "UAE & AI Course",
    platform: "Instagram",
    thumbnail: "/images/work/ig-DblN9aHNYBq.jpg",
    externalUrl: "https://www.instagram.com/reel/DblN9aHNYBq/",
    featured: true,
  },
  {
    id: "ig-captcha-trust",
    title: "That “I’m not a robot” button has trust issues",
    description:
      "CAPTCHA doesn’t just watch what you click - it watches how you click.",
    category: "UAE & AI Course",
    platform: "Instagram",
    thumbnail: "/images/work/ig-DbVoUSpgq1q.jpg",
    externalUrl: "https://www.instagram.com/reel/DbVoUSpgq1q/",
    featured: true,
  },
  {
    id: "ig-fyp-project",
    title: "Final Year Project ideas that stand out",
    description:
      "Built as a Final Year Project - perfect for students, portfolios, and real-world learning.",
    category: "UAE & AI Course",
    platform: "Instagram",
    thumbnail: "/images/work/ig-Daj0NU3NcPz.jpg",
    externalUrl: "https://www.instagram.com/reel/Daj0NU3NcPz/",
    featured: true,
  },
  {
    id: "ig-intl-job-series",
    title: "Land your first international offer",
    description:
      "A free step-by-step series on landing international jobs and Dubai opportunities - no fluff.",
    category: "UAE & AI Course",
    platform: "Instagram",
    thumbnail: "/images/work/ig-DaIc_XHg5G5.jpg",
    externalUrl: "https://www.instagram.com/reel/DaIc_XHg5G5/",
    featured: true,
  },
  {
    id: "ig-rag-mcp",
    title: "RAG, embeddings, function calling & MCP",
    description:
      "If you’re using AI in 2026, these concepts explain how modern AI systems actually work.",
    category: "UAE & AI Course",
    platform: "Instagram",
    thumbnail: "/images/work/ig-DZkX5iegDLv.jpg",
    externalUrl: "https://www.instagram.com/reel/DZkX5iegDLv/",
    featured: true,
  },
  {
    id: "ig-gemma-4",
    title: "Gemma 4 - powerful AI on your device",
    description:
      "Faster, private, on-device AI for students and developers - offline, accessible, and in your control.",
    category: "UAE & AI Course",
    platform: "Instagram",
    thumbnail: "/images/work/ig-DXRxboHDOPA.jpg",
    externalUrl: "https://www.instagram.com/reel/DXRxboHDOPA/",
    featured: true,
  },
  {
    id: "ig-ai-agents",
    title: "How AI agents actually get work done",
    description:
      "Modern AI agents don’t control your device - they orchestrate tools and APIs through structured workflows.",
    category: "UAE & AI Course",
    platform: "Instagram",
    thumbnail: "/images/work/ig-DWog-uuDMrr.jpg",
    externalUrl: "https://www.instagram.com/reel/DWog-uuDMrr/",
    featured: true,
  },
  {
    id: "ig-ai-beyond-claude",
    title: "AI beyond Claude - agents & cybersecurity",
    description:
      "High-capability models with advanced reasoning show how fast AI agents, automation, and APIs are evolving.",
    category: "UAE & AI Course",
    platform: "Instagram",
    thumbnail: "/images/work/ig-DXHTrEdDJXI.jpg",
    externalUrl: "https://www.instagram.com/reel/DXHTrEdDJXI/",
    featured: true,
  },

  // -- Brand Collaborations (Instagram) --
  {
    id: "ig-thea-study",
    title: "Study smarter with Thea Study",
    description:
      "Turn PDFs, lecture notes, and YouTube videos into flashcards, MCQs, and smart quizzes.",
    category: "Brand Collaborations",
    platform: "Instagram",
    brand: "Thea Study",
    thumbnail: "/images/work/ig-DUx1JmWiS0q.jpg",
    videoSrc: "/videos/thea-study.mp4",
    externalUrl: "https://www.instagram.com/reel/DUx1JmWiS0q/",
    featured: true,
  },
  {
    id: "ig-openbuilder",
    title: "OpenBuilder.ai - one prompt to full stack",
    description:
      "One prompt → functional frontend + backend, clean code, modern UI/UX, databases, and APIs.",
    category: "Brand Collaborations",
    platform: "Instagram",
    brand: "OpenBuilder.ai",
    thumbnail: "/images/work/ig-DTSsQy3AbmG.jpg",
    videoSrc: "/videos/openbuilder.mp4",
    externalUrl: "https://www.instagram.com/reel/DTSsQy3AbmG/",
    featured: true,
  },
  {
    id: "ig-torras",
    title: "Dropped my iPhone - and it survived",
    description:
      "Premium protection storytelling for Torras - style meets durability for the iPhone 17 Pro.",
    category: "Brand Collaborations",
    platform: "Instagram",
    brand: "Torras",
    thumbnail: "/images/work/ig-DPoAfYAAdhh.jpg",
    externalUrl: "https://www.instagram.com/reel/DPoAfYAAdhh/",
    featured: true,
  },
  {
    id: "ig-mirrormirror",
    title: "MirrorMirror - share without the noise",
    description:
      "A stress-free social platform built for positivity - no comments, no negativity, just connection.",
    category: "Brand Collaborations",
    platform: "Instagram",
    brand: "MirrorMirror",
    thumbnail: "/images/work/ig-DOgOy9AAQIX.jpg",
    externalUrl: "https://www.instagram.com/reel/DOgOy9AAQIX/",
    featured: true,
  },
  {
    id: "ig-travel-esim",
    title: "Skip airport SIM cards with travel eSIM",
    description:
      "Coverage in 190+ countries - no physical SIM needed, and built for smoother travel days.",
    category: "Brand Collaborations",
    platform: "Instagram",
    brand: "Travel eSIM",
    thumbnail: "/images/work/ig-DMNRGS8TfDW.jpg",
    videoSrc: "/videos/travel-esim.mp4",
    externalUrl: "https://www.instagram.com/reel/DMNRGS8TfDW/",
    featured: true,
  },
  {
    id: "ig-jeton",
    title: "Jeton - all-in-one digital wallet",
    description:
      "Make spending easier and safer with an all-in-one digital wallet for everyday payments.",
    category: "Brand Collaborations",
    platform: "Instagram",
    brand: "Jeton",
    thumbnail: "/images/work/ig-DKl-NPfTXui.jpg",
    externalUrl: "https://www.instagram.com/reel/DKl-NPfTXui/",
    featured: true,
  },


  // -- Tech Explainers (YouTube) --
  {
    id: "yt-django-rest",
    title: "Django REST Framework Tutorial (2025)",
    description:
      "Build a CRUD API with authentication in this Real Estate API series walkthrough.",
    category: "Tech Explainers",
    platform: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/4n4kHDsoMzM/hqdefault.jpg",
    externalUrl: "https://youtu.be/4n4kHDsoMzM",
    featured: true,
  },
  {
    id: "yt-syntax-error",
    title: "How to fix Syntax Error in Python",
    description: "Quick Short explaining and fixing Python syntax errors.",
    category: "Tech Explainers",
    platform: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/TV7d6EqkVr8/hqdefault.jpg",
    externalUrl: "https://www.youtube.com/shorts/TV7d6EqkVr8",
    featured: true,
  },
  {
    id: "yt-file-not-found",
    title: "File not Found Error FIXED",
    description: "Short walkthrough for diagnosing and fixing FileNotFoundError in Python.",
    category: "Tech Explainers",
    platform: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/X9ZTWeEyHos/hqdefault.jpg",
    externalUrl: "https://www.youtube.com/shorts/X9ZTWeEyHos",
    featured: true,
  },
  {
    id: "yt-unicode-error",
    title: "Unicode error in Python FIXED",
    description:
      "Quick Short explaining and fixing UnicodeDecodeError / UnicodeEncodeError in Python.",
    category: "Tech Explainers",
    platform: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/rz3LcAKScn8/hqdefault.jpg",
    externalUrl: "https://www.youtube.com/shorts/rz3LcAKScn8",
    featured: true,
  },
];

export const instagramProfileUrl = "https://www.instagram.com/maham_techworld/";
export const youtubeShortsUrl =
  "https://www.youtube.com/@mahamshakeel4352/shorts";
