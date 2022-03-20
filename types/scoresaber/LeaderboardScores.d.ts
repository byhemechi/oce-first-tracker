namespace ScoreSaber {
  interface LeaderboardScoresResponse {
    scores: Score[];
    metadata: Metadata[];
  }
  interface LeaderboardScoresQuery {
    /** Filter by ISO 3166-1 alpha-2 code (comma delimitered) */
    countries?: string;
    search?: string;
    page?: number;
    /** (default true) */
    withMetadata?: boolean;
  }
}
