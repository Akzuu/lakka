import { Knex } from 'knex';
import snakecaseKeys from 'snakecase-keys';
import knex from '../../knex';
import {
  ICreatePasscodeQuery,
  ICreateStreamQuery,
  IUpdateStreamQuery,
  StreamId,
} from '../../types/database.types';

export const createStreamQuery = async (
  payload: ICreateStreamQuery,
  trx?: Knex.Transaction
) => {
  // SEC_PRO Using Knex, we can pass user inputs straight into the
  // query, because Knex handles sanitization and separation in the driver level
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

export const createPasscodeQuery = async (
  payload: ICreatePasscodeQuery,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;
  const result = await db('passcode').insert(snakecaseKeys(payload));

  return result;
};
