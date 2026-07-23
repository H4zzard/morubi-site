"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircle, TrendingUp, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export function Realtime() {
  return (
    <Section id="tempo-real" className="border-t border-border bg-surface/30">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          eyebrow="Em tempo real"
          title="No segundo em que a venda pode virar, o vendedor sabe o que fazer."
          subtitle="Uma negociação real, do sinal de risco à venda ganha, com o Morubi agindo no meio da conversa, não depois dela."
        />

        <Reveal>
          <div className="relative rounded-2xl border border-border bg-surface p-5 sm:p-7">
            <div className="absolute left-[34px] top-10 bottom-10 w-px bg-border sm:left-[42px]" />

            <Step
              delay={0}
              icon={MessageCircle}
              tone="neutral"
              actor="Cliente"
            >
              <Bubble>"Tem desconto? Tô vendo outra proposta mais barata."</Bubble>
            </Step>

            <Step delay={0.15} icon={Sparkles} tone="accent" actor="Morubi">
              <div className="rounded-xl border border-warning/25 bg-warning/[0.07] p-3.5">
                <p className="text-[13.5px] font-medium text-foreground">
                  ⚠ Não fale de desconto agora.
                </p>
                <p className="mt-1 text-[13px] leading-snug text-subtle">
                  Ele está comparando preço porque não enxergou o diferencial.
                  Reforce o suporte dedicado e o prazo de entrega antes de tocar
                  em valor.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[11px] text-muted">
                    Chance de fechamento
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-elevated">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "84%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full bg-positive"
                    />
                  </div>
                  <span className="text-[13px] font-semibold tabular-nums text-positive">
                    84%
                  </span>
                </div>
              </div>
            </Step>

            <Step delay={0.3} icon={MessageCircle} tone="neutral" actor="Vendedor">
              <Bubble>
                "Entendo. Antes do valor: você teria um gerente de conta só seu e
                entrega em 7 dias. É isso que a outra proposta não cobre."
              </Bubble>
            </Step>

            <Step delay={0.45} icon={TrendingUp} tone="accent" actor="Morubi">
              <p className="text-[13px] text-subtle">
                Sinal de compra detectado · probabilidade{" "}
                <span className="font-semibold text-positive">91%</span>
              </p>
            </Step>

            <Step delay={0.6} icon={CheckCircle2} tone="positive" actor="Resultado" last>
              <div className="inline-flex items-center gap-2 rounded-full border border-positive/25 bg-positive/10 px-3.5 py-1.5">
                <CheckCircle2 size={15} className="text-positive" />
                <span className="text-[13.5px] font-medium text-foreground">
                  Venda ganha — sem dar desconto
                </span>
              </div>
            </Step>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Step({
  icon: Icon,
  tone,
  actor,
  delay,
  last,
  children,
}: {
  icon: React.ElementType;
  tone: "neutral" | "accent" | "positive";
  actor: string;
  delay: number;
  last?: boolean;
  children: React.ReactNode;
}) {
  const toneMap = {
    neutral: "border-border bg-elevated text-muted",
    accent: "border-accent/30 bg-accent/15 text-accent",
    positive: "border-positive/30 bg-positive/15 text-positive",
  } as const;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={"relative flex gap-4 " + (last ? "" : "pb-6")}
    >
      <span
        className={
          "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border " +
          toneMap[tone]
        }
      >
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">
          {actor}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block rounded-xl rounded-tl-sm border border-border bg-elevated/60 px-3.5 py-2.5 text-[13.5px] leading-snug text-foreground">
      {children}
    </div>
  );
}
