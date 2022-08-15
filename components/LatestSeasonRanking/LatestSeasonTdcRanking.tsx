import { LatestSeasonPlayerStats } from "@/utils/latestSeasonRanking";
import { rankingTendencySort } from "@/utils/numericalSort";

export type LatestSeasonTdcRankingProps = {
  stats: LatestSeasonPlayerStats[];
};

const LatestSeasonTdcRanking = ({ stats }: LatestSeasonTdcRankingProps) => {
  return (
    <ul
      className="flex flex-col w-full h-full gap-y-[2px]"
      data-testid="tdcRanking"
    >
      {stats &&
        stats
          .sort((a, b) => rankingTendencySort({ xA: a, xB: b }))
          .map((p, i) => (
            <li
              key={p.id}
              className="flex flex-row flex-shrink-0 w-full h-8 text-sm"
            >
              <div className="flex items-center justify-center w-8 h-full bg-white border border-gray-100 rounded dark:bg-dark-500 dark:border-dark-300 font-num">
                {i + 1}
              </div>
              <div className="flex items-center justify-between flex-1 ml-1 overflow-hidden bg-white border border-gray-100 rounded dark:bg-dark-500 dark:border-dark-300">
                <span className="px-2">
                  {p.firstName[0] + ". " + p.lastName}
                </span>
                <div className="flex items-center justify-center w-12 h-full bg-marine-100 dark:bg-dark-400 text-marine-600 dark:text-marine-400 font-num">
                  {p.globalAvgSum ? p.globalTendency.toFixed(1) : "-"}
                </div>
              </div>
            </li>
          ))}
    </ul>
  );
};

export default LatestSeasonTdcRanking;
