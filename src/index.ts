import initDatabases from './db/initalise';
import sql from './db/query';
import dotenv from 'dotenv';
import launchBot, { client } from './bot';
import { TextChannel } from 'discord.js';
import updateLeaderboards from './updateLeaderboards';
import checkForNewScores from './checkForNewScores';
import ms from 'ms';
import initCli from './cli';

async function main() {
  dotenv.config();

  const bot = await launchBot();
  const cli = initCli();
  process.on('SIGINT', () => {
    console.log('quitting');
    bot.destroy();
    cli.close();
  });

  await initDatabases();
  await updateLeaderboards();

  await checkForNewScores(false);
  setInterval(() => updateLeaderboards(), ms('1 day'));
  setInterval(() => checkForNewScores(), ms('30 mins'));
}

main();
