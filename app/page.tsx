import Header from "@/component/header";
import Hero from "@/component/section/hero";

export default function HomePage() {
   return (
      <>
         <Header />
         <Hero className="lg:border-b-0 border-b border-b-foreground/10" />
      </>
   );
}
