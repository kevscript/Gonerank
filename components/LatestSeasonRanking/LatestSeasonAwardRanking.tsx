import { LatestSeasonPlayerStats } from "@/utils/latestSeasonRanking";
import { rankingAwardSort } from "@/utils/numericalSort";
import { percentageToColor } from "@/utils/percentageToColor";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export type LatestSeasonAwardRankingProps = {
  stats: LatestSeasonPlayerStats[];
};

const LatestSeasonAwardRanking = ({ stats }: LatestSeasonAwardRankingProps) => {
  const [minMax] = useState(() => {
    const awards = stats
      .filter((x) => x.globalAvgQuantity > 0)
      .map((x) => x.globalAward);
    return {
      min: Math.min(...awards),
      max: Math.max(...awards),
    };
  });

  const { theme, setTheme } = useTheme();

  return (
    <ul
      className="flex flex-col w-full h-full gap-y-[2px]"
      data-testid="awrRanking"
    >
      {stats &&
        stats
          .sort((a, b) => rankingAwardSort({ xA: a, xB: b }))
          .map((p, i) => (
            <li
              key={p.id}
              className="flex flex-row flex-shrink-0 w-full h-8 text-sm"
            >
              <div className="flex items-center justify-center w-8 h-full bg-white border border-gray-100 rounded dark:bg-dark-500 dark:border-dark-300 font-num">
                {i + 1}
              </div>
              <div className="flex items-center justify-between flex-1 ml-1 overflow-hidden bg-white border border-gray-100 rounded dark:bg-dark-500 dark:border-dark-300">
                <Link href={`/players/${p.id}`}>
                  <span className="px-2">
                    {p.firstName[0] + ". " + p.lastName}
                  </span>
                </Link>
                <div
                  className="flex items-center justify-center w-12 h-full bg-marine-100 dark:bg-dark-400 text-marine-600 dark:text-marine-400 font-num"
                  style={{
                    color: `${
                      p.globalAvgQuantity
                        ? percentageToColor(
                            (p.globalAward - minMax.min) /
                              (minMax.max - minMax.min),
                            theme as any
                          )
                        : "#666666"
                    }`,
                  }}
                >
                  {p.globalAvgQuantity ? p.globalAward : "-"}
                </div>
              </div>
            </li>
          ))}
    </ul>
  );
};

export default LatestSeasonAwardRanking;
