// export type FormattedMatchStats = GlobalSeasonDataQuery["matches"][0] & {
//   competition: GlobalSeasonDataQuery["competitions"][0];
//   opponent: GlobalSeasonDataQuery["clubs"][0];
//   averageSum: number;
//   averageQuantity: number;
//   tendency: number;
//   motmRating: number;
//   motmIds: string[];
//   botmRating: number;
//   botmIds: string[];
//   players: { [key: string]: FormattedMatchStatsPlayer };
// };

import {
  FormattedMatchStats,
  FormattedMatchStatsPlayer,
} from "../formatMatchesSeasonStats";

export type FormattedMatchesChartData = Omit<FormattedMatchStats, "players"> & {
  avgProgress: number;
  tdcProgress: number;
  players: FormattedMatchStatsPlayer[];
};

export const formatMatchesChartData = (data: FormattedMatchStats[]) => {
  const matches = data.map((match) => {
    return {
      ...match,
      players: Object.values(match.players),
    };
  });

  let currAvgProgress: number = 0;
  let currAvgProgressQuantity: number = 0;
  let currTdcProgress: number = 0;

  const formatted: FormattedMatchesChartData[] = matches
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1))
    .map((m) => {
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

  return formatted;
};
