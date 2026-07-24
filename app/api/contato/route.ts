import { NextResponse } from "next/server";
import { sendMail, MailerNotConfiguredError } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Limite simples por IP: 5 envios por hora, em memória do processo.
   Para múltiplas instâncias, troque por um store compartilhado (KV/Redis). */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "desconhecido";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas solicitações. Tente novamente mais tarde." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // Campo-armadilha: preenchido só por robô.
  if (clean(data.website, 200) !== "") {
    return NextResponse.json({ ok: true });
  }

  const nome = clean(data.nome, 120);
  const email = clean(data.email, 200);
  const solicitacao = clean(data.solicitacao, 5000);

  const errors: Record<string, string> = {};
  if (nome.length < 2) errors.nome = "Informe o seu nome.";
  if (!EMAIL_RE.test(email)) errors.email = "Informe um e-mail válido.";
  if (solicitacao.length < 10)
    errors.solicitacao = "Conte um pouco mais — pelo menos uma frase.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const recebidoEm = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  const text = [
    "Nova solicitação pelo formulário do site.",
    "",
    `Nome:  ${nome}`,
    `E-mail: ${email}`,
    "",
    "Solicitação:",
    solicitacao,
    "",
    "---",
    `Recebido em ${recebidoEm} (BRT)`,
    `Origem: ${ip}`,
  ].join("\n");

  try {
    await sendMail({
      subject: `Contato do site — ${nome}`,
      text,
      replyTo: email,
    });
  } catch (err) {
    if (err instanceof MailerNotConfiguredError) {
      return NextResponse.json(
        { error: "Serviço de envio indisponível." },
        { status: 503 },
      );
    }
    console.error("Falha ao enviar contato:", err);
    return NextResponse.json(
      { error: "Não foi possível enviar agora." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
