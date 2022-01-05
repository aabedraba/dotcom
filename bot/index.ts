import TelegramBot from "node-telegram-bot-api";
import express from "express";

const TOKEN = process.env.TELEGRAM_TOKEN || "";
const port = process.env.PORT;
const url = process.env.APP_URL;

const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();
app.use(express.json());

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

bot.onText(/\/new_tweet/, async (msg) => {
  const chatId = msg.chat.id;
  const tweetRequest = await bot.sendMessage(chatId, "Type the new tweet");
  const replyListener = bot.onReplyToMessage(
    tweetRequest.chat.id,
    tweetRequest.message_id,
    (msg) => {
      console.log("msg", msg);
      const passResponse = msg.text;

      bot.sendMessage(chatId, "Uploaded");
      bot.removeReplyListener(replyListener);
      return;
    }
  );
});
