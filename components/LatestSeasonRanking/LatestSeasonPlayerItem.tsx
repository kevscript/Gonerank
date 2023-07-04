import { LatestSeasonPlayerStats } from "@/utils/latestSeasonRanking";
import { percentageToColor } from "@/utils/percentageToColor";
import Link from "next/link";

type LatestSeasonPlayerItemProps = {
  player: LatestSeasonPlayerStats;
  rank: number;
  tooltipId?: string;
  rankColorPercentage: number;
  theme: "dark" | "light";
  stat?: string | number;
};

const LatestSeasonPlayerItem = ({
  player,
  rank,
  tooltipId,
  rankColorPercentage,
  theme,
  stat,
}: LatestSeasonPlayerItemProps) => {
  return (
    <li className="flex flex-row flex-shrink-0 w-full h-8 text-sm group">
      <Link href={`/players/${player.id}`}>
        <div className="flex items-center justify-between flex-1">
          <div className="flex items-center justify-center w-8 h-full bg-white border border-gray-100 rounded group-hover:border-marine-200 dark:group-hover:border-gray-700 dark:bg-dark-500 dark:border-dark-300 font-num">
            {rank}
          </div>

          <div className="flex items-center justify-between flex-1 h-full ml-1 overflow-hidden bg-white border border-gray-100 rounded cursor-pointer dark:group-hover:border-gray-700 dark:bg-dark-500 dark:border-dark-300 dark:group-hover:bg-dark-600">
            <span className="px-2 truncate group-hover:text-marine-600 dark:group-hover:text-marine-200">
              {player.firstName[0] + ". " + player.lastName}
            </span>

            <div
              data-tip
              data-for={tooltipId}
              // data-tooltip-id={tooltipId}
              // data-tooltip-place="left"
              data-testid="stat"
              className="flex items-center justify-center w-16 h-full bg-marine-100 dark:bg-dark-400 text-marine-600 dark:text-marine-400 font-num"
              style={{
                backgroundColor: `${
                  stat !== undefined
                    ? percentageToColor({
                        percentage: rankColorPercentage,
                        theme: theme as any,
                        maxHue: 220,
                        minHue: 300,
                        opacity: 0.1,
                      })
                    : `${theme === "dark" ? "rgb(31, 31, 31)" : "#eee"}`
                }`,
                color: `${
                  stat !== undefined
                    ? percentageToColor({
                        percentage: rankColorPercentage,
                        theme: theme as any,
                        maxHue: 220,
                        minHue: 300,
                        opacity: 1,
                      })
                    : `${theme === "dark" ? "rgb(232, 234, 255)" : "#666"}`
                }`,
              }}
            >
              {stat !== undefined ? stat : "-"}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default LatestSeasonPlayerItem;
