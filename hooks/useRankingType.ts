import { RankingType } from "@/components/LatestSeasonRanking/LatestSeasonRanking";
import { useState } from "react";

export const defaultRankingType: RankingType = "tendency";

export const useRankingType = () => {
  const [rankingType, setRankingType] =
    useState<RankingType>(defaultRankingType);

  const handleRankingType = (type: RankingType) => {
    if (rankingType !== type) setRankingType(type);
  };

  return {
    rankingType,
    handleRankingType,
  };
};
