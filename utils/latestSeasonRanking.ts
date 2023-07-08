import { GetLatestSeasonQuery } from "graphql/generated/queryTypes";

export type LatestSeasonPlayerStats = {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  globalAvgSum: number;
  globalAvgQuantity: number;
  globalTendency: number;
  globalNegativeTendency: number;
  globalPositiveTendency: number;
  globalAward: number;
  globalMotm: number;
  globalBotm: number;
};

export const latestSeasonRanking = (
  playerStats: NonNullable<GetLatestSeasonQuery["latestSeason"]["playerStats"]>
) => {
  const stats: LatestSeasonPlayerStats[] = playerStats.map((p) => {
    const player = {
      id: p.playerId,
      firstName: p.firstName,
      lastName: p.lastName,
      image: p.image,
      globalAvgSum: 0,
      globalAvgQuantity: 0,
      globalTendency: 0,
      globalPositiveTendency: 0,
      globalNegativeTendency: 0,
      globalAward: 0,
      globalMotm: 0,
      globalBotm: 0,
    };

    p.matches.forEach((m) => {
      player.globalAvgSum += m.averageSum
        ? m.averageSum / m.averageQuantity
        : 0;
      player.globalAvgQuantity += m.averageSum ? 1 : 0;
      player.globalTendency += m.tendency;
      player.globalNegativeTendency += m.negativeTendency;
      player.globalPositiveTendency += m.positiveTendency;
      player.globalAward += m.motm ? 1 : m.botm ? -1 : 0;
      m.motm && player.globalMotm++;
      m.botm && player.globalBotm++;
    });

    return player;
  });

  return stats;
};
