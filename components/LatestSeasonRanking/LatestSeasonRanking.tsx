import { latestSeasonRanking } from "@/utils/latestSeasonRanking";
import { GetLatestSeasonQuery } from "graphql/generated/queryTypes";
import { useState } from "react";
import LatestSeasonAvgRanking from "./LatestSeasonAvgRanking";
import LatestSeasonAwardRanking from "./LatestSeasonAwardRanking";
import LatestSeasonHeader from "./LatestSeasonHeader";
import LatestSeasonStatPicker from "./LatestSeasonStatPicker";
import LatestSeasonTdcRanking from "./LatestSeasonTdcRanking";
import { useRankingType } from "@/hooks/useRankingType";
import LatestSeasonNoStats from "./LatestSeasonNoStats";

export type RankingType = "average" | "tendency" | "award";

export type LatestSeasonRankingProps = {
  season: GetLatestSeasonQuery["latestSeason"];
};

const LatestSeasonRanking = ({ season }: LatestSeasonRankingProps) => {
  const { rankingType, handleRankingType } = useRankingType();
  const [stats] = useState(() => {
    return season.playerStats ? latestSeasonRanking(season.playerStats) : [];
  });

  return (
    <div className="flex-col hidden lg:flex lg:w-60 2xl:w-72">
      <LatestSeasonHeader
        rankingType={rankingType}
        seasonStartYear={new Date(season.startDate).getFullYear()}
      />

      <LatestSeasonStatPicker
        rankingType={rankingType}
        handleRankingType={handleRankingType}
      />

      {stats.length ? (
        <div className="flex-1 overflow-scroll scroll-hide">
          {rankingType === "average" && (
            <LatestSeasonAvgRanking stats={stats} />
          )}
          {rankingType === "tendency" && (
            <LatestSeasonTdcRanking stats={stats} />
          )}
          {rankingType === "award" && (
            <LatestSeasonAwardRanking stats={stats} />
          )}
        </div>
      ) : (
        <LatestSeasonNoStats />
      )}
    </div>
  );
};

export default LatestSeasonRanking;
