export const CALENDLY_URL =
  "https://calendly.com/empresarialalemonte/apresentacao-morubi?hide_event_type_details=1&hide_gdpr_banner=1";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function openCalendly() {
  if (typeof window === "undefined" || !window.Calendly) return;
  window.Calendly.initPopupWidget({ url: CALENDLY_URL });
}
