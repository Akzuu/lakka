import { Knex } from 'knex';
import { ChatId } from 'node-telegram-bot-api';
import snakecaseKeys from 'snakecase-keys';
import knex from '../knex';
import { ICreatePasscodeQuery, StreamId } from '../types/database.types';

const MAX_FAILED_ATTEMPTS = 3;

export const createPasscodeQuery = async (
  payload: ICreatePasscodeQuery,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;
  const result = await db('passcode').insert(snakecaseKeys(payload));

  return result;
};

export const findStreamIdWithPasscode = async (
  passcode: string,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;
  const dateNow = new Date();

  const result = await db('passcode')
    .select('stream_id')
    .where({
      passcode,
    })
    .andWhere('active_until', '>=', dateNow.toISOString());

  return result[0] as StreamId;
};

export const insertFailedJoinAttempt = async (
  chatId: ChatId,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;

  await db.raw(
    `INSERT INTO failed_join_attempts (user_id)
    (
      SELECT id
      FROM user
      WHERE
        telegram_chat_id = :telegramChatId
    )
  `,
    {
      telegramChatId: chatId,
    }
  );
};

// TODO
export const isUserBannedFromJoining = async (
  chatId: ChatId,
  trx?: Knex.Transaction
) => {
  return false;
};
