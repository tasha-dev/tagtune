import Image from "next/image";
import LogoImage from "@/public/logo.png";
import Link from "next/link";
import { ThemeToggler } from "./themeToggler";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Code, Layout } from "lucide-react";

const dataToRender: {
   href: string;
   label: string;
   icon: React.ReactNode;
   variant?: "outline" | "default";
}[] = [
   {
      href: "https://github.com/tasha-dev",
      label: "GitHub",
      icon: <Code />,
      variant: "outline",
   },
   {
      href: "/app",
      label: "Start Using",
      icon: <Layout />,
   },
];

export default function Header() {
   return (
      <header className="border-b border-b-foreground/10">
         <div className="py-1.5 px-4 mx-auto max-w-2xl flex items-center justify-between">
            <Link href="/" className="shrink-0">
               <Image
                  width={50}
                  height={50}
                  alt="Logo"
                  src={LogoImage.src}
                  className="size-9"
               />
            </Link>
            <nav className="flex items-center justify-end gap-2 flex-1">
               <ThemeToggler />
               {dataToRender.map((item, index) => (
                  <Tooltip key={index}>
                     <TooltipTrigger
                        render={
                           <Button
                              variant={item.variant}
                              render={<Link href={item.href}>{item.icon}</Link>}
                           />
                        }
                     />
                     <TooltipContent>{item.label}</TooltipContent>
                  </Tooltip>
               ))}
            </nav>
         </div>
      </header>
   );
}
