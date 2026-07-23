"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const rows = [
  {
    problem: "O gestor não consegue acompanhar todas as conversas.",
    solution: "Toda a operação em um painel, com alertas do que exige atenção agora.",
  },
  {
    problem: "Vendedores esquecem o follow-up e o negócio esfria.",
    solution: "O Morubi lembra o vendedor da hora certa de retomar cada lead.",
  },
  {
    problem: "Objeções mal respondidas derrubam a conversão.",
    solution: "A objeção é detectada e a melhor resposta aparece na hora.",
  },
  {
    problem: "Treinar um vendedor novo leva meses.",
    solution: "Coaching individual diário, baseado nas conversas reais de cada um.",
  },
  {
    problem: "O mês fecha sem previsibilidade nenhuma.",
    solution: "Probabilidade de fechamento por lead e projeção da equipe em tempo real.",
  },
];

export function Problems() {
  return (
    <Section id="problemas" className="border-y border-border bg-surface/30">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          eyebrow="O problema"
          title={
            <>
              A venda não se perde no fim do mês. Ela se perde{" "}
              <span className="text-muted">conversa por conversa.</span>
            </>
          }
          subtitle="E quando o relatório chega, já é tarde. O Morubi age no momento em que a venda ainda pode ser salva."
        />

        <div className="flex flex-col">
          {rows.map((r, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="grid grid-cols-1 items-center gap-3 border-t border-border py-5 sm:grid-cols-[1fr_auto_1fr]">
                <p className="text-[15px] leading-snug text-muted line-through decoration-danger/40 decoration-1">
                  {r.problem}
                </p>
                <motion.span className="hidden text-muted sm:block">
                  <ArrowRight size={16} />
                </motion.span>
                <p className="text-[15px] font-medium leading-snug text-foreground">
                  {r.solution}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
