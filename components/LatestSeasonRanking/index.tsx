import { latestSeasonRanking } from "@/utils/latestSeasonRanking";
import { GetLatestSeasonQuery } from "graphql/generated/queryTypes";
import { useState } from "react";
import LatestSeasonAvgRanking from "./LatestSeasonAvgRanking";
import LatestSeasonAwardRanking from "./LatestSeasonAwardRanking";
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
      <div className="flex items-center justify-center flex-shrink-0 w-full h-16 bg-white dark:bg-dark-500 drop-shadow-sm">
        <span className="text-sm font-bold uppercase">
          Classement{" "}
          <span className="font-num">
            {new Date(season.startDate).getFullYear()}/
            {(new Date(season.startDate).getFullYear() + 1)
              .toString()
              .substring(2)}
          </span>
        </span>
      </div>

      <ul className="flex flex-row w-full h-6 my-2 flex-nowrap gap-x-1">
        <li className="flex-1">
          <button
            className={`w-full h-full rounded uppercase text-xs font-bold bg-white dark:bg-dark-400 border ${
              rankingType === "average"
                ? "border-marine-600 text-marine-600 dark:text-marine-400"
                : "border-gray-200 text-gray-500 hover:text-marine-500 hover:border-marine-300 dark:border-dark-300 dark:hover:border-marine-500 dark:text-gray-100"
            }`}
            onClick={() => handleRankingType("average")}
          >
            Avg
          </button>
        </li>
        <li className="flex-1">
          <button
            className={`w-full h-full rounded uppercase text-xs font-bold border bg-white dark:bg-dark-400 ${
              rankingType === "tendency"
                ? "border-marine-600 text-marine-600 dark:text-marine-400"
                : "border-gray-200 text-gray-500 hover:text-marine-500 hover:border-marine-300 dark:border-dark-300 dark:hover:border-marine-500 dark:text-gray-100"
            }`}
            onClick={() => handleRankingType("tendency")}
          >
            Tdc
          </button>
        </li>
        <li className="flex-1">
          <button
            className={`w-full h-full rounded uppercase text-xs font-bold bg-white dark:bg-dark-400 border ${
              rankingType === "award"
                ? "border-marine-600 text-marine-600 dark:text-marine-400"
                : "border-gray-200 text-gray-500 hover:text-marine-500 hover:border-marine-300 dark:border-dark-300 dark:hover:border-marine-500 dark:text-gray-100"
            }`}
            onClick={() => handleRankingType("award")}
          >
            AWR
          </button>
        </li>
      </ul>

      <div className="flex-1 overflow-scroll scroll-hide">
        {rankingType === "average" && <LatestSeasonAvgRanking stats={stats} />}
        {rankingType === "tendency" && <LatestSeasonTdcRanking stats={stats} />}
        {rankingType === "award" && <LatestSeasonAwardRanking stats={stats} />}
      </div>
    </div>
  );
};

export default LatestSeasonRanking;
