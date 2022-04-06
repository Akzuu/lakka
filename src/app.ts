import "dotenv/config";
import initServer from "./components/api/server";
import { log } from "./lib/log";
import { bot, messageHandler } from "./components/bot/bot";

module.exports = (async () => {
  try {
    const server = await initServer();
    await server.start();
  } catch (error) {
    log.error("Error starting server!", error);
    process.exit(1);
  }

  try {
    bot.onText(/\/\/*./, messageHandler);
  } catch (error) {
    log.error("Error starting the command bot!", error);
    process.exit(1);
  }

  log.info("Lakka started successfully!");
})();
