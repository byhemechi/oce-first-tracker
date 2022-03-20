namespace ScoreSaber {
  interface Player {
    id: string;
    name: string;
    profilePicture: string;
    country: string;
    pp: number;
    rank: number;
    countryRank: number;
    role: string;
    badges: components['schemas']['Badge'][] | (unknown | null);
    histories: string;
    scoreStats: components['schemas']['ScoreStats'] | (unknown | null);
    permissions: number;
    banned: boolean;
    inactive: boolean;
  }
}
