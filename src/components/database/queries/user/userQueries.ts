import { Knex } from 'knex';
import snakecaseKeys from 'snakecase-keys';
import knex from '../../knex';
import { ICreateUserQuery } from '../../types/database.types';

export const createUserQuery = async (
  payload: ICreateUserQuery,
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;
  await db('user').insert(snakecaseKeys(payload));
};
