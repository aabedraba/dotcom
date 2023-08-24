import querystring from "node:querystring";

const client_id = Deno.env.get("SPOTIFY_CLIENT_ID") || "";
const client_secret = Deno.env.get("SPOTIFY_CLIENT_SECRET") || "";
const redirect_uri = "http://localhost:8888/callback";

Deno.serve({
  port: 8888,
  handler: async (req: Request) => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const state = Deno.env.get("SPOTIFY_CLIENT_SECRET") || "";
    const scope = "user-read-recently-played";

    if (pathname === "/callback") {
      const code = url.searchParams.get("code");

      const response = await fetch("https://accounts.spotify.com/api/token", {
        headers: {
          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: querystring.stringify({
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        }),
      });

      const json = await response.json();

      return new Response(JSON.stringify(json), {
        headers: { "content-type": "application/json" },
      });
    }

    return Response.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        }),
      307
    );
  },
});
