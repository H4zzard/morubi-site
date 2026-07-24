import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  Settings2,
  BookOpen,
  Chrome,
  LineChart,
  CheckCircle2,
  Clock,
  Users,
  ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Implantação",
  description:
    "Como o Morubi entra na sua operação: demonstração, configuração da empresa, base de conhecimento, ativação do time e acompanhamento até os primeiros resultados.",
  alternates: { canonical: "/implantacao" },
};

const phases = [
  {
    icon: CalendarCheck,
    step: "Etapa 1",
    when: "Dia 0 · 30 minutos",
    title: "Demonstração e diagnóstico",
    body: "Mostramos o Morubi lendo uma conversa real e entendemos a sua operação: canais usados, tamanho do time, processo de venda e onde hoje você perde negócio. Saímos daqui com o escopo da implantação definido.",
    items: [
      "Mapa dos canais onde o time atende",
      "Processo comercial atual, do lead ao fechamento",
      "Definição de quem será o gestor responsável",
    ],
  },
  {
    icon: Settings2,
    step: "Etapa 2",
    when: "Dias 1 a 2",
    title: "Configuração da empresa",
    body: "Criamos a conta da sua empresa e configuramos o essencial: dados da operação, segmento, produtos e serviços, discurso comercial, diferenciais e política de desconto. É o que separa uma recomendação genérica de uma que soa como a sua casa.",
    items: [
      "Conta e acessos do gestor",
      "Cadastro de produtos, serviços e condições",
      "Tom de voz e regras sobre quando falar de preço",
    ],
  },
  {
    icon: BookOpen,
    step: "Etapa 3",
    when: "Dias 2 a 5",
    title: "Base de conhecimento",
    body: "Alimentamos o Morubi com o que os seus melhores vendedores sabem: respostas às objeções mais comuns, argumentos que funcionam, tabelas, materiais e FAQ. Esse acervo deixa de morar na cabeça de duas pessoas e passa a valer para o time inteiro.",
    items: [
      "Objeções recorrentes e como a casa contorna cada uma",
      "Documentos, tabelas e materiais de apoio",
      "Critérios do que é um lead bom para você",
    ],
  },
  {
    icon: Chrome,
    step: "Etapa 4",
    when: "Semana 1",
    title: "Ativação do time",
    body: "Cada vendedor recebe o convite, instala o painel no navegador e faz login com o mesmo acesso. Conduzimos uma sessão ao vivo com o time explicando o que o Morubi faz, o que ele não faz e como corrigir a IA quando ela erra.",
    items: [
      "Convite e instalação assistida por vendedor",
      "Treinamento ao vivo de 45 minutos com o time",
      "Combinação de como marcar ganho, perdido e motivo",
    ],
  },
  {
    icon: LineChart,
    step: "Etapa 5",
    when: "Semanas 2 a 4",
    title: "Calibragem e primeiros números",
    body: "Com o time rodando, revisamos junto com você o que o Morubi está sugerindo, corrigimos o que sair torto e promovemos as melhores correções para a base da empresa. No fim do primeiro mês você tem conversão por vendedor, ranking e os erros mais comuns na mesa.",
    items: [
      "Revisão semanal das sugestões e correções",
      "Curadoria do que vira conhecimento oficial da empresa",
      "Leitura conjunta do primeiro ciclo de dashboards",
    ],
  },
];

const youBring = [
  {
    icon: Users,
    title: "Um responsável",
    body: "Um gestor ou coordenador que conheça o processo comercial e tenha autonomia para decidir o que entra na base de conhecimento.",
  },
  {
    icon: Clock,
    title: "Poucas horas",
    body: "Cerca de 3 a 4 horas do responsável ao longo da primeira semana. O resto do trabalho é nosso.",
  },
  {
    icon: BookOpen,
    title: "O que você já tem",
    body: "Materiais, tabelas e argumentos que já existem. Não precisa produzir conteúdo novo para começar.",
  },
];

const weBring = [
  "Configuração completa da conta e da IA, feita pelo nosso time",
  "Sessão de treinamento ao vivo com vendedores e gestores",
  "Canal direto com o time de implantação durante todo o processo",
  "Revisões semanais no primeiro mês, até a operação estabilizar",
  "Nenhuma troca de CRM, de número ou de ferramenta",
];

export default function ImplantacaoPage() {
  return (
    <PageShell
      eyebrow="Implantação"
      title="Do primeiro contato ao time rodando, em semanas — não em meses."
      subtitle="A implantação do Morubi é assistida de ponta a ponta. Você não recebe um login e um manual: recebe um time acompanhando cada etapa até os números aparecerem."
    >
      {/* Resumo */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-8xl gap-px overflow-hidden px-6 py-12 sm:grid-cols-3 lg:px-8">
          {[
            { k: "Conexão inicial", v: "Minutos" },
            { k: "Time ativo", v: "Semana 1" },
            { k: "Primeiros dashboards", v: "30 dias" },
          ].map((s) => (
            <div key={s.k}>
              <p className="text-[13px] uppercase tracking-wider text-muted">
                {s.k}
              </p>
              <p className="mt-2 text-[28px] font-semibold tracking-tight text-foreground">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Etapas */}
      <section className="mx-auto w-full max-w-8xl px-6 py-24 lg:px-8">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[42px] sm:leading-[1.08]">
          As cinco etapas da implantação.
        </h2>

        <div className="mt-16 space-y-px">
          {phases.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="grid gap-8 border-t border-border py-10 lg:grid-cols-[220px_1fr] lg:gap-16">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-elevated text-accent">
                        <Icon size={17} />
                      </span>
                      <span className="text-[13px] font-medium uppercase tracking-wider text-muted">
                        {p.step}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] text-subtle">{p.when}</p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-semibold tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                      {p.body}
                    </p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {p.items.map((it) => (
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
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Divisão de trabalho */}
      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-8xl gap-14 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <h2 className="text-[28px] font-semibold tracking-tight text-foreground">
              O que precisamos de você
            </h2>
            <div className="mt-8 space-y-4">
              {youBring.map((y) => {
                const Icon = y.icon;
                return (
                  <Card key={y.title} className="p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-elevated text-accent">
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="text-[15px] font-medium text-foreground">
                          {y.title}
                        </p>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                          {y.body}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-[28px] font-semibold tracking-tight text-foreground">
              O que fica por nossa conta
            </h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {weBring.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-3 py-4 text-[15px] leading-relaxed text-subtle"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  {w}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border bg-surface/60 p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-elevated text-accent">
                <ShieldCheck size={16} />
              </span>
              <p className="text-[14px] leading-relaxed text-muted">
                Todo acesso concedido durante a implantação segue o princípio do
                menor privilégio, com credenciais cifradas e isolamento por
                empresa. Os detalhes estão na{" "}
                <Link
                  href="/privacidade"
                  className="text-accent transition-colors hover:brightness-110"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </PageShell>
  );
}
