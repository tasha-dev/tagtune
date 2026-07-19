import Header from "@/component/header";
import Features from "@/component/section/features";
import Hero from "@/component/section/hero";

export default function HomePage() {
   return (
      <>
         <Header />
         <Hero className="lg:border-b-0 border-b border-b-foreground/10" />
         <Features className="lg:border-b-0 border-b border-b-foreground/10" />
      </>
   );
}
