import { cn } from "@/lib/util";
import { ClassOnlyProps } from "@/type/component";
import Link from "next/link";

const dataToRender: {
   title: string;
   items: {
      label: string;
      href: string;
   }[];
}[] = [
   {
      title: "Tech Stack",
      items: [
         {
            label: "Next.js",
            href: "https://nextjs.org",
         },
         {
            label: "React",
            href: "https://react.dev",
         },
         {
            label: "TypeScript",
            href: "https://www.typescriptlang.org",
         },
         {
            label: "Tailwind CSS",
            href: "https://tailwindcss.com",
         },
         {
            label: "shadcn/ui",
            href: "https://ui.shadcn.com",
         },
      ],
   },
   {
      title: "Navigation",
      items: [
         {
            label: "Home",
            href: "/",
         },
         {
            label: "Features",
            href: "/#features",
         },
         {
            label: "Author",
            href: "https://github.com/tasha-dev",
         },
      ],
   },
   {
      title: "Resources",
      items: [
         {
            label: "Report an Issue",
            href: "https://github.com/tasha-dev/tagtune/issues/new",
         },
         {
            label: "Repository",
            href: "https://github.com/tasha-dev/tagtune",
         },
      ],
   },
];

export default function Footer({ className }: ClassOnlyProps) {
   return (
      <footer className={cn("border-t border-t-foreground/10", className)}>
         <main className="border-b border-b-foreground/20 bg-foreground/5">
            <div className="max-w-2xl p-4 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mx-auto">
               {dataToRender.map((section, index) => (
                  <div
                     key={index}
                     className="prose prose-neutral dark:prose-invert max-w-full w-full"
                  >
                     <h4>{section.title}</h4>
                     <ul>
                        {section.items.map((item, itemIndex) => (
                           <li key={itemIndex}>
                              <Link href={item.href}>{item.label}</Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </main>
         <div className="bg-foreground/10">
            <div className="max-w-2xl p-4 mx-auto prose prose-neutral dark:prose-invert">
               <p className="text-center">© 2026 TagTune — Mahdi Tasha </p>
            </div>
         </div>
      </footer>
   );
}
