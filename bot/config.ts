const telegramToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
const supabaseLink = Deno.env.get("SUPABASE_LINK");
const supabaseKey = Deno.env.get("SUPABASE_KEY");
const deployHook = Deno.env.get("CLOUDFLARE_DEPLOY_HOOK");
const port = Deno.env.get("PORT");

const getEnv = () => {
  if (!telegramToken || !supabaseKey || !supabaseLink || !deployHook || !port) {
    throw new Error("Environment variables are not defined");
  }

  return { telegramToken, supabaseKey, supabaseLink, deployHook, port };
};

export const config = getEnv();
