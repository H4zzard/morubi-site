import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, LegalBody, LegalSection, LegalList } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Condições de uso da plataforma Morubi: contratação, papéis de usuário, responsabilidades, propriedade intelectual, disponibilidade e encerramento.",
  alternates: { canonical: "/termos" },
};

const LAST_UPDATE = "23 de julho de 2026";

export default function TermosPage() {
  return (
    <PageShell
      eyebrow="Termos"
      title="Termos de Uso"
      subtitle={`As regras do jogo entre a sua empresa e o Morubi, em português claro. Última atualização: ${LAST_UPDATE}.`}
    >
      <LegalBody>
        <p className="text-[15px] leading-relaxed text-muted">
          Estes Termos regem o acesso e o uso do site e da plataforma Morubi. Ao
          criar uma conta, instalar o painel no navegador ou usar qualquer parte
          do serviço, você concorda com o que está escrito aqui. Se você aceita
          em nome de uma empresa, declara ter poderes para isso.
        </p>

        <LegalSection index={1} title="O que o Morubi é — e o que não é">
          <p>
            O Morubi é uma plataforma de inteligência comercial. Ele acompanha
            as conversas da equipe de vendas, interpreta o contexto, estima a
            probabilidade de fechamento, sugere a próxima ação e entrega ao
            gestor a leitura de performance do time.
          </p>
          <LegalList
            items={[
              "Não é um chatbot: o Morubi não envia mensagens ao cliente final. Quem responde é sempre o vendedor.",
              "Não é um CRM e não substitui o sistema que a sua empresa já usa.",
              "Não substitui o julgamento humano: as sugestões são apoio à decisão, não ordem.",
            ]}
          />
        </LegalSection>

        <LegalSection index={2} title="Contratação e contas">
          <LegalList
            items={[
              "O serviço é destinado a pessoas jurídicas e a usuários maiores de 18 anos vinculados a elas.",
              "A empresa contratante é titular da conta e responde pelo uso feito pelos seus usuários.",
              "Cada usuário tem acesso individual e intransferível. Compartilhar credenciais é proibido.",
              "Há dois papéis: gestor, que configura a operação e vê os dados do time, e vendedor, que usa o painel e vê apenas os próprios dados.",
              "A empresa deve manter seus dados cadastrais corretos e comunicar imediatamente qualquer suspeita de acesso não autorizado.",
            ]}
          />
        </LegalSection>

        <LegalSection index={3} title="Assinatura, preço e pagamento">
          <LegalList
            items={[
              "A cobrança é por vendedor ativo, em ciclo mensal, conforme a proposta comercial aceita.",
              "O custo de processamento da inteligência está incluído no preço por assento.",
              "Ativações e desativações de usuários no meio do ciclo são refletidas na fatura seguinte.",
              "Atraso no pagamento pode gerar suspensão do acesso, após aviso prévio pelos canais cadastrados.",
              "Reajustes e mudanças de preço são comunicados com antecedência mínima de 30 dias.",
            ]}
          />
        </LegalSection>

        <LegalSection index={4} title="Uso aceitável">
          <p>Ao usar o Morubi, a empresa e seus usuários se comprometem a não:</p>
          <LegalList
            items={[
              "Usar a plataforma para fins ilícitos, enganosos ou que violem direitos de terceiros.",
              "Tentar burlar limites técnicos, fazer engenharia reversa, copiar ou redistribuir o serviço.",
              "Automatizar o envio de mensagens a clientes finais por meio do serviço.",
              "Inserir na base de conhecimento conteúdo sobre o qual não tenha direitos ou autorização.",
              "Sobrecarregar intencionalmente a infraestrutura ou comprometer sua segurança.",
            ]}
          />
        </LegalSection>

        <LegalSection index={5} title="Dados e responsabilidades sobre as conversas">
          <p>
            O conteúdo das conversas processadas pertence à empresa cliente, que
            atua como controladora desses dados. Cabe a ela garantir base legal
            adequada e transparência com os clientes finais quanto ao uso de
            ferramentas de apoio comercial.
          </p>
          <p>
            O Morubi atua como operador, tratando esses dados apenas para
            prestar o serviço. Os detalhes estão na{" "}
            <Link href="/privacidade">Política de Privacidade</Link>, que é parte
            integrante destes Termos.
          </p>
          <p>
            A empresa cliente também é responsável pela exatidão do conteúdo que
            alimenta a base de conhecimento — é dele que saem boa parte das
            recomendações.
          </p>
        </LegalSection>

        <LegalSection index={6} title="Propriedade intelectual">
          <p>
            A plataforma, a marca, o software, a interface e a documentação são
            de titularidade do Morubi. O contrato concede à empresa cliente uma
            licença de uso limitada, não exclusiva e intransferível, válida
            enquanto durar a assinatura.
          </p>
          <p>
            O conteúdo que a empresa insere na plataforma continua sendo dela.
            Concede-se ao Morubi apenas a licença necessária para operar o
            serviço contratado.
          </p>
        </LegalSection>

        <LegalSection index={7} title="Disponibilidade e suporte">
          <p>
            Trabalhamos com meta de disponibilidade mensal de 99,5% do backend,
            publicada na página de <Link href="/status">Status</Link>.
            Manutenções programadas são anunciadas com antecedência sempre que
            possível.
          </p>
          <p>
            O funcionamento da leitura de conversas depende de plataformas de
            terceiros (navegadores, canais de mensagem e sistemas da empresa).
            Mudanças feitas por esses terceiros podem afetar temporariamente a
            leitura de um canal — nesses casos, atuamos para restabelecer o
            funcionamento e comunicamos o status.
          </p>
        </LegalSection>

        <LegalSection index={8} title="Limitação de responsabilidade">
          <p>
            As recomendações do Morubi são baseadas em interpretação automática
            de conversas e nas informações fornecidas pela própria empresa.
            Podem conter imprecisões. A decisão comercial — o que dizer, o que
            oferecer, quanto cobrar — é sempre da empresa e do vendedor.
          </p>
          <p>
            Na máxima extensão permitida em lei, o Morubi não responde por lucros
            cessantes, perda de oportunidade de negócio ou danos indiretos. A
            responsabilidade total, quando houver, fica limitada ao valor pago
            pela empresa nos 12 meses anteriores ao evento.
          </p>
        </LegalSection>

        <LegalSection index={9} title="Encerramento">
          <LegalList
            items={[
              "A empresa cliente pode cancelar a qualquer momento, sem multa, pelo canal contato@morubi.ai.",
              "Podemos suspender ou encerrar o acesso em caso de violação destes Termos ou de inadimplência, com aviso prévio quando cabível.",
              "Após o encerramento, os dados são eliminados ou anonimizados conforme a política de retenção acordada.",
            ]}
          />
        </LegalSection>

        <LegalSection index={10} title="Alterações, lei aplicável e foro">
          <p>
            Podemos atualizar estes Termos. Mudanças relevantes são comunicadas
            com antecedência razoável pelos canais cadastrados, e a data no topo
            desta página indica a versão vigente.
          </p>
          <p>
            Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro
            do domicílio da empresa contratante para dirimir controvérsias, com
            renúncia a qualquer outro.
          </p>
          <p>
            Dúvidas sobre estes Termos:{" "}
            <a href="mailto:contato@morubi.ai">contato@morubi.ai</a>.
          </p>
        </LegalSection>
      </LegalBody>
    </PageShell>
  );
}
