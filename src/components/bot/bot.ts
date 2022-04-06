// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = "1";

import TelegramBot from "node-telegram-bot-api";

const TG_TOKEN = process.env.TG_TOKEN;
if (!TG_TOKEN) throw new Error("Missing env variable TG_TOKEN!");

export const AVAILABLE_COMMANDS = [
  ["help", "Show this message"],
  ["createStream", "Starts the stream creation process"],
];

export const bot = new TelegramBot(TG_TOKEN, { polling: true });

export const messageHandler = (
  msg: TelegramBot.Message,
  match: RegExpExecArray | null
) => {
  const command = msg.text?.slice(1);
  const chatId = msg.chat.id;
  switch (command) {
    default:
      sendMessage(
        chatId,
        `Unknown command: ${command}.\nUse /help to get a list of available commands`
      );
      break;
    case "help":
      sendMessage(
        chatId,
        `Available commands:\n${AVAILABLE_COMMANDS.map(
          (e) => `/${e[0]} ${e[1]}`
        ).join("\n")}`
      );
      break;
    case "createStream":
      sendMessage(chatId, "Not available, yet");
      break;
  }
};

export const sendMessage = (chatId: TelegramBot.ChatId, msg: string) => {
  bot.sendMessage(chatId, msg);
};
