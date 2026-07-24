"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { openCalendly } from "@/lib/calendly";

const links = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Plataforma", href: "/#plataforma" },
  { label: "Resultados", href: "/#resultados" },
  { label: "Dúvidas", href: "/#faq" },
  { label: "Ajuda", href: "/ajuda" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-8xl items-center justify-between px-6 transition-all duration-300 lg:px-8",
          scrolled &&
            "glass mt-2 h-14 max-w-6xl rounded-full border border-border px-4 lg:px-6",
        )}
      >
        <Link href="/" aria-label="Morubi — início" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-subtle transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button size="sm" onClick={openCalendly}>
            Agendar demonstração
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-4 mt-2 rounded-2xl border border-border p-4 md:hidden"
          >
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] text-subtle hover:bg-elevated hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <Button
                className="mt-3 w-full"
                onClick={() => {
                  setOpen(false);
                  openCalendly();
                }}
              >
                Agendar demonstração
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
