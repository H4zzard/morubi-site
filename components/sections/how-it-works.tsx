"use client";

import { Plug, Radar, TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    icon: Plug,
    n: "01",
    title: "Conecte",
    desc: "Ligue seu WhatsApp e seu CRM em minutos. Nada muda para o vendedor, ele continua vendendo do jeito que já vende.",
  },
  {
    icon: Radar,
    n: "02",
    title: "O Morubi acompanha",
    desc: "Cada conversa é lida em tempo real: estágio da venda, intenção do lead, objeções e a próxima ação certa para o vendedor.",
  },
  {
    icon: TrendingUp,
    n: "03",
    title: "Sua equipe vende mais",
    desc: "Menos negócios esfriam, follow-ups deixam de ser esquecidos e o gestor enxerga onde cada venda é ganha ou perdida.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona">
      <SectionHeading
        eyebrow="Como funciona"
        title="Três passos. Nenhum atrito na operação."
        subtitle="Você não troca de ferramenta nem muda a rotina do time. O Morubi entra por cima do que já existe."
        align="center"
        className="mx-auto"
      />

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface/50 p-7 transition-colors hover:border-border/80 hover:bg-surface">
              <div className="pointer-events-none absolute right-5 top-4 text-6xl font-semibold tracking-tight text-elevated/80">
                {s.n}
              </div>
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-elevated text-accent">
                <s.icon size={20} strokeWidth={1.7} />
              </span>
              <h3 className="relative mt-6 text-lg font-medium tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="relative mt-2.5 text-[15px] leading-relaxed text-muted">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
