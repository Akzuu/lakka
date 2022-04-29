import snakecaseKeys from 'snakecase-keys';
import knex from '../../knex';
import { ICreateStreamQueryPayload } from '../../types/database.types';

export const createStreamQuery = async (payload: ICreateStreamQueryPayload) => {
  const result = await knex('stream').insert(snakecaseKeys(payload));

  return result[0];
};
