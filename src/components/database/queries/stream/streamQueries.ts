import snakecaseKeys from 'snakecase-keys';
import knex from '../../knex';
import {
  ICreatePasscodeQuery,
  ICreateStreamQuery,
  IUpdateStreamQuery,
  StreamId,
} from '../../types/database.types';

export const createStreamQuery = async (payload: ICreateStreamQuery) => {
  // SEC_PRO Using Knex, we can pass user inputs straight into the
  // query, because Knex handles sanitization and separation in the driver level
  const result = await knex('stream').insert(snakecaseKeys(payload));

  return result[0] as StreamId;
};

export const updateStreamQuery = async (
  streamId: StreamId,
  payload: IUpdateStreamQuery
) => {
  await knex('stream').where({ id: streamId }).update(snakecaseKeys(payload));
};

export const createPasscodeQuery = async (payload: ICreatePasscodeQuery) => {
  const result = await knex('passcode').insert(snakecaseKeys(payload));

  return result;
};
