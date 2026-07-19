"use client";

import { Button } from "@/component/ui/button";
import { ClassOnlyProps } from "@/type/component";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/component/ui/tooltip";

export function ThemeToggler({ className }: ClassOnlyProps) {
   const { theme, setTheme } = useTheme();
   return (
      <Tooltip>
         <TooltipTrigger
            render={
               <Button
                  className={className}
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => {
                     if (theme === "dark") setTheme("light");
                     else setTheme("dark");
                  }}
               >
                  <SunMoon />
               </Button>
            }
         />
         <TooltipContent>Toggle theme</TooltipContent>
      </Tooltip>
   );
}
