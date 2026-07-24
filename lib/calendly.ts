"use client";

import { hasConsent, openConsentPreferences } from "@/lib/consent";

export const CALENDLY_URL =
  "https://calendly.com/empresarialalemonte/apresentacao-morubi?hide_event_type_details=1&hide_gdpr_banner=1";

/** Marca que o visitante pediu o agendamento antes de decidir sobre cookies. */
export const CALENDLY_PENDING_KEY = "morubi.calendly.pendente";

export const CALENDLY_CONSENT_REASON =
  "O agendamento acontece dentro de uma ferramenta de terceiro (Calendly), que grava cookies próprios ao ser carregada aqui no site. Permita os cookies funcionais para abrir o agendamento nesta página — ou recuse, que abrimos direto no site do fornecedor, em uma nova aba.";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function openCalendlyInNewTab() {
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}

export function openCalendly() {
  if (typeof window === "undefined") return;

  // Script já carregado (consentimento funcional ativo): abre o popup no site.
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  // Sem consentimento funcional: pergunta antes de carregar qualquer terceiro.
  if (!hasConsent("funcionais")) {
    try {
      window.sessionStorage.setItem(CALENDLY_PENDING_KEY, "1");
    } catch {
      /* storage indisponível — seguimos sem a retomada automática */
    }
    openConsentPreferences(CALENDLY_CONSENT_REASON);
    return;
  }

  // Consentido, mas o script ainda não terminou de carregar.
  openCalendlyInNewTab();
}
