import initDatabases from './db/initalise';
import sql from './db/query';
import dotenv from 'dotenv';
import launchBot, { client } from './bot';
import { TextChannel } from 'discord.js';
import updateLeaderboards from './updateLeaderboards';
import checkForNewScores from './checkForNewScores';

async function main() {
  dotenv.config();

  const bot = await launchBot();

  process.on('SIGINT', () => {
    console.log('quitting');
    bot.destroy();
  });

  await initDatabases();
  await updateLeaderboards();

  checkForNewScores();
  setInterval(() => checkForNewScores(), 90 * 60000);
}

main();
