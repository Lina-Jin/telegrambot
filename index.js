const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
// replace the value below with the Telegram token you receive from @BotFather
const token = "5368960340:AAFzW4e3b7jLWjVpr4Bvs8w1YIH55o0-hAA";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const ccApikey =
  "97c172cbad27b13195c51539ae683b8aa5e9aac5b4897e7fceeef219e693e257";
//봇 그룹에 추가시 어드민 권한 설정
bot.setMyDefaultAdministratorRights({
  rights: JSON.stringify({
    can_manage_chat: true,
    can_change_info: true,
    can_delete_messages: false,
    can_invite_users: true,
    can_restrict_members: false,
    can_pin_messages: true,
    can_promote_members: false,
    can_manage_video_chats: false,
    is_anonymous: false,
  }),
  for_channels: false,
});

//start명령: 인사, 메인 메뉴
function sendStartMessage(msg) {
  bot.sendPhoto(
    msg.chat.id,
    "https://www.timesnewswire.com/wp-content/uploads/2022/05/1-d4f90080.png",
    {
      parse_mode: "HTML",
      caption:
        "<b>Welcome to Creata Chain Community!</b> \n\nCreata Chain is the most advanced technology in the blockchain community. It has reached a milestone by overcoming the challenges of the technology that prevents it from becoming a global achievement.\n \nCreata Chain is on its way to optimizeand enhance interoperability and scalability. It is one of the most secure and improved systems that can add to various industries value.\n \nCTA is Creata Chain’s native token that can be used to provide economic security on the blockchains.\n \n <b>commands</b> \n  /start: Starts me! You've probably already used this.",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "News", callback_data: "News" },
            // { text: "Keyboard", callback_data: "Keyboard" },
          ],
          [
            { text: "Website", url: "https://creatachain.com/" },
            {
              text: "Whitepaper",
              url: "https://drive.google.com/file/d/17IcH74YGYCQGkKwhXbaacaUhY2hjrn-T/view",
            },
          ],
          [
            { text: "Twitter", url: "https://twitter.com/creatachain" },
            { text: "Medium", url: "https://medium.com/@creatachain" },
          ],
          [
            { text: "Telegram Channel", url: "https://t.me/creatachain_info" },
            { text: "Telegram", url: "https://t.me/creata_talk" },
          ],
          [
            {
              text: "Add me to your chat!",
              url: "http://t.me/linaCT_bot?startgroup=botstart",
            },
          ],
        ],
      },
    }
  );
}
bot.onText(/\/start/, (msg) => {
  sendStartMessage(msg);
});

bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  const News = "News";
  if (callbackQuery.data.indexOf(News) === 0) {
    bot.answerCallbackQuery(callbackQuery.id);
    bot.deleteMessage(msg.chat.id, msg.message_id);

    bot.sendMessage(msg.chat.id, "Check the latest news from Crete Chain!", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Creata Chain Launches its Own Operating System Creata OS",
              url: "https://news.yahoo.com/news/creata-chain-launches-own-operating-143700386.html",
            },
          ],
          [
            {
              text: "Creata Chain - Why the Market is Gravitating Toward it?",
              url: "https://www.timesnewswire.com/pressrelease/creata-chain-why-the-market-is-gravitating-toward-it/",
            },
          ],
          [
            {
              text: "CREATA CHAIN - ESTABLISHING INTERCONNECTIONS IS NOW EASIER THAN EVER BEFORE",
              url: "https://thefinancialmetrics.com/news/creata-chain-establishing-interconnections-is-now-easier-than-ever-before/0381891",
            },
          ],
          [{ text: "Back", callback_data: "start" }],
        ],
      },
    });
  }
});

//
bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  const start = "start";
  if (callbackQuery.data.indexOf(start) === 0) {
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.answerCallbackQuery(callbackQuery.id);
    sendStartMessage(msg);
  }
});

// let pricelist = ["price-btc", "price-eth", "price-bch", "price-ltc"];
// bot.on("callback_query", async (callbackQuery) => {
//   const msg = callbackQuery.message;
//   let symbol = pricelist.match.split("-")[1];
//   try {
//     let res = await axios.get(
//       `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${ccApikey}`
//     );
//     let data = res.data.DISPLAY[symbol].USD;
//     console.log(data);
//     let message = `
//     Symbol: ${symbol}
//     Price: ${data.PRICE}
//     Open: ${data.OPENDAY}
//     High: ${data.HIGHDAY}
//     Low: ${data.LOWDAY}
//     Supply: ${data.SUPPLY}
//     Market Cap: ${data.MKTCAP}
//     `;
//     bot.deleteMessage(msg.chat.id, msg.message_id);
//     bot.sendMessage(
//       msg.chat.id,
//       "Get Price Information. Select one of the below!",
//       {
//         reply_markup: {
//           inline_keyboard: [[{ text: "Back", callback_data: "start" }]],
//         },
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// });
