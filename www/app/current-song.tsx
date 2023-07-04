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

export const CurrentSong = ({
  songDetails
}: {
  songDetails: {
    title: string;
    artists: string;
    songUrl: string;
    lastPlayed: string;
  } | null;
}) => {
  dayjs.extend(relativeTime);

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
