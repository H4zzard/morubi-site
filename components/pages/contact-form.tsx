"use client";

import * as React from "react";
import { CheckCircle2, Send, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "contato@morubi.ai";

type Fields = { nome: string; email: string; solicitacao: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { nome: "", email: "", solicitacao: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.nome.trim().length < 2) e.nome = "Informe o seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    e.email = "Informe um e-mail válido.";
  if (f.solicitacao.trim().length < 10)
    e.solicitacao = "Conte um pouco mais — pelo menos uma frase.";
  return e;
}

export function ContactForm() {
  const [fields, setFields] = React.useState<Fields>(empty);
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">(
    "idle",
  );
  const [failure, setFailure] = React.useState<string | null>(null);
  const honeypot = React.useRef<HTMLInputElement>(null);

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [k]: e.target.value }));
      setErrors((prev) => ({ ...prev, [k]: undefined }));
    };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(fields);
    setErrors(found);
    setFailure(null);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          website: honeypot.current?.value ?? "",
        }),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }

      const payload = await res.json().catch(() => ({}));

      if (res.status === 422 && payload.errors) {
        setErrors(payload.errors as Errors);
      } else if (res.status === 429) {
        setFailure(
          "Recebemos várias solicitações deste dispositivo. Aguarde alguns minutos e tente de novo.",
        );
      } else {
        setFailure(
          `Não conseguimos enviar a sua mensagem agora. Escreva direto para ${CONTACT_EMAIL} que respondemos do mesmo jeito.`,
        );
      }
      setStatus("idle");
    } catch {
      setFailure(
        `Falha de conexão ao enviar. Verifique sua internet ou escreva para ${CONTACT_EMAIL}.`,
      );
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-surface/60 p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-elevated text-accent">
          <CheckCircle2 size={20} />
        </span>
        <h2 className="mt-5 text-[20px] font-semibold tracking-tight text-foreground">
          Solicitação enviada.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Chegou na nossa caixa. Uma pessoa do time responde em até 4 horas
          úteis, no e-mail que você informou.
        </p>
        <button
          onClick={() => {
            setFields(empty);
            setStatus("idle");
          }}
          className="mt-6 text-[14px] text-accent transition-colors hover:brightness-110"
        >
          Enviar outra solicitação
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="relative rounded-2xl border border-border bg-surface/60 p-6 sm:p-8"
    >
      <div className="space-y-5">
        <Field
          id="nome"
          label="Nome"
          error={errors.nome}
          value={fields.nome}
          onChange={set("nome")}
          placeholder="Como podemos te chamar"
          autoComplete="name"
        />
        <Field
          id="email"
          label="E-mail"
          type="email"
          error={errors.email}
          value={fields.email}
          onChange={set("email")}
          placeholder="voce@suaempresa.com.br"
          autoComplete="email"
        />
        <Field
          id="solicitacao"
          label="Solicitação"
          error={errors.solicitacao}
          value={fields.solicitacao}
          onChange={set("solicitacao")}
          placeholder="Conte o que você precisa: uma demonstração, uma dúvida sobre a plataforma, suporte, privacidade de dados…"
          textarea
        />
      </div>

      {/* Campo-armadilha: invisível para pessoas, atrativo para robôs. */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" ref={honeypot} tabIndex={-1} autoComplete="off" />
      </div>

      {failure && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-lg border border-danger/40 bg-danger/10 p-4 text-[14px] leading-relaxed text-subtle"
        >
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-danger" />
          {failure}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="mt-7 w-full sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            <Send size={16} />
            Enviar solicitação
          </>
        )}
      </Button>

      <p className="mt-4 text-[13px] leading-relaxed text-muted">
        Ao enviar, você concorda com o tratamento dos seus dados conforme a
        nossa{" "}
        <a
          href="/privacidade"
          className="text-accent transition-colors hover:brightness-110"
        >
          Política de Privacidade
        </a>
        . Usamos essas informações apenas para responder ao seu contato.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  textarea,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const base = cn(
    "w-full rounded-lg border bg-bg/60 px-3.5 text-[15px] text-foreground placeholder:text-muted",
    "transition-colors focus-visible:outline-none focus-visible:border-accent/60",
    error ? "border-danger/60" : "border-border",
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[14px] font-medium text-subtle"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-erro` : undefined}
          className={cn(base, "resize-y py-3 leading-relaxed")}
          {...props}
        />
      ) : (
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-erro` : undefined}
          className={cn(base, "h-11")}
          {...props}
        />
      )}
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
