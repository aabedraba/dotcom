import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authToken = await getSpotifyAuthToken();

  if (!authToken) {
    return res.status(401);
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
  const lastSong = json.items[0];

  return res.send(lastSong);
}

const getSpotifyAuthToken = async () => {
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID || null;
  const spotifySecret = process.env.SPOTIFY_CLIENT_SECRET || null;
  const spotifyRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN || null;

  if (!spotifyClientId || !spotifySecret || !spotifyRefreshToken) {
    return null;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(spotifyClientId + ":" + spotifySecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: spotifyRefreshToken,
    }),
  });

  if (response.status === 200) {
    const json = await response.json();
    return json["access_token"];
  }

  return null;
};
