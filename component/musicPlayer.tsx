"use client";

import { cn } from "@/lib/util";
import filesStore from "@/store/files";
import playbackStore from "@/store/playback";
import { ClassOnlyProps } from "@/type/component";
import { AnimatePresence, motion } from "framer-motion";

export default function MusicPlayer({ className }: ClassOnlyProps) {
  const { files } = filesStore();
  const { currentPlayingID } = playbackStore();

  const playingAudio = files.find((item) => item.id === currentPlayingID);

  return (
    <AnimatePresence>
      {playingAudio && (
        <motion.div
          exit={{
            y: 100,
            opacity: 0,
          }}
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 100,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className={cn(
            "fixed bottom-0 left-0 w-full bg-card shadow-black/50 shadow-lg",
            className,
          )}
        >
          <div className="max-w-2xl mx-auto p-4">
            <h1>HI</h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
