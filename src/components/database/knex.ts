import config from '../../../knexfile';
import knex from 'knex';

export enum Env {
  development = 'development',
  production = 'production',
}

const ENV = (process.env.ENVIRONMENT as Env) ?? Env.development;

// SEC_PRO Using Knex, we can pass user inputs straight into the
// query, because Knex handles sanitization and separation in the driver level
export default knex(config[ENV]);
