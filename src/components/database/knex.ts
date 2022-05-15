import config from '../../../knexfile';
import knex from 'knex';

export enum Env {
  development = 'development',
  production = 'production',
}

const ENV = (process.env.ENVIRONMENT as Env) ?? Env.development;

// SEC_PRO Knex is used to handle communication with the MySQL database.
// It will handle input sanitization and when used correctly, should prevent
// SQL injections.
export default knex(config[ENV]);
