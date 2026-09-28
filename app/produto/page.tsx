import type { Metadata } from "next";
import { BarChart3, BrainCircuit, Radio, Target } from "lucide-react";
import { LiveCallDemo } from "@/components/product-ui";
import { SolutionPage } from "@/components/solution-page";
export const metadata:Metadata={title:"Produto",description:"Conheça a camada de inteligência comercial Morubi.",alternates:{canonical:"/produto"}};
export default function Page(){return <SolutionPage eyebrow="Commercial Intelligence System" title="Inteligência comercial que trabalha junto com o seu time." description="A Morubi conecta assistência durante a venda, análise pós-call, gestão e desenvolvimento em um mesmo sistema." note="Módulos em diferentes estágios são identificados com transparência durante a demonstração." capabilities={[{icon:Radio,title:"Live",text:"Assistência contextual durante calls."},{icon:BrainCircuit,title:"Intelligence",text:"Evidências e análise pós-call."},{icon:Target,title:"Coach",text:"Desenvolvimento individual orientado por dados."},{icon:BarChart3,title:"Manager",text:"Padrões e visibilidade para a liderança."}]}><LiveCallDemo compact/></SolutionPage>}
