export const reps = [
  { name: "Marina Alves", calls: 64, conversion: "31%", score: 86, trend: "up" },
  { name: "Rafael Oliveira", calls: 58, conversion: "19%", score: 71, trend: "down" },
  { name: "Lucas Mendes", calls: 72, conversion: "27%", score: 79, trend: "up" },
  { name: "Beatriz Lima", calls: 51, conversion: "23%", score: 76, trend: "flat" },
] as const;

export const callScenarios = [
  {
    id: "price",
    label: "Preço",
    time: "00:18:42",
    quote: "Eu gostei da solução, mas está acima do orçamento que tínhamos pensado.",
    detection: "Preço / percepção de valor",
    context: "O investimento apareceu antes de o impacto financeiro estar quantificado.",
    recommendation: "Não ofereça desconto ainda. Confirme se o investimento é o principal impeditivo.",
    question: "Tirando o investimento, existe algo que impediria vocês de avançar hoje?",
  },
  {
    id: "competitor",
    label: "Concorrente",
    time: "00:24:08",
    quote: "A outra solução parece entregar quase a mesma coisa por um valor menor.",
    detection: "Concorrente + comparação de escopo",
    context: "O prospect comparou preço, mas ainda não validou as diferenças entre as entregas.",
    recommendation: "Explore os critérios da comparação antes de defender a solução.",
    question: "Quais capacidades pesaram mais na avaliação que vocês fizeram?",
  },
  {
    id: "delay",
    label: "Decisão",
    time: "00:31:16",
    quote: "Gostei, mas preciso pensar e conversar com meu sócio antes de decidir.",
    detection: "Decisor não envolvido",
    context: "Há interesse, mas o processo decisório e os critérios do sócio ainda não estão claros.",
    recommendation: "Não pressione por uma resposta. Mapeie o processo de decisão.",
    question: "O que seu sócio precisa enxergar para se sentir seguro com o próximo passo?",
  },
] as const;

export const callTimeline = [
  { time: "00:02", label: "Rapport", detail: "Contexto e agenda alinhados." },
  { time: "00:07", label: "Discovery", detail: "Processo atual mapeado." },
  { time: "00:14", label: "Dor identificada", detail: "Baixa visibilidade das conversas." },
  { time: "00:21", label: "Buying signal", detail: "Pergunta sobre implantação." },
  { time: "00:29", label: "Objeção de preço", detail: "Comparação com a solução atual." },
  { time: "00:31", label: "Morubi acionada", detail: "Orientação contextual exibida." },
  { time: "00:38", label: "Concorrente", detail: "Escopo comparado com clareza." },
  { time: "00:47", label: "Negociação", detail: "Valor retomado antes do preço." },
  { time: "00:54", label: "Próximo passo", detail: "Reunião com decisor combinada." },
] as const;

export const scoreDimensions = [
  ["Discovery", 78],
  ["Rapport", 91],
  ["Construção de valor", 74],
  ["Objeções", 88],
  ["Negociação", 79],
  ["Fechamento", 68],
] as const;

export const dashboardMetrics = [
  ["Calls analisadas", "438"],
  ["Oportunidades", "126"],
  ["Conversão", "24,8%"],
  ["Deal Score médio", "74"],
  ["Objeções identificadas", "312"],
] as const;

export const productStatus = {
  live: "in-development",
  intelligence: "in-development",
  coach: "planned",
  manager: "in-development",
  whatsapp: "available",
  crm: "available",
} as const;

