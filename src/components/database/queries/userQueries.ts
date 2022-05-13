import { Knex } from 'knex';
import { ChatId } from 'node-telegram-bot-api';
import snakecaseKeys from 'snakecase-keys';
import knex from '../knex';
import { ICreateUserQuery, IUser } from '../types/database.types';

export const createUserQuery = async (
  payload: ICreateUserQuery,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;
  await db('user').insert(snakecaseKeys(payload));
};

export const findUserByTelegramChatId = async (
  chatId: ChatId,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;
  const user = (await db('user')
    .select('*')
    .where({ telegram_chat_id: chatId })) as IUser[];

  return user[0];
};
