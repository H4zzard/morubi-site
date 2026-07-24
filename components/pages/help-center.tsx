"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Rocket,
  Chrome,
  BrainCircuit,
  BarChart3,
  Users,
  ShieldCheck,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { openCalendly } from "@/lib/calendly";

type Article = { q: string; a: string };
type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  articles: Article[];
};

const categories: Category[] = [
  {
    id: "primeiros-passos",
    label: "Primeiros passos",
    icon: Rocket,
    blurb: "Do primeiro acesso ao time inteiro rodando.",
    articles: [
      {
        q: "Como começo a usar o Morubi?",
        a: "Tudo começa por uma demonstração. Nela entendemos sua operação, seus canais e seu processo de vendas. Depois criamos a conta da sua empresa, configuramos o gestor como primeiro usuário e conduzimos a implantação assistida junto com o seu time.",
      },
      {
        q: "Quem deve ter acesso: gestor ou vendedor?",
        a: "Os dois, com papéis diferentes. O gestor configura a operação, alimenta a base de conhecimento e acompanha os dashboards. O vendedor usa o painel no dia a dia, dentro do navegador, ao lado da conversa que está atendendo. Cada vendedor tem conta individual.",
      },
      {
        q: "Como convido meus vendedores?",
        a: "No painel do gestor, em Vendedores, você envia o convite por e-mail. O vendedor cria a senha, instala a extensão e faz login com o mesmo acesso. A partir daí o painel já puxa o contexto da sua empresa e o perfil daquele vendedor.",
      },
      {
        q: "Preciso trocar de CRM ou de ferramenta?",
        a: "Não. O Morubi roda por cima do que a sua empresa já usa. Ele lê o que acontece nas conversas e devolve inteligência para a operação, sem exigir migração de sistema.",
      },
    ],
  },
  {
    id: "extensao",
    label: "Extensão e canais",
    icon: Chrome,
    blurb: "O painel que abre ao lado da conversa.",
    articles: [
      {
        q: "Onde o painel do Morubi aparece?",
        a: "Em um painel lateral do navegador, ao lado da aba onde o vendedor está atendendo. Ele lê a conversa aberta, entende o contexto e mostra a probabilidade de fechamento, a sugestão de resposta e como contornar a objeção do momento.",
      },
      {
        q: "Quais canais são suportados?",
        a: "O foco inicial é WhatsApp Web e os CRMs mais usados pelos nossos clientes. O painel foi desenhado para ler a conversa que estiver aberta na aba; quando encontra um layout que ainda não conhece, ele avisa em vez de adivinhar.",
      },
      {
        q: "O Morubi responde o cliente sozinho?",
        a: "Não, e isso é proposital. O Morubi não envia mensagem nenhuma pelo seu canal. Ele sugere; quem decide e envia é sempre o vendedor. A relação com o cliente continua humana.",
      },
      {
        q: "E os áudios do WhatsApp?",
        a: "São transcritos e entram no raciocínio do painel como qualquer outra mensagem. Enquanto o áudio está sendo processado, o vendedor vê o aviso no painel.",
      },
      {
        q: "O painel deixa meu navegador lento?",
        a: "Não deve. A leitura da conversa é leve e roda em segundo plano, sem interferir na aba principal. Se você perceber qualquer degradação, fale com o suporte: é tratado como incidente.",
      },
    ],
  },
  {
    id: "base-conhecimento",
    label: "Base de conhecimento",
    icon: BrainCircuit,
    blurb: "O que o Morubi sabe sobre a sua empresa.",
    articles: [
      {
        q: "O que devo colocar na base de conhecimento?",
        a: "Tudo o que um vendedor bom precisa saber: produtos e serviços, diferenciais, discurso comercial, política de desconto, respostas às objeções mais comuns, tabelas e materiais de apoio. Aceita texto e upload de documentos.",
      },
      {
        q: "E quando o Morubi erra alguma informação?",
        a: "O vendedor corrige ali mesmo, no painel. A correção fica registrada e passa a valer para aquele vendedor. O gestor pode revisar as correções relevantes e promovê-las para a base da empresa, para valer para todo mundo.",
      },
      {
        q: "O Morubi aprende com o tempo?",
        a: "Sim. Ele cruza o que foi sugerido com o que de fato fechou, e ajusta as recomendações. Cada vendedor tem memória própria, além da base compartilhada da empresa.",
      },
      {
        q: "Consigo ajustar o tom das sugestões?",
        a: "Sim. Nas configurações da IA o gestor define tom, o quanto a sugestão deve ser agressiva e quando o Morubi pode falar de preço.",
      },
    ],
  },
  {
    id: "dashboards",
    label: "Dashboards e métricas",
    icon: BarChart3,
    blurb: "Como ler os números da operação.",
    articles: [
      {
        q: "Quais números o gestor acompanha?",
        a: "Conversão geral e por vendedor, volume de atendimentos, ganhos e perdidos por período, ranking do time, evolução no tempo e leads quentes ou em risco com probabilidade.",
      },
      {
        q: "O que são os erros mais comuns?",
        a: "É a leitura do Morubi sobre os atendimentos: falar de preço cedo demais, follow-up perdido, sinal de compra ignorado. Aparecem agregados por time e detalhados por vendedor, para virar coaching e não só relatório.",
      },
      {
        q: "Como o resultado de uma venda entra no sistema?",
        a: "O atendimento é marcado como ganho, perdido ou em aberto, com o motivo. É isso que alimenta os dashboards e o aprendizado do Morubi. O envio automático para o ERP está no roteiro de evolução.",
      },
      {
        q: "Um vendedor vê os dados dos outros?",
        a: "Não. O vendedor vê apenas os próprios dados. A visão do time inteiro é do gestor.",
      },
    ],
  },
  {
    id: "conta",
    label: "Conta e cobrança",
    icon: Users,
    blurb: "Assinatura, assentos e acessos.",
    articles: [
      {
        q: "Como funciona a cobrança?",
        a: "Por vendedor ativo, mensal. O custo de processamento já está incluído: você não precisa contratar nem configurar nada de IA por fora.",
      },
      {
        q: "E se meu time crescer ou diminuir no meio do mês?",
        a: "Basta ativar ou desativar vendedores no painel do gestor. A cobrança acompanha os assentos ativos, e o ajuste aparece no ciclo seguinte.",
      },
      {
        q: "Como recupero minha senha?",
        a: "Pela tela de login, em Esqueci minha senha. O link chega no e-mail cadastrado. Ao trocar a senha, as sessões abertas na extensão são encerradas por segurança.",
      },
      {
        q: "Como cancelo?",
        a: "Escrevendo para contato@morubi.ai. Não há multa por cancelamento, e você pode solicitar a exclusão dos dados da sua empresa junto com o encerramento.",
      },
    ],
  },
  {
    id: "seguranca",
    label: "Segurança e dados",
    icon: ShieldCheck,
    blurb: "Como tratamos as conversas da sua operação.",
    articles: [
      {
        q: "Onde ficam as conversas que o Morubi lê?",
        a: "Em infraestrutura em nuvem sob nossa gestão, cifradas em trânsito e em repouso, com isolamento estrito por empresa. Nenhum cliente acessa dados de outro.",
      },
      {
        q: "Quem é dono dos dados?",
        a: "A sua empresa. O Morubi atua como operador: tratamos os dados para entregar o serviço, seguindo as suas instruções e a LGPD. Os detalhes estão na Política de Privacidade.",
      },
      {
        q: "Consigo apagar os dados?",
        a: "Sim. Você pode solicitar exclusão de dados a qualquer momento pelo canal de privacidade, e definimos junto com você a política de retenção adequada à sua operação.",
      },
    ],
  },
];

