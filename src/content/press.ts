export type PressItem = {
  id: string;
  outlet: string;
  logo?: string;
  title: string;
  description?: string;
  date?: string;
  url?: string;
};

/**
 * Populate when verified press, podcasts, events, or awards exist.
 * Do not invent coverage.
 */
export const pressItems: PressItem[] = [];

export const pressEmptyState = {
  title: "Press & Recognition",
  message: "Recognition coming soon.",
  note: "Features, podcasts, events, and media mentions will live here.",
} as const;
