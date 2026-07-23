import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://morubi.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Morubi - Um gerente comercial de IA acompanhando cada venda",
    template: "%s · Morubi",
  },
  description:
    "Morubi acompanha todas as conversas da sua equipe em tempo real, aponta a próxima ação certa e mostra onde cada vendedor perde vendas. Mais conversão, mais controle, mais previsibilidade.",
  keywords: [
    "gestão comercial",
    "inteligência comercial",
    "performance de vendas",
    "coaching de vendas",
    "previsibilidade comercial",
  ],
  authors: [{ name: "Morubi" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Morubi",
    title: "Morubi - Um gerente comercial de IA acompanhando cada venda",
    description:
      "Acompanha cada conversa, aponta a próxima ação e revela onde a operação perde vendas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morubi - Um gerente comercial de IA",
    description:
      "Acompanha cada conversa, aponta a próxima ação e revela onde a operação perde vendas.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
