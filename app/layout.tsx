import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { ThirdPartyScripts } from "@/components/consent/third-party-scripts";
import { Providers } from "@/components/providers";

const siteUrl = "https://morubi.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Morubi — Inteligência Comercial em Tempo Real", template: "%s · Morubi" },
  description: "A Morubi acompanha suas calls, orienta vendedores em tempo real e transforma cada interação em inteligência para sua operação comercial.",
  keywords: ["inteligência comercial", "coaching de vendas", "sales intelligence", "gestão comercial"],
  authors: [{ name: "Morubi" }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", url: siteUrl, siteName: "Morubi", title: "Morubi — Inteligência Comercial em Tempo Real", description: "Inteligência durante a venda. Clareza depois dela. Evolução em cada próxima conversa.", images: [{ url: "/logo_morubi.png", width: 1200, height: 630, alt: "Morubi" }] },
  twitter: { card: "summary_large_image", title: "Morubi — Inteligência Comercial em Tempo Real", description: "Inteligência durante a venda. Clareza depois dela." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0c0c0e", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Morubi", applicationCategory: "BusinessApplication", operatingSystem: "Web", description: "Camada de inteligência comercial para equipes de vendas.", offers: { "@type": "Offer", price: "997", priceCurrency: "BRL" } };
  return <html lang="pt-BR" className="dark"><body><Providers>{children}<ThirdPartyScripts/><CookieConsent/></Providers><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}/></body></html>;
}
