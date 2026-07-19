import Footer from "@/component/footer";
import Header from "@/component/header";
import { Button } from "@/component/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Page not found",
};

export default function NotFoundPage() {
   return (
      <>
         <Header />
         <section
            className={
               "lg:min-h-[calc(100dvh-50px)] lg:flex lg:items-center lg:justify-center max-w-2xl mx-auto"
            }
         >
            <main className="p-4">
               <div className="prose prose-neutral dark:prose-invert w-full max-w-full mb-5">
                  <h2 className="lg:text-center text-destructive">404</h2>
                  <h1 className="lg:text-center">Page not found</h1>
                  <p className="lg:text-center">
                     The page you're looking for doesn't exist or may have been
                     moved.
                  </p>
               </div>
               <div className="flex items-center lg:justify-center gap-2 flex-wrap">
                  <Button
                     variant={"outline"}
                     render={<Link href="/">Head home</Link>}
                  />
               </div>
            </main>
         </section>
         <Footer />
      </>
   );
}
