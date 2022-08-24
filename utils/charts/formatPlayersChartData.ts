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
  color: string;
  matches: Array<
    PlayerMatchStatsMatches & {
      avgProgress: number;
      tdcProgress: number;
    }
  >;
};

export const formatPlayersChartData = (data: FormattedPlayerSeasonStats[]) => {
  const players = data.map((player) => {
    return {
      ...player,
      matches: Object.values(player.matches),
    };
  });

  const formatted: FormattedPlayersChartData[] = players
    .sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
    .map((player, i) => {
      const sortedMatches = player.matches.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? -1 : 1
      );

      let currAvgProgress: number = 0;
      let currAvgProgressQuantity: number = 0;
      let currTdcProgress: number = 0;

      const matches = sortedMatches.map((m) => {
        if (m.averageQuantity) {
          currAvgProgress += m.averageSum / m.averageQuantity;
          currAvgProgressQuantity++;
          currTdcProgress += m.averageSum - 5 * m.averageQuantity;
        }

        return {
          ...m,
          avgProgress: currAvgProgress / currAvgProgressQuantity,
          tdcProgress: currTdcProgress,
        };
      });

      return {
        ...player,
        color: `hsla(${(360 / players.length) * i + 1}, 100%, 50%, 60%)`,
        matches: matches,
      };
    });

  return formatted;
};
