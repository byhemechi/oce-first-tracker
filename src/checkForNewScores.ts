import { Message } from 'discord.js';
import { getLogChannel } from './bot/getChannel';
import sendScoreMessage from './bot/sendScoreMessage';
import sql from './db/query';
import fetcher from './util/fetcher';
import sleep from './util/sleep';
import ms from 'ms';

const checkForNewScores = async (notify = true) => {
  const leaderboardThreads = 5;
  let requestsRemaining = Infinity;
  let requestsReset = Date.now();
  const startTime = Date.now();
  const leaderboards =
    await sql<LocalData.Leaderboard>`select * from leaderboards`;

  if (!leaderboards) return;

  await getLogChannel().send(
    `Checking for new scores using ${leaderboardThreads} threads`
  );
  const statusMessage = await getLogChannel().send(`Checked 0 scores`);

  for (let i = 0; i < leaderboards.length; i += leaderboardThreads) {
    await Promise.all(
      new Array(Math.min(leaderboardThreads, leaderboards.length - i))
        .fill(undefined)
        .map((undefined, n) => {
          const leaderboard = leaderboards[i + n];
          return (async () => {
            const {
              data: { scores, metadata },
              headers,
            } = await fetcher.get<ScoreSaber.LeaderboardScoresResponse>(
              encodeURI(
                `https://scoresaber.com/api/leaderboard/by-id/${encodeURIComponent(
                  leaderboard.leaderboardId
                )}/scores?countries=${process.env.COUNTRIES}`
              )
            );

            requestsRemaining = parseInt(headers['x-ratelimit-remaining']);
            requestsReset = parseInt(headers['x-ratelimit-reset']) * 1000;

            statusMessage.edit(
              `Checked ${i + n}/${
                leaderboards.length
              } scores, est time remaining ${ms(
                (Date.now() - startTime) / ((i + 1) / leaderboards.length),
                { long: true }
              )}`
            );
            if (
              !leaderboard.currentTopScore ||
              scores[0].baseScore > leaderboard.currentTopScore
            ) {
              const timeSet = new Date(scores[0].timeSet);

              await sql`
              UPDATE leaderboards
              SET
                currentTopPlayer = ${scores[0].leaderboardPlayerInfo?.id},
                currentTopScore = ${scores[0].baseScore},
                scorePP = ${scores[0].pp},
                timeSet = ${timeSet.getTime()}
                WHERE leaderboardId = ${leaderboard.id}
              `;
              if (leaderboard.currentTopScore || notify) {
                sendScoreMessage(leaderboard, scores[0]);
              }
            }
          })();
        })
    );
    if (requestsRemaining < leaderboardThreads + 10) {
      const delay = requestsReset - Date.now();
      console.log(
        `Hit ratelimit, waiting ${(requestsReset - Date.now()) / 1000} seconds`
      );
      await sleep(delay);
    }
  }

  statusMessage.edit(
    `Score check complete. Took ${ms(Date.now() - startTime)}`
  );
};

export default checkForNewScores;
