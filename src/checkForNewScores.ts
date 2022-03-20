import sendScoreMessage from './bot/sendScoreMessage';
import sql from './db/query';
import fetcher from './util/fetcher';

// This is very stupid but i do not care
const checkForNewScores = async () => {
  const leaderboards =
    await sql<LocalData.Leaderboard>`select * from leaderboards`;

  if (!leaderboards) return;

  for await (const leaderboard of leaderboards) {
    const {
      data: { scores, metadata },
    } = await fetcher.get<ScoreSaber.LeaderboardScoresResponse>(
      `https://scoresaber.com/api/leaderboard/by-id/${leaderboard.leaderboardId}/scores?countries=${process.env.COUNTRIES}`
    );
    if (
      !leaderboard.currentTopScore ||
      scores[0].baseScore > leaderboard.currentTopScore
    ) {
      await sql`
      UPDATE leaderboards
      SET
        currentTopPlayer = ${scores[0].leaderboardPlayerInfo?.name},
        currentTopScore = ${scores[0].baseScore},
        scorePP = ${scores[0].pp}
        WHERE id = ${leaderboard.id}
      `;
      sendScoreMessage(leaderboard, scores[0]);
    }
  }
};

export default checkForNewScores;
