import initDatabases from './db/initalise';
import sql from './db/query';
import dotenv from 'dotenv';
import launchBot, { client } from './bot';
import { TextChannel } from 'discord.js';
import updateLeaderboards from './updateLeaderboards';
import checkForNewScores from './checkForNewScores';
import ms from 'ms';
import registerCommands from './bot/registerCommands';

async function main() {
  dotenv.config();

  try {
    await registerCommands();
  } catch (err) {
    console.log('Error registering commands');
  }
  const bot = await launchBot();
  process.on('SIGINT', () => {
    console.log('quitting');
    bot.destroy();
  });

  await initDatabases();
  await updateLeaderboards();

  await checkForNewScores(false);
  setInterval(() => updateLeaderboards(), ms('1 day'));
  setInterval(() => checkForNewScores(), ms('30 mins'));
}

main();
