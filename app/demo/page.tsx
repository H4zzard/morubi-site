import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { InteractiveDemo } from "@/components/interactive-demo";
export const metadata:Metadata={title:"Demonstração interativa",description:"Veja como uma call alimenta todo o sistema Morubi.",alternates:{canonical:"/demo"}};
export default function Page(){return <><Navbar/><main><InteractiveDemo/></main><Footer/></>}
