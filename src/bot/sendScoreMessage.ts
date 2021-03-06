import { time } from 'console';
import { ColorResolvable, MessageEmbed, MessagePayload } from 'discord.js';
import fetcher from '../util/fetcher';
import { getFirstsChannel } from './getChannel';

const sendScoreMessage = async (
  leaderboard: LocalData.Leaderboard,
  newScore?: ScoreSaber.Score
) => {
  const channel = getFirstsChannel();

  const prevScore = [];

  if (leaderboard.currentTopScore && leaderboard.currentTopPlayer) {
    const { data: player } = await fetcher.get<ScoreSaber.Player>(
      `/player/${leaderboard.currentTopPlayer}/basic`
    );
    const timeSet = new Date(leaderboard.timeSet ?? 0);
    prevScore.push({
      name: `Previous Score`,
      value: [
        `**Set By**: ${player.name}`,
        `**Accuracy**: ${(
          ((leaderboard.currentTopScore ?? 0) / leaderboard.maxScore) *
          100
        ).toFixed(2)}%`,
        `**PP**: ${leaderboard?.scorePP}`,
        `**Time Set**: ${timeSet.toLocaleString('en-AU', {
          timeZone: 'Australia/Sydney',
        })} (CBR/SYD/MEL time)`,
      ].join('\n'),
    });
  }
  let colour: ColorResolvable = 'DARK_GREY';
  switch (leaderboard.difficulty) {
    case 'ExpertPlus':
      colour = 'PURPLE';
      break;
    case 'Expert':
      colour = 'DARK_RED';
      break;
    case 'Hard':
      colour = 'ORANGE';
      break;
    case 'Normal':
      colour = 'AQUA';
      break;
    case 'Easy':
      colour = 'GREEN';
      break;
  }

  channel.send({
    embeds: [
      new MessageEmbed({
        color: colour,
        title: `${newScore?.leaderboardPlayerInfo?.name} set a new #1 score`,
        thumbnail: {
          url: newScore?.leaderboardPlayerInfo?.profilePicture,
        },
        image: {
          url: leaderboard.coverImage,
        },
        timestamp: new Date(newScore?.timeSet ?? 0).getTime(),
        fields: [
          {
            name: `${leaderboard.songAuthorName} - ${leaderboard.songName}`,
            value: `[Leaderboard](https://scoresaber.com/leaderboard/${leaderboard.leaderboardId}?countries=${process.env.COUNTRIES})`,
          },
          {
            name: 'New Score',
            value: [
              `**Accuracy**: ${(
                ((newScore?.modifiedScore ?? 0) / leaderboard.maxScore) *
                100
              ).toFixed(2)}%`,
              `**PP**: ${newScore?.pp}`,
            ].join('\n'),
          },
          ...prevScore,
        ],
      }),
    ],
  });
};

export default sendScoreMessage;
