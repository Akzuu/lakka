// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = '1';

import TelegramBot from 'node-telegram-bot-api';
import { createStream } from '../../lib/commands/create';
import { log } from '../../lib/log';
import { createStreamQuery } from '../database/queries/stream/streamQueries';

const TG_TOKEN = process.env.TG_TOKEN;
if (!TG_TOKEN) throw new Error('Missing env variable TG_TOKEN!');

export const AVAILABLE_COMMANDS = [
  ['help', 'Show this message'],
  ['create', 'Starts the stream creation process'],
  ['join', 'Join to existing stream as a techinican or co-host'],

  // TODO: Implement these in the future?
  // ['register_league', 'Register a new league'],
  // ['register_team', 'Register a new team and players'],
  // ['register_player', 'Register a single player'],
  // ['modify_team', 'Modifies team information'],
  // ['modify_player', 'Modifies player information'],
];

export const AVAILABLE_COMMANDS_WHILE_STREAMING = [
  ['edit', 'Edit stream information'],
  ['leave', 'Leave stream'],

  // TODO: Implement these in the future?
  // ['set_bo_score', 'Set score for bo -matches'],
];

export const bot = new TelegramBot(TG_TOKEN, { polling: true });

export const messageHandler = async (
  msg: TelegramBot.Message,
  match: RegExpExecArray | null
) => {
  const command = msg.text?.slice(1);
  const chatId = msg.chat.id;
  const sender = msg.chat.first_name
    ? `${msg.chat.first_name} ${msg.chat.last_name}`.trim()
    : msg.chat.username;
  switch (command) {
    default:
      sendMessage(
        chatId,
        `Unknown command: ${command}.\nUse /help to get a list of available commands`
      );
      break;
    case 'help':
      sendMessage(
        chatId,
        `Available commands:\n${AVAILABLE_COMMANDS.map(
          (e) => `/${e[0]} ${e[1]}`
        ).join('\n')}
        \nAvailable commands while streaming:\n${AVAILABLE_COMMANDS_WHILE_STREAMING.map(
          (e) => `/${e[0]} ${e[1]}`
        ).join('\n')}
        `
      );
      break;
    case 'create':
      sendMessage(chatId, 'Not available, yet');
      break;
    case 'test':
      createStream(chatId, sender);
  }
};

export const sendMessage = (chatId: TelegramBot.ChatId, msg: string) => {
  bot.sendMessage(chatId, msg);
};
