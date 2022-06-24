const spotifyClientId = Deno.env.get("SPOTIFY_CLIENT_ID");
const spotifySecret = Deno.env.get("SPOTIFY_CLIENT_SECRET");
const spotifyRefreshToken = Deno.env.get("SPOTIFY_REFRESH_TOKEN");
const port = Deno.env.get("PORT");

const getEnv = () => {
  if (!spotifyClientId || !spotifySecret || !spotifyRefreshToken || !port) {
    throw new Error("Environment variables are not defined");
  }

  return { spotifyClientId, spotifySecret, spotifyRefreshToken, port };
};

export const config = getEnv();
