import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, LegalBody, LegalSection, LegalList } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Morubi coleta, usa, armazena e protege dados pessoais, em conformidade com a LGPD. Papéis de controlador e operador, retenção, direitos do titular e contato do encarregado.",
  alternates: { canonical: "/privacidade" },
};

const LAST_UPDATE = "23 de julho de 2026";

export default function PrivacidadePage() {
  return (
    <PageShell
      eyebrow="Privacidade"
      title="Política de Privacidade"
      subtitle={`O Morubi lê conversas comerciais para funcionar. Por isso, tratar dados com cuidado não é um anexo do produto — é parte dele. Última atualização: ${LAST_UPDATE}.`}
    >
      <LegalBody>
        <p className="text-[15px] leading-relaxed text-muted">
          Esta Política descreve como o Morubi trata dados pessoais na operação
          do seu site institucional e da sua plataforma, em conformidade com a
          Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD). Ao usar o
          site ou a plataforma, você declara ter lido e compreendido este
          documento.
        </p>

        <LegalSection index={1} title="Quem somos e como falar conosco">
          <p>
            <strong>Morubi</strong> é a plataforma de inteligência comercial
            descrita neste site. Para qualquer assunto relacionado a dados
            pessoais — dúvidas, solicitações ou exercício de direitos —, o canal
            oficial é{" "}
            <a href="mailto:contato@morubi.ai">contato@morubi.ai</a>.
          </p>
          <p>
            Pedidos de titulares são registrados e respondidos dentro dos prazos
            previstos na LGPD. Quando necessário, podemos solicitar informações
            adicionais para confirmar a identidade de quem faz o pedido.
          </p>
        </LegalSection>

        <LegalSection index={2} title="Nossos dois papéis: controlador e operador">
          <p>
            O Morubi atua em dois papéis distintos, e a diferença importa para
            entender o resto desta Política.
          </p>
          <LegalList
            items={[
              <>
                <strong>Controlador</strong> — quanto aos dados de quem visita
                este site, solicita uma demonstração ou administra uma conta
                (nome, e-mail, empresa, telefone, dados de acesso). Nós
                decidimos por que e como esses dados são tratados.
              </>,
              <>
                <strong>Operador</strong> — quanto ao conteúdo das conversas
                comerciais processadas dentro da plataforma. Aí, quem decide é a
                empresa cliente, que é a controladora desses dados. Nós tratamos
                em nome dela, seguindo suas instruções e o contrato firmado.
              </>,
            ]}
          />
          <p>
            Na prática: se você é cliente final de uma empresa que usa o Morubi
            e quer saber sobre a sua conversa, o pedido deve ser dirigido a essa
            empresa — nós a apoiamos no atendimento, mas não decidimos sobre
            esses dados.
          </p>
        </LegalSection>

        <LegalSection index={3} title="Quais dados tratamos">
          <p>
            <strong>Dados de contato e navegação (site):</strong>
          </p>
          <LegalList
            items={[
              "Nome, e-mail corporativo, empresa, cargo e telefone informados em formulários ou no agendamento de demonstração.",
              "Dados técnicos de navegação, como endereço IP, tipo de dispositivo, navegador e páginas visitadas.",
              "Registros de comunicação por e-mail ou pelos canais de atendimento.",
            ]}
          />
          <p>
            <strong>Dados de conta e uso (plataforma):</strong>
          </p>
          <LegalList
            items={[
              "Dados cadastrais da empresa cliente e dos usuários (gestores e vendedores).",
              "Credenciais de acesso, armazenadas de forma cifrada — nunca em texto puro.",
              "Registros de uso: sugestões exibidas, feedback do vendedor, correções aplicadas e desfecho de atendimentos.",
            ]}
          />
          <p>
            <strong>Conteúdo das conversas (plataforma):</strong>
          </p>
          <LegalList
            items={[
              "Mensagens da conversa comercial ativa lida pelo painel, incluindo a identificação de quem falou o quê.",
              "Transcrições de áudios trocados nessa conversa.",
              "Informações incluídas pela empresa cliente na base de conhecimento.",
            ]}
          />
          <p>
            Não coletamos intencionalmente dados sensíveis nem dados de crianças
            e adolescentes. Se esse tipo de dado aparecer em uma conversa por
            iniciativa do cliente final, ele será tratado apenas na medida
            necessária ao funcionamento do serviço e sujeito às regras de
            retenção definidas com a empresa contratante.
          </p>
        </LegalSection>

        <LegalSection index={4} title="Para que usamos esses dados">
          <LegalList
            items={[
              "Executar o serviço contratado: interpretar a conversa ativa, calcular a probabilidade de fechamento, sugerir a próxima ação e apontar como contornar objeções.",
              "Transcrever e interpretar áudios das conversas.",
              "Gerar dashboards e indicadores de performance individual e do time para o gestor da empresa cliente.",
              "Manter a memória do produto: aprender com correções feitas por vendedores e gestores para reduzir erros futuros, no escopo da própria empresa cliente.",
              "Autenticar usuários, manter sessões seguras e prevenir fraude e uso indevido.",
              "Responder solicitações de contato, conduzir demonstrações e prestar suporte.",
              "Cumprir obrigações legais e regulatórias e exercer direitos em processos.",
            ]}
          />
        </LegalSection>

        <LegalSection index={5} title="Bases legais">
          <LegalList
            items={[
              <>
                <strong>Execução de contrato</strong> — para tudo que é
                necessário à prestação do serviço a clientes e usuários.
              </>,
              <>
                <strong>Legítimo interesse</strong> — para segurança da
                plataforma, prevenção a fraude, melhoria do produto e contato
                comercial com empresas, sempre com avaliação de impacto e
                respeito às expectativas do titular.
              </>,
              <>
                <strong>Consentimento</strong> — para comunicações de marketing
                e para cookies não essenciais, quando aplicável. Pode ser
                revogado a qualquer momento.
              </>,
              <>
                <strong>Cumprimento de obrigação legal</strong> — quando a lei
                exigir guarda ou fornecimento de informações.
              </>,
            ]}
          />
        </LegalSection>

        <LegalSection index={6} title="Com quem compartilhamos">
          <p>
            Não vendemos dados pessoais e não os cedemos para publicidade de
            terceiros. Compartilhamos apenas o necessário, com:
          </p>
          <LegalList
            items={[
              "Provedores de infraestrutura em nuvem e de processamento de linguagem que sustentam o serviço, contratualmente obrigados a confidencialidade e a tratar os dados somente conforme nossas instruções.",
              "Provedores de transcrição de áudio, no escopo estrito dessa função.",
              "Ferramentas de agendamento e comunicação usadas para marcar e conduzir demonstrações.",
              "Autoridades públicas, quando houver requisição legal válida.",
              "Terceiros envolvidos em reorganização societária, mantidos os compromissos desta Política.",
            ]}
          />
          <p>
            O conteúdo processado <strong>não</strong> é usado para treinar
            modelos de terceiros de uso geral. O aprendizado do Morubi acontece
            de forma isolada por empresa cliente: o que uma empresa alimenta não
            beneficia nem vaza para outra.
          </p>
        </LegalSection>

        <LegalSection index={7} title="Transferência internacional">
          <p>
            Parte da nossa infraestrutura pode estar localizada fora do Brasil.
            Nesses casos, a transferência ocorre com salvaguardas adequadas
            previstas na LGPD, incluindo cláusulas contratuais específicas de
            proteção de dados com os provedores envolvidos.
          </p>
        </LegalSection>

        <LegalSection index={8} title="Segurança">
          <LegalList
            items={[
              "Criptografia em trânsito (TLS) e em repouso.",
              "Isolamento estrito por empresa: nenhum cliente acessa dados de outro.",
              "Controle de acesso por papel — o vendedor vê apenas os próprios dados; o gestor vê os da sua empresa.",
              "Princípio do menor privilégio para acessos internos e credenciais de integração cifradas.",
              "Sessões com expiração curta e renovação segura; o logout invalida o acesso do painel no navegador.",
              "Registros de auditoria e monitoramento contínuo da plataforma.",
            ]}
          />
          <p>
            Nenhum sistema é infalível. Em caso de incidente de segurança com
            risco relevante, comunicamos os clientes afetados e a Autoridade
            Nacional de Proteção de Dados nos prazos e formas exigidos pela lei.
          </p>
        </LegalSection>

        <LegalSection index={9} title="Retenção e eliminação">
          <p>
            Guardamos os dados apenas pelo tempo necessário às finalidades
            descritas aqui ou ao cumprimento de obrigações legais. A política de
            retenção do conteúdo das conversas é definida com cada empresa
            cliente no contrato, incluindo a possibilidade de reduzir a guarda
            de conteúdo bruto ao mínimo necessário.
          </p>
          <p>
            Encerrado o contrato, os dados da empresa cliente são eliminados ou
            anonimizados dentro do prazo acordado, ressalvadas as hipóteses de
            guarda obrigatória previstas em lei.
          </p>
        </LegalSection>

        <LegalSection index={10} title="Direitos do titular">
          <p>
            A LGPD garante a você, titular, o direito de obter de nós, a
            qualquer momento:
          </p>
          <LegalList
            items={[
              "Confirmação da existência de tratamento e acesso aos dados.",
              "Correção de dados incompletos, inexatos ou desatualizados.",
              "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei.",
              "Portabilidade a outro fornecedor, observados os segredos comercial e industrial.",
              "Eliminação dos dados tratados com base no consentimento.",
              "Informação sobre com quem compartilhamos seus dados.",
              "Revogação do consentimento e informação sobre as consequências da negativa.",
            ]}
          />
          <p>
            Para exercer qualquer um deles, escreva para{" "}
            <a href="mailto:contato@morubi.ai">contato@morubi.ai</a>. Se a
            solicitação envolver dados em que atuamos como operador,
            encaminhamos ao cliente controlador e o apoiamos na resposta.
          </p>
        </LegalSection>

        <LegalSection index={11} title="Cookies">
          <p>
            Usamos cookies e tecnologias equivalentes para manter o site
            funcionando, lembrar preferências e entender de forma agregada como
            as páginas são usadas. Cookies estritamente necessários não podem
            ser desativados sem prejudicar o funcionamento do site; os demais
            dependem da sua escolha e podem ser bloqueados nas configurações do
            navegador.
          </p>
          <p>
            O agendamento de demonstração é feito por uma ferramenta de terceiro
            incorporada ao site, que pode definir cookies próprios ao ser
            aberta.
          </p>
        </LegalSection>

        <LegalSection index={12} title="Alterações desta Política">
          <p>
            Podemos atualizar esta Política para refletir mudanças no produto,
            na legislação ou nas nossas práticas. A data de última atualização
            no topo desta página sempre indica a versão vigente. Mudanças
            relevantes são comunicadas aos clientes pelos canais de contato
            cadastrados.
          </p>
          <p>
            Veja também os{" "}
            <Link href="/termos">Termos de Uso</Link> e a página de{" "}
            <Link href="/status">Status</Link> dos nossos serviços.
          </p>
        </LegalSection>
      </LegalBody>
    </PageShell>
  );
}
