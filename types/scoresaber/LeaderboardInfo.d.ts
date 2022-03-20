namespace ScoreSaber {
  interface LeaderboardInfo {
    id: number;
    songHash: string;
    songName: string;
    songSubName: string;
    songAuthorName: string;
    levelAuthorName: string;
    difficulty: Difficulty;
    maxScore: number;
    /** Format: date-time */
    createdDate: string;
    rankedDate: string | (unknown | null);
    qualifiedDate: string | (unknown | null);
    lovedDate: string | (unknown | null);
    ranked: boolean;
    qualified: boolean;
    loved: boolean;
    maxPP: number;
    stars: number;
    positiveModifiers: boolean;
    plays: number;
    dailyPlays: number;
    coverImage: string;
    playerScore: Score;
  }
}
