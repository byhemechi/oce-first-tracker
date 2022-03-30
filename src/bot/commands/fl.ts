import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';
import sql from '../../db/query';

const FirstsLeaderboardCommand = async (
  interaction: CommandInteraction<CacheType>
) => {
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
          ORDER BY firsts DESC
          LIMIT 25`;
  if (!players) return;

  const message = [
    '```',
    players
      .map(
        (player, rank) =>
          `${`#${rank + 1}`.padStart(4)} | ${player.playerUsername.padEnd(
            35
          )} | ${player.firsts}`
      )
      .join('\n'),
    '```',
  ].join('\n');

  const messageEmbed = new MessageEmbed()
    .setColor('#ffd900')
    .setTitle('OCE Firsts Leaderboard')
    .setDescription(message)
    .setTimestamp()
    .setThumbnail(
      'https://cdn.discordapp.com/attachments/847053327438184478/958331480646512680/1.png'
    );
  await interaction.reply({ embeds: [messageEmbed] });
};

export default FirstsLeaderboardCommand;