export function HelpCenter() {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<string>(categories[0].id);
  const [open, setOpen] = React.useState<string | null>(
    categories[0].articles[0].q,
  );

  const normalized = query.trim().toLowerCase();
  const searching = normalized.length > 1;

  const visible = React.useMemo(() => {
    if (!searching) {
      return categories.filter((c) => c.id === active);
    }
    return categories
      .map((c) => ({
        ...c,
        articles: c.articles.filter(
          (a) =>
            a.q.toLowerCase().includes(normalized) ||
            a.a.toLowerCase().includes(normalized),
        ),
      }))
      .filter((c) => c.articles.length > 0);
  }, [active, normalized, searching]);

  return (
    <>
      <div className="mx-auto w-full max-w-8xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* Navegação lateral */}
          <div>
            <label className="relative block">
              <Search
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar na central"
                aria-label="Buscar na central de ajuda"
                className="h-11 w-full rounded-lg border border-border bg-surface/60 pl-10 pr-3 text-[14px] text-foreground placeholder:text-muted focus-visible:border-accent/50 focus-visible:outline-none"
              />
            </label>

            <nav className="mt-6 flex flex-col gap-1" aria-label="Categorias">
              {categories.map((c) => {
                const Icon = c.icon;
                const isActive = !searching && c.id === active;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setQuery("");
                      setActive(c.id);
                      setOpen(c.articles[0].q);
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors",
                      isActive
                        ? "bg-elevated text-foreground"
                        : "text-subtle hover:bg-elevated/60 hover:text-foreground",
                    )}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-accent" : "text-muted"}
                    />
                    {c.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 rounded-2xl border border-border bg-surface/60 p-5">
              <p className="text-[14px] font-medium text-foreground">
                Não achou a resposta?
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Todo cliente Morubi tem um canal direto com o time de
                implantação.
              </p>
              <a
                href="mailto:contato@morubi.ai"
                className="mt-4 inline-block text-[13px] text-accent transition-colors hover:brightness-110"
              >
                contato@morubi.ai →
              </a>
            </div>
          </div>

          {/* Artigos */}
          <div>
            {searching && (
              <p className="mb-6 text-[14px] text-muted">
                {visible.reduce((n, c) => n + c.articles.length, 0)} resultado(s)
                para <span className="text-foreground">“{query}”</span>
              </p>
            )}

            {visible.length === 0 && (
              <div className="rounded-2xl border border-border bg-surface/60 p-8 text-center">
                <p className="text-[15px] text-foreground">
                  Nenhum artigo encontrado.
                </p>
                <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
                  Escreva para contato@morubi.ai e respondemos a sua dúvida
                  diretamente.
                </p>
              </div>
            )}

            {visible.map((c) => (
              <div key={c.id} className="mb-12 last:mb-0">
                <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
                  {c.label}
                </h2>
                <p className="mt-1.5 text-[15px] text-muted">{c.blurb}</p>

                <div className="mt-6 divide-y divide-border border-t border-border">
                  {c.articles.map((a) => {
                    const isOpen = open === a.q;
                    return (
                      <div key={a.q}>
                        <button
                          onClick={() => setOpen(isOpen ? null : a.q)}
                          className="flex w-full items-center justify-between gap-4 py-5 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="text-[16px] font-medium tracking-tight text-foreground">
                            {a.q}
                          </span>
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-transform duration-300",
                              isOpen && "rotate-45 text-accent",
                            )}
                          >
                            <Plus size={15} />
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">
                                {a.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="border-t border-border">
        <div className="mx-auto flex w-full max-w-8xl flex-col items-start justify-between gap-6 px-6 py-16 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-[24px] font-semibold tracking-tight text-foreground">
              Prefere ver funcionando?
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
              Em 30 minutos mostramos o Morubi lendo uma operação real e
              respondemos qualquer dúvida que ficou.
            </p>
          </div>
          <Button size="lg" onClick={openCalendly} className="shrink-0">
            Agendar demonstração
          </Button>
        </div>
      </section>
    </>
  );
}
