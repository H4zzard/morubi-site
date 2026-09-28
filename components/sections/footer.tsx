"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { CookiePreferencesButton } from "@/components/pages/cookie-preferences-button";

const columns=[
  {title:"Produto",links:[["Morubi Live","/live"],["Intelligence","/intelligence"],["Coach","/coach"],["Manager","/manager"],["Integrações","/integracoes"]]},
  {title:"Empresa",links:[["Sobre","/sobre"],["Contato","/contato"],["Implantação","/implantacao"]]},
  {title:"Recursos",links:[["Central de ajuda","/ajuda"],["Demonstração","/demo"],["Segurança","/seguranca"]]},
  {title:"Legal",links:[["Privacidade","/privacidade"],["Termos","/termos"],["Cookies","/cookies"]]},
];
export function Footer(){return <footer className="border-t border-border bg-surface/20"><div className="mx-auto max-w-8xl px-6 py-14 lg:px-8"><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]"><div><Logo/><p className="mt-4 max-w-xs text-sm leading-6 text-muted">Inteligência comercial que trabalha junto com o seu time.</p><a href="mailto:contato@morubi.ai" className="mt-4 inline-block text-sm text-subtle hover:text-foreground">contato@morubi.ai</a></div>{columns.map(c=><div key={c.title}><p className="text-[11px] font-semibold uppercase tracking-[.16em] text-muted">{c.title}</p><ul className="mt-4 space-y-2.5">{c.links.map(([label,href])=><li key={href}><Link href={href} className="text-sm text-subtle transition hover:text-foreground">{label}</Link></li>)}</ul></div>)}</div><div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row"><p>© {new Date().getFullYear()} Morubi. Todos os direitos reservados.</p><CookiePreferencesButton className="text-left hover:text-foreground"/></div></div></footer>}
