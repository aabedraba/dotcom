import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { config } from "./config.ts";
import { handleRequest } from "./bot.ts";

const app = new Application(); // or whatever you're using
const router = new Router();

router.get("/" + config.telegramToken, async (ctx) => {
  return (ctx.response.body = "Hello!");
});
router.post("/" + config.telegramToken, async (ctx) => {
  return await handleRequest();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Starting bot...");

app.listen({
  port: parseInt(config.port, 10),
});

console.log("Listening on http://localhost:" + config.port);
