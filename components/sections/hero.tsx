"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroDashboard } from "@/components/hero-dashboard";
import { openCalendly } from "@/lib/calendly";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="relative mx-auto w-full max-w-8xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div className="max-w-xl">
            <motion.a
              href="#como-funciona"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-[13px] text-subtle transition-colors hover:text-foreground"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Acompanhamento comercial em tempo real
            </motion.a>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="mt-6 text-balance text-[42px] font-semibold leading-[1.04] tracking-tight text-foreground sm:text-[58px]"
            >
              Um gerente comercial que{" "}
              <span className="text-gradient">acompanha cada venda</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
              className="mt-6 text-pretty text-[18px] leading-relaxed text-muted"
            >
              O Morubi acompanha as conversas da sua equipe no WhatsApp e no CRM,
              aponta a próxima ação certa em cada negociação e mostra onde cada
              vendedor perde vendas antes do fim do mês.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button size="lg" onClick={openCalendly}>
                Agendar demonstração
                <ArrowRight size={17} />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => go("#como-funciona")}>
                <Play size={15} />
                Ver como funciona
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-6 flex items-center gap-2 text-[13px] text-muted"
            >
              <ShieldCheck size={15} className="text-subtle" />
              Implantação assistida · Sem trocar seu CRM · Dados isolados por
              empresa
            </motion.p>
          </div>

          {/* Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="relative"
          >
            <HeroDashboard />
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 border-t border-border pt-8"
        >
          <p className="text-center text-[13px] uppercase tracking-[0.18em] text-muted">
            Operações comerciais que exigem previsibilidade
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-subtle/70">
            {["Clínicas", "Imobiliárias", "Energia solar", "Educação", "Consórcios", "Franquias"].map(
              (s) => (
                <span key={s} className="text-[15px] font-medium tracking-tight">
                  {s}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function go(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}
