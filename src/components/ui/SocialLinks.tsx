"use client";

import { socialLinks } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const icons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 10.5V16M8 8v.01M12 16v-3.5a2 2 0 0 1 4 0V16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.8v4.4L14.8 12l-4.3-2.2Z" fill="currentColor" />
    </svg>
  ),
  collabstr: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.5 12.5 11 15l4.5-5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

type Props = {
  className?: string;
  showLabels?: boolean;
};

export function SocialLinks({ className, showLabels = false }: Props) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socialLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-border bg-elevated/70 px-3 py-2 text-sm text-ink transition hover:border-ink hover:bg-white",
              !showLabels && "p-2.5",
            )}
            aria-label={link.label}
            onClick={() =>
              trackEvent("social_click", { network: link.id, href: link.href })
            }
          >
            {icons[link.id]}
            {showLabels ? <span>{link.label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
