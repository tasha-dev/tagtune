import { ClassOnlyProps } from "@/type/component";
import { Headphones, Image, Layers, Lock, Pen, Save } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const dataToRender: {
   icon: React.ReactNode;
   title: string;
   description: string;
}[] = [
   {
      icon: <Pen />,
      title: "Edit Metadata",
      description:
         "Update song information including title, artist, album, genre, year, lyrics, composer, track number, and more.",
   },
   {
      icon: <Image />,
      title: "Replace Album Artwork",
      description:
         "Upload a new cover image or remove the existing one with live preview before saving.",
   },
   {
      icon: <Headphones />,
      title: "Preview Audio",
      description:
         "Listen to your music while editing using the built-in lightweight audio player.",
   },
   {
      icon: <Layers />,
      title: "Build Your Library",
      description:
         "Keep uploaded songs in a local music library to quickly browse, edit, and manage your collection.",
   },
   {
      icon: <Save />,
      title: "Export MP3",
      description:
         "Download the updated MP3 with all metadata and album artwork embedded.",
   },
   {
      icon: <Lock />,
      title: "Privacy First",
      description:
         "Everything happens locally in your browser. Your music never leaves your device.",
   },
];

export default function Features({ className }: ClassOnlyProps) {
   return (
      <section className={className} id="#features">
         <main className="max-w-2xl p-4 mx-auto">
            <div className="prose prose-neutral dark:prose-invert w-full max-w-full mb-5">
               <h3>Features</h3>
            </div>
            <div className="grid lg:grid-cols-2 lg:gap-5 gap-4">
               {dataToRender.map((item, index) => (
                  <Card key={index} className="relative">
                     <CardHeader>
                        <div className="text-card-foreground size-9 rounded-md border border-current/10 bg-current/5 [&>svg]:size-4 flex items-center justify-center mb-5">
                           {item.icon}
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                     </CardHeader>
                  </Card>
               ))}
            </div>
         </main>
      </section>
   );
}
