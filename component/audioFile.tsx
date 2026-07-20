"use client";

import { bytesToMB, cn } from "@/lib/util";
import { AudioFileProps } from "@/type/component";
import { Pause, Pen, Play, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import playbackStore from "@/store/playback";
import filesStore from "@/store/files";

export default function AudioFile({ file, className }: AudioFileProps) {
  const { togglePlay, currentPlayingID } = playbackStore();
  const { removeFile } = filesStore();
  const isPlaying = file.id === currentPlayingID;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 bg-card text-card-foreground border border-current/10 rounded-md p-2",
        className,
      )}
    >
      <div className="flex-1 flex overflow-hidden gap-2">
        <Button
          size="icon"
          className={"shrink-0"}
          onClick={() => togglePlay(file.id)}
        >
          {!isPlaying ? (
            <Play className="fill-current" />
          ) : (
            <Pause className="fill-current" />
          )}
        </Button>
        <div className="flex-1 overflow-hidden">
          <span className="font-heading text-sm leading-normal font-medium block truncate">
            {file.name}
          </span>
          <span className="text-xs text-muted-foreground block">
            {bytesToMB(file.size)} MB
          </span>
        </div>
      </div>
      <div className="shrink-0 flex gap-1">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button size={"icon"} variant={"secondary"}>
                <Pen />
              </Button>
            }
          />
          <TooltipContent>Edit metadata of the audio file</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                size="icon"
                variant="destructive"
                onClick={() => {
                  removeFile(file.id);
                  if (isPlaying) {
                    togglePlay(file.id);
                  }
                }}
              >
                <Trash />
              </Button>
            }
          />
          <TooltipContent>Delete audio</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
