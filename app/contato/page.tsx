import type { Metadata } from "next";
import Link from "next/link";
import { Mail, CalendarCheck, LifeBuoy, ShieldCheck, Clock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/pages/contact-form";
import { Card } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o time do Morubi: envie sua solicitação pelo formulário, agende uma demonstração ou use os canais diretos de suporte e privacidade.",
  alternates: { canonical: "/contato" },
};

const channels = [
  {
    icon: CalendarCheck,
    title: "Quero ver funcionando",
    body: "Demonstração de 30 minutos com o Morubi lendo uma operação real. Sem compromisso e sem trocar seu CRM.",
    action: { label: "Agendar demonstração →", href: "/#agendar" },
  },
  {
    icon: LifeBuoy,
    title: "Já sou cliente e preciso de suporte",
    body: "Painel travado, leitura de canal quebrada ou dúvida de configuração. Quebra de leitura é tratada como incidente.",
    action: {
      label: "Ver status dos serviços →",
      href: "/status",
    },
  },
  {
    icon: ShieldCheck,
    title: "Assunto de dados e privacidade",
    body: "Exercício de direitos do titular, retenção de dados, contrato de operador e exclusão de informações.",
    action: { label: "Política de Privacidade →", href: "/privacidade" },
  },
];

export default function ContatoPage() {
  return (
    <PageShell
      eyebrow="Contato"
      title="Fale com quem constrói o Morubi."
      subtitle="Sem formulário que cai no vazio e sem fila de atendimento. Escreva o que você precisa e uma pessoa do time responde."
    >
      <section className="mx-auto w-full max-w-8xl px-6 py-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Formulário */}
          <div>
            <h2 className="text-[24px] font-semibold tracking-tight text-foreground">
              Envie sua solicitação
            </h2>
            <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">
              Três campos, nada além disso. Quanto mais específico você for na
              solicitação, mais direta é a resposta.
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Canais */}
          <div>
            <h2 className="text-[24px] font-semibold tracking-tight text-foreground">
              Ou vá direto ao ponto
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Se você já sabe do que precisa, estes são os caminhos mais curtos.
            </p>

            <div className="mt-8 space-y-4">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <Card key={c.title} className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-elevated text-accent">
                        <Icon size={17} strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-[16px] font-medium tracking-tight text-foreground">
                          {c.title}
                        </p>
                        <p className="mt-2 text-[14px] leading-relaxed text-muted">
                          {c.body}
                        </p>
                        <Link
                          href={c.action.href}
                          className="mt-3 inline-block text-[14px] text-accent transition-colors hover:brightness-110"
                        >
                          {c.action.label}
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 divide-y divide-border border-y border-border">
              <div className="flex items-center gap-3 py-4">
                <Mail size={16} className="shrink-0 text-muted" />
                <a
                  href="mailto:contato@morubi.ai"
                  className="text-[15px] text-subtle transition-colors hover:text-foreground"
                >
                  contato@morubi.ai
                </a>
              </div>
              <div className="flex items-center gap-3 py-4">
                <Clock size={16} className="shrink-0 text-muted" />
                <span className="text-[15px] text-subtle">
                  Primeiro retorno em até 4 horas úteis
                </span>
              </div>
            </div>

            <p className="mt-6 text-[14px] leading-relaxed text-muted">
              Ainda com dúvida antes de falar com alguém? A{" "}
              <Link
                href="/ajuda"
                className="text-accent transition-colors hover:brightness-110"
              >
                central de ajuda
              </Link>{" "}
              responde a maior parte das perguntas em um minuto.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
