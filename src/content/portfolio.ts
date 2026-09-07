export type PortfolioCategory =
  | "All"
  | "AI Education"
  | "Tech Facts"
  | "UAE & Local Tech"
  | "Brand Campaigns";

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
  "AI Education",
  "Tech Facts",
  "UAE & Local Tech",
  "Brand Campaigns",
];

/**
 * Instagram-first portfolio.
 * New posts supplied by Maham + Media Kit brand work.
 * YouTube kept minimal (2 featured Shorts).
 */
export const portfolioItems: PortfolioItem[] = [
  // -- New Instagram posts (supplied) --
  {
    id: "ig-brain-ai",
    title: "Your brain is still your most powerful tool",
    description:
      "Don’t outsource every thought to AI - a reminder to keep human judgment in the loop.",
    category: "AI Education",
    platform: "Instagram",
    thumbnail: "/images/work/ig-brain-ai.jpg",
    externalUrl: "https://www.instagram.com/p/DbyC4yjgH6T/",
    featured: true,
  },
  {
    id: "ig-falcon-uae",
    title: "UAE’s AI ecosystem & Falcon AI",
    description:
      "While the world talks about OpenAI, Google & Meta - the UAE has been quietly building its own AI stack.",
    category: "UAE & Local Tech",
    platform: "Instagram",
    thumbnail: "/images/work/ig-falcon-uae.jpg",
    externalUrl: "https://www.instagram.com/p/DblN9aHNYBq/",
    featured: true,
  },
  {
    id: "ig-dubai-hiring",
    title: "Dubai is hiring for AI-focused roles",
    description:
      "From AI Creative Strategists to AI Content Creators, Marketing Managers, and Video Editors.",
    category: "UAE & Local Tech",
    platform: "Instagram",
    thumbnail: "/images/work/ig-dubai-hiring.jpg",
    externalUrl: "https://www.instagram.com/p/Dc3tB1dAFQu/",
    featured: true,
  },
  {
    id: "ig-unsent",
    title: "Unsent - never know what to reply?",
    description:
      "Brand campaign for Unsent - AI that redefines your texts and suggests the best reply.",
    category: "Brand Campaigns",
    platform: "Instagram",
    brand: "Unsent App",
    thumbnail: "/images/work/ig-unsent.jpg",
    externalUrl: "https://www.instagram.com/p/DcirWSQgmXz/",
    featured: true,
  },
  {
    id: "ig-cv-freshers",
    title: "Freshers - make your CV stand out",
    description:
      "Practical AI course and career tips for freshers building a stronger CV.",
    category: "AI Education",
    platform: "Instagram",
    thumbnail: "/images/work/ig-cv-freshers.jpg",
    externalUrl: "https://www.instagram.com/p/Db-6-Zsg4zg/",
    featured: true,
  },

  // -- Instagram brand work (Media Kit) --
  {
    id: "openbuilder",
    title: "OpenBuilder.ai",
    description:
      "This app literally made me stop using ChatGPT - one prompt to fully functional frontend + backend.",
    category: "Brand Campaigns",
    platform: "Instagram",
    brand: "OpenBuilder.ai",
    thumbnail: "/images/work/openbuilder.jpg",
    videoSrc: "/videos/openbuilder.mp4",
    externalUrl: "https://www.instagram.com/p/DTSsQy3AbmG/",
    featured: true,
  },
  {
    id: "thea-study",
    title: "Thea Study",
    description:
      "Turn PDFs, lecture notes, and YouTube videos into flashcards, MCQs, and smart quizzes.",
    category: "Brand Campaigns",
    platform: "Instagram",
    brand: "Thea Study",
    thumbnail: "/images/work/thea-study.jpg",
    videoSrc: "/videos/thea-study.mp4",
    externalUrl: "https://www.instagram.com/p/DUx1JmWiS0q/",
    featured: true,
  },
  {
    id: "audioreadplay",
    title: "AudioReadPlay",
    description:
      "Productivity hack - turn long articles and study notes into audio for busy days.",
    category: "Brand Campaigns",
    platform: "Instagram",
    brand: "Audio Read",
    thumbnail: "/images/work/audioread.jpg",
    videoSrc: "/videos/audioread.mp4",
    externalUrl: "https://www.instagram.com/p/DRUXhPZAUtV/",
    featured: true,
  },
  {
    id: "travel-esim-ig",
    title: "Travel eSIM campaign",
    description:
      "Travel-tech reel - skip airport SIM cards with coverage in 190+ countries.",
    category: "UAE & Local Tech",
    platform: "Instagram",
    thumbnail: "/images/work/travel-esim.jpg",
    videoSrc: "/videos/travel-esim.mp4",
    externalUrl: "https://www.instagram.com/p/DMNRGS8TfDW/",
    featured: true,
  },
  {
    id: "torras-techworld",
    title: "Torras × Techworld",
    description:
      "Featured brand reel - premium iPhone protection storytelling with Torass Global.",
    category: "Brand Campaigns",
    platform: "Instagram",
    brand: "Torass Global",
    thumbnail: "/images/work/torras.jpg",
    externalUrl: "https://www.instagram.com/reel/DLhj30vzdlf/",
    featured: true,
  },

  // -- Minimal YouTube Shorts --
  {
    id: "yt-personal-teacher",
    title: "This AI Can Be Your Personal Teacher",
    description: "Google AI Studio as a personal teacher for learners.",
    category: "AI Education",
    platform: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/nqI0dDhy2nU/hqdefault.jpg",
    externalUrl: "https://www.youtube.com/shorts/nqI0dDhy2nU",
    featured: true,
  },
  {
    id: "yt-gen-vs-reg",
    title: "Generative AI vs Regular AI - What’s the REAL Difference?",
    description: "Clear breakdown of generative vs traditional AI.",
    category: "Tech Facts",
    platform: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/KVemiJpVglM/hqdefault.jpg",
    externalUrl: "https://www.youtube.com/shorts/KVemiJpVglM",
    featured: true,
  },
];

export const instagramProfileUrl = "https://www.instagram.com/maham_techworld/";
export const youtubeShortsUrl =
  "https://www.youtube.com/@mahamshakeel4352/shorts";
