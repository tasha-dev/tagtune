"use client";

import { cn, mbToBytes } from "@/lib/util";
import { DropzoneProps } from "@/type/component";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import AudioFile from "./audioFile";

export default function Dropzone({
  className,
  files,
  onFilesChange,
}: DropzoneProps) {
  const {
    getRootProps,
    getInputProps,
    isFileDialogActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    maxSize: mbToBytes(20),
    onDropAccepted: (files) => onFilesChange?.(files),
    onError: (error) => {
      toast.error(error.name);
    },
    accept: {
      "audio/*": [],
    },
  });

  return (
    <>
      <div>
        <input {...getInputProps()} />
        <div
          {...getRootProps()}
          data-focused={isFileDialogActive || isDragAccept}
          data-error={isDragReject}
          className={cn(
            "bg-card text-card-foreground rounded-md border-2 border-dashed border-current/10 min-h-[300px] cursor-pointer",
            "flex p-4 items-center justify-center flex-col hover:border-current/30 transition-all duration-500",
            "data-[focused=true]:border-current/50 data-[error=true]:text-destructive",
            className,
          )}
        >
          <div className="size-10 flex items-center justify-center rounded-md border mb-5 bg-current/5 border-current/10">
            <Upload className="size-5" />
          </div>
          <span className="font-heading text-base leading-normal font-medium text-center block truncate mb-2">
            {acceptedFiles.length === 0
              ? isDragAccept
                ? "Drop the file"
                : "Upload Audio File"
              : `${acceptedFiles.length} Audio files`}
          </span>
          <p className="text-sm text-muted-foreground text-center">
            Drag and drop your audio file here, or click to browse. <br />{" "}
            Supports MP3, WAV, M4A, and OGG formats (max file size: 20MB).
          </p>
        </div>
      </div>
      {acceptedFiles.length !== 0 && (
        <div className="mt-5 space-y-4">
          {acceptedFiles.map((item, index) => (
            <AudioFile key={index} file={item} />
          ))}
        </div>
      )}
    </>
  );
}
