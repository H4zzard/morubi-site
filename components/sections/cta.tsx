"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/lib/calendly";

const flow = ["Demonstração", "Reunião", "Implantação", "Operação rodando"];

export function Cta() {
  return (
    <section id="agendar" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[130px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-[52px] sm:leading-[1.05]"
        >
          Coloque um gerente comercial em cada conversa.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted"
        >
          Veja o Morubi lendo uma operação real na demonstração. Sem compromisso,
          sem trocar seu CRM.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" onClick={openCalendly}>
            <CalendarCheck size={17} />
            Agendar demonstração
          </Button>
          <Button variant="secondary" size="lg">
            Falar com o time
            <ArrowRight size={16} />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] text-muted"
        >
          {flow.map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="text-subtle">{step}</span>
              {i < flow.length - 1 && (
                <ArrowRight size={13} className="text-border" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
