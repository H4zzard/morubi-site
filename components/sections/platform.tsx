"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Flame,
  Trophy,
  Users,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const ranking = [
  { name: "Marina Lopes", conv: 41, deals: 18, initials: "ML" },
  { name: "Rafael Alves", conv: 33, deals: 14, initials: "RA" },
  { name: "Carla Nunes", conv: 29, deals: 11, initials: "CN" },
  { name: "Bruno Costa", conv: 19, deals: 7, initials: "BC" },
];

const mistakes = [
  { label: "Falou de preço cedo demais", pct: 32 },
  { label: "Follow-up perdido", pct: 24 },
  { label: "Ignorou sinal de compra", pct: 19 },
];

const risk = [
  { name: "Helena M.", reason: "Sem resposta há 2 dias", prob: 38 },
  { name: "Grupo Vega", reason: "Objeção de preço aberta", prob: 44 },
];

export function Platform() {
  return (
    <Section id="plataforma" className="border-t border-border">
      <SectionHeading
        eyebrow="A plataforma"
        title="A operação comercial inteira em uma tela."
        subtitle="Não é mais um relatório para você montar. É a leitura pronta de onde a receita está, e onde está escapando."
        align="center"
        className="mx-auto"
      />

      <Reveal className="mt-14">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
          {/* app chrome */}
          <div className="flex items-center justify-between border-b border-border bg-elevated/40 px-4 py-2.5">
            <div className="flex items-center gap-2 text-[12px] text-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-3">Morubi · Visão do gestor</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-positive" />
              Atualizado agora
            </div>
          </div>

          <div className="grid gap-3 p-3 sm:p-4 lg:grid-cols-12">
            {/* KPIs row */}
            <Kpi
              className="lg:col-span-3"
              label="Conversão"
              value="34,2%"
              delta="+8,4%"
              positive
              icon={TrendingUp}
            />
            <Kpi
              className="lg:col-span-3"
              label="Receita projetada"
              value="R$ 412k"
              delta="+12%"
              positive
              icon={TrendingUp}
            />
            <Kpi
              className="lg:col-span-3"
              label="Leads quentes"
              value="27"
              delta="8 novos"
              icon={Flame}
            />
            <Kpi
              className="lg:col-span-3"
              label="Vendas em risco"
              value="R$ 63k"
              delta="5 negócios"
              danger
              icon={TriangleAlert}
            />

            {/* Ranking */}
            <Panel className="lg:col-span-5" title="Ranking de vendedores" icon={Trophy}>
              <div className="space-y-3">
                {ranking.map((m, i) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <span className="w-4 text-[12px] tabular-nums text-muted">
                      {i + 1}
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-elevated text-[11px] font-medium text-subtle">
                      {m.initials}
                    </span>
                    <span className="w-28 truncate text-[13px] text-foreground">
                      {m.name}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-elevated">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.conv * 2.2}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                    <span className="w-10 text-right text-[12px] tabular-nums text-subtle">
                      {m.conv}%
                    </span>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Common mistakes */}
            <Panel className="lg:col-span-4" title="Erros mais comuns" icon={TriangleAlert}>
              <div className="space-y-3.5">
                {mistakes.map((m) => (
                  <div key={m.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[12.5px] text-foreground">
                        {m.label}
                      </span>
                      <span className="text-[12px] tabular-nums text-muted">
                        {m.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-elevated">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.pct * 2.4}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-warning/80"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* AI insight */}
            <Panel
              className="lg:col-span-3 border-accent/25 bg-accent/[0.06]"
              title="Insight do Morubi"
              icon={Sparkles}
              accent
            >
              <p className="text-[13px] leading-relaxed text-subtle">
                A conversão cai <span className="text-foreground">31%</span>{" "}
                quando o time fala de preço antes do 3º contato. Priorize o
                diferencial primeiro.
              </p>
              <button className="mt-3 text-[12.5px] font-medium text-accent hover:underline">
                Ver plano de coaching →
              </button>
            </Panel>

            {/* Leads at risk */}
            <Panel className="lg:col-span-7" title="Leads em risco" icon={TriangleAlert}>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {risk.map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-elevated/40 px-3 py-2.5"
                  >
                    <div>
                      <p className="text-[13px] font-medium text-foreground">
                        {r.name}
                      </p>
                      <p className="text-[11.5px] text-muted">{r.reason}</p>
                    </div>
                    <span className="rounded-full bg-danger/12 px-2 py-0.5 text-[11px] font-medium text-danger">
                      {r.prob}%
                    </span>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Team activity */}
            <Panel className="lg:col-span-5" title="Equipe ativa" icon={Users}>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-foreground">
                    9<span className="text-muted">/12</span>
                  </p>
                  <p className="text-[12px] text-muted">vendedores online</p>
                </div>
                <div className="flex items-end gap-1">
                  {[40, 62, 48, 75, 58, 82, 70].map((h, i) => (
                    <motion.span
                      key={i}
                      initial={{ height: 4 }}
                      whileInView={{ height: h * 0.5 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="w-3 rounded-sm bg-accent/70"
                    />
                  ))}
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Kpi({
  label,
  value,
  delta,
  positive,
  danger,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  danger?: boolean;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-xl border border-border bg-elevated/40 p-4 " + (className ?? "")
      }
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-muted">{label}</span>
        <Icon
          size={14}
          className={danger ? "text-danger" : positive ? "text-positive" : "text-warning"}
        />
      </div>
      <div className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </div>
      <div
        className={
          "mt-0.5 text-[12px] " +
          (danger ? "text-danger" : positive ? "text-positive" : "text-muted")
        }
      >
        {delta}
      </div>
    </div>
  );
}

function Panel({
  title,
  icon: Icon,
  accent,
  className,
  children,
}: {
  title: string;
  icon: React.ElementType;
  accent?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "rounded-xl border border-border bg-elevated/30 p-4 " + (className ?? "")
      }
    >
      <div className="mb-3.5 flex items-center gap-2">
        <Icon size={14} className={accent ? "text-accent" : "text-muted"} />
        <span className="text-[12.5px] font-medium text-foreground">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
