# PRD — Morubi

**Um gerente comercial de IA que acompanha cada conversa, orienta o vendedor em tempo real e mostra ao gestor onde a operação ganha ou perde vendas.**

| | |
|---|---|
| **Produto** | Morubi (nome provisório) |
| **Categoria** | Sales Intelligence / Real-time Sales Copilot (B2B SaaS + extensão de navegador) |
| **Documento** | PRD — versão 1.0 |
| **Data** | 16/07/2026 |
| **Autor** | Product Marketing / Product |
| **Status** | Draft para validação |

---

## 1. Sumário executivo

Morubi é um **gerente comercial de IA**. Ele é composto por duas peças que trabalham juntas:

1. **Uma extensão de navegador** (Chrome, via Side Panel) que abre um painel de chat ao lado da aba onde o vendedor está atendendo. A extensão **lê a conversa ativa** — independente do canal aberto na aba, com foco inicial em **WhatsApp Web e CRMs** — entende o contexto, ouve os áudios, calcula a **probabilidade de fechamento naquele momento**, sugere **o que o vendedor deve responder** e, ao surgir uma objeção, indica **como contorná-la usando os dados da própria empresa**.

2. **Um SaaS de backoffice** (web) onde o gestor configura a empresa, conecta integrações, alimenta a base de conhecimento e a memória da IA, define as LLMs, e acompanha **dashboards de conversão individuais e macro**. É também onde vendedores e gestores fazem login — o mesmo login autentica a extensão e faz a IA "puxar" o contexto certo daquele vendedor específico.

O que Morubi **não é**: não é um chatbot que responde clientes, não é um CRM e não substitui o vendedor. Quem conversa com o cliente continua sendo o humano. Morubi trabalha **ao lado** dele.

Diferenciais centrais:
- **Contexto por vendedor**: cada conta é individual; a IA pontua acertos e erros de cada vendedor e gera coaching individual.
- **Memória evolutiva**: a IA aprende com os próprios erros e se ajusta. Quando ela alucina, o vendedor corrige no chat e ela **guarda a correção para nunca mais errar**.
- **Fechamento do ciclo**: ao registrar venda ganha, Morubi pode subir a venda automaticamente no **ERP via REST API** (fase posterior ao V1).

**Comprador** = gestor comercial / dono. **Usuário diário** = vendedor. **Modelo de cobrança** = por vendedor/mês.

---

## 2. Problema

A venda B2B não se perde no fim do mês — ela se perde **conversa por conversa**, e quando o relatório chega já é tarde.

| Dor | Consequência |
|---|---|
| O gestor não consegue acompanhar todas as conversas de todos os vendedores. | Perde o controle da operação; só descobre o problema no fechamento. |
| Vendedores esquecem follow-up. | Leads esfriam e morrem sem ninguém perceber. |
| Objeções mal respondidas na hora. | Conversão despenca em negociações que eram ganháveis. |
| Treinar vendedor novo leva meses. | Rampagem lenta, alto custo, inconsistência de discurso. |
| Falta de previsibilidade. | O mês vira aposta; forecast não é confiável. |
| Conhecimento da empresa fica na cabeça dos melhores vendedores. | Não escala; sai com quem sai da empresa. |

**Insight de posicionamento:** vendemos **resultado** (mais conversão, mais controle, menos vendas perdidas, previsibilidade), não tecnologia. A copy do produto e do marketing **evita** termos como "IA", "GPT", "LLM", "IA generativa". Internamente (este PRD) usamos os termos técnicos livremente.

---

## 3. Objetivos e métricas de sucesso

### 3.1 Objetivos de produto (V1)
1. Provar que o copiloto em tempo real **aumenta a conversão** de quem o usa vs. quem não usa.
2. Entregar ao gestor uma **leitura clara** de performance individual e macro.
3. Estabelecer o **loop de memória evolutiva** com correção humana.

### 3.2 North Star Metric
**Vendas influenciadas por Morubi** = nº de negócios ganhos em que uma recomendação do copiloto foi visualizada/aplicada antes do fechamento.

### 3.3 KPIs

