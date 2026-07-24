import type { Metadata } from "next";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wrench,
  History,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Estado operacional dos serviços do Morubi: copiloto em tempo real, painel do gestor, transcrição de áudio, autenticação e integrações.",
  alternates: { canonical: "/status" },
  robots: { index: true, follow: true },
};

/* -------------------------------------------------------------------------
 * Fonte de verdade da página. Atualize este bloco quando o estado mudar
 * (ou troque por um fetch do monitoramento quando ele existir).
 * ---------------------------------------------------------------------- */

type State = "operational" | "degraded" | "outage" | "maintenance";

const LAST_UPDATE = "23 de julho de 2026, 09:00 (BRT)";

const services: { name: string; description: string; state: State }[] = [
  {
    name: "Copiloto em tempo real",
    description:
      "Leitura da conversa ativa, probabilidade de fechamento e sugestão de resposta.",
    state: "operational",
  },
  {
    name: "Painel do gestor",
    description: "Configuração da operação, base de conhecimento e dashboards.",
    state: "operational",
  },
  {
    name: "Transcrição de áudio",
    description: "Processamento dos áudios recebidos nas conversas.",
    state: "operational",
  },
  {
    name: "Autenticação e contas",
    description: "Login, convites de vendedores e sessões da extensão.",
    state: "operational",
  },
  {
    name: "Integrações",
    description: "Conexões com os sistemas da empresa e registro de resultado.",
    state: "operational",
  },
];

type Incident = {
  date: string;
  title: string;
  state: State;
  summary: string;
  updates: { time: string; text: string }[];
};

const incidents: Incident[] = [];

/* ---------------------------------------------------------------------- */

const stateMeta: Record<
  State,
  { label: string; icon: typeof CheckCircle2; color: string; dot: string }
> = {
  operational: {
    label: "Operacional",
    icon: CheckCircle2,
    color: "text-positive",
    dot: "bg-positive",
  },
  degraded: {
    label: "Desempenho degradado",
    icon: AlertTriangle,
    color: "text-warning",
    dot: "bg-warning",
  },
  outage: {
    label: "Indisponível",
    icon: XCircle,
    color: "text-danger",
    dot: "bg-danger",
  },
  maintenance: {
    label: "Em manutenção",
    icon: Wrench,
    color: "text-subtle",
    dot: "bg-subtle",
  },
};

const overall: State = services.some((s) => s.state === "outage")
  ? "outage"
  : services.some((s) => s.state === "degraded")
    ? "degraded"
    : services.some((s) => s.state === "maintenance")
      ? "maintenance"
      : "operational";

const overallCopy: Record<State, string> = {
  operational: "Todos os sistemas operando normalmente",
  degraded: "Alguns sistemas com desempenho degradado",
  outage: "Há sistemas indisponíveis no momento",
  maintenance: "Manutenção programada em andamento",
};

const commitments = [
  {
    k: "Meta de disponibilidade",
    v: "99,5%",
    d: "Compromisso de uptime mensal do backend do Morubi.",
  },
  {
    k: "Resposta do copiloto",
    v: "≤ 3s",
    d: "Alvo de latência para a sugestão após uma nova mensagem relevante.",
  },
  {
    k: "Primeiro retorno do suporte",
    v: "≤ 4h úteis",
    d: "Para chamados abertos por clientes em contato@morubi.ai.",
  },
];

