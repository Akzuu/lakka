import { Knex } from 'knex';
import snakecaseKeys from 'snakecase-keys';
import knex from '../../knex';
import { ICreateTeamQuery } from '../../types/database.types';

export const createTeamsQuery = async (
  payload: ICreateTeamQuery[],
  trx?: Knex.Transaction
) => {
  const db = trx ?? knex;
  await db('user').insert(snakecaseKeys(payload));
};
