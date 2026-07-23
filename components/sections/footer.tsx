"use client";

import { Logo } from "@/components/logo";
import { openCalendly } from "@/lib/calendly";

const columns = [
  {
    title: "Produto",
    links: ["Como funciona", "Plataforma", "Resultados", "Segurança"],
  },
  {
    title: "Empresa",
    links: ["Sobre", "Clientes", "Carreiras", "Contato"],
  },
  {
    title: "Recursos",
    links: ["Central de ajuda", "Implantação", "Status", "Privacidade"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-8xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
              O gerente comercial de IA que acompanha cada conversa e mostra onde
              a sua operação ganha ou perde vendas.
            </p>
            <a
              href="mailto:contato@morubi.ai"
              className="mt-5 inline-block text-[14px] text-subtle transition-colors hover:text-foreground"
            >
              contato@morubi.ai
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-medium uppercase tracking-wider text-muted">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14px] text-subtle transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-muted">
            © {new Date().getFullYear()} Morubi. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-muted">
            <a href="#" className="transition-colors hover:text-foreground">
              Termos
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacidade
            </a>
            <button
              onClick={openCalendly}
              className="text-accent transition-colors hover:brightness-110"
            >
              Agendar demonstração →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
