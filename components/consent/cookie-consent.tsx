"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CALENDLY_PENDING_KEY, openCalendlyInNewTab } from "@/lib/calendly";
import {
  ALL_ACCEPTED,
  ALL_REJECTED,
  CONSENT_OPEN_EVENT,
  categories,
  clearThirdPartyCookies,
  readConsent,
  saveConsent,
  type ConsentChoices,
} from "@/lib/consent";

export function CookieConsent() {
  const [mounted, setMounted] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);
  const [reason, setReason] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState<ConsentChoices>(ALL_REJECTED);

  React.useEffect(() => {
    setMounted(true);
    const existing = readConsent();
    if (existing) {
      setDraft(existing.choices);
    } else {
      setShowBanner(true);
    }

    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<string | undefined>).detail;
      setDraft(readConsent()?.choices ?? ALL_REJECTED);
      setReason(detail ?? null);
      setShowPanel(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  React.useEffect(() => {
    if (!showPanel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPanel(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPanel]);

  function decide(choices: ConsentChoices) {
    const previous = readConsent()?.choices;
    saveConsent(choices);
    // Se algo foi revogado, limpa o que já tinha sido depositado.
    if (
      (previous?.funcionais && !choices.funcionais) ||
      (previous?.analiticos && !choices.analiticos)
    ) {
      clearThirdPartyCookies();
    }
    // Quem pediu o agendamento e recusou o terceiro não fica sem saída:
    // abrimos o Calendly no site do próprio fornecedor, em nova aba.
    try {
      if (
        !choices.funcionais &&
        window.sessionStorage.getItem(CALENDLY_PENDING_KEY)
      ) {
        window.sessionStorage.removeItem(CALENDLY_PENDING_KEY);
        openCalendlyInNewTab();
      }
    } catch {
      /* storage indisponível */
    }

    setDraft(choices);
    setShowBanner(false);
    setShowPanel(false);
    setReason(null);
  }

  if (!mounted) return null;

  return (
    <>
      {/* Primeira camada: banner */}
      <AnimatePresence>
        {showBanner && !showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-live="polite"
            aria-label="Aviso de cookies"
            className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
          >
            <div className="glass mx-auto max-w-4xl rounded-2xl border border-border p-5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] sm:p-6">
              <div className="flex items-start gap-4">
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-elevated text-accent sm:flex">
                  <Cookie size={18} strokeWidth={1.7} />
                </span>

                <div className="flex-1">
                  <p className="text-[15px] font-medium tracking-tight text-foreground">
                    Este site usa cookies
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    Usamos apenas o estritamente necessário para o site
                    funcionar. Cookies funcionais e analíticos só são ativados
                    se você permitir — e você pode mudar de ideia quando quiser.
                    Detalhes na{" "}
                    <Link
                      href="/cookies"
                      className="text-accent transition-colors hover:brightness-110"
                    >
                      Política de Cookies
                    </Link>{" "}
                    e na{" "}
                    <Link
                      href="/privacidade"
                      className="text-accent transition-colors hover:brightness-110"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </p>

                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                    <Button size="md" onClick={() => decide(ALL_ACCEPTED)}>
                      Aceitar todos
                    </Button>
                    <Button
                      size="md"
                      variant="secondary"
                      onClick={() => decide(ALL_REJECTED)}
                    >
                      Recusar não essenciais
                    </Button>
                    <button
                      onClick={() => {
                        setDraft(ALL_REJECTED);
                        setShowPanel(true);
                      }}
                      className="h-11 px-2 text-[14px] text-subtle transition-colors hover:text-foreground sm:ml-1"
                    >
                      Personalizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Segunda camada: preferências granulares */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget && readConsent()) {
                setShowPanel(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="consent-title"
              className="scroll-thin max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2
                    id="consent-title"
                    className="text-[22px] font-semibold tracking-tight text-foreground"
                  >
                    Preferências de cookies
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    Escolha por finalidade. Sua decisão fica registrada com data
                    e pode ser alterada ou revogada a qualquer momento.
                  </p>
                </div>
                {readConsent() && (
                  <button
                    onClick={() => setShowPanel(false)}
                    aria-label="Fechar preferências"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-foreground"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              {reason && (
                <p className="mt-5 rounded-lg border border-accent/30 bg-accent/10 p-4 text-[14px] leading-relaxed text-subtle">
                  {reason}
                </p>
              )}

              <div className="mt-7 space-y-3">
                {categories.map((c) => {
                  const isRequired = Boolean(c.required);
                  const key = c.id as keyof ConsentChoices;
                  const checked = isRequired || draft[key];
                  return (
                    <div
                      key={c.id}
                      className="rounded-xl border border-border bg-bg/40 p-5"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="text-[15px] font-medium tracking-tight text-foreground">
                            {c.label}
                          </p>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                            {c.description}
                          </p>
                        </div>

                        <Toggle
                          checked={checked}
                          disabled={isRequired}
                          label={`Ativar cookies ${c.label.toLowerCase()}`}
                          onChange={(v) =>
                            setDraft((d) => ({ ...d, [key]: v }))
                          }
                        />
                      </div>
                      {isRequired && (
                        <p className="mt-3 text-[12.5px] text-muted">
                          Sempre ativos — base legal de legítimo interesse para
                          o funcionamento do site.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <Button size="md" onClick={() => decide(draft)}>
                  Salvar preferências
                </Button>
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => decide(ALL_ACCEPTED)}
                >
                  Aceitar todos
                </Button>
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => decide(ALL_REJECTED)}
                >
                  Recusar não essenciais
                </Button>
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-muted">
                Ao revogar uma permissão, os cookies correspondentes acessíveis
                ao navegador são apagados e o recurso deixa de ser carregado.
                Saiba mais na{" "}
                <Link
                  href="/cookies"
                  onClick={() => setShowPanel(false)}
                  className="text-accent transition-colors hover:brightness-110"
                >
                  Política de Cookies
                </Link>
                .
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Toggle({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        checked ? "border-accent/50 bg-accent/80" : "border-border bg-elevated",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-foreground transition-all",
          checked ? "left-[24px]" : "left-[3px]",
        )}
      />
    </button>
  );
}
