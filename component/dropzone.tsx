"use client";

import { cn, mbToBytes } from "@/lib/util";
import { DropzoneProps } from "@/type/component";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function Dropzone({ className, onFilesChange }: DropzoneProps) {
  const {
    getRootProps,
    getInputProps,
    isFileDialogActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxSize: mbToBytes(20),
    onDrop: (files) => onFilesChange?.(files),
    onError: (error) => {
      toast.error(error.name);
    },
    accept: {
      "audio/*": [],
    },
  });

  return (
    <div>
      <input {...getInputProps()} />
      <div
        {...getRootProps()}
        data-focused={isFileDialogActive || isDragAccept}
        data-error={isDragReject}
        className={cn(
          "bg-card text-card-foreground rounded-md border-2 border-dashed border-current/10 min-h-[300px] cursor-pointer overflow-hidden",
          "flex p-4 items-center justify-center flex-col hover:border-current/30 transition-all duration-500",
          "data-[focused=true]:border-current/50 data-[error=true]:text-destructive",
          className,
        )}
      >
        <div className="lg:size-10 size-9 flex items-center justify-center rounded-md border lg:mb-5 mb-3 bg-current/5 border-current/10">
          <Upload className="lg:size-5 size-4" />
        </div>
        <span className="font-heading lg:text-base text-sm leading-normal font-medium text-center block truncate mb-2">
          {isDragAccept ? "Drop the file" : "Upload Audio File"}
        </span>
        <p className="lg:text-sm text-xs text-muted-foreground text-center">
          Drag and drop your audio file here, or click to browse. <br />{" "}
          Supports MP3, WAV, M4A, and OGG formats (max file size: 20MB).
        </p>
      </div>
    </div>
  );
}
