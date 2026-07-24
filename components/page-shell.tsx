import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Eyebrow } from "@/components/ui/primitives";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>
        <header className="relative overflow-hidden border-b border-border pb-16 pt-32 sm:pb-20 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]" />

          <div className="relative mx-auto w-full max-w-8xl px-6 lg:px-8">
            <nav
              aria-label="Trilha de navegação"
              className="mb-6 flex items-center gap-1.5 text-[13px] text-muted"
            >
              <Link href="/" className="transition-colors hover:text-foreground">
                Início
              </Link>
              <ChevronRight size={13} className="text-border" />
              <span className="text-subtle">{eyebrow}</span>
            </nav>

            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-[52px] sm:leading-[1.05]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted">
                {subtitle}
              </p>
            )}
          </div>
        </header>

        {children}
      </main>
      <Footer />
    </>
  );
}

/** Bloco de texto legal — títulos e parágrafos com ritmo consistente. */
export function LegalBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 lg:px-8">
      <div className="space-y-10">{children}</div>
    </div>
  );
}

export function LegalSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-28" id={`secao-${index}`}>
      <h2 className="text-[20px] font-semibold tracking-tight text-foreground">
        <span className="mr-3 text-muted tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted [&_a]:text-accent [&_a:hover]:brightness-110 [&_strong]:font-medium [&_strong]:text-subtle">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
