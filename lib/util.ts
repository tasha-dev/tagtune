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
export function getPlaybackPercentage(
  currentTime: number,
  duration: number,
): number {
  if (!duration || duration <= 0 || !isFinite(duration)) return 0;
  const percent = (currentTime / duration) * 100;
  return Math.min(100, Math.max(0, percent));
}

export function removeAudioFormat(name: string) {
  const lastIndexOfDot = name.lastIndexOf(".");
  const slicedName = name.slice(0, lastIndexOfDot);

  return slicedName;
}
