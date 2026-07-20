import { FilesStoreType, FileStoreMediaType } from "@/type/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const filesStore = create<FilesStoreType>()(
  persist(
    (set, get) => ({
      files: [],
      addFilesArray: (files) => {
        set((state) => ({
          files: [
            ...state.files,
            ...files.map(
              (item) =>
                Object.assign(item, {
                  id: crypto.randomUUID(),
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
    }),
    {
      name: "files-store", // localStorage key
    },
  ),
);

export default filesStore;
