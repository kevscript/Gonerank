import { latestSeasonRanking } from "@/utils/latestSeasonRanking";
import { GetLatestSeasonQuery } from "graphql/generated/queryTypes";
import { useState } from "react";
import LatestSeasonAvgRanking from "./LatestSeasonAvgRanking";
import LatestSeasonAwardRanking from "./LatestSeasonAwardRanking";
import LatestSeasonHeader from "./LatestSeasonHeader";
import LatestSeasonStatPicker from "./LatestSeasonStatPicker";
import LatestSeasonTdcRanking from "./LatestSeasonTdcRanking";

export type RankingType = "average" | "tendency" | "award";

export type LatestSeasonRankingProps = {
  rankingType: RankingType;
  season: GetLatestSeasonQuery["latestSeason"];
  handleRankingType: (x: RankingType) => void;
};

const LatestSeasonRanking = ({
  rankingType,
  season,
  handleRankingType,
}: LatestSeasonRankingProps) => {
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

      <div className="flex-1 overflow-scroll scroll-hide">
        {rankingType === "average" && <LatestSeasonAvgRanking stats={stats} />}
        {rankingType === "tendency" && <LatestSeasonTdcRanking stats={stats} />}
        {rankingType === "award" && <LatestSeasonAwardRanking stats={stats} />}
      </div>
    </div>
  );
};

export default LatestSeasonRanking;
