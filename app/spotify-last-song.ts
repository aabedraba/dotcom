const spotifyClientId = process.env["SPOTIFY_CLIENT_ID"];
const spotifySecret = process.env["SPOTIFY_CLIENT_SECRET"];
const spotifyRefreshToken = process.env["SPOTIFY_REFRESH_TOKEN"];

const getEnv = () => {
  if (!spotifyClientId || !spotifySecret || !spotifyRefreshToken) {
    throw new Error("Environment variables are not defined");
  }

  return { spotifyClientId, spotifySecret, spotifyRefreshToken };
};

export const getSpotifyAuthToken = async () => {
  const config = getEnv();

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: config.spotifyRefreshToken,
  });

  const authHeader =
    "Basic " +
    Buffer.from(
      config.spotifyClientId + ":" + config.spotifySecret,
      "utf-8"
    ).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-cache",
  });

  if (response.status !== 200) {
    console.warn(await response.text());
    return null;
  }

  const json = await response.json();
  return json["access_token"];
};

export const getSpotifyLastSong = async () => {
  const authToken = await getSpotifyAuthToken();

  if (!authToken) {
    console.warn("Could not get auth token");
    return null;
  }

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
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
  };
};
