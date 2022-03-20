namespace ScoreSaber {
  interface LeaderboardsResponse {
    leaderboards: LeaderboardInfo[];
    metadata: Metadata;
  }

  interface LeaderboardsQuery {
    search?: string;
    /** @deprecated Filter by verified */
    verified?: boolean;
    /** Filter by ranked */
    ranked?: boolean;
    /** Filter by qualified */
    qualified?: boolean;
    /** Filter by loved */
    loved?: boolean;
    /** Filter by minimum star value */
    minStar?: number;
    /** Filter by maxiumum star value */
    maxStar?: number;
    /** Which category to sort by (0 = trending, date ranked = 1, scores set = 2, star difficulty = 3, author = 4) */
    category?: number;
    /** Which direction to sort (0 = descending, 1 = ascending) */
    sort?: number;
    /** Only return one leaderboard of each id */
    unique?: boolean;
    page?: number;
    /** (default true) */
    withMetadata?: boolean;
  }
}
