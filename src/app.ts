import initServer from "./components/api/server";
import { log } from "./lib/log";


module.exports = (async () => {
  try {
    const server = await initServer();
    await server.start();
  } catch (error) {
    log.error('Error starting server!', error);
    process.exit(1);
  }

  log.info('Lakka started successfully!');
})();