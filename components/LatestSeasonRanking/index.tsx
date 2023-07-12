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
        <div className="flex justify-center w-full h-full p-2 mt-1 bg-white rounded dark:bg-dark-500 drop-shadow-sm">
          <div className="flex items-center justify-center w-full px-2 py-4 rounded-sm dark:bg-dark-300 bg-marine-50 h-fit">
            <span className="text-xs" data-testid="no-stats">
              Pas encore de stats cette saison.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestSeasonRanking;
