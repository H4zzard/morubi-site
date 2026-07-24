import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { HelpCenter } from "@/components/pages/help-center";

export const metadata: Metadata = {
  title: "Central de ajuda",
  description:
    "Respostas diretas sobre como o Morubi funciona: primeiros passos, extensão e canais, base de conhecimento, dashboards, conta e segurança.",
  alternates: { canonical: "/ajuda" },
};

export default function AjudaPage() {
  return (
    <PageShell
      eyebrow="Central de ajuda"
      title="Tudo o que a sua operação precisa saber sobre o Morubi."
      subtitle="Respostas curtas e diretas, escritas para gestor e vendedor. Se a sua dúvida não estiver aqui, o time responde no mesmo dia."
    >
      <HelpCenter />
    </PageShell>
  );
}
