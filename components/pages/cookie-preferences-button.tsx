"use client";

import { Cookie } from "lucide-react";
import { openConsentPreferences } from "@/lib/consent";
import { cn } from "@/lib/utils";

/**
 * Reabre o painel de preferências. Presente no rodapé de todas as páginas
 * para que revogar seja tão fácil quanto consentir, como exige a LGPD.
 */
export function CookiePreferencesButton({
  className,
  withIcon,
  label = "Preferências de cookies",
}: {
  className?: string;
  withIcon?: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => openConsentPreferences()}
      className={cn("inline-flex items-center gap-2 transition-colors", className)}
    >
      {withIcon && <Cookie size={14} />}
      {label}
    </button>
  );
}
