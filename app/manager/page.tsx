import type { Metadata } from "next";
import { BarChart3, Lightbulb, TableProperties, Users } from "lucide-react";
import { ManagerDashboard } from "@/components/product-ui";
import { SolutionPage } from "@/components/solution-page";
export const metadata:Metadata={title:"Morubi Manager",description:"Visibilidade gerencial sobre calls, comportamentos e gargalos do time.",alternates:{canonical:"/manager"}};
export default function Page(){return <SolutionPage eyebrow="Morubi Manager" title="Você não precisa assistir 400 calls para entender seu time." description="Veja comportamentos, gargalos e oportunidades de desenvolvimento em toda a operação — com acesso à evidência por trás de cada insight." note="Interface demonstrativa com dados fictícios consistentes." capabilities={[{icon:BarChart3,title:"Performance",text:"Uma leitura da operação por período e por vendedor."},{icon:Users,title:"Evolução individual",text:"Forças, gaps e recomendações por pessoa."},{icon:Lightbulb,title:"Insights",text:"Padrões interpretados em linguagem de negócio."},{icon:TableProperties,title:"Relatórios",text:"Resumo recorrente para manter o foco do gestor."}]}><ManagerDashboard/></SolutionPage>}