| Categoria | Métrica | Meta inicial |
|---|---|---|
| Ativação | % de vendedores que usam a extensão ≥ 3 dias na 1ª semana | ≥ 60% |
| Engajamento | Conversas ativas com painel aberto / dia por vendedor | ≥ 8 |
| Valor | Uplift de conversão (coorte com Morubi vs. sem) | ≥ +15% em 90 dias |
| Qualidade da IA | % de sugestões marcadas como úteis (thumbs up) | ≥ 70% |
| Confiabilidade | Taxa de alucinação reportada por conversa | < 3% |
| Negócio | Net Revenue Retention | ≥ 110% |
| Negócio | Churn logo mensal | < 3% |

---

## 4. Personas

### 4.1 Vendedor (usuário diário)
- Atende leads no WhatsApp Web / CRM o dia inteiro.
- Quer fechar mais, sem burocracia e sem parecer que "tem um robô respondendo por ele".
- Precisa de ajuda **na hora**, não de relatório depois.
- **Não é o comprador**, mas é quem faz ou quebra a adoção.

### 4.2 Gestor comercial / Coordenador / Dono (comprador)
- Empresas de **5 a 100 vendedores**.
- Segmentos: clínicas, imobiliárias, energia solar, educação, consórcios, serviços, franquias.
- Quer **controle**, **previsibilidade** e **rampagem mais rápida** de novos vendedores.
- Compra o resultado; configura a operação no SaaS.

### 4.3 Admin / TI da empresa (secundário)
- Conecta ERP/CRM, cuida de credenciais e permissões.
- Preocupado com segurança e LGPD.

---

## 5. Escopo

### 5.1 Dentro do V1 (obrigatório para lançar)
- **Autenticação e contas** com dois papéis: Vendedor e Gestor (multi-tenant por empresa).
- **SaaS do gestor**: onboarding da empresa, base de conhecimento, configuração da IA (gerenciada por nós), gestão de vendedores, dashboards.
- **Extensão (Side Panel)**: login herdado do SaaS; leitura da **conversa ativa** na aba (adaptador WhatsApp Web + adaptadores para CRMs prioritários); copiloto em tempo real.
- **Copiloto em tempo real**: entende contexto, estágio da venda, **probabilidade de fechamento**, **sugestão de resposta**, **detecção e contorno de objeção** com base na empresa.
- **Análise de áudio**: transcrição e interpretação dos áudios do WhatsApp.
- **Dashboards do gestor**: conversão, ranking, atendimentos x ganhos x perdidos por período, visão individual e macro.
- **Memória evolutiva + correção de alucinação**: vendedor corrige no chat e a IA passa a acertar.
- **Registro de resultado**: marcar venda ganha/perdida (manual ou detectada), alimentando dashboards.

### 5.2 Fora do V1 (roadmap)
- **Registro automático no ERP via REST API** (V1.1 — alto valor, porém depende de integração por ERP).
- Integração nativa com múltiplos CRMs (além de leitura de tela): sincronização bidirecional.
- Instagram Direct e outros canais além de WhatsApp Web / CRMs.
- App mobile / extensão em outros navegadores além do Chrome.
- Coaching automatizado agendado (playbooks), alertas proativos por e-mail/Slack.
- Marketplace de integrações, BYO-LLM key (enterprise), SSO/SAML.

> **Princípio de escopo (definido com o time):** não é para ter tudo no V1 — mas a base do gestor (SaaS para alimentar informações, conectar a IA e habilitar o login que a extensão consome) **é obrigatória**, senão a extensão não tem contexto para puxar.

---

## 6. Arquitetura do produto (visão macro)

