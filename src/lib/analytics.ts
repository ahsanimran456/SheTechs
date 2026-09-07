/**
 * Lightweight analytics hooks. Wire to GA / privacy-conscious analytics
 * by setting NEXT_PUBLIC_GA_ID and extending trackEvent.
 */
export type AnalyticsEvent =
  | "portfolio_click"
  | "social_click"
  | "contact_submit"
  | "cta_click"
  | "page_view";

export function trackEvent(
  event: AnalyticsEvent,
  payload?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("maham:analytics", { detail: { event, payload } }),
  );

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const w = window as Window & {
    gtag?: (...args: unknown[]) => void;
  };

  if (gaId && typeof w.gtag === "function") {
    w.gtag("event", event, payload ?? {});
  }
}
