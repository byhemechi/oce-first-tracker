namespace LocalData {
  interface Leaderboard {
    id: number;
    leaderboardId: number;
    currentTopScore?: number;
    currentTopPlayer?: string;
    timeSet?: number;
    songName: string;
    songAuthorName: string;
    coverImage: string;
    maxScore: number;
    scorePP?: number;
    scoreRank?: number;
    difficulty: string;
  }
}
