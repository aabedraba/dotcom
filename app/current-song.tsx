"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

const LoadingLastPlayedSong = () => {
  return (
    <div className="animate-pulse space-y-4 mt-1">
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-40 h-3 bg-gray-200 rounded"></div>
    </div>
  );
};

type SongDetails = {
  title: string;
  artists: string;
  songUrl: string;
  lastPlayed: Date;
};

export const CurrentSong = () => {
  const [song, setSong] = useState<SongDetails | null>(null);

  useEffect(() => {
    fetch("/api/last-played")
      .then((res) => res.json())
      .then((data) => {
        setSong(data);
      });
  }, []);

  dayjs.extend(relativeTime);

  return (
    <div>
      <span className="text-gray-900">Recently played on my Spotify</span>
      {song ? (
        <div className="flex flex-col">
          <span>
            <a href={song.songUrl}>
              {song.title}
              <p>
                by <span className="italic">{song.artists}</span>
              </p>
            </a>
            <p className="text-gray-900">{dayjs(song.lastPlayed).fromNow()}</p>
          </span>
        </div>
      ) : (
        <LoadingLastPlayedSong />
      )}
    </div>
  );
};
