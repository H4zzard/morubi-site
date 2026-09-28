"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Pause, Play } from "lucide-react";
import { CallScorePanel, DealScorePanel, LiveCallDemo, ManagerDashboard } from "@/components/product-ui";
import { ScheduleButton } from "@/components/tracked-actions";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/lib/motion";

const steps=[
  {label:"Call começa",title:"Uma conversa normal para o vendedor.",text:"A Morubi acompanha o contexto sem exigir que ele abra um chat."},
  {label:"Problema",title:"O impacto aparece na fala do prospect.",text:"A conversa é estruturada enquanto acontece."},
  {label:"Objeção",title:"O preço vira o momento crítico.",text:"A Morubi identifica a objeção e o contexto ao redor dela."},
  {label:"Orientação",title:"A próxima pergunta aparece.",text:"O vendedor continua presente na conversa."},
  {label:"Buying signal",title:"O prospect pergunta sobre implantação.",text:"O sinal positivo também fica registrado."},
  {label:"Call Score",title:"A call termina. A análise começa.",text:"Competências e oportunidades ficam ligadas à evidência."},
  {label:"Deal Score",title:"O negócio ganha uma leitura explicável.",text:"Intenção, risco e lacunas aparecem sem uma falsa promessa de probabilidade."},
  {label:"Manager",title:"Uma call alimenta a visão do gestor.",text:"Agora imagine isso acontecendo em todas."},
] as const;

export function InteractiveDemo(){
  const reduce=usePrefersReducedMotion(); const[step,setStep]=React.useState(0); const[playing,setPlaying]=React.useState(true);
  React.useEffect(()=>{track("live_demo_started")},[]);
  React.useEffect(()=>{if(!reduce)return;const timer=window.setTimeout(()=>setPlaying(false),0);return()=>window.clearTimeout(timer)},[reduce]);
  React.useEffect(()=>{if(!playing)return;const timer=window.setTimeout(()=>setStep(s=>s===steps.length-1?s:s+1),8000);return()=>window.clearTimeout(timer)},[step,playing]);
  const visual=step<=4?<LiveCallDemo/>:step===5?<CallScorePanel/>:step===6?<DealScorePanel/>:<ManagerDashboard/>;
  return <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40"><div className="pointer-events-none absolute inset-0 bg-grid opacity-45"/><div className="relative mx-auto max-w-7xl px-5 sm:px-6"><div className="mx-auto max-w-3xl text-center"><span className="text-[11px] font-semibold uppercase tracking-[.18em] text-accent">Demonstração interativa · 60–90 segundos</span><h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-.04em] sm:text-6xl">Uma conversa alimenta todo o sistema.</h1><p className="mx-auto mt-5 max-w-xl text-[16px] leading-7 text-muted">Dados e interfaces ilustrativos. A demonstração mostra a experiência projetada, não resultados reais de clientes.</p></div><div className="mt-10 flex gap-1">{steps.map((s,i)=><button key={s.label} onClick={()=>{setStep(i);setPlaying(false)}} aria-label={`Ir para ${s.label}`} className="group flex-1"><span className="mb-2 hidden truncate text-[9px] text-muted lg:block">{s.label}</span><span className="block h-1 overflow-hidden rounded-full bg-white/[.07]"><motion.span className="block h-full bg-accent" animate={{width:i<step?"100%":i===step&&playing?"100%":i===step?"24%":"0%"}} transition={{duration:i===step&&playing?8:.3,ease:"linear"}}/></span></button>)}</div><div className="mt-6 grid gap-6 lg:grid-cols-[.32fr_.68fr]"><aside className="rounded-2xl border border-white/[.07] bg-surface/55 p-5 lg:min-h-[430px]"><p className="font-mono text-[10px] text-accent">0{step+1} / 08</p><AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="mt-16"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-muted">{steps[step].label}</p><h2 className="mt-3 text-2xl font-semibold tracking-tight">{steps[step].title}</h2><p className="mt-3 text-sm leading-6 text-muted">{steps[step].text}</p></motion.div></AnimatePresence><div className="mt-16 flex items-center gap-2"><button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted disabled:opacity-30"><ArrowLeft size={15}/></button><button onClick={()=>setPlaying(!playing)} className="grid h-10 w-10 place-items-center rounded-lg border border-border text-subtle" aria-label={playing?"Pausar":"Continuar"}>{playing?<Pause size={14}/>:<Play size={14}/>}</button><button onClick={()=>setStep(s=>Math.min(steps.length-1,s+1))} disabled={step===steps.length-1} className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted disabled:opacity-30"><ArrowRight size={15}/></button></div></aside><AnimatePresence mode="wait"><motion.div key={step<=4?"live":step} initial={{opacity:0,y:12,filter:"blur(6px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-8}} transition={{duration:.5}}>{visual}</motion.div></AnimatePresence></div>{step===steps.length-1&&<motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="mx-auto mt-12 max-w-2xl rounded-2xl border border-accent/25 bg-accent/[.05] p-7 text-center"><CheckCircle2 size={22} className="mx-auto text-accent"/><h2 className="mt-4 text-2xl font-semibold">Isso aconteceu em uma call.</h2><p className="mt-2 text-sm text-muted">Agora imagine isso acontecendo em todas.</p><ScheduleButton label="Agendar uma demonstração com sua operação" className="mt-6"/></motion.div>}</div></section>
}
