"use client";

import { cn, getPlaybackPercentage, removeAudioFormat } from "@/lib/util";
import filesStore from "@/store/files";
import playbackStore from "@/store/playback";
import { ClassOnlyProps } from "@/type/component";
import { Button } from "@/component/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause } from "lucide-react";
import { SyntheticEvent, useRef, useState } from "react";
import { Slider } from "./ui/slider";

export default function MusicPlayer({ className }: ClassOnlyProps) {
  const { files } = filesStore();
  const { currentPlayingID, togglePlay } = playbackStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioTotalTime, setAudioTotalTime] = useState<number>(0);

  const updateCurrentTime = (e: SyntheticEvent<HTMLAudioElement, Event>) =>
    setAudioCurrentTime(e.currentTarget.currentTime);

  const playingAudio = files.find((item) => item.id === currentPlayingID);
  const indexOfPlayingAudio = playingAudio && files.indexOf(playingAudio);
  const nextAudio = indexOfPlayingAudio && files[indexOfPlayingAudio + 1];
  const prevAudio = indexOfPlayingAudio && files[indexOfPlayingAudio - 1];
  const timePercentage = getPlaybackPercentage(
    audioCurrentTime,
    audioTotalTime,
  );

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
            "fixed text-card-foreground bottom-0 left-0 w-full bg-card shadow-black/50 shadow-lg overflow-hidden z-0 border-t border-t-current/10",
            className,
          )}
        >
          {/* Artwork of the audio */}
          <div className="opacity-20 absolute left-0 top-0 w-full h-full -z-10" />
          <audio
            ref={audioRef}
            src={playingAudio.playbackURL}
            autoPlay
            hidden
            onDurationChange={updateCurrentTime}
            onTimeUpdate={updateCurrentTime}
            onLoadedMetadata={(audio) =>
              setAudioTotalTime(audio.currentTarget.duration)
            }
            onEnded={() => {
              // Play next Audio When a track ends
              const indexOfPlayingAudio = files.indexOf(playingAudio);

              if (indexOfPlayingAudio) {
                if (nextAudio) {
                  togglePlay(nextAudio.id);
                } else {
                  togglePlay(playingAudio.id);
                }
              }
            }}
          />
          <div className="max-w-2xl mx-auto p-4 flex items-center justify-between gap-3 relative z-10">
            <div className="flex-1">
              <span className="font-heading text-sm leading-normal font-medium block truncate mb-2">
                {removeAudioFormat(playingAudio.name)}
              </span>
              <Slider
                className={"w-full"}
                min={0}
                max={100}
                value={timePercentage}
                disabled
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={"secondary"}
                size="icon-lg"
                disabled={!prevAudio}
                onClick={() => {
                  if (prevAudio) {
                    togglePlay(prevAudio.id);
                  }
                }}
              >
                <ArrowLeft className="fill-current" />
              </Button>
              <Button
                size="icon-lg"
                onClick={() => togglePlay(playingAudio.id)}
              >
                <Pause className="fill-current" />
              </Button>
              <Button
                variant={"secondary"}
                size="icon-lg"
                disabled={!nextAudio}
                onClick={() => {
                  if (nextAudio) {
                    togglePlay(nextAudio.id);
                  }
                }}
              >
                <ArrowRight className="fill-current" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
