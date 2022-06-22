import { serve } from "https://deno.land/std/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.82.0/encoding/base64.ts";

serve(async () => {
  const authToken = await getSpotifyAuthToken();

  if (!authToken) {
    return new Response(null, {
      status: 401,
    });
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

  return Response.json(lastSong);
});

const getSpotifyAuthToken = async () => {
  const spotifyClientId = Deno.env.get("SPOTIFY_CLIENT_ID");
  const spotifySecret = Deno.env.get("SPOTIFY_CLIENT_SECRET");
  const spotifyRefreshToken = Deno.env.get("SPOTIFY_REFRESH_TOKEN");

  if (!spotifyClientId || !spotifySecret || !spotifyRefreshToken) {
    return null;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + base64Encode(spotifyClientId + ":" + spotifySecret),
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
