import snakecaseKeys from 'snakecase-keys';
import knex from '../../knex';
import { ICreateUserQuery } from '../../types/database.types';

export const createStreamQuery = async (payload: ICreateUserQuery) => {
  await knex('user').insert(snakecaseKeys(payload));
};
