import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getSpotifyAuthToken } from "./spotify-token.ts";
import { config } from "./config.ts";

const app = new Application();

app.use((ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  return next();
});

app.use(async (ctx) => {
  const authToken = await getSpotifyAuthToken();

  console.log("Hello tarik from the consoleI");

  if (!authToken) {
    return (ctx.response.status = 401);
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

  return (ctx.response.body = JSON.stringify(lastSong));
});

await app.listen({ port: parseInt(config.port, 10) });
console.log("Listening on http://localhost:8000");
