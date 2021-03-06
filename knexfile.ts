import 'dotenv/config';
import { log } from './src/lib/log';
const DB = process.env.MYSQL_DATABASE ?? 'db';
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_HOST = process.env.MYSQL_HOST;

export default {
  development: {
    client: 'mysql',
    connection: {
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: DB,
      charset: 'utf8',
    },
    migrations: {
      directory: __dirname + '/src/components/database/migrations',
    },
    log: {
      warn(msg: string) {
        log.warn(msg);
      },
      error(msg: string) {
        log.error(msg);
      },
      deprecate(msg: string) {
        log.info(msg);
      },
      debug(msg: string) {
        log.debug(msg);
      },
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: DB,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    log: {
      warn(msg: string) {
        log.warn(msg);
      },
      error(msg: string) {
        log.error(msg);
      },
      deprecate(msg: string) {
        log.info(msg);
      },
      debug(msg: string) {
        log.debug(msg);
      },
    },
  },
};
