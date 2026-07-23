"use client";

import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const features = [
  "Acompanha todas as conversas",
  "Escuta e entende áudios",
  "Detecta objeções em tempo real",
  "Aponta a próxima melhor ação",
  "Calcula a probabilidade de fechamento",
  "Resumo automático de cada negociação",
  "Coaching individual diário",
  "Ranking de vendedores",
  "Busca respostas na base de conhecimento",
  "Sugere o melhor momento para ligar",
  "Integra com seu CRM",
  "Integra com seu ERP",
];

export function Features() {
  return (
    <Section id="recursos">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHeading
          eyebrow="O que ele faz"
          title="Um gerente comercial não dorme. Este também não."
          subtitle="Tudo o que um bom gestor faria em cada conversa se pudesse estar em todas, o tempo inteiro."
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f} delay={(i % 6) * 0.05}>
              <div className="flex items-center gap-3 border-b border-border py-3.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="text-[15px] tracking-tight text-foreground">
                  {f}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
