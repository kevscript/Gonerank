export type Club = {
  id: string;
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
};

export type Match = {
  id: string;
  scored: number;
  conceeded: number;
  date: Date;
  home: boolean;
  active: boolean;

  opponentId: string;
  opponent: Club;

  competitionId: string;
  competition: Competition;

  seasonId: string;
  season: Season;

  players: MatchPlayer[];
};
