import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import {
  Coaching, FinalCta, HowAndTrust, Integrations, Intelligence, LearningTransition,
  LiveStory, Manager, NewFaq, NewHero, OutcomesPricing, Playbook, ZeroPrompt,
} from "@/components/sections/homepage";

export default function Home() {
  return <><Navbar/><main><NewHero/><LearningTransition/><LiveStory/><ZeroPrompt/><Intelligence/><Manager/><Coaching/><Playbook/><Integrations/><HowAndTrust/><OutcomesPricing/><NewFaq/><FinalCta/></main><Footer/></>;
}
