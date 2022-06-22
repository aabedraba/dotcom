import { Bot } from "https://deno.land/x/grammy/mod.ts";
import { createClient } from "https://deno.land/x/supabase/mod.ts";

const telegramToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
const supabaseLink = Deno.env.get("SUPABASE_LINK");
const supabaseKey = Deno.env.get("SUPABASE_KEY");

if (!telegramToken || !supabaseKey || !supabaseLink) {
  throw new Error("Environment variables are not defined");
}

const bot = new Bot(telegramToken); // <-- place your bot token inside this string

const supabase = createClient(supabaseLink, supabaseKey);

bot.hears(/\/new_tweet (.+)/, async (ctx) => {
  const bucketList = await supabase.storage.listBuckets();
  console.log(bucketList);
  return ctx.reply(ctx.match[1]);
});

bot.start();
