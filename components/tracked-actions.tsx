"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/lib/calendly";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function DemoLink({ className, label = "Ver a Morubi em ação", event = "hero_demo_click" }: { className?: string; label?: string; event?: AnalyticsEvent }) {
  return (
    <Link href="/demo" onClick={() => track(event)} className={cn("inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-elevated px-6 text-[15px] font-medium text-foreground transition hover:border-accent/40 hover:bg-elevated/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent", className)}>
      <Play size={15} fill="currentColor" /> {label}
    </Link>
  );
}

export function ScheduleButton({ className, label = "Agendar demonstração", event = "schedule_demo_click", variant = "primary" }: { className?: string; label?: string; event?: AnalyticsEvent; variant?: "primary" | "secondary" }) {
  return (
    <Button size="lg" variant={variant} className={className} onClick={() => { track(event); openCalendly(); }}>
      {label}<ArrowRight size={16} />
    </Button>
  );
}
