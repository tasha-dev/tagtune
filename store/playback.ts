import { PlaybackStoreType } from "@/type/store";
import { create } from "zustand";

const playbackStore = create<PlaybackStoreType>((set, get) => {
  return {
    currentPlayingID: undefined,
    togglePlay: (id) => {
      const currentPlayingID = get().currentPlayingID;

      set({
        currentPlayingID:
          id !== currentPlayingID ? id : !currentPlayingID ? id : undefined,
      });
    },
  };
});

export default playbackStore;
