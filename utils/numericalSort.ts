import { LatestSeasonPlayerStats } from "./latestSeasonRanking";

export type NumericalSortParams = {
  rowA: any;
  rowB: any;
  id: string;
};

export type RankingSortParams = {
  xA: LatestSeasonPlayerStats;
  xB: LatestSeasonPlayerStats;
};

export const numericalSort = ({ rowA, rowB, id }: NumericalSortParams) => {
  let a = Number.parseFloat(rowA.getValue(id));
  let b = Number.parseFloat(rowB.getValue(id));
  if (Number.isNaN(a)) {
    // Blanks and non-numeric strings to bottom
    a = Number.NEGATIVE_INFINITY;
  }
  if (Number.isNaN(b)) {
    b = Number.NEGATIVE_INFINITY;
  }
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

export const rankingTendencySort = ({ xA, xB }: RankingSortParams) => {
  let a = xA.globalTendency;
  let b = xB.globalTendency;

  if (xA.globalAvgQuantity === 0) {
    a = Number.NEGATIVE_INFINITY;
  }

  if (xB.globalAvgQuantity === 0) {
    b = Number.NEGATIVE_INFINITY;
  }

  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

export const rankingAwardSort = ({ xA, xB }: RankingSortParams) => {
  let a = xA.globalAward;
  let b = xB.globalAward;

  if (xA.globalAvgQuantity === 0) {
    a = Number.NEGATIVE_INFINITY;
  }

  if (xB.globalAvgQuantity === 0) {
    b = Number.NEGATIVE_INFINITY;
  }

  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};
