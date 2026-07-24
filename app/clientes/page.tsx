import type { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  Building2,
  Sun,
  GraduationCap,
  Wallet,
  Briefcase,
  Store,
  CheckCircle2,
  UserCog,
  Users,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Clientes",
  description:
    "Para quem o Morubi foi feito: operações comerciais de 5 a 100 vendedores em clínicas, imobiliárias, energia solar, educação, consórcios, serviços e franquias.",
  alternates: { canonical: "/clientes" },
};

const segments = [
  {
    icon: Stethoscope,
    name: "Clínicas e saúde",
    pain: "Paciente pergunta preço no WhatsApp, ouve o valor sem contexto e some.",
    gain: "O Morubi reconhece o momento em que a conversa virou preço cedo demais e devolve o argumento de valor da clínica antes que o lead esfrie.",
  },
  {
    icon: Building2,
    name: "Imobiliárias e incorporadoras",
    pain: "Ciclo longo, muitos leads simultâneos e follow-up que se perde entre visitas.",
    gain: "Cada negociação ganha estágio e probabilidade. O corretor vê quem está quente hoje; o gestor vê o funil inteiro sem pedir relatório.",
  },
  {
    icon: Sun,
    name: "Energia solar",
    pain: "Objeção técnica e de financiamento derruba negociação que já estava ganha.",
    gain: "A objeção é identificada na hora e contornada com os números da própria empresa — payback, condição, comparativo de conta.",
  },
  {
    icon: GraduationCap,
    name: "Educação",
    pain: "Volume alto de matrículas em janela curta, com time sazonal e pouco treinado.",
    gain: "Vendedor novo rampa em dias: o discurso da instituição chega pronto no painel, na hora do atendimento.",
  },
  {
    icon: Wallet,
    name: "Consórcios e crédito",
    pain: "Discurso sensível, alta rotatividade de time e risco de promessa errada.",
    gain: "A sugestão vem ancorada na base oficial da empresa, com origem rastreável. Menos improviso, menos exposição.",
  },
  {
    icon: Briefcase,
    name: "Serviços B2B",
    pain: "Proposta enviada, silêncio, e ninguém sabe se ainda vale insistir.",
    gain: "O Morubi aponta sinal de compra, hesitação e o melhor momento para retomar o contato.",
  },
  {
    icon: Store,
    name: "Franquias e redes",
    pain: "Cada unidade vende de um jeito e a matriz não consegue padronizar.",
    gain: "Um mesmo acervo de argumentos rodando em todas as unidades, com leitura comparativa de performance entre elas.",
  },
];

const fitYes = [
  "Time de 5 a 100 vendedores atendendo por WhatsApp e/ou CRM",
  "Venda consultiva, com objeção, negociação e follow-up",
  "Gestor que hoje decide no escuro, sem enxergar as conversas",
  "Conhecimento comercial concentrado em poucas pessoas do time",
  "Rotatividade ou contratação frequente de vendedor novo",
];

const fitNo = [
  "Operação que quer automatizar respostas ao cliente final",
  "Venda 100% autosserviço, sem conversa humana no meio",
  "Times de 1 ou 2 vendedores, onde o gestor já lê tudo",
  "Necessidade de substituir o CRM — nós rodamos por cima dele",
];

const roles = [
  {
    icon: UserCog,
    who: "Para o gestor comercial",
    body: "É quem compra e quem configura. Ganha visão macro e individual: conversão por vendedor, ranking, atendimentos versus ganhos e perdidos, erros mais comuns do time e leads em risco. Deixa de depender do que o vendedor escolhe contar na reunião de segunda.",
    items: [
      "Dashboards do time e de cada vendedor",
      "Curadoria do que vira conhecimento oficial da empresa",
      "Leitura de onde a operação perde negócio, por padrão e não por caso",
    ],
  },
  {
    icon: Users,
    who: "Para o vendedor",
    body: "É quem usa todo dia — e quem faz ou quebra a adoção. Por isso o painel só entrega o que ajuda agora: o que responder, como contornar a objeção da vez e quando voltar a falar com aquele lead. Sem burocracia e sem robô falando no lugar dele.",
    items: [
      "Sugestão de resposta no meio da conversa",
      "Probabilidade de fechamento em tempo real",
      "Correção da IA em uma linha, quando ela erra",
    ],
  },
];

export default function ClientesPage() {
  return (
    <PageShell
      eyebrow="Clientes"
      title="Feito para operações que vendem conversando."
      subtitle="O Morubi não é para todo mundo, e isso é proposital. Ele foi desenhado para times comerciais de 5 a 100 vendedores, em segmentos onde a venda depende de objeção bem respondida e follow-up que não pode cair no esquecimento."
    >
      {/* Segmentos */}
      <section className="mx-auto w-full max-w-8xl px-6 py-24 lg:px-8">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px] sm:leading-[1.1]">
          Onde o Morubi já se encaixa.
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
          A dor muda de nome em cada segmento, mas o formato é o mesmo: a venda
          escapa dentro da conversa, e ninguém percebe a tempo.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.name} delay={(i % 3) * 0.06}>
                <div className="h-full bg-surface p-7 transition-colors hover:bg-elevated/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-elevated text-accent">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-[17px] font-medium tracking-tight text-foreground">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-subtle">
                    {s.pain}
                  </p>
                  <p className="mt-3 border-t border-border pt-3 text-[14px] leading-relaxed text-muted">
                    {s.gain}
                  </p>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-center bg-surface p-7">
              <p className="text-[15px] font-medium tracking-tight text-foreground">
                Seu segmento não está aqui?
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                O Morubi lê a conversa, não o setor. Se o seu time vende
                conversando, provavelmente funciona — e a demonstração resolve
                essa dúvida em 30 minutos.
              </p>
              <Link
                href="/contato"
                className="mt-4 text-[14px] text-accent transition-colors hover:brightness-110"
              >
                Falar com o time →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fit */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid w-full max-w-8xl gap-14 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <h2 className="text-[28px] font-semibold tracking-tight text-foreground">
              O Morubi é para você se…
            </h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {fitYes.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 py-4 text-[15px] leading-relaxed text-subtle"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[28px] font-semibold tracking-tight text-foreground">
              Provavelmente não é se…
            </h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {fitNo.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 py-4 text-[15px] leading-relaxed text-muted"
                >
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-muted" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] leading-relaxed text-muted">
              Preferimos dizer isso antes da reunião do que depois do contrato.
            </p>
          </div>
        </div>
      </section>

      {/* Papéis */}
      <section className="mx-auto w-full max-w-8xl px-6 py-24 lg:px-8">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px] sm:leading-[1.1]">
          Dois usuários, duas entregas diferentes.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <Card key={r.who} className="p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-elevated text-accent">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <h3 className="text-[18px] font-semibold tracking-tight text-foreground">
                    {r.who}
                  </h3>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  {r.body}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {r.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2.5 text-[14px] leading-relaxed text-subtle"
                    >
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-muted">
          As faixas de resultado citadas neste site são referências observadas em
          operações comerciais estruturadas. Resultados variam conforme
          segmento, maturidade do time e ciclo de venda.
        </p>
      </section>

      <Cta />
    </PageShell>
  );
}
