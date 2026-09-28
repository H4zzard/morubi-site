"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ScheduleButton } from "@/components/tracked-actions";
import { cn } from "@/lib/utils";

const links = [
  { label: "Produto", href: "/#produto" },
  { label: "Para gestores", href: "/manager" },
  { label: "Para vendedores", href: "/coach" },
  { label: "Integrações", href: "/integracoes" },
  { label: "Segurança", href: "/seguranca" },
  { label: "Preços", href: "/precos" },
];

export function Navbar(){
  const[scrolled,setScrolled]=React.useState(false); const[open,setOpen]=React.useState(false);
  React.useEffect(()=>{const fn=()=>setScrolled(window.scrollY>12);fn();window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn)},[]);
  React.useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
  return <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5"><div className={cn("mx-auto mt-3 flex h-14 max-w-7xl items-center justify-between rounded-2xl border border-transparent px-3 transition-all duration-300 sm:px-4",scrolled&&"border-white/[.08] bg-bg/80 shadow-lg shadow-black/10 backdrop-blur-xl")}><Link href="/" aria-label="Morubi — início"><Logo/></Link><nav aria-label="Principal" className="hidden items-center lg:flex">{links.map(l=><Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-[13px] text-subtle transition hover:bg-white/[.03] hover:text-foreground">{l.label}</Link>)}</nav><div className="hidden items-center gap-2 md:flex"><Link href="/contato" className="px-3 py-2 text-sm text-subtle hover:text-foreground">Entrar</Link><ScheduleButton label="Agendar demo" className="h-9 px-4 text-sm"/></div><button onClick={()=>setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-lg text-subtle md:hidden" aria-label={open?"Fechar menu":"Abrir menu"} aria-expanded={open}>{open?<X size={20}/>:<Menu size={20}/>}</button></div><AnimatePresence>{open&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="mt-2 rounded-2xl border border-white/[.08] bg-bg/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"><nav className="flex flex-col">{links.map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className="rounded-xl px-4 py-3.5 text-sm text-subtle hover:bg-white/[.04] hover:text-foreground">{l.label}</Link>)}<Link href="/demo" onClick={()=>setOpen(false)} className="rounded-xl px-4 py-3.5 text-sm text-subtle">Ver a Morubi em ação</Link><ScheduleButton className="mt-2 w-full"/></nav></motion.div>}</AnimatePresence></header>
}
