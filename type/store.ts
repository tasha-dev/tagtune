export interface FileStoreMediaType extends File {
  id: string;
}

export interface FilesStoreType {
  files: FileStoreMediaType[];
  addFilesArray: (file: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
}

export interface PlaybackStoreType {
  currentPlayingID?: string;
  togglePlay: (id: string) => void;
}
