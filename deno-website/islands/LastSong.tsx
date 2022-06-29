/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { tw } from "twind";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";

const LoadingLastPlayedSong = () => {
  return (
    <div className="animate-pulse space-y-4 mt-1">
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-40 h-3 bg-gray-200 rounded"></div>
    </div>
  );
};

const LastSong = () => {
  const [songDetails, setSongDetails] = useState<{
    title: string;
    artists: string;
    songUrl: string;
    lastPlayed: Date;
  } | null>(null);

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

  dayjs.extend(relativetime);
  return (
    <div>
      <span className={tw`text-gray-900`}>Recently played on my Spotify</span>
      {songDetails ? (
        <div className={tw`flex flex-col`}>
          <span>
            <a href={songDetails.songUrl} className="text-blue-600">
              {songDetails.title}
              <p>
                by <span className={tw`italic`}>{songDetails.artists}</span>
              </p>
            </a>
            <p className={tw`text-gray-900`}>
              {(dayjs(songDetails.lastPlayed) as any).fromNow()}
            </p>
          </span>
        </div>
      ) : (
        <LoadingLastPlayedSong />
      )}
    </div>
  );
};

export default LastSong;
