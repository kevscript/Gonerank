import { LatestSeasonPlayerStats } from "@/utils/latestSeasonRanking";

export type LatestSeasonAvgRankingProps = {
  stats: LatestSeasonPlayerStats[];
};

const LatestSeasonAvgRanking = ({ stats }: LatestSeasonAvgRankingProps) => {
  return (
    <ul className="flex flex-col w-full h-full gap-y-[2px]">
      {stats &&
        stats
          .sort((a, b) => {
            const aRating = a.globalAvgSum
              ? a.globalAvgSum / a.globalAvgQuantity
              : 0;
            const bRating = b.globalAvgSum
              ? b.globalAvgSum / b.globalAvgQuantity
              : 0;

            return aRating > bRating ? -1 : 1;
          })
          .map((p, i) => (
            <li
              key={p.id}
              className="flex flex-row flex-shrink-0 w-full h-8 text-sm"
            >
              <div className="flex items-center justify-center w-8 h-full bg-white border-b border-gray-100 rounded font-num">
                {i + 1}
              </div>
              <div className="flex items-center justify-between flex-1 ml-1 overflow-hidden bg-white border-b border-gray-100 rounded">
                <span className="px-2">
                  {p.firstName[0] + ". " + p.lastName}
                </span>
                <div className="flex items-center justify-center w-12 h-full bg-marine-100 text-marine-600 font-num">
                  {p.globalAvgSum
                    ? (p.globalAvgSum / p.globalAvgQuantity).toFixed(2)
                    : "-"}
                </div>
              </div>
            </li>
          ))}
    </ul>
  );
};

export default LatestSeasonAvgRanking;
