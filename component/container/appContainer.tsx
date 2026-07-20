"use client";

import filesStore from "@/store/files";
import Dropzone from "../dropzone";
import AudioFile from "../audioFile";
import MusicPlayer from "../musicPlayer";

export default function AppContainer() {
  const { files, addFilesArray } = filesStore();

  return (
    <>
      <Dropzone onFilesChange={addFilesArray} />
      <MusicPlayer />
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
