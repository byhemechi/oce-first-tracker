namespace ScoreSaber {
  interface Score {
    id: number;
    leaderboardPlayerInfo?: LeaderboardPlayer;
    rank: number;
    baseScore: number;
    modifiedScore: number;
    pp: number;
    weight: number;
    modifiers: string;
    multiplier: number;
    badCuts: number;
    missedNotes: number;
    maxCombo: number;
    fullCombo: boolean;
    hmd: number;
    hasReplay: boolean;
    /** Format: date-time */
    timeSet: string;
  }
}
