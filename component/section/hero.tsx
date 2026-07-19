import { ClassOnlyProps } from "@/type/component";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero({ className }: ClassOnlyProps) {
   return (
      <section className={className}>
         <main className="max-w-2xl p-4 mx-auto lg:min-h-[calc(100vh-50px)] flex-col lg:flex items-center justify-center">
            <div className="prose prose-neutral dark:prose-invert w-full max-w-full lg:mb-8 mb-4">
               <h3 className="lg:text-center">TagTune</h3>
               <h1 className="lg:text-center">Edit MP3 Metadata in Seconds</h1>
               <p className="lg:text-center">
                  Upload an MP3, update its metadata, replace album artwork,
                  preview the track, and download the edited file <br /> — all
                  locally in your browser.
               </p>
            </div>
            <div className="flex items-center lg:justify-center flex-wrap gap-2">
               <Button render={<Link href="/app">Get Started</Link>} />
               <Button
                  variant={"outline"}
                  render={<Link href="/#features">Features</Link>}
               />
            </div>
         </main>
      </section>
   );
}
