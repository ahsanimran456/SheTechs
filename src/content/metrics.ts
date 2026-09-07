/** Media Kit performance insights - do not inflate. */
export const metrics = [
  {
    id: "followers",
    value: "2.7K",
    label: "Instagram followers (@maham_techworld)",
    numeric: 2700,
  },
  {
    id: "profile-views",
    value: "13K",
    label: "Profile views (Instagram insights)",
    numeric: 13000,
  },
  {
    id: "interactions",
    value: "2.2K",
    label: "Interactions (same insights window)",
    numeric: 2200,
  },
  {
    id: "new-followers",
    value: "250",
    label: "New followers (same window)",
    numeric: 250,
  },
  {
    id: "reel-avg",
    value: "3K–4K",
    label: "Typical reel average",
    numeric: 3500,
  },
  {
    id: "top-branded",
    value: "12K–15K",
    label: "Top branded content views",
    numeric: 13500,
  },
  {
    id: "brands",
    value: "10+",
    label: "Brands worked with",
    numeric: 10,
  },
  {
    id: "collabstr",
    value: "100%",
    label: "Collabstr profile strength",
    numeric: 100,
  },
] as const;

export const reviews = {
  source: "Collabstr",
  sourceUrl: "https://collabstr.com/mahamtechworld",
  profileStrength: "100% Good",
  reviewCount: 3,
  scores: [
    { label: "Communication", value: 5 },
    { label: "Timeliness", value: 5 },
    { label: "Satisfaction", value: 5 },
  ],
  items: [
    {
      brand: "Thea",
      rating: 5.0,
      date: "February 2026",
      text: "Thea left a 5.0 star review.",
    },
    {
      brand: "OpenBuilder",
      rating: 5.0,
      date: "January 2026",
      text: "OpenBuilder left a 5.0 star review.",
    },
    {
      brand: "Jeton",
      rating: 5.0,
      date: "June 2025",
      text: "Jeton left a 5.0 star review.",
    },
  ],
} as const;
