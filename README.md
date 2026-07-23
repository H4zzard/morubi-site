# Morubi

Landing page para o **Morubi** — um gerente comercial de IA que acompanha cada
conversa da equipe, aponta a próxima ação certa e mostra onde a operação ganha
ou perde vendas.

Não é um chatbot. Não é um CRM. É inteligência comercial rodando por cima do que
a empresa já usa.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **TailwindCSS 3.4** com design tokens em HSL (dark por padrão)
- **Framer Motion** para animações discretas
- **Lucide** para ícones
- Primitivos no estilo shadcn/ui (`components/ui`) — sem dependências pesadas

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # servir o build
```

## Estrutura

```
app/
  layout.tsx          # metadata + SEO, dark mode global
  page.tsx            # composição das seções
  globals.css         # tokens de tema, grid, utilitários
components/
  navbar.tsx          # header fixo com blur ao rolar
  logo.tsx
  hero-dashboard.tsx  # dashboard flutuante do hero
  ui/                 # button, reveal, primitives (Section, Card…)
  sections/           # hero, how-it-works, problems, features,
                      # platform, realtime, results, faq, cta, footer
lib/utils.ts          # helper cn()
```

## Design

- Paleta graphite escura + um único accent (verde) — sem excesso de cor.
- Foco em tipografia, hierarquia e espaço em branco.
- Animações de entrada `once` com `prefers-reduced-motion` respeitado.
- 100% responsivo; dashboards reflow em coluna no mobile.

## Copy & posicionamento

O texto vende **resultado**, não funcionalidade: mais conversão, mais controle,
menos vendas perdidas, previsibilidade. Nenhuma menção a "IA", "GPT" ou jargão
de tecnologia — só transformação comercial.

Fluxo comercial (sem preço, sem checkout):
Landing → Agendar demonstração → Reunião → Implantação → Assinatura.

> `Morubi` é um nome temporário — troque a marca em `components/logo.tsx`,
> `app/layout.tsx` (metadata) e no rodapé.