```
┌──────────────────────────────────────────────────────────────────┐
│                        NAVEGADOR DO VENDEDOR                       │
│                                                                    │
│   Aba principal (WhatsApp Web / CRM)   │   Side Panel (Morubi)    │
│   ┌───────────────────────────────┐   │   ┌────────────────────┐  │
│   │  Conversa ativa com o cliente │◀──┼───│  Content script lê  │  │
│   │                               │   │   │  o DOM da conversa  │  │
│   └───────────────────────────────┘   │   ├────────────────────┤  │
│                                        │   │  Chat do copiloto   │  │
│                                        │   │  • Probabilidade    │  │
│                                        │   │  • Sugestão         │  │
│                                        │   │  • Contorno objeção │  │
│                                        │   │  • Correção humana  │  │
│                                        │   └─────────┬──────────┘  │
└──────────────────────────────────────────────────────┼────────────┘
                                                        │ HTTPS (token do vendedor)
                                                        ▼
┌──────────────────────────────────────────────────────────────────┐
│                         BACKEND MORUBI (nuvem)                     │
│  Auth & Tenancy │ Orquestrador de IA │ Base de conhecimento (RAG)  │
│  Memória evolutiva │ Motor de métricas │ Transcrição de áudio      │
│  Conectores (ERP/CRM – fase 2) │ API do SaaS                       │
└───────────────┬───────────────────────────────┬──────────────────┘
                │                                │
                ▼                                ▼
        LLM gerenciado (nós)            SaaS Web (gestor/vendedor)
        + Vector store (RAG)            Dashboards, config, base
```

**Componentes**
- **Extensão Chrome (Manifest V3, Side Panel API):** content scripts leem o DOM da conversa ativa via **adaptadores por canal**; painel React renderiza o chat do copiloto. Abre ao lado da aba principal (padrão semelhante à extensão do Claude).
- **Backend:** API multi-tenant, orquestração de IA (RAG sobre a base de conhecimento da empresa + memória do vendedor), pipeline de transcrição de áudio, motor de métricas.
- **LLM gerenciado por nós:** provider e modelo escolhidos e hospedados pela Morubi; o gestor **não** precisa fornecer chave. Custo de inferência embutido no preço.
- **SaaS Web:** onde vive login, configuração, base de conhecimento e dashboards.

---

## 7. Requisitos funcionais

### 7.1 Autenticação, contas e multi-tenancy

- **RF-01** Cadastro/login por e-mail e senha; recuperação de senha. (SSO fica para enterprise/roadmap.)
- **RF-02** Dois papéis: **Gestor** e **Vendedor**. Um mesmo tenant (empresa) tem 1..N gestores e 1..N vendedores.
- **RF-03** Gestor convida vendedores (por e-mail); cada vendedor tem conta individual vinculada ao tenant.
- **RF-04** Isolamento de dados por tenant (empresa não vê dados de outra). Vendedor só vê os próprios dados; gestor vê todos do tenant.
- **RF-05** A extensão autentica com o **mesmo login** do SaaS. Ao logar, a extensão **puxa o perfil do vendedor**: nome, empresa, base de conhecimento, conexões/integrações e configurações da IA daquele vendedor.
- **RF-06** Sessão da extensão expira e renova com segurança (token curto + refresh). Logout invalida a extensão.

### 7.2 SaaS do gestor — configuração da operação

- **RF-07 Onboarding da empresa:** dados da empresa, segmento, produtos/serviços, discurso comercial, diferenciais, política de descontos.
- **RF-08 Base de conhecimento (memória da IA):** gestor alimenta a IA com informações da empresa — argumentos, respostas a objeções, FAQ, tabelas, materiais. Suporta texto e upload de documentos. Vira o **RAG** que o copiloto consulta.
- **RF-09 Gestão de vendedores:** criar/convidar/desativar vendedores, ver status (ativo/online).
- **RF-10 Configuração da IA (gerenciada por nós):** ajustes de comportamento (tom, agressividade da sugestão, quando falar de preço), sem exigir chave de LLM do cliente.
- **RF-11 Integrações:** área para conectar sistemas da empresa. **V1:** cadastro de credenciais/endpoints para uso futuro; **V1.1:** ERP via REST. (ver 7.7)

### 7.3 SaaS do gestor — dashboards e analytics

- **RF-12** Visão **macro** do tenant: conversão geral, nº de atendimentos, ganhos, perdidos por período.
- **RF-13** Visão **individual**: por vendedor — atendimentos/oportunidades x ganhos x perdidos em um período, taxa de conversão, evolução no tempo.
- **RF-14** **Ranking de vendedores** por conversão / volume.
- **RF-15** **Erros mais comuns** por vendedor e agregados (ex.: falou de preço cedo demais, follow-up perdido, ignorou sinal de compra) — derivados da avaliação da IA sobre os atendimentos.
- **RF-16** **Leads em risco / leads quentes** com probabilidade.
- **RF-17** Filtros por período; comparação entre vendedores; comparação de oportunidades vs. resultados.
- **RF-18** Gráficos de conversão (macro e individual) — o gestor consegue navegar de "todos" até "um vendedor".

