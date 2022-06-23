import { Bot } from "https://deno.land/x/grammy@v1.9.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.3";

const telegramToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
const supabaseLink = Deno.env.get("SUPABASE_LINK");
const supabaseKey = Deno.env.get("SUPABASE_KEY");
const deployHook = Deno.env.get("CLOUDFLARE_DEPLOY_HOOK");

if (!telegramToken || !supabaseKey || !supabaseLink || !deployHook) {
  throw new Error("Environment variables are not defined");
}

const bot = new Bot(telegramToken);

const supabase = createClient(supabaseLink, supabaseKey);

bot.hears(/\/new_tweet (.+)/, async (ctx) => {
  ctx.reply("Silent Tweet received. Uploading to database...");
  await supabase.from("silent_tweets").insert([{ tweet: ctx.match[1] }]);

  ctx.reply("Triggering new website deployment...");
  await fetch(deployHook, {
    method: "POST",
  });

  return ctx.reply("Silent Tweet deployed!");
});

bot.start();
