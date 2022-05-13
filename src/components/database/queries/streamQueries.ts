import { Knex } from 'knex';
import { ChatId } from 'node-telegram-bot-api';
import snakecaseKeys from 'snakecase-keys';
import knex from '../knex';
import {
  ICreatePasscodeQuery,
  ICreateStreamQuery,
  ICreateUserLinkToStream,
  IUpdateStreamQuery,
  StreamId,
} from '../types/database.types';

export const createStreamQuery = async (
  payload: ICreateStreamQuery,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;

  const result = await db('stream').insert(snakecaseKeys(payload));

  return result[0] as StreamId;
};

export const updateStreamQuery = async (
  streamId: StreamId,
  payload: IUpdateStreamQuery,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;
  await db('stream').where({ id: streamId }).update(snakecaseKeys(payload));
};

export const createUserLinkToStream = async (
  payload: ICreateUserLinkToStream,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;
  await db('stream_users').insert(snakecaseKeys(payload));
};

export const getUserStreamIdByTelegramChatId = async (
  chatId: ChatId,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;

  const result = (await db.raw(
    `
    SELECT
      stream_id
    FROM stream s
    JOIN stream_users su ON su.stream_id = s.id
    JOIN user u ON u.id = su.user_id
    WHERE u.telegram_chat_id = :telegramChatId;
  `,
    {
      telegramChatId: chatId,
    }
  )) as StreamId[];

  return result[0];
};
