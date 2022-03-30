// Run this file to register commands to a server

import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const registerCommands = async () => {
  const commands = [
    new SlashCommandBuilder()
      .setName('fl')
      .setDescription('Leaderboard of #1 OCE Scores'),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_ID,
      process.env.SERVER_ID
    ),
    { body: commands }
  );
  console.log('Registered commands');
};

export default registerCommands;
