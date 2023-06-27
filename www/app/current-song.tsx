"use client"

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const LoadingLastPlayedSong = () => {
  return (
    <div className="animate-pulse space-y-4 mt-1">
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-40 h-3 bg-gray-200 rounded"></div>
    </div>
  );
};

export const CurrentSong = () => {
  const [songDetails, setSongDetails] = useState<{
    title: string;
    artists: string;
    songUrl: string;
    lastPlayed: Date;
  } | null>(null);

  dayjs.extend(relativeTime);


  useEffect(() => {
    async function getCurrentSongDetails() {
      const request = await fetch("https://aabedraba-spotify-auth.deno.dev");

      if (request.status === 401) {
        return;
      }

      const json = await request.json();

      setSongDetails({
        title: json.track.name,
        artists: json.track.artists
          .map((artist: { name: string }) => artist.name)
          .join(", "),
        songUrl: json.track.external_urls.spotify,
        lastPlayed: new Date(json.played_at),
      });
    }

    getCurrentSongDetails();
  }, []);

  return <div>
    <span className="text-gray-900">Recently played on my Spotify</span>
    {songDetails ? (
      <div className="flex flex-col">
        <span>
          <a href={songDetails.songUrl}>
            {songDetails.title}
            <p>
              by <span className="italic">{songDetails.artists}</span>
            </p>
          </a>
          <p className="text-gray-900">
            {dayjs(songDetails.lastPlayed).fromNow()}
          </p>
        </span>
      </div>
    ) : (
      <LoadingLastPlayedSong />
    )}
  </div>
}
