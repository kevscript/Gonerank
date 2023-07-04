import { LatestSeasonPlayerStats } from "@/utils/latestSeasonRanking";

export const latestSeasonPlayerStatsMockReturnValue = {
  stats: [
    {
      firstName: "A",
      lastName: "A",
      id: "1",
      globalAvgQuantity: 1,
      globalAvgSum: 7,
      globalAward: 5,
      globalTendency: 2,
      globalPositiveTendency: 2,
      globalNegativeTendency: 0,
      image: "A.png",
    },
    {
      firstName: "B",
      lastName: "B",
      id: "2",
      globalAvgQuantity: 1,
      globalAvgSum: 7,
      globalAward: 5,
      globalTendency: 2,
      globalPositiveTendency: 2,
      globalNegativeTendency: 0,
      image: "B.png",
    },
    {
      firstName: "C",
      lastName: "C",
      id: "3",
      globalAvgQuantity: 1,
      globalAvgSum: 7,
      globalAward: 5,
      globalTendency: 2,
      globalPositiveTendency: 2,
      globalNegativeTendency: 0,
      image: "C.png",
    },
  ] as LatestSeasonPlayerStats[],
};