### 7.4 Extensão — leitura da conversa ativa

- **RF-19** A extensão detecta a **conversa aberta na aba** e lê seu conteúdo em tempo (quase) real.
- **RF-20 Arquitetura de adaptadores:** um adaptador por canal encapsula como extrair mensagens do DOM.
  - **V1:** adaptador **WhatsApp Web** (prioridade máxima) + adaptadores para **CRMs prioritários** (a definir com base na demanda: ex. Kommo, RD Station, Pipedrive/HubSpot web).
  - Objetivo de design: **ler o chat que estiver aberto na hora, independente do canal**, degradando com elegância quando o layout for desconhecido.
- **RF-21** Distinguir **mensagens do cliente** vs. **do vendedor**.
- **RF-22 Áudio:** capturar os áudios da conversa, enviar para transcrição e usar o conteúdo no raciocínio. Indicar ao vendedor quando um áudio está sendo processado.
- **RF-23** Nunca **enviar** mensagem pelo canal automaticamente no V1 (a IA sugere; o humano decide e envia). Isso mantém o produto fora da categoria "chatbot" e reduz risco de ToS/bloqueio.

> **Nota de risco (WhatsApp):** ler o DOM do WhatsApp Web é sensível a mudanças de layout e a políticas da plataforma. Mitigações em §12. O produto **não automatiza envios**, apenas assiste o vendedor.

### 7.5 Extensão — copiloto em tempo real

Para a conversa ativa, o copiloto entrega:

- **RF-24 Contexto e estágio da venda:** identifica em que ponto da negociação o lead está.
- **RF-25 Probabilidade de fechamento "naquela hora":** score dinâmico baseado no comportamento do lead (sinais de compra, hesitação, tempo de resposta, objeções).
- **RF-26 Sugestão de resposta:** o que o vendedor pode dizer agora, alinhado ao discurso e diferenciais da empresa.
- **RF-27 Detecção e contorno de objeção:** identifica a objeção e sugere como contornar **com base nos dados da própria empresa** (RAG da base de conhecimento).
- **RF-28 Momento ideal de ação:** sugere o melhor horário para ligar / retomar um follow-up.
- **RF-29 Resumo da conversa:** resumo sob demanda do estado da negociação.
- **RF-30 Chat livre:** o vendedor pode perguntar qualquer coisa ao copiloto sobre aquele lead/empresa.

### 7.6 Memória evolutiva e correção de alucinação

- **RF-31 Memória por vendedor + por empresa:** o copiloto usa (a) base de conhecimento da empresa e (b) histórico/estilo do vendedor.
- **RF-32 Aprendizado evolutivo:** a IA se ajusta ao longo do tempo a partir de resultados (o que foi sugerido x o que fechou) e do feedback.
- **RF-33 Correção humana em linha:** se a IA **alucinar** ou disser algo incorreto, o vendedor corrige no chat; a correção é **persistida** e passa a ter prioridade — a IA "nunca mais erra aquilo".
- **RF-34 Curadoria pelo gestor:** correções relevantes podem ser promovidas para a base de conhecimento da empresa (para valer para todos), com aprovação do gestor. Isso evita que uma correção errada de um vendedor contamine o tenant.
- **RF-35 Rastreabilidade:** toda resposta do copiloto pode citar a origem (base de conhecimento vs. inferência), ajudando o vendedor a confiar/corrigir.

### 7.7 Registro de resultado e integração ERP

- **RF-36 (V1)** Marcar o desfecho do atendimento: **venda ganha / perdida / em aberto**, com motivo. Alimenta dashboards e o loop de aprendizado.
- **RF-37 (V1.1 — pós-V1)** Ao registrar **venda ganha**, subir automaticamente para o **ERP via REST API**, com os dados corretos (cliente, itens, valores). Requer mapeamento por ERP e credenciais configuradas no SaaS.
- **RF-38 (V1.1)** Tratamento de erros/idempotência para não duplicar lançamentos no ERP.

---

## 8. Requisitos não-funcionais

