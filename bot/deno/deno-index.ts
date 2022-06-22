import { Bot } from "https://deno.land/x/grammy/mod.ts";

// Create bot object
const bot = new Bot("5033857686:AAFVqGnluBgcatHJ4JDbTyluwe7BJQytRuc"); // <-- place your bot token inside this string

bot.hears(/\/new_tweet (.+)/, async (ctx) => {
  return ctx.reply(ctx.match[1]);
});

bot.start();
