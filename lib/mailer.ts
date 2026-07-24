import "server-only";

/**
 * Envio de e-mail com dois provedores possíveis, escolhidos por variável de
 * ambiente. Nenhum deles é obrigatório em tempo de build — se nada estiver
 * configurado, `sendMail` lança `MailerNotConfiguredError` e a rota responde
 * 503 com um recado honesto para o visitante.
 *
 *  1. Resend  → defina RESEND_API_KEY (chamada REST, sem dependência extra)
 *  2. SMTP    → defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *
 * Comum aos dois: MAIL_FROM (remetente) e MAIL_TO (caixa que recebe).
 */

export class MailerNotConfiguredError extends Error {
  constructor() {
    super("Nenhum provedor de e-mail configurado.");
    this.name = "MailerNotConfiguredError";
  }
}

export interface MailPayload {
  subject: string;
  text: string;
  replyTo?: string;
}

const from = process.env.MAIL_FROM ?? "Morubi <nao-responda@morubi.ai>";
const to = process.env.MAIL_TO ?? "contato@morubi.ai";

export function isMailerConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);
}

export async function sendMail({ subject, text, replyTo }: MailPayload) {
  if (process.env.RESEND_API_KEY) {
    return sendWithResend({ subject, text, replyTo });
  }
  if (process.env.SMTP_HOST) {
    return sendWithSmtp({ subject, text, replyTo });
  }
  throw new MailerNotConfiguredError();
}

async function sendWithResend({ subject, text, replyTo }: MailPayload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend respondeu ${res.status}: ${detail.slice(0, 300)}`);
  }
}

async function sendWithSmtp({ subject, text, replyTo }: MailPayload) {
  const nodemailer = (await import("nodemailer")).default;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });

  await transporter.sendMail({ from, to, subject, text, replyTo });
}