export default function StatusPage() {
  const OverallIcon = stateMeta[overall].icon;

  return (
    <PageShell
      eyebrow="Status"
      title="O estado da operação, sem intermediários."
      subtitle="Esta página mostra a situação atual de cada serviço do Morubi e o histórico de incidentes. Quando algo sai do lugar, é aqui que você fica sabendo primeiro."
    >
      {/* Estado geral */}
      <section className="mx-auto w-full max-w-8xl px-6 pt-16 lg:px-8">
        <Card className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <span className="relative flex h-10 w-10 items-center justify-center">
              <span
                className={`absolute h-10 w-10 rounded-full ${stateMeta[overall].dot} opacity-20 animate-pulse-ring`}
              />
              <OverallIcon
                size={26}
                className={stateMeta[overall].color}
                aria-hidden
              />
            </span>
            <div>
              <p className="text-[19px] font-semibold tracking-tight text-foreground">
                {overallCopy[overall]}
              </p>
              <p className="mt-1 text-[13px] text-muted">
                Última atualização: {LAST_UPDATE}
              </p>
            </div>
          </div>

          <a
            href="mailto:contato@morubi.ai?subject=Avisos%20de%20status%20Morubi"
            className="shrink-0 text-[14px] text-accent transition-colors hover:brightness-110"
          >
            Receber avisos por e-mail →
          </a>
        </Card>
      </section>

      {/* Serviços */}
      <section className="mx-auto w-full max-w-8xl px-6 py-16 lg:px-8">
        <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
          Serviços
        </h2>

        <ul className="mt-6 divide-y divide-border border-y border-border">
          {services.map((s) => {
            const meta = stateMeta[s.state];
            return (
              <li
                key={s.name}
                className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <div>
                  <p className="text-[16px] font-medium tracking-tight text-foreground">
                    {s.name}
                  </p>
                  <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-muted">
                    {s.description}
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-2 text-[14px] ${meta.color}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                  {meta.label}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Compromissos */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-8xl px-6 py-16 lg:px-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
            Nossos compromissos
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
            Metas que assumimos com quem usa o Morubi todo dia. São alvos
            operacionais, não medições em tempo real.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {commitments.map((c) => (
              <Card key={c.k} className="p-6">
                <p className="text-[13px] uppercase tracking-wider text-muted">
                  {c.k}
                </p>
                <p className="mt-3 text-[32px] font-semibold tracking-tight text-foreground">
                  {c.v}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {c.d}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Histórico */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-8xl px-6 py-16 lg:px-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
            Histórico de incidentes
          </h2>

          {incidents.length === 0 ? (
            <Card className="mt-6 flex items-start gap-4 p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-elevated text-muted">
                <History size={16} />
              </span>
              <div>
                <p className="text-[15px] font-medium text-foreground">
                  Nenhum incidente publicado.
                </p>
                <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-muted">
                  Sempre que houver interrupção ou degradação relevante,
                  publicamos aqui o que aconteceu, o impacto e o que fizemos
                  para não repetir.
                </p>
              </div>
            </Card>
          ) : (
            <div className="mt-6 divide-y divide-border border-y border-border">
              {incidents.map((inc) => {
                const meta = stateMeta[inc.state];
                return (
                  <article key={inc.title} className="py-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`text-[13px] ${meta.color}`}>
                        {meta.label}
                      </span>
                      <span className="text-[13px] text-muted">
                        {inc.date}
                      </span>
                    </div>
                    <h3 className="mt-2 text-[17px] font-medium tracking-tight text-foreground">
                      {inc.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">
                      {inc.summary}
                    </p>
                    <ul className="mt-4 space-y-2 border-l border-border pl-4">
                      {inc.updates.map((u) => (
                        <li key={u.time} className="text-[14px] text-muted">
                          <span className="mr-2 font-mono text-[13px] text-subtle">
                            {u.time}
                          </span>
                          {u.text}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Suporte */}
      <section className="border-t border-border">
        <div className="mx-auto flex w-full max-w-8xl flex-col items-start justify-between gap-5 px-6 py-16 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
              Está vendo algo que não aparece aqui?
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
              Se o Morubi parou de ler uma conversa ou o painel travou, avise o
              time. Quebra de leitura de canal é tratada como incidente.
            </p>
          </div>
          <a
            href="mailto:contato@morubi.ai?subject=Reportar%20incidente"
            className="shrink-0 text-[15px] text-accent transition-colors hover:brightness-110"
          >
            contato@morubi.ai →
          </a>
        </div>
      </section>
    </PageShell>
  );
}
