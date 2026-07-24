"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { CookiePreferencesButton } from "@/components/pages/cookie-preferences-button";
import { openCalendly } from "@/lib/calendly";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", href: "/#como-funciona" },
      { label: "Plataforma", href: "/#plataforma" },
      { label: "Resultados", href: "/#resultados" },
      { label: "Segurança", href: "/privacidade#secao-8" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Clientes", href: "/clientes" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Central de ajuda", href: "/ajuda" },
      { label: "Implantação", href: "/implantacao" },
      { label: "Status", href: "/status" },
      { label: "Privacidade", href: "/privacidade" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-8xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Morubi — início">
              <Logo />
            </Link>
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
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-subtle transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
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
            <Link
              href="/termos"
              className="transition-colors hover:text-foreground"
            >
              Termos
            </Link>
            <Link
              href="/privacidade"
              className="transition-colors hover:text-foreground"
            >
              Privacidade
            </Link>
            <CookiePreferencesButton className="hover:text-foreground" />
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
