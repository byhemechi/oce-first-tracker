import { Client, Intents } from 'discord.js';

export let client: Client;

const launchBot = (): Promise<Client> =>
  new Promise((resolve): Client => {
    client = new Client({
      intents: [Intents.FLAGS.GUILDS],
    });

    client.once('ready', () => {
      resolve(client);
    });

    console.log('Launching Bot');
    client.login(process.env.DISCORD_TOKEN);

    return client;
  });
export default launchBot;
