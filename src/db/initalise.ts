import sql from './query';

const initDatabases = (): void => {
  sql`
    CREATE TABLE IF NOT EXISTS leaderboards (
    id INTEGER PRIMARY KEY,
    leaderboardId BIGINT NOT NULL,
    currentTopScore BIGINT,
    currentTopPlayer CHAR(18)
    );
  `;
};

export default initDatabases;
