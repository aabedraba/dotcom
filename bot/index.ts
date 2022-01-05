import TelegramBot from "node-telegram-bot-api";
import express from "express";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aabedraba-com.firebaseapp.com",
  databaseURL: "https://aabedraba-com.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(firebaseApp));

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
    async (msg) => {
      const messageText = msg.text;
      const newTweet = {
        test: messageText,
        date: new Date().getTime(),
      };

      const data = await get(child(dbRef, `tweets`));
      const tweetsArray = [...data.val().filter((value) => value), newTweet];

      set(child(dbRef, `tweets`), tweetsArray);

      bot.sendMessage(chatId, "Uploaded");
      bot.removeReplyListener(replyListener);
      return;
    }
  );
});
