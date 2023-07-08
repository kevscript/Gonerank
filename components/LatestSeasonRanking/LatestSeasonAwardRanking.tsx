import { LatestSeasonPlayerStats } from "@/utils/latestSeasonRanking";
import { rankingAwardSort } from "@/utils/numericalSort";
import { percentageToColor } from "@/utils/percentageToColor";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Fragment, useState } from "react";
import ChevronIcon from "../Icons/Chevron";
import LatestSeasonPlayerItem from "./LatestSeasonPlayerItem";
import LatestSeasonTooltipWrapper from "./LatestSeasonTooltipWrapper";

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
          .map((player, i) => (
            <Fragment key={player.id}>
              <LatestSeasonPlayerItem
                player={player}
                rank={i + 1}
                rankColorPercentage={
                  (player.globalAward - minMax.min) / (minMax.max - minMax.min)
                }
                stat={player.globalAvgQuantity ? player.globalAward : undefined}
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
                        {player.globalMotm ? `${player.globalMotm}` : "-"}
                      </span>
                      <span className="text-red-300">
                        {player.globalBotm ? `${player.globalBotm}` : "-"}
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

export default LatestSeasonAwardRanking;
