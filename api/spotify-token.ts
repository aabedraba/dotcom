import { encode as base64Encode } from "https://deno.land/std@0.82.0/encoding/base64.ts";
import { config } from "./config.ts";

export const getSpotifyAuthToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        base64Encode(config.spotifyClientId + ":" + config.spotifySecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: config.spotifyRefreshToken,
    }),
  });

  if (response.status === 200) {
    const json = await response.json();
    return json["access_token"];
  }

  return null;
};
