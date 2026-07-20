import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bytesToMB(bytes: number) {
  if (bytes === 0) return 0;
  else {
    const mb = bytes / (1024 * 1024);
    return Number(mb.toFixed(2));
  }
}

export const mbToBytes = (mb: number) => mb * 1024 * 1024;
