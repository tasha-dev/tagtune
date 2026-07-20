import { FilesStoreType, FileStoreMediaType } from "@/type/store";
import { create } from "zustand";

const filesStore = create<FilesStoreType>((set, get) => ({
  files: [],
  addFilesArray: (files) => {
    set((state) => ({
      files: [
        ...state.files,
        ...files.map(
          (item) =>
            Object.assign(item, {
              id: crypto.randomUUID(),
              playbackURL: URL.createObjectURL(item),
            }) as FileStoreMediaType,
        ),
      ],
    }));
  },
  removeFile: (id) => {
    const filesCopy = [...get().files];
    const filesToSet = filesCopy.filter((item) => item.id !== id);

    set({
      files: filesToSet,
    });
  },
  clearFiles: () => {
    set({
      files: [],
    });
  },
}));

export default filesStore;
