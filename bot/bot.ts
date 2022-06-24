import { Bot, webhookCallback } from "https://deno.land/x/grammy@v1.9.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.3";
import { config } from "./config.ts";

const bot = new Bot(config.telegramToken);

const supabase = createClient(config.supabaseLink, config.supabaseKey);

bot.hears(/\/new_tweet (.+)/, async (ctx) => {
  ctx.reply("Silent Tweet received. Uploading to database...");
  await supabase.from("silent_tweets").insert([{ tweet: ctx.match[1] }]);

  ctx.reply("Triggering new website deployment...");
  await fetch(config.deployHook, {
    method: "POST",
  });

  return ctx.reply("Silent Tweet deployed!");
});

export const handleRequest = webhookCallback(bot, "oak");
