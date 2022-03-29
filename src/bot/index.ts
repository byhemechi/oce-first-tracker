import { Client, Intents, MessageEmbed } from 'discord.js';
import sql from '../db/query';

export let client: Client;

const launchBot = (): Promise<Client> =>
  new Promise((resolve): Client => {
    client = new Client({
      intents: [Intents.FLAGS.GUILDS],
    });

    client.once('ready', () => {
      resolve(client);
    });

    client.on('interactionCreate', async interaction => {

      if (!interaction.isCommand()) return;

      const { commandName } = interaction;
      if (commandName === 'fl') {
        const players = await sql<LocalData.Player>`
        SELECT
          players.playerId,
          players.playerUsername,
          count(leaderboards."currentTopPlayer") AS firsts
        FROM players
        LEFT JOIN leaderboards
        ON
          players.playerId = leaderboards.currentTopPlayer
        GROUP BY players.playerId
        ORDER BY firsts DESC;`;
        if (!players) return;

        let message = "```";
        const leaderboardSize = 25;
        for (let i = 0; i < leaderboardSize; i++) {
          message += "#" + (i + 1).toString().padEnd(2) + " | " + players[i].playerUsername.padEnd(20) + " | " + players[i].firsts + " Firsts\n";
        }
        message += "```";

        const messageEmbed = new MessageEmbed()
          .setColor("#ffd900")
          .setTitle("OCE Firsts Leaderboard")
          .setDescription(message)
          .setTimestamp()
          .setThumbnail("https://cdn.discordapp.com/attachments/847053327438184478/958331480646512680/1.png");
        await interaction.reply({ embeds: [messageEmbed] });
      }
    });
    
    console.log('Launching Bot');
    client.login(process.env.DISCORD_TOKEN);

    return client;
  });
export default launchBot;