- **RNF-01 Latência do copiloto:** sugestão útil em **≤ 3 s** após nova mensagem relevante; transcrição de áudio em tempo aceitável com feedback visual.
- **RNF-02 Disponibilidade:** ≥ 99,5% do backend.
- **RNF-03 Segurança:** criptografia em trânsito (TLS) e em repouso; credenciais de integração cifradas; princípio do menor privilégio; isolamento estrito por tenant.
- **RNF-04 Privacidade / LGPD:** o produto processa conversas com dados de clientes finais. Necessário: base legal, contrato/termos com o cliente (empresa) como controlador e Morubi como operador, política de retenção, anonimização quando possível, e opção de **não reter** conteúdo bruto além do necessário. Consentimento e DPA. Painel de exclusão de dados.
- **RNF-05 Performance da extensão:** não degradar a aba principal; leitura de DOM eficiente e resiliente a mudanças de layout.
- **RNF-06 Escalabilidade:** multi-tenant, pronto para empresas com até 100 vendedores simultâneos por tenant.
- **RNF-07 Observabilidade:** logs, métricas de qualidade da IA, detecção de quebra de adaptador (quando o layout de um canal muda).
- **RNF-08 Custo de inferência:** monitorado por tenant/vendedor; base para precificação por assento.
- **RNF-09 Compatibilidade:** Chrome (V1). Manifest V3.

---

## 9. Modelo de dados (entidades principais)

- **Tenant (Empresa):** dados cadastrais, segmento, configuração da IA, política de desconto.
- **Usuário:** papel (gestor/vendedor), vínculo ao tenant, status.
- **BaseDeConhecimento:** itens (texto/documento) do tenant → indexados no vector store (RAG).
- **MemóriaVendedor:** aprendizados e correções específicos de um vendedor.
- **Conversa/Atendimento:** referência ao lead, canal, mensagens observadas, áudios transcritos, estágio, probabilidade ao longo do tempo, desfecho.
- **Sugestão:** cada recomendação do copiloto + feedback (útil / corrigida) + se foi aplicada.
- **Correção:** conteúdo corrigido, autor, escopo (vendedor/tenant), status de curadoria.
- **Integração:** tipo (ERP/CRM), credenciais cifradas, mapeamento de campos.
- **MétricasAgregadas:** atendimentos, ganhos, perdidos, conversão por vendedor/período.

---

## 10. Fluxos-chave

### 10.1 Onboarding do gestor
1. Cria conta → cria empresa (tenant).
2. Preenche perfil da empresa e diferenciais.
3. Alimenta a base de conhecimento (argumentos, objeções, FAQ, materiais).
4. Convida vendedores.
5. (V1.1) Conecta ERP.
6. Vê dashboards populando conforme o time usa.

### 10.2 Login e uso do vendedor
1. Recebe convite → cria senha.
2. Instala a extensão → faz login com a mesma conta.
3. Extensão puxa contexto (nome, empresa, base, integrações).
4. Abre WhatsApp Web / CRM; o Side Panel abre ao lado.
5. Ao atender um lead, recebe probabilidade + sugestões + contorno de objeção em tempo real.
6. Corrige a IA quando necessário (memória evolutiva).
7. Marca o desfecho (ganha/perdida). (V1.1: sobe ao ERP.)

### 10.3 Loop de correção de alucinação
1. IA sugere algo incorreto.
2. Vendedor aponta o erro no chat e informa o correto.
3. Correção persistida (escopo vendedor).
4. Gestor pode promover a correção para o tenant (curadoria).
5. IA passa a responder corretamente para o escopo aplicável.

---

## 11. Modelo de negócio

- **Cobrança:** **por vendedor ativo/mês** (por assento). Escala com o tamanho da equipe e é previsível — padrão SaaS B2B.
- **Sem preços na landing e sem checkout.** Funil comercial:
  `Landing → Agendar demonstração → Reunião → Implantação assistida → Assinatura`.
- **Custo de inferência** (LLM gerenciado por nós) embutido no preço por assento; monitorado por vendedor (RNF-08).
- **Implantação assistida** como parte da entrada (configurar base de conhecimento, calibrar a IA, conectar canais).
- *(Decisão futura)* possível add-on de uso para volumes altos de áudio/mensagens; planos por faixa para simplificar vendas.

