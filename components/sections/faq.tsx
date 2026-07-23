"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";

const faqs = [
  {
    q: "Preciso trocar de CRM?",
    a: "Não. O Morubi funciona por cima do CRM que você já usa. Ele lê o que acontece nas conversas e devolve inteligência para dentro da sua operação, sem forçar migração nenhuma.",
  },
  {
    q: "Funciona com WhatsApp?",
    a: "Sim. O WhatsApp é onde a maior parte das vendas acontece, e é onde o Morubi acompanha cada conversa, texto e áudio em tempo real, junto com o CRM.",
  },
  {
    q: "Quanto tempo leva para começar?",
    a: "A conexão inicial leva minutos. A implantação assistida, mapear seu processo, sua base de conhecimento e seus critérios de venda costuma levar poucos dias, com acompanhamento do nosso time.",
  },
  {
    q: "A IA responde os clientes no meu lugar?",
    a: "Não, e isso é proposital. O Morubi não é um chatbot. Quem conversa com o cliente é o seu vendedor. O Morubi trabalha ao lado dele: interpreta a conversa e aponta a próxima ação certa. A relação continua humana.",
  },
  {
    q: "Como funciona a implantação?",
    a: "É guiada de ponta a ponta: agendamos uma demonstração, entendemos sua operação, conectamos seus canais e calibramos o Morubi com o seu processo de vendas. Você acompanha cada etapa até o time estar rodando.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <Section id="faq" className="border-t border-border">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="O que os gestores perguntam antes de começar."
          subtitle="Direto ao ponto. Se ficar qualquer dúvida, resolvemos na demonstração."
        />

        <div className="divide-y divide-border border-t border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-medium tracking-tight text-foreground">
                    {f.q}
                  </span>
                  <span
                    className={
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-transform duration-300 " +
                      (isOpen ? "rotate-45 text-accent" : "")
                    }
                  >
                    <Plus size={15} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
