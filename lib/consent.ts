"use client";

import * as React from "react";

/**
 * Consentimento de cookies — LGPD (Lei 13.709/2018) e Guia Orientativo sobre
 * Cookies da ANPD.
 *
 * Regras que este módulo garante:
 *  - Nada além do estritamente necessário roda antes de uma escolha explícita.
 *  - Recusar custa o mesmo número de cliques que aceitar.
 *  - A escolha é granular por finalidade e pode ser alterada a qualquer momento.
 *  - Guardamos versão e data da escolha como registro do consentimento.
 */

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "morubi.consent";
export const CONSENT_CHANGED_EVENT = "morubi:consent-changed";
export const CONSENT_OPEN_EVENT = "morubi:consent-open";

export type ConsentCategory = "necessarios" | "funcionais" | "analiticos";

export type ConsentChoices = Record<Exclude<ConsentCategory, "necessarios">, boolean>;

export interface ConsentRecord {
  version: number;
  /** ISO 8601 — registro de quando a escolha foi feita. */
  decidedAt: string;
  choices: ConsentChoices;
}

export const ALL_ACCEPTED: ConsentChoices = { funcionais: true, analiticos: true };
export const ALL_REJECTED: ConsentChoices = { funcionais: false, analiticos: false };

export const categories: {
  id: ConsentCategory;
  label: string;
  required?: boolean;
  description: string;
}[] = [
  {
    id: "necessarios",
    label: "Estritamente necessários",
    required: true,
    description:
      "Mantêm o site funcionando: segurança, prevenção a abuso no formulário de contato e memória da sua própria escolha de cookies. Sem eles o site não opera, por isso não dependem de consentimento.",
  },
  {
    id: "funcionais",
    label: "Funcionais de terceiros",
    description:
      "Habilitam o agendamento de demonstração incorporado ao site (Calendly), que define cookies próprios ao ser carregado. Se você recusar, o agendamento abre em uma nova aba, no site do próprio fornecedor.",
  },
  {
    id: "analiticos",
    label: "Analíticos",
    description:
      "Nos ajudam a entender, de forma agregada, quais páginas são usadas e onde as pessoas travam. Nenhum dado é vendido nem usado para publicidade. Recusar não muda nada no que você vê.",
  },
];

/* ------------------------------ leitura ------------------------------ */

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed?.version !== CONSENT_VERSION) return null;
    if (typeof parsed.choices?.funcionais !== "boolean") return null;
    if (typeof parsed.choices?.analiticos !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasConsent(category: Exclude<ConsentCategory, "necessarios">) {
  return readConsent()?.choices[category] === true;
}

/* ------------------------------ escrita ------------------------------ */

export function saveConsent(choices: ConsentChoices): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    choices,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* navegação privada com storage bloqueado: a escolha vale para a sessão */
  }
  window.dispatchEvent(
    new CustomEvent<ConsentRecord>(CONSENT_CHANGED_EVENT, { detail: record }),
  );
  return record;
}

/** Revoga tudo e apaga os cookies deixados por terceiros já carregados. */
export function revokeConsent() {
  saveConsent(ALL_REJECTED);
  clearThirdPartyCookies();
}

/**
 * Remove cookies não essenciais visíveis ao JavaScript. Cookies HttpOnly de
 * terceiros só somem pelo próprio domínio — por isso, ao revogar, o script
 * deixa de ser carregado e recomendamos recarregar a página.
 */
export function clearThirdPartyCookies() {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

/** Abre o painel de preferências de qualquer lugar do site. */
export function openConsentPreferences(reason?: string) {
  window.dispatchEvent(
    new CustomEvent<string | undefined>(CONSENT_OPEN_EVENT, { detail: reason }),
  );
}

/* ------------------------------- hook -------------------------------- */

export function useConsent() {
  const [record, setRecord] = React.useState<ConsentRecord | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setRecord(readConsent());
    setReady(true);

    const onChange = (e: Event) => setRecord((e as CustomEvent<ConsentRecord>).detail);
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) setRecord(readConsent());
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return { record, ready, decided: ready && record !== null };
}
