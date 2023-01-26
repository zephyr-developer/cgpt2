//添加Telegram系统（API）
const Telegraf = require('telegraf');

//添加Express
const express = require('express');

//添加OpenAi智能系统
const openai = require('openai');

//OpenAi的秘钥
openai.apiKey = "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";

const bot = new Telegraf('5905408753:AAFSRNKPRuM8md7YGNf0A4HxOXLW0NigSYg');
const telegram = new Telegraf('5905408753:AAFSRNKPRuM8md7YGNf0A4HxOXLW0NigSYg');

const app = express();
const port = process.env.PORT || 3000;

const token = '5905408753:AAFSRNKPRuM8md7YGNf0A4HxOXLW0NigSYg';

app.post('/webhook', (req, res) => {
  res.sendStatus(200);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  openai.completions.create({
    engine: "text-davinci-002",
    prompt: message,
    max_tokens:2048,
    temperature:0.5
  }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      const reply = response.choices[0].text;
      bot.sendMessage(chatId, reply);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
