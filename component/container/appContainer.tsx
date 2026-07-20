"use client";

import filesStore from "@/store/files";
import Dropzone from "../dropzone";
import AudioFile from "../audioFile";
import playbackStore from "@/store/playback";

export default function AppContainer() {
  const { files, addFilesArray } = filesStore();
  const { currentPlayingID } = playbackStore();

  const playingAudio = files.find((item) => item.id === currentPlayingID);

  return (
    <>
      {playingAudio && (
        <audio src={playingAudio?.playbackURL} autoPlay hidden />
      )}
      <Dropzone onFilesChange={addFilesArray} />
      {files.length !== 0 && (
        <div className="mt-5 space-y-3">
          {files.map((item, index) => (
            <AudioFile key={index} file={item} />
          ))}
        </div>
      )}
    </>
  );
}
