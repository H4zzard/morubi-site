"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { CALENDLY_PENDING_KEY, openCalendly } from "@/lib/calendly";

/**
 * Nenhum recurso de terceiro entra na página antes do consentimento. Enquanto
 * a categoria "funcionais" estiver recusada ou indecisa, nada daqui é
 * renderizado — nem o CSS, nem o script, nem os cookies que eles gravariam.
 */
export function ThirdPartyScripts() {
  const { record } = useConsent();

  if (!record?.choices.funcionais) return null;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          // O visitante clicou em "agendar" antes de decidir sobre cookies:
          // agora que ele permitiu, retomamos de onde parou.
          try {
            if (window.sessionStorage.getItem(CALENDLY_PENDING_KEY)) {
              window.sessionStorage.removeItem(CALENDLY_PENDING_KEY);
              openCalendly();
            }
          } catch {
            /* storage indisponível */
          }
        }}
      />
    </>
  );
}
