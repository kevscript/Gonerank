import {
  FormattedPlayerSeasonStats,
  PlayerMatchStatsMatches,
} from "../formatPlayersSeasonStats";

export type FormattedPlayersChartData = {
  __typename?: "Player" | undefined;
  id: string;
  lastName: string;
  country: string;
  firstName: string;
  countryCode: string;
  birthDate: any;
  image: string;
  active: boolean;
  globalAverage: number;
  awayAverage: number;
  homeAverage: number;
  globalMotm: number;
  globalBotm: number;
  matches: PlayerMatchStatsMatches[];
};

export const formatPlayersChartData = (data: FormattedPlayerSeasonStats[]) => {
  const players: FormattedPlayersChartData[] = data.map((player) => {
    return {
      ...player,
      matches: Object.values(player.matches),
    };
  });

  const x = players.map((player) => {
    const sortedMatches = player.matches.sort((a, b) =>
      new Date(a.date) < new Date(b.date) ? -1 : 1
    );

    let currAvgProgress = 0;
    let currAvgProgressQuantity = 0;
    let currTdcProgress = 0;

    const matches = sortedMatches.map((m) => {
      if (m.averageQuantity) {
        currAvgProgress += m.averageSum / m.averageQuantity;
        currAvgProgressQuantity++;
        currTdcProgress += m.averageSum - 5 * m.averageQuantity;

        return {
          ...m,
          avgProgress: currAvgProgress / currAvgProgressQuantity,
          tdcProgress: currTdcProgress,
        };
      }
    });

    return {
      ...player,
      matches: matches,
    };
  });

  console.log(x);
  return x;
};