---

## 12. Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| **WhatsApp/ToS e quebra de layout** ao ler o DOM | Alto | Não automatizar envios (só assistir); arquitetura de adaptadores versionados; monitor de quebra; atualização rápida; roadmap para APIs oficiais quando fizer sentido. |
| **Alucinação da IA** prejudica a venda | Alto | Correção humana em linha (RF-33), RAG ancorado na base da empresa, citação de origem, curadoria do gestor. |
| **Adoção do vendedor** (ele não é o comprador) | Alto | UX de baixo atrito, valor imediato ("ajuda agora"), sem parecer robô; nunca responde pelo vendedor. |
| **LGPD / dados sensíveis de clientes** | Alto | DPA, base legal, retenção mínima, cifragem, isolamento por tenant, painel de exclusão (RNF-04). |
| **Custo de inferência** corrói margem | Médio | Modelo gerenciado com controle de custo, caching, roteamento de modelos, monitoramento por assento. |
| **Escopo inflar e atrasar o lançamento** | Médio | V1 travado em copiloto + dashboards + áudio; ERP e multi-CRM no roadmap. |
| **Múltiplos CRMs = muito mapeamento** | Médio | Priorizar por demanda; leitura genérica com degradação elegante; começar por WhatsApp Web. |

---

## 13. Roadmap por fases

- **V1 (MVP lançável):** contas vendedor/gestor + SaaS de configuração + base de conhecimento + LLM gerenciado + extensão com copiloto em tempo real (probabilidade, sugestão, contorno de objeção) + **áudio** + **dashboards do gestor** (individual e macro) + memória evolutiva com correção humana + registro manual de desfecho.
- **V1.1:** **registro automático no ERP via REST API**; curadoria de correções para o tenant; melhorias de adaptadores de CRM.
- **V1.2:** alertas proativos (follow-up, lead esfriando), coaching agendado/playbooks, exportações.
- **V2:** novos canais (Instagram Direct etc.), integrações bidirecionais de CRM, SSO/SAML, BYO-LLM enterprise, mobile.

---

## 14. Critérios de aceite do V1 (resumo)

- Gestor consegue: criar empresa, alimentar base, convidar vendedores, ver dashboards individuais e macro.
- Vendedor consegue: logar na extensão, ver o painel abrir ao lado da aba, receber probabilidade + sugestão + contorno de objeção em uma conversa real de WhatsApp Web, e ver áudios sendo interpretados.
- IA consulta a base da empresa (RAG) e aceita correção humana que persiste.
- Desfecho (ganha/perdida) registrado alimenta os gráficos.
- Isolamento por tenant e papéis funcionando; conformidade LGPD mínima documentada.

---

## 15. Questões em aberto

1. **Quais CRMs** entram na lista de adaptadores prioritários do V1 (por demanda dos primeiros clientes)?
2. **Retenção de conteúdo bruto**: quanto do texto/áudio guardamos vs. só features/derivados (impacto em LGPD e custo)?
3. **Faixa de preço** por vendedor/mês e limites de uso (áudios/mês) por assento.
4. **Detecção automática de desfecho** (ganha/perdida) vs. registro manual — quão longe ir no V1.
5. **Escopo de curadoria**: correção do vendedor vale só para ele por padrão? (proposta: sim; promoção ao tenant exige gestor.)
6. **Provider/modelo de LLM** específico e política de fallback/roteamento.

---

## 16. Glossário

- **Side Panel:** painel lateral do Chrome onde a extensão renderiza o chat do copiloto, ao lado da aba principal.
- **Adaptador de canal:** módulo que sabe extrair mensagens do DOM de um canal específico (WhatsApp Web, um CRM, etc.).
- **RAG:** técnica que faz a IA responder ancorada na base de conhecimento da empresa (reduz alucinação).
- **Memória evolutiva:** capacidade da IA de se ajustar a partir de resultados e correções humanas.
- **Tenant:** a empresa cliente; unidade de isolamento de dados.
- **Assento:** um vendedor ativo licenciado (unidade de cobrança).

---

> **Nome provisório:** "Morubi". Nomenclatura de marca, tom e copy externa evitam termos técnicos de IA — o produto é vendido como um **gerente comercial**, não como tecnologia.
