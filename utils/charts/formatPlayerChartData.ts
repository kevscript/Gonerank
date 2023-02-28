import { FormattedPlayerSeasonStats } from "../formatPlayerSeasonStats";

export type FormattedPlayerChartData = FormattedPlayerSeasonStats & {
  avgProgress: number;
  tdcProgress: number;
};

export type FormatPlayerChartDataParams = {
  stats: FormattedPlayerSeasonStats[];
};

export const formatPlayerChartData = ({
  stats,
}: FormatPlayerChartDataParams) => {
  let currAvgProgress: number = 0;
  let currAvgProgressQuantity: number = 0;
  let currTdcProgress: number = 0;

  const formatted = stats
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))
    .map((m, i) => {
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
