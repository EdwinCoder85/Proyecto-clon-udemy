import React from 'react'
import ReactPlayer from 'react-player';
import { XMarkIcon } from "@heroicons/react/24/outline";

interface VideoPlayerProps {
  url: string;
  onClose: () => void;
}

export default function VideoPlayer({ url, onClose } : VideoPlayerProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-2 right-2 bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center z-50"
          title="Cerrar reproductor de video"
        >
          <XMarkIcon className="h-6 w-6 text-white font-extrabold" />
        </button>
        <ReactPlayer url={url} controls width="900px" height="600px" />
      </div>
    </div>
  );
}