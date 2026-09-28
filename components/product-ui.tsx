"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUp, Check, CheckCircle2,
  ChevronRight, Circle, Clock3, Command, Lightbulb,
  Mic2, Minus, ShieldAlert, Sparkles, Target, TrendingUp, X,
} from "lucide-react";
import { callScenarios, callTimeline, dashboardMetrics, reps, scoreDimensions } from "@/lib/product-data";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProductFrame({ children, className, label = "MORUBI" }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <div className={cn("min-w-0 overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#0d0f0f] shadow-[0_30px_100px_-40px_rgb(0_0_0/0.85)]", className)}>
      <div className="flex h-11 items-center justify-between border-b border-white/[0.07] bg-white/[0.018] px-4">
        <div className="flex gap-1.5" aria-hidden="true"><i className="h-2 w-2 rounded-full bg-white/10" /><i className="h-2 w-2 rounded-full bg-white/10" /><i className="h-2 w-2 rounded-full bg-white/10" /></div>
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted"><Command size={11} /> {label}</span>
        <span className="w-10" />
      </div>
      {children}
    </div>
  );
}

export function LiveCallDemo({ compact = false }: { compact?: boolean }) {
  const reduce = usePrefersReducedMotion();
  const [scenario, setScenario] = React.useState(0);
  const [stage, setStage] = React.useState(0);
  const item = callScenarios[scenario];

  React.useEffect(() => {
    if (reduce) {
      const reducedMotionTimer = window.setTimeout(() => setStage(4), 0);
      return () => window.clearTimeout(reducedMotionTimer);
    }
    // Play the explanation once per selected scenario. The previous loop
    // collapsed every card before restarting, which looked like flicker while scrolling.
    const delays = [500, 1300, 2100, 2900];
    const timers = delays.map((delay, index) => window.setTimeout(() => {
      setStage(index + 1);
    }, delay));
    return () => timers.forEach(window.clearTimeout);
  }, [scenario, reduce]);

  return (
    <ProductFrame label="LIVE COPILOT" className="relative">
      <div className={cn("grid", compact ? "" : "lg:grid-cols-[0.92fr_1.08fr]")}>
        <div className="border-white/[0.07] p-4 sm:p-5 lg:border-r">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_0_4px_rgb(248_113_113/0.08)]"/><span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-red-300">CALL EM ANDAMENTO</span></div>
            <span className="font-mono text-xs tabular-nums text-subtle">{item.time}</span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-xs font-semibold">CM</span>
            <div><p className="text-sm font-medium">Carlos Mendes</p><p className="text-xs text-muted">Prospect</p></div>
            <div className="ml-auto flex h-7 items-center gap-[3px]" aria-label="Áudio ativo">{[7,14,10,19,12,16,8].map((h,i)=><motion.i key={i} animate={reduce ? undefined : { height:[4,h,6] }} transition={{duration:.8,repeat:Infinity,delay:i*.07}} className="w-[2px] rounded-full bg-accent/70" />)}</div>
          </div>
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted"><Mic2 size={12}/> Transcrição ao vivo</div>
            <AnimatePresence mode="wait"><motion.div key={item.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.35}} className="mt-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-accent">Carlos</p>
              <p className="mt-1.5 text-sm leading-6 text-subtle">“{item.quote}”</p>
            </motion.div></AnimatePresence>
          </div>
          {!compact && <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-muted"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/[0.05] text-[9px] text-subtle">MA</span> Marina Alves <span className="ml-auto">Closer</span></div>}
        </div>

        <div className="relative min-h-[360px] p-4 sm:p-5">
          <div className="flex items-center justify-between"><span className="text-xs font-medium text-subtle">Orientação contextual</span><span className="rounded-full border border-accent/20 bg-accent/[0.07] px-2 py-1 font-mono text-[9px] tracking-wider text-accent">ZERO PROMPT</span></div>
          <div className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {stage >= 1 && <InsightCard key="detected" icon={<ShieldAlert size={14}/>} eyebrow="Objeção detectada" title={item.detection} tone="warning" />}
              {stage >= 2 && <motion.div key="context" initial={{opacity:0,y:10,filter:"blur(5px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.45,ease}} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Contexto</p><p className="mt-1.5 text-[13px] leading-5 text-subtle">{item.context}</p></motion.div>}
              {stage >= 3 && <motion.div key="recommend" initial={{opacity:0,y:10,filter:"blur(5px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.45,ease}} className="rounded-xl border border-accent/20 bg-accent/[0.055] p-3.5"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent"><Sparkles size={13}/> Como responder</div><p className="mt-2 text-[13px] leading-5 text-foreground">{item.recommendation}</p></motion.div>}
              {stage >= 4 && <motion.div key="question" initial={{opacity:0,y:10,filter:"blur(5px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.45,ease}} className="rounded-xl border border-white/[0.08] bg-[#151918] p-3.5"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Pergunta sugerida</p><p className="mt-2 text-[13px] leading-5 text-foreground">“{item.question}”</p><div className="mt-3 flex items-center gap-1 text-[10px] text-positive"><CheckCircle2 size={12}/> Baseada no playbook da empresa</div></motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="flex border-t border-white/[0.07] bg-white/[0.015] px-2 py-2.5 sm:px-4">
        {callScenarios.map((s,i)=><button key={s.id} onClick={()=>{if(i!==scenario){setStage(reduce?4:0);setScenario(i)}}} className={cn("min-w-0 flex-1 rounded-md px-1.5 py-2 text-[10px] transition-colors sm:px-2 sm:text-xs", scenario===i?"bg-white/[0.06] text-foreground":"text-muted hover:text-subtle")} aria-pressed={scenario===i}>{s.label}</button>)}
      </div>
    </ProductFrame>
  );
}

function InsightCard({ icon, eyebrow, title, tone }: { icon: React.ReactNode; eyebrow: string; title: string; tone: "warning" | "positive" }) {
  return <motion.div initial={{opacity:0,y:10,filter:"blur(5px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.45,ease}} className={cn("rounded-xl border p-3.5",tone==="warning"?"border-warning/25 bg-warning/[0.06]":"border-positive/25 bg-positive/[0.06]")}><div className={cn("flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em]",tone==="warning"?"text-warning":"text-positive")}>{icon}{eyebrow}</div><p className="mt-1.5 text-sm font-medium text-foreground">{title}</p></motion.div>;
}

export function CallScorePanel() {
  const [active, setActive] = React.useState(4);
  return <ProductFrame label="INTELLIGENCE"><div className="grid min-w-0 lg:grid-cols-[.72fr_1.28fr]">
    <div className="border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r sm:p-6"><p className="text-xs text-muted">Call Score</p><div className="mt-2 flex items-end gap-2"><strong className="text-5xl font-semibold tracking-[-.05em]">82</strong><span className="mb-1 text-sm text-muted">/ 100</span></div><div className="mt-6 space-y-3">{scoreDimensions.map(([label,value])=><div key={label}><div className="mb-1.5 flex justify-between text-[11px]"><span className="text-subtle">{label}</span><span className="tabular-nums text-muted">{value}</span></div><div className="h-1 overflow-hidden rounded-full bg-white/[0.06]"><motion.div initial={{width:0}} whileInView={{width:`${value}%`}} viewport={{once:true}} transition={{duration:.8,ease}} className="h-full bg-accent"/></div></div>)}</div></div>
    <div className="min-w-0 p-5 sm:p-6"><div className="grid gap-4 sm:grid-cols-2"><Feedback title="Pontos positivos" positive items={["Dor principal identificada","Desconto evitado na objeção","Próximo passo confirmado"]}/><Feedback title="Oportunidades" items={["Preço veio antes do impacto","Decisor não foi identificado","Urgência pouco explorada"]}/></div><p className="mt-6 text-[10px] font-semibold uppercase tracking-[.16em] text-muted">Timeline da call</p><div className="scroll-thin mt-3 flex max-w-full gap-2 overflow-x-auto pb-2">{callTimeline.map((event,i)=><button key={event.time} onClick={()=>setActive(i)} className={cn("min-w-[112px] rounded-lg border p-3 text-left transition",active===i?"border-accent/35 bg-accent/[.06]":"border-white/[.07] bg-white/[.02] hover:bg-white/[.04]")}><span className="font-mono text-[9px] text-muted">{event.time}</span><span className="mt-1 block text-[11px] text-subtle">{event.label}</span></button>)}</div><AnimatePresence mode="wait"><motion.div key={active} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} className="mt-3 rounded-lg bg-white/[.025] px-3 py-2 text-xs text-subtle">{callTimeline[active].detail}</motion.div></AnimatePresence></div>
  </div></ProductFrame>;
}

function Feedback({ title, items, positive=false }: { title:string; items:string[]; positive?:boolean }) { return <div><p className="text-xs font-medium text-foreground">{title}</p><ul className="mt-3 space-y-2">{items.map(item=><li key={item} className="flex gap-2 text-[11px] leading-5 text-muted">{positive?<Check size={13} className="mt-1 shrink-0 text-positive"/>:<ArrowRight size={13} className="mt-1 shrink-0 text-warning"/>}{item}</li>)}</ul></div> }

export function DealScorePanel() {
  return <div className="rounded-2xl border border-white/[0.08] bg-surface/60 p-5 sm:p-6"><div className="flex items-start justify-between"><div><p className="text-xs text-muted">Deal Score</p><p className="mt-1 text-4xl font-semibold tracking-[-.04em]">84 <span className="text-sm font-normal text-muted">/ 100</span></p></div><span className="rounded-full border border-positive/25 bg-positive/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-positive">FORTE INTENÇÃO</span></div><div className="mt-5 grid gap-2 sm:grid-cols-2">{[[true,"Perguntou sobre implantação"],[true,"Confirmou prazo"],[true,"Envolveu decisor"],[false,"Preço parcialmente resolvido"],[false,"ROI ainda não quantificado"]].map(([up,label])=><div key={String(label)} className="flex items-center gap-2 rounded-lg border border-white/[.06] bg-white/[.02] px-3 py-2 text-xs text-subtle">{up?<ArrowUp size={13} className="text-positive"/>:<ArrowDown size={13} className="text-warning"/>}{label}</div>)}</div><p className="mt-4 flex items-center gap-2 text-[11px] text-muted"><Lightbulb size={13}/> Score explicável: cada ponto está ligado a evidências da conversa.</p></div>;
}

export function ManagerDashboard() {
  const [selected, setSelected] = React.useState<(typeof reps)[number] | null>(null);
  return <><ProductFrame label="MANAGER"><div className="p-4 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs text-muted">Performance comercial</p><h3 className="mt-1 text-lg font-medium">Visão da operação</h3></div><span className="rounded-lg border border-white/[.07] bg-white/[.025] px-3 py-2 text-xs text-subtle">Últimos 30 dias</span></div><div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-5">{dashboardMetrics.map(([label,value])=><div key={label} className="min-w-0 rounded-xl border border-white/[.07] bg-white/[.025] p-3"><p className="text-[10px] leading-4 text-muted">{label}</p><p className="mt-1 break-words text-lg font-semibold tracking-tight sm:text-xl">{value}</p></div>)}</div><div className="mt-4 hidden overflow-hidden rounded-xl border border-white/[.07] sm:block"><div className="grid grid-cols-[1.6fr_.6fr_.8fr_.6fr_.35fr] gap-2 border-b border-white/[.07] bg-white/[.025] px-3 py-2.5 text-[9px] uppercase tracking-wider text-muted"><span>Vendedor</span><span>Calls</span><span>Conversão</span><span>Score</span><span /></div>{reps.map(rep=><button key={rep.name} onClick={()=>setSelected(rep)} className="grid w-full grid-cols-[1.6fr_.6fr_.8fr_.6fr_.35fr] items-center gap-2 border-b border-white/[.05] px-3 py-3 text-left text-[11px] transition-colors last:border-0 hover:bg-white/[.025] sm:text-xs"><span className="truncate text-subtle">{rep.name}</span><span className="text-muted">{rep.calls}</span><span>{rep.conversion}</span><span>{rep.score}</span><span>{rep.trend==="up"?<TrendingUp size={13} className="text-positive"/>:rep.trend==="down"?<ArrowDown size={13} className="text-warning"/>:<Minus size={13} className="text-muted"/>}</span></button>)}</div><div className="mt-4 space-y-2 sm:hidden">{reps.map(rep=><button key={rep.name} onClick={()=>setSelected(rep)} className="w-full rounded-xl border border-white/[.07] bg-white/[.02] p-3 text-left transition-colors hover:bg-white/[.04]"><div className="flex items-center justify-between gap-3"><span className="truncate text-xs font-medium text-subtle">{rep.name}</span>{rep.trend==="up"?<TrendingUp size={13} className="shrink-0 text-positive"/>:rep.trend==="down"?<ArrowDown size={13} className="shrink-0 text-warning"/>:<Minus size={13} className="shrink-0 text-muted"/>}</div><div className="mt-3 grid grid-cols-3 gap-2 text-[10px]"><span className="text-muted">Calls <strong className="block text-xs text-foreground">{rep.calls}</strong></span><span className="text-muted">Conversão <strong className="block text-xs text-foreground">{rep.conversion}</strong></span><span className="text-muted">Score <strong className="block text-xs text-foreground">{rep.score}</strong></span></div></button>)}</div><ManagerInsight/></div></ProductFrame><AnimatePresence>{selected&&<RepDrawer rep={selected} onClose={()=>setSelected(null)}/>}</AnimatePresence></>;
}

function ManagerInsight(){return <div className="mt-4 rounded-xl border border-accent/20 bg-accent/[.045] p-4"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-accent"><Sparkles size={13}/> Morubi Insight</div><p className="mt-2 text-sm leading-6 text-foreground">14 oportunidades foram perdidas neste mês. Em <strong>9 delas</strong>, o preço apareceu antes de o impacto financeiro estar claro.</p><div className="mt-3 flex flex-wrap gap-2">{[["Rafael","61%"],["Lucas","34%"],["Marina","18%"]].map(([n,v])=><span key={n} className="rounded-md bg-black/20 px-2 py-1 text-[10px] text-subtle">{n} · {v}</span>)}</div><p className="mt-3 text-xs text-muted"><span className="text-subtle">Recomendação:</span> treinar construção de valor antes da apresentação de preço.</p></div>}

function RepDrawer({rep,onClose}:{rep:(typeof reps)[number];onClose:()=>void}){return <motion.div className="fixed inset-0 z-[80] flex justify-end bg-black/65 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><motion.aside role="dialog" aria-modal="true" aria-label={`Performance de ${rep.name}`} initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:.4,ease}} className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface p-6"><button onClick={onClose} aria-label="Fechar" className="ml-auto grid h-9 w-9 place-items-center rounded-lg border border-border text-muted hover:text-foreground"><X size={16}/></button><p className="mt-8 text-xs uppercase tracking-wider text-accent">Performance individual</p><h3 className="mt-2 text-2xl font-semibold">{rep.name}</h3><p className="mt-1 text-sm text-muted">Closer · {rep.calls} calls analisadas</p><div className="mt-8 grid grid-cols-2 gap-3"><Metric label="Score" value={String(rep.score)}/><Metric label="Conversão" value={rep.conversion}/></div><DrawerBlock title="Principais forças" items={["Conhecimento do produto","Rapport e escuta ativa","Próximos passos claros"]}/><DrawerBlock title="Principal gap" items={["Defesa de preço antes da quantificação de impacto","Decisor envolvido tarde no processo"]}/><DrawerBlock title="Recomendação da Morubi" items={["Praticar construção de valor no roleplay","Revisar 3 calls perdidas desta semana"]}/></motion.aside></motion.div>}
function Metric({label,value}:{label:string;value:string}){return <div className="rounded-xl border border-border bg-elevated p-4"><p className="text-xs text-muted">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p></div>}
function DrawerBlock({title,items}:{title:string;items:string[]}){return <div className="mt-8"><p className="text-sm font-medium">{title}</p><ul className="mt-3 space-y-2">{items.map(x=><li key={x} className="flex gap-2 text-sm leading-6 text-muted"><ChevronRight size={14} className="mt-1.5 shrink-0 text-accent"/>{x}</li>)}</ul></div>}

export function CoachPanel(){return <ProductFrame label="COACH"><div className="grid lg:grid-cols-[.72fr_1.28fr]"><div className="border-b border-white/[.07] p-5 lg:border-b-0 lg:border-r sm:p-6"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-sm font-semibold text-accent">RO</span><div><p className="text-sm font-medium">Rafael Oliveira</p><p className="text-xs text-muted">Closer</p></div></div><div className="mt-7"><p className="text-xs text-muted">Overall Score</p><p className="mt-1 text-4xl font-semibold">74</p></div><div className="mt-5 space-y-2.5">{[["Discovery",82],["Rapport",86],["Produto",91],["Objeções",72],["Negociação",64],["Closing",67]].map(([l,v])=><div key={l as string} className="flex items-center gap-3 text-[11px]"><span className="w-20 text-muted">{l}</span><div className="h-1 flex-1 rounded-full bg-white/[.06]"><div className="h-full rounded-full bg-accent" style={{width:`${v}%`}}/></div><span className="w-5 text-right text-subtle">{v}</span></div>)}</div></div><div className="p-5 sm:p-6"><p className="text-[10px] uppercase tracking-[.16em] text-muted">Principal oportunidade</p><p className="mt-2 text-sm leading-6 text-subtle">Rafael domina o produto, mas tende a defender preço antes de explorar completamente o impacto financeiro da dor.</p><div className="mt-5 rounded-xl border border-accent/20 bg-accent/[.05] p-4"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-accent">Treino recomendado</p><p className="mt-2 text-sm font-medium">Negociação e construção de valor</p><div className="mt-4 flex items-center gap-3"><span className="flex gap-1">{[1,2,3,4].map(i=><Circle key={i} size={9} fill="currentColor" className="text-accent"/>)}<Circle size={9} className="text-muted"/></span><span className="text-[10px] text-muted">Cenário difícil</span></div><button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">Iniciar treinamento <ArrowRight size={13}/></button></div></div></div></ProductFrame>}

export function PlaybookPanel(){const items=[["Produto","configurado"],["ICP","configurado"],["Personas","configurado"],["Objeções","24 cadastradas"],["Concorrentes","8 mapeados"],["Cases","14 adicionados"],["Pricing","configurado"],["Processo comercial","configurado"]];return <ProductFrame label="COMPANY PLAYBOOK"><div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6">{items.map(([l,v])=><div key={l} className="flex items-center justify-between rounded-lg border border-white/[.06] bg-white/[.02] px-3 py-2.5"><span className="text-xs text-subtle">{l}</span><span className="flex items-center gap-1.5 text-[10px] text-positive"><Check size={11}/>{v}</span></div>)}</div></ProductFrame>}

export function ReportPreview(){return <div className="rounded-2xl border border-white/[.08] bg-surface/70 p-5"><div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-wider text-accent">Resumo comercial</p><p className="mt-1 text-sm font-medium">Semana 38</p></div><Clock3 size={16} className="text-muted"/></div><div className="mt-5 grid grid-cols-2 gap-2"><Metric label="Calls analisadas" value="126"/><Metric label="Conversão" value="24,8%"/></div><div className="mt-4 space-y-3 text-xs"><p className="rounded-lg bg-positive/[.06] p-3 text-subtle"><span className="text-positive">Principal evolução:</span> Discovery +12%</p><p className="rounded-lg bg-warning/[.06] p-3 text-subtle"><span className="text-warning">Principal gargalo:</span> valor antes do preço</p><p className="flex items-center gap-2 text-muted"><Target size={13}/> 3 vendedores precisam de atenção.</p></div></div>}

export function ZeroPromptComparison(){return <div className="grid gap-3 md:grid-cols-2"><div className="rounded-2xl border border-white/[.07] bg-surface/45 p-5"><p className="text-[10px] font-semibold uppercase tracking-wider text-muted">IA tradicional</p><Flow items={["Abre o chat","Escreve o prompt","Espera","Interpreta"]}/></div><div className="rounded-2xl border border-accent/25 bg-accent/[.04] p-5"><p className="text-[10px] font-semibold uppercase tracking-wider text-accent">Morubi</p><Flow items={["Cliente fala","Morubi entende","Orientação aparece"]} accent/></div></div>}
function Flow({items,accent=false}:{items:string[];accent?:boolean}){return <div className="mt-5 flex flex-wrap items-center gap-2">{items.map((x,i)=><React.Fragment key={x}><span className={cn("rounded-lg border px-3 py-2 text-xs",accent?"border-accent/20 bg-accent/[.05] text-foreground":"border-white/[.07] bg-white/[.02] text-muted")}>{x}</span>{i<items.length-1&&<ArrowRight size={13} className="text-muted"/>}</React.Fragment>)}</div>}

export function SystemFlow(){return <div data-testid="system-flow" className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap">{["CALL","TRANSCRIÇÃO","OBJEÇÕES","COMPORTAMENTOS","RESULTADO","INSIGHTS","PLAYBOOK"].map((x,i)=><React.Fragment key={x}><span className={cn("flex w-full max-w-[220px] items-center justify-center rounded-lg border px-3 py-2.5 text-center font-mono text-[10px] tracking-wider sm:w-auto sm:max-w-none",i===6?"border-accent/30 bg-accent/[.07] text-accent":"border-white/[.07] bg-white/[.02] text-subtle")}>{x}</span>{i<6&&<ArrowRight size={13} className="shrink-0 rotate-90 text-muted sm:rotate-0"/>}</React.Fragment>)}</div>}
