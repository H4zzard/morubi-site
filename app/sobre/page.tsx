import type { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  HandHeart,
  Layers,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Por que o Morubi existe, no que acreditamos e como trabalhamos: inteligência comercial que roda ao lado do vendedor, sem substituir ninguém e sem trocar o seu CRM.",
  alternates: { canonical: "/sobre" },
};

const beliefs = [
  {
    icon: HandHeart,
    title: "A venda continua humana",
    body: "Quem conversa com o cliente é o vendedor. Sempre. O Morubi não envia mensagem, não finge ser gente e não entra na frente de ninguém. Ele trabalha ao lado — como um gerente que estivesse olhando por cima do ombro, na hora certa, sem atrapalhar.",
  },
  {
    icon: Eye,
    title: "Controle não é vigilância",
    body: "O gestor precisa enxergar a operação inteira, mas o objetivo é treinar, não punir. Por isso a leitura do Morubi vira coaching individual e erro recorrente identificado — não um relatório para constranger vendedor em reunião.",
  },
  {
    icon: Layers,
    title: "Ninguém deveria trocar de sistema para ganhar inteligência",
    body: "Migração de CRM é cara, demorada e costuma matar o projeto antes dele provar valor. O Morubi roda por cima do que a empresa já usa. Se amanhã você trocar de ferramenta, ele continua funcionando.",
  },
  {
    icon: Sparkles,
    title: "Errar é aceitável; insistir no erro não",
    body: "Interpretação automática de conversa erra. O que não pode é errar duas vezes igual. Quando a recomendação sai torta, o vendedor corrige ali mesmo e aquilo fica registrado. O gestor decide o que vira conhecimento oficial da casa.",
  },
  {
    icon: ShieldCheck,
    title: "Dado de cliente não é matéria-prima nossa",
    body: "O conteúdo das conversas pertence à empresa que nos contrata. Cifrado, isolado por empresa e nunca usado para treinar modelos de uso geral. O que uma operação alimenta não escorre para outra.",
  },
];

const notThis = [
  {
    label: "Não é um chatbot",
    body: "Não respondemos o cliente final. Nenhuma mensagem sai pelo seu canal por conta do Morubi.",
  },
  {
    label: "Não é um CRM",
    body: "Não queremos ser o lugar onde você cadastra lead. Queremos ser a inteligência que roda em cima dele.",
  },
  {
    label: "Não é um dashboard bonito",
    body: "Gráfico que ninguém age em cima é decoração. Todo número no Morubi aponta para uma ação.",
  },
  {
    label: "Não é substituto de vendedor",
    body: "Quem fecha continua sendo o time. O Morubi só faz o time bom parecer com o melhor vendedor da casa.",
  },
];

const howWeWork = [
  {
    k: "Implantação assistida, sempre",
    v: "Nenhum cliente recebe um login e um manual. Configuramos a operação junto, treinamos o time ao vivo e acompanhamos o primeiro mês.",
  },
  {
    k: "Escopo travado, entrega rápida",
    v: "Preferimos poucas coisas funcionando de verdade a muitas pela metade. Copiloto em tempo real, áudio e dashboards vieram primeiro; o resto entra quando estiver pronto.",
  },
  {
    k: "Roadmap puxado por cliente",
    v: "Quais canais e sistemas ganham suporte primeiro é decidido pela demanda real de quem já usa, não por lista de features de concorrente.",
  },
  {
    k: "Nada de vender tecnologia",
    v: "Você não compra modelo, prompt nem integração. Compra mais conversão, mais controle e um mês que deixa de ser aposta.",
  },
];

export default function SobrePage() {
  return (
    <PageShell
      eyebrow="Sobre"
      title="A venda não se perde no fim do mês. Ela se perde conversa por conversa."
      subtitle="O Morubi nasceu de uma constatação simples: quando o relatório chega, já é tarde. O gestor descobre o problema no fechamento, e o negócio que dava para salvar esfriou três semanas antes."
    >
      {/* Por que existimos */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-8xl gap-14 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px] sm:leading-[1.1]">
            Por que o Morubi existe.
          </h2>

          <div className="space-y-5 text-[16px] leading-relaxed text-muted">
            <p>
              Toda operação comercial tem o mesmo gargalo: um gestor não
              consegue acompanhar todas as conversas de todos os vendedores. Ele
              acompanha três, talvez cinco. As outras noventa passam sem ninguém
              olhar.
            </p>
            <p>
              O resultado é conhecido. Follow-up esquecido. Objeção respondida
              de qualquer jeito porque o vendedor não lembrou o argumento certo.
              Vendedor novo levando meses para rampar. E o conhecimento que
              realmente fecha negócio morando na cabeça de duas ou três pessoas
              — que um dia saem da empresa e levam tudo junto.
            </p>
            <p>
              <span className="text-foreground">
                O Morubi é a resposta a isso.
              </span>{" "}
              Um gerente comercial que consegue estar em todas as conversas ao
              mesmo tempo: lê o que está acontecendo agora, calcula a chance de
              fechar, aponta a próxima ação e mostra ao gestor onde a operação
              ganha ou perde dinheiro — enquanto ainda dá para agir.
            </p>
            <p>
              Não porque tecnologia seja o ponto. Porque o time já está tentando
              acertar, e ninguém está do lado dele na hora que importa.
            </p>
          </div>
        </div>
      </section>

      {/* Princípios */}
      <section className="mx-auto w-full max-w-8xl px-6 py-24 lg:px-8">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px] sm:leading-[1.1]">
          No que acreditamos.
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
          São decisões de produto, não frase de parede. Cada uma delas nos custa
          alguma coisa — e é por isso que valem.
        </p>

        <div className="mt-14 space-y-px">
          {beliefs.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 0.04}>
                <div className="grid gap-6 border-t border-border py-9 lg:grid-cols-[64px_1fr] lg:gap-10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-elevated text-accent">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="text-[20px] font-semibold tracking-tight text-foreground">
                      {b.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">
                      {b.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* O que não somos */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto w-full max-w-8xl px-6 py-24 lg:px-8">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px] sm:leading-[1.1]">
            E o que o Morubi não é.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            Dizer o que não somos economiza o tempo de todo mundo — inclusive o
            seu, se não formos o que você procura.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {notThis.map((n) => (
              <Card key={n.label} className="p-6">
                <div className="flex items-start gap-3">
                  <XCircle size={17} className="mt-0.5 shrink-0 text-muted" />
                  <div>
                    <p className="text-[16px] font-medium tracking-tight text-foreground">
                      {n.label}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                      {n.body}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como trabalhamos */}
      <section className="mx-auto w-full max-w-8xl px-6 py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[40px] sm:leading-[1.1]">
              Como trabalhamos.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Quer ver de perto? A{" "}
              <Link
                href="/implantacao"
                className="text-accent transition-colors hover:brightness-110"
              >
                página de implantação
              </Link>{" "}
              mostra etapa por etapa como o Morubi entra em uma operação.
            </p>
          </div>

          <dl className="divide-y divide-border border-y border-border">
            {howWeWork.map((h) => (
              <div key={h.k} className="py-6">
                <dt className="text-[16px] font-medium tracking-tight text-foreground">
                  {h.k}
                </dt>
                <dd className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {h.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Cta />
    </PageShell>
  );
}
