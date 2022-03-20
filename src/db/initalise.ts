import { getFirstsChannel, getLogChannel } from '../bot/getChannel';
import sql from './query';

const initDatabases = async (): Promise<void> => {
  await sql`
    CREATE TABLE IF NOT EXISTS leaderboards (
      id INTEGER PRIMARY KEY,
      leaderboardId BIGINT NOT NULL,
      maxScore BIGINT,
      currentTopScore BIGINT UNSIGNED DEFAULT 0,
      currentTopPlayer VARCHAR,
      timeSet BIGINT,
      songName VARCHAR NOT NULL,
      songAuthorName VARCHAR NOT NULL,
      coverImage VARCHAR NOT NULL,
      scorePP INTEGER,
      scoreRank INTEGER,
      difficulty VARCHAR
    );
  `;
  getLogChannel().send('Initialised Databases');
};

export default initDatabases;
