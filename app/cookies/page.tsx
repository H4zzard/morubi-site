import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  LegalBody,
  LegalSection,
  LegalList,
} from "@/components/page-shell";
import { CookiePreferencesButton } from "@/components/pages/cookie-preferences-button";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Quais cookies o site do Morubi usa, para que servem, quanto tempo duram e como aceitar, recusar ou revogar o seu consentimento a qualquer momento.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATE = "23 de julho de 2026";

const inventory = [
  {
    category: "Estritamente necessários",
    consent: "Não depende de consentimento",
    rows: [
      {
        name: "morubi.consent",
        origin: "Morubi (primeira parte, localStorage)",
        purpose:
          "Guarda a sua escolha de cookies, a versão do aviso e a data da decisão — é o registro do seu consentimento.",
        duration: "Até você limpar o navegador ou revogar",
      },
      {
        name: "morubi.calendly.pendente",
        origin: "Morubi (primeira parte, sessionStorage)",
        purpose:
          "Lembra que você clicou em agendar antes de decidir sobre cookies, para retomar a ação depois da sua escolha.",
        duration: "Enquanto a aba estiver aberta",
      },
    ],
  },
  {
    category: "Funcionais de terceiros",
    consent: "Só com o seu consentimento",
    rows: [
      {
        name: "Cookies do Calendly",
        origin: "Calendly (terceiro)",
        purpose:
          "Permitem abrir e operar o agendamento de demonstração dentro do site. Definidos pelo próprio Calendly quando o recurso é carregado.",
        duration: "Definida pelo Calendly",
      },
    ],
  },
  {
    category: "Analíticos",
    consent: "Só com o seu consentimento",
    rows: [
      {
        name: "Nenhum ativo no momento",
        origin: "—",
        purpose:
          "Reservamos esta categoria para medição agregada de uso das páginas. Se passarmos a usar, nada é carregado sem a sua permissão e esta tabela é atualizada.",
        duration: "—",
      },
    ],
  },
];

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Cookies"
      title="Política de Cookies"
      subtitle={`O que cada cookie faz, por que ele existe e como desligar o que não for essencial. Última atualização: ${LAST_UPDATE}.`}
    >
      <LegalBody>
        <div className="rounded-2xl border border-border bg-surface/60 p-6">
          <p className="text-[15px] font-medium text-foreground">
            Gerencie agora a sua escolha
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Você pode alterar ou revogar o consentimento a qualquer momento, com
            o mesmo esforço que levou para concedê-lo.
          </p>
          <CookiePreferencesButton
            withIcon
            label="Abrir preferências de cookies"
            className="mt-4 h-11 rounded-lg bg-accent px-5 text-[15px] font-medium text-accent-foreground hover:brightness-110"
          />
        </div>

        <LegalSection index={1} title="O que são cookies">
          <p>
            Cookies são pequenos arquivos gravados no seu navegador quando você
            visita um site. Aqui usamos o termo em sentido amplo, incluindo
            tecnologias equivalentes como <strong>localStorage</strong> e{" "}
            <strong>sessionStorage</strong> — que é o que este site de fato
            utiliza para guardar a sua escolha.
          </p>
          <p>
            Alguns são indispensáveis para o site funcionar. Outros existem
            apenas se você permitir.
          </p>
        </LegalSection>

        <LegalSection index={2} title="Como pedimos o seu consentimento">
          <LegalList
            items={[
              "Nada que não seja estritamente necessário é carregado antes de você decidir. Enquanto não houver escolha, nenhum script de terceiro entra na página.",
              "Recusar é tão fácil quanto aceitar: os dois botões aparecem lado a lado, na primeira tela do aviso, com o mesmo número de cliques.",
              "A escolha é granular por finalidade — você pode aceitar uma categoria e recusar outra.",
              "Registramos a versão do aviso e a data da decisão, como comprovação do consentimento.",
              "Você pode rever ou revogar quando quiser, pelo link Preferências de cookies no rodapé de qualquer página.",
            ]}
          />
        </LegalSection>

        <LegalSection index={3} title="Cookies que este site utiliza">
          <p>
            Esta é a lista completa. Se algo mudar, atualizamos a tabela e a data
            no topo da página.
          </p>

          <div className="mt-2 space-y-8">
            {inventory.map((group) => (
              <div key={group.category}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[16px] font-medium tracking-tight text-foreground">
                    {group.category}
                  </h3>
                  <span className="text-[13px] text-accent">
                    {group.consent}
                  </span>
                </div>

                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-border">
                        {["Nome", "Origem", "Finalidade", "Duração"].map((h) => (
                          <th
                            key={h}
                            scope="col"
                            className="py-2.5 pr-4 text-[12.5px] font-medium uppercase tracking-wider text-muted"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((r) => (
                        <tr key={r.name} className="border-b border-border">
                          <td className="py-3.5 pr-4 align-top font-mono text-[13px] text-subtle">
                            {r.name}
                          </td>
                          <td className="py-3.5 pr-4 align-top text-[13.5px] text-muted">
                            {r.origin}
                          </td>
                          <td className="py-3.5 pr-4 align-top text-[13.5px] leading-relaxed text-muted">
                            {r.purpose}
                          </td>
                          <td className="py-3.5 align-top text-[13.5px] text-muted">
                            {r.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </LegalSection>

        <LegalSection index={4} title="O que muda se você recusar">
          <p>
            O site continua funcionando por inteiro. A única diferença prática é
            o agendamento de demonstração: sem os cookies funcionais, ele não
            abre dentro desta página — abrimos o agendamento em uma nova aba, no
            site do próprio fornecedor, onde os cookies ficam sob a
            responsabilidade dele.
          </p>
          <p>
            O formulário de contato não depende de cookies não essenciais e
            funciona normalmente em qualquer cenário.
          </p>
        </LegalSection>

        <LegalSection index={5} title="Revogação e limpeza">
          <p>
            Ao revogar uma categoria, deixamos de carregar os recursos
            correspondentes e apagamos os cookies acessíveis ao navegador.
            Cookies marcados como <strong>HttpOnly</strong> por terceiros só
            podem ser removidos pelo domínio que os criou — nesses casos,
            recomendamos limpar os dados do site pelo próprio navegador.
          </p>
          <p>
            Você também pode bloquear ou apagar cookies diretamente nas
            configurações do Chrome, Firefox, Safari ou Edge. Bloquear os
            estritamente necessários pode impedir o funcionamento do site.
          </p>
        </LegalSection>

        <LegalSection index={6} title="Base legal e seus direitos">
          <p>
            Cookies estritamente necessários são tratados com base no legítimo
            interesse, por serem indispensáveis à prestação do serviço. Os
            demais dependem do seu <strong>consentimento</strong>, livre,
            informado e específico, nos termos do art. 7º, I, da LGPD.
          </p>
          <p>
            Seus direitos como titular — acesso, correção, eliminação,
            portabilidade e revogação — estão detalhados na{" "}
            <Link href="/privacidade">Política de Privacidade</Link>. Para
            exercê-los, escreva para{" "}
            <a href="mailto:contato@morubi.ai">contato@morubi.ai</a>.
          </p>
        </LegalSection>
      </LegalBody>
    </PageShell>
  );
}
