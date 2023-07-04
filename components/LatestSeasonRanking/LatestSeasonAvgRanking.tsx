import { LatestSeasonPlayerStats } from "@/utils/latestSeasonRanking";
import { useTheme } from "next-themes";
import { Fragment, useState } from "react";
import LatestSeasonPlayerItem from "./LatestSeasonPlayerItem";
import LatestSeasonTooltipWrapper from "./LatestSeasonTooltipWrapper";

export type LatestSeasonAvgRankingProps = {
  stats: LatestSeasonPlayerStats[];
};

const LatestSeasonAvgRanking = ({ stats }: LatestSeasonAvgRankingProps) => {
  const [minMax] = useState(() => {
    const avgs = stats
      .filter((x) => x.globalAvgQuantity > 0)
      .map((x) => x.globalAvgSum / x.globalAvgQuantity);
    return {
      min: Math.min(...avgs),
      max: Math.max(...avgs),
    };
  });

  const { theme, setTheme } = useTheme();

  return (
    <ul
      className="flex flex-col w-full h-full gap-y-[2px]"
      data-testid="avgRanking"
    >
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
          .map((player, i) => (
            <Fragment key={player.id}>
              <LatestSeasonPlayerItem
                player={player}
                rank={i + 1}
                rankColorPercentage={
                  (player.globalAvgSum / player.globalAvgQuantity -
                    minMax.min) /
                  (minMax.max - minMax.min)
                }
                stat={
                  player.globalAvgQuantity
                    ? (player.globalAvgSum / player.globalAvgQuantity).toFixed(
                        2
                      )
                    : undefined
                }
                theme={theme as any}
                tooltipId={`tooltip-${player.id}`}
              />
              <LatestSeasonTooltipWrapper
                id={`tooltip-${player.id}`}
                theme={theme as any}
              >
                {player.globalAvgQuantity ? (
                  <div className="flex items-center justify-center w-full h-full gap-1 text-xs">
                    <span className="italic text-marine-300">
                      {player.globalAvgQuantity}
                    </span>
                    <span className="italic">
                      {player.globalAvgQuantity > 1 ? " matchs" : " match"}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs italic text-marine-300">
                    0 match
                  </span>
                )}
              </LatestSeasonTooltipWrapper>
            </Fragment>
          ))}
    </ul>
  );
};

export default LatestSeasonAvgRanking;
