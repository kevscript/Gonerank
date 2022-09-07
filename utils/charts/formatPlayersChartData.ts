import { GlobalSeasonDataQuery } from "graphql/generated/queryTypes";
import {
  FormattedPlayerSeasonStats,
  PlayerMatchStatsMatches,
} from "../formatPlayersSeasonStats";

export type FormatPlayersChartDataParams = {
  stats: FormattedPlayerSeasonStats[];
  matches: GlobalSeasonDataQuery["matches"];
};

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
  matches: Array<
    PlayerMatchStatsMatches & {
      avgProgress: number;
      tdcProgress: number;
    }
  >;
};

export const formatPlayersChartData = ({
  stats,
  matches,
}: FormatPlayersChartDataParams) => {
  const sMatches = [...matches].sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? -1 : 1
  );
  const players = stats.map((player) => {
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

      const matches = sMatches.map((match, i) => {
        const mIndex = sortedMatches.findIndex((x) => x.id === match.id);
        let m: any = {};
        if (mIndex !== -1) {
          m = { ...sortedMatches[mIndex] };
          if (m.averageQuantity) {
            currAvgProgress += m.averageSum / m.averageQuantity;
            currAvgProgressQuantity++;
            currTdcProgress += m.averageSum - 5 * m.averageQuantity;
          }
        } else {
          m.date = match.date;
          m.averageQuantity = undefined;
          m.averageSum = undefined;
        }

        return {
          ...m,
          avgProgress: currAvgProgress / currAvgProgressQuantity,
          tdcProgress: currTdcProgress,
        };
      });

      return {
        ...player,
        matches: matches,
      };
    });

  return formatted;
};
