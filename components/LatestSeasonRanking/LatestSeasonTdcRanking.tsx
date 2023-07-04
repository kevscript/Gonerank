import { LatestSeasonPlayerStats } from "@/utils/latestSeasonRanking";
import { rankingTendencySort } from "@/utils/numericalSort";
import { useTheme } from "next-themes";
import { Fragment, useState } from "react";
import ChevronIcon from "../Icons/Chevron";
import LatestSeasonTooltipWrapper from "./LatestSeasonTooltipWrapper";
import LatestSeasonPlayerItem from "./LatestSeasonPlayerItem";

export type LatestSeasonTdcRankingProps = {
  stats: LatestSeasonPlayerStats[];
};

const LatestSeasonTdcRanking = ({ stats }: LatestSeasonTdcRankingProps) => {
  const [minMax] = useState(() => {
    const tdcs = stats
      .filter((x) => x.globalAvgQuantity > 0)
      .map((x) => x.globalTendency);
    return {
      min: Math.min(...tdcs),
      max: Math.max(...tdcs),
    };
  });

  const { theme, setTheme } = useTheme();

  return (
    <ul
      className="flex flex-col w-full h-full gap-y-[2px]"
      data-testid="tdcRanking"
    >
      {stats &&
        stats
          .sort((a, b) => rankingTendencySort({ xA: a, xB: b }))
          .map((player, i) => (
            <Fragment key={player.id}>
              <LatestSeasonPlayerItem
                player={player}
                rank={i + 1}
                rankColorPercentage={
                  (player.globalTendency - minMax.min) /
                  (minMax.max - minMax.min)
                }
                stat={
                  player.globalAvgQuantity
                    ? player.globalTendency > 0
                      ? `+${player.globalTendency.toFixed(1)}`
                      : `${player.globalTendency.toFixed(1)}`
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
                    <div className="flex flex-col items-end">
                      <span className="text-marine-300">
                        {player.globalAvgQuantity
                          ? `+${player.globalPositiveTendency.toFixed(1)}`
                          : "-"}
                      </span>
                      <span className="text-red-300">
                        {player.globalAvgQuantity
                          ? `-${player.globalNegativeTendency.toFixed(1)}`
                          : "-"}
                      </span>
                    </div>
                    <div className="flex flex-col ">
                      <div className="w-3 h-full rotate-180 translate-y-[2px]">
                        <ChevronIcon className="fill-marine-400" />
                      </div>
                      <div className="w-3 h-full -translate-y-[2px]">
                        <ChevronIcon className="fill-red-400 " />
                      </div>
                    </div>
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

export default LatestSeasonTdcRanking;
