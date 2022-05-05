import 'dotenv/config';
import initServer from './components/api/server';
import { log } from './lib/log';
import { bot, messageHandler } from './components/bot/bot';
import knex from './components/database/knex';

module.exports = (async () => {
  // Run database migrations
  log.info('Starting lakka...');
  log.info('Running migrations');
  try {
    await knex.migrate.latest();
  } catch (error) {
    log.error('Error running migrations!', error);
    process.exit(1);
  }

  // Start HTTP server
  log.info('Starting HTTP server');
  try {
    const server = await initServer();
    await server.start();
  } catch (error) {
    log.error('Error starting server!', error);
    process.exit(1);
  }

  // Start Telegram command listener
  log.info('Starting Telegram bot');
  try {
    bot.onText(/\/\/*./, messageHandler);
  } catch (error) {
    log.error('Error starting the command bot!', error);
    process.exit(1);
  }

  log.info('Lakka started successfully!');
})();
