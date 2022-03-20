import initDatabases from './db/initalise';
import sql from './db/query';
import dotenv from 'dotenv';
import launchBot, { client } from './bot';
import { TextChannel } from 'discord.js';
import updateLeaderboards from './updateLeaderboards';
import checkForNewScores from './checkForNewScores';
import ms from 'ms';

async function main() {
  dotenv.config();

  const bot = await launchBot();

  process.on('SIGINT', () => {
    console.log('quitting');
    bot.destroy();
  });

  await initDatabases();
  await updateLeaderboards();

  await checkForNewScores();
  setInterval(() => updateLeaderboards(), ms('1 day'));
  setInterval(() => checkForNewScores(), ms('90 mins'));
}

main();
