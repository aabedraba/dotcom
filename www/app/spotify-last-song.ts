const spotifyClientId = process.env["SPOTIFY_CLIENT_ID"]
const spotifySecret = process.env["SPOTIFY_CLIENT_SECRET"];
const spotifyRefreshToken = process.env["SPOTIFY_REFRESH_TOKEN"];
const port = process.env["PORT"];

const getEnv = () => {
  if (!spotifyClientId || !spotifySecret || !spotifyRefreshToken || !port) {
    throw new Error("Environment variables are not defined");
  }

  return { spotifyClientId, spotifySecret, spotifyRefreshToken, port };
};

export const getSpotifyAuthToken = async () => {
  const config = getEnv();

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(config.spotifyClientId + ":" + config.spotifySecret, 'utf-8').toString('base64'),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: config.spotifyRefreshToken,
    }),
  });

  if (response.status !== 200) {
    return null;

  }

  const json = await response.json();
  return json["access_token"];
};


export const getSpotifyLastSong = async () => {
  const authToken = await getSpotifyAuthToken();

  if (!authToken) {
    return null;
  }

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  const songItem = json.items[0];

  return {
    title: songItem.track.name,
    artists: songItem.track.artists
      .map((artist: { name: string }) => artist.name)
      .join(", "),
    songUrl: songItem.track.external_urls.spotify,
    lastPlayed: new Date(songItem.played_at),
  }
}
