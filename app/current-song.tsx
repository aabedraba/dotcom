import dayjs from "dayjs";
import { getSpotifyLastSong } from "./spotify-last-song";
import relativeTime from 'dayjs/plugin/relativeTime';

export const LoadingLastPlayedSong = () => {
  return (
    <div className="animate-pulse space-y-4 mt-1">
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-56 h-3 bg-gray-200 rounded"></div>
      <div className="w-40 h-3 bg-gray-200 rounded"></div>
    </div>
  );
};

export const CurrentSong = async () => {
  const song = await getSpotifyLastSong();
  
  dayjs.extend(relativeTime)

  if (!song) {
    return <LoadingLastPlayedSong />;
  }

  return (
    <div>
      <span className="text-gray-900">Recently played on my Spotify</span>
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
    </div>
  );
};
