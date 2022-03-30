import TelegramBot from 'node-telegram-bot-api';

const TG_TOKEN = process.env.TG_TOKEN;

export const bot = new TelegramBot(TG_TOKEN, { polling: true });