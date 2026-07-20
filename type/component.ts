export interface RootLayoutProps {
  children: React.ReactNode;
}

export interface ClassOnlyProps {
  className?: string;
}

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface DropzoneProps {
  className?: string;
  onFilesChange?: (files: File[]) => void;
}

export interface AudioFileProps {
  className?: string;
  file: File;
}
