"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Flame,
  Sparkles,
  TriangleAlert,
  Phone,
} from "lucide-react";

const team = [
  { name: "Marina L.", conv: 41, trend: "+6", initials: "ML", tone: "positive" },
  { name: "Rafael A.", conv: 33, trend: "+2", initials: "RA", tone: "positive" },
  { name: "Bruno C.", conv: 19, trend: "−4", initials: "BC", tone: "danger" },
];

export function HeroDashboard() {
  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-tr from-accent/20 via-transparent to-transparent blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
        {/* top bar */}
        <div className="flex items-center justify-between border-b border-border bg-elevated/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-surface px-2.5 py-1 text-[11px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" />
            Ao vivo · hoje
          </div>
          <div className="w-12" />
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {/* Conversion */}
          <div className="rounded-xl border border-border bg-elevated/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-muted">Conversão da equipe</span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-positive/12 px-1.5 py-0.5 text-[11px] font-medium text-positive">
                <ArrowUpRight size={11} /> 8,4%
              </span>
            </div>
            <div className="mt-2 flex items-end gap-1.5">
              <span className="text-3xl font-semibold tracking-tight text-foreground">
                34,2%
              </span>
            </div>
            <Sparkline />
          </div>

          {/* Hot leads */}
          <div className="rounded-xl border border-border bg-elevated/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-muted">Leads quentes</span>
              <Flame size={14} className="text-warning" />
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              27
            </div>
            <div className="mt-3 space-y-1.5">
              <ProbBar label="Alta intenção" value={84} tone="positive" />
              <ProbBar label="Em negociação" value={61} tone="warning" />
            </div>
          </div>

          {/* Team ranking */}
          <div className="rounded-xl border border-border bg-elevated/40 p-4 sm:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[12px] text-muted">Equipe · conversão</span>
              <span className="text-[11px] text-muted">7 dias</span>
            </div>
            <div className="space-y-2.5">
              {team.map((m, i) => (
                <div key={m.name} className="flex items-center gap-3">
                  <span className="text-[11px] tabular-nums text-muted">
                    {i + 1}
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-[11px] font-medium text-subtle">
                    {m.initials}
                  </span>
                  <span className="w-20 text-[13px] text-foreground">
                    {m.name}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.conv * 2}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.1 }}
                      className="h-full rounded-full bg-accent"
                    />
                  </div>
                  <span
                    className={
                      "w-8 text-right text-[12px] tabular-nums " +
                      (m.tone === "danger" ? "text-danger" : "text-positive")
                    }
                  >
                    {m.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating: AI recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 12, x: 12 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute -bottom-6 -left-6 w-[260px] rounded-xl border border-border bg-surface/95 p-3.5 shadow-xl shadow-black/40 backdrop-blur"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/15">
            <Sparkles size={13} className="text-accent" />
          </span>
          <span className="text-[12px] font-medium text-foreground">
            Próxima ação recomendada
          </span>
        </div>
        <p className="mt-2 text-[12.5px] leading-snug text-subtle">
          Lead <span className="text-foreground">Helena M.</span> parou de
          responder há 2 dias. Reabra com prova social, não com desconto.
        </p>
        <div className="mt-2.5 flex items-center gap-2 text-[11px] text-muted">
          <Phone size={12} /> Melhor horário: hoje, 17h40
        </div>
      </motion.div>

      {/* Floating: alert */}
      <motion.div
        initial={{ opacity: 0, y: -12, x: -12 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="absolute -right-5 -top-5 flex items-center gap-2 rounded-lg border border-warning/25 bg-warning/10 px-3 py-2 shadow-lg backdrop-blur"
      >
        <TriangleAlert size={14} className="text-warning" />
        <span className="text-[12px] font-medium text-foreground">
          3 objeções sem resposta
        </span>
      </motion.div>
    </div>
  );
}

function Sparkline() {
  const pts = [8, 10, 7, 12, 11, 15, 14, 18, 17, 22];
  const max = Math.max(...pts);
  const w = 180;
  const h = 40;
  const step = w / (pts.length - 1);
  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-10 w-full" fill="none">
      <path d={d} stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" />
      <path
        d={`${d} L ${w} ${h} L 0 ${h} Z`}
        fill="url(#g)"
        opacity="0.18"
      />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ProbBar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "positive" | "warning";
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-24 text-[11px] text-muted">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
        <div
          className={
            "h-full rounded-full " +
            (tone === "positive" ? "bg-positive" : "bg-warning")
          }
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right text-[11px] tabular-nums text-subtle">
        {value}%
      </span>
    </div>
  );
}
