import type { Metadata } from "next";
import { Dumbbell, Gauge, GraduationCap, Target } from "lucide-react";
import { CoachPanel } from "@/components/product-ui";
import { SolutionPage } from "@/components/solution-page";
export const metadata:Metadata={title:"Morubi Coach",description:"Coaching baseado no que cada vendedor realmente faz.",alternates:{canonical:"/coach"}};
export default function Page(){return <SolutionPage eyebrow="Morubi Coach" title="Coaching baseado no que o vendedor realmente faz." description="Cada pessoa entende seus pontos fortes, os comportamentos que limitam o resultado e o próximo treino que vale a pena fazer." note="Coach, Roleplay e Ramp Mode são visões de roadmap; confirme o estágio de cada módulo na demonstração." capabilities={[{icon:Target,title:"Score individual",text:"Competências comerciais organizadas por dimensão."},{icon:Dumbbell,title:"Roleplay",text:"Cenários de treino ligados a gaps reais."},{icon:Gauge,title:"Ramp Mode",text:"Assistência ajustada ao estágio do vendedor."},{icon:GraduationCap,title:"Recomendação",text:"Um próximo passo claro para desenvolver o time."}]}><CoachPanel/></SolutionPage>}
