"use client";

export type AnalyticsEvent =
  | "hero_demo_click"
  | "schedule_demo_click"
  | "pricing_demo_click"
  | "live_demo_started"
  | "integration_click"
  | "faq_opened"
  | "final_cta_click";

export function track(event: AnalyticsEvent, data?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("morubi:analytics", { detail: { event, ...data } }));
}

