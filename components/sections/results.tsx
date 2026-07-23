"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Eye,
  ShieldX,
  GraduationCap,
  Gauge,
  LineChart,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const results = [
  {
    icon: TrendingUp,
    metric: "+34%",
    title: "Mais conversões",
    desc: "A ação certa na hora certa transforma conversas que antes esfriavam em vendas fechadas.",
  },
  {
    icon: Eye,
    metric: "100%",
    title: "Controle da operação",
    desc: "Cada negociação visível. O gestor deixa de depender do que o vendedor decide contar.",
  },
  {
    icon: ShieldX,
    metric: "−41%",
    title: "Menos vendas perdidas",
    desc: "Objeções respondidas na hora e follow-ups que não caem no esquecimento.",
  },
  {
    icon: GraduationCap,
    metric: "Diário",
    title: "Treinamento automático",
    desc: "Cada vendedor recebe coaching baseado nas próprias conversas, sem depender da agenda do gestor.",
  },
  {
    icon: Gauge,
    metric: "+27%",
    title: "Equipe mais produtiva",
    desc: "O time foca nos leads certos, no momento certo, em vez de reagir no escuro.",
  },
  {
    icon: LineChart,
    metric: "Semanal",
    title: "Previsibilidade real",
    desc: "Projeção de fechamento por lead e por vendedor. O mês deixa de ser uma aposta.",
  },
];

export function Results() {
  return (
    <Section id="resultados">
      <SectionHeading
        eyebrow="O que muda"
        title="Você não compra uma ferramenta. Compra um resultado comercial."
        subtitle="O time continua o mesmo. O que muda é quanto ele fecha e o quanto você enxerga."
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {results.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group bg-surface p-7 transition-colors hover:bg-elevated/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-elevated text-accent">
                <r.icon size={18} strokeWidth={1.7} />
              </span>
              <span className="text-2xl font-semibold tracking-tight text-foreground">
                {r.metric}
              </span>
            </div>
            <h3 className="mt-5 text-[16px] font-medium tracking-tight text-foreground">
              {r.title}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              {r.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-6 text-center text-[12.5px] text-muted">
          Faixas de referência observadas em operações comerciais estruturadas.
          Resultados variam conforme segmento, maturidade do time e ciclo de
          venda.
        </p>
      </Reveal>
    </Section>
  );
}
