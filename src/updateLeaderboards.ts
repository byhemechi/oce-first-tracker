// Iterate over ranked leaderboards until we have all of them
// ONLY CALL THIS FILE FROM CLI

import { getLogChannel } from './bot/getChannel';
import sendScoreMessage from './bot/sendScoreMessage';
import sql from './db/query';
import fetcher from './util/fetcher';
import queryBuilder from './util/queryBuilder';
import sleep from './util/sleep';

const updateLeaderboards = async () => {
  let requestsRemaining = 400;
  let requestsReset = Date.now();
  let totalItems = Infinity;
  let itemsPerPage = 16;
  const message = await getLogChannel().send('Updating Leaderboards...');

  requests: for (
    let page = 0;
    page < Math.ceil(totalItems / itemsPerPage);
    ++page
  ) {
    const query: ScoreSaber.LeaderboardsQuery = {
      ranked: true,
      page: page + 1,
    };

    const {
      data: { leaderboards, metadata },
      headers,
    } = await fetcher.get<ScoreSaber.LeaderboardsResponse>(
      `/leaderboards?${queryBuilder(query)}`
    );

    // Update locals to use correct metadata
    ({ itemsPerPage, total: totalItems } = metadata);

    requestsRemaining = parseInt(headers['x-ratelimit-remaining']);
    requestsReset = parseInt(headers['X-RateLimit-Reset']) * 1000;

    message.edit(
      `Loaded page ${page} / ${Math.ceil(totalItems / itemsPerPage)}
      ${requestsRemaining} requests remaining`
    );

    for await (const leaderboard of leaderboards) {
      const existing =
        await sql`SELECT * from leaderboards where leaderboardId = ${leaderboard.id}`;
      if (existing && existing.length > 0) break requests;
      sql<LocalData.Leaderboard>`
        INSERT INTO leaderboards (
          leaderboardId,
          songName,
          songAuthorName,
          coverImage,
          maxScore,
          difficulty
        ) VALUES (
          ${leaderboard.id},
          ${leaderboard.songName},
          ${leaderboard.songAuthorName},
          ${leaderboard.coverImage},
          ${leaderboard.maxScore},
          ${leaderboard.difficulty.difficultyRaw.split('_')[1]}
        );`;
    }

    // if (requestsRemaining < 1) await sleep(requestsReset - Date.now());
  }
};

export default updateLeaderboards;
