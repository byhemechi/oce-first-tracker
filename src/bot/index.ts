import { Client, Intents, MessageEmbed } from 'discord.js';
import sql from '../db/query';
import FirstsLeaderboardCommand from './commands/fl';

export let client: Client;

const launchBot = (): Promise<Client> =>
  new Promise((resolve): Client => {
    client = new Client({
      intents: [Intents.FLAGS.GUILDS],
    });

    client.once('ready', () => {
      resolve(client);
    });

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;
      switch (commandName) {
        case 'fl':
          await FirstsLeaderboardCommand(interaction);
      }
    });

    console.log('Launching Bot');
    client.login(process.env.DISCORD_TOKEN);

    return client;
  });
export default launchBot;
