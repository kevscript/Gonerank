import HomeIcon from "@/components/Icons/HomeIcon";
import PlaneIcon from "@/components/Icons/PlaneIcon";
import { FormattedPlayerChartData } from "@/utils/charts/formatPlayerChartData";
import { getContrastColor } from "@/utils/getContrastColor";
import { TooltipWithBounds } from "@visx/tooltip";
import { ReactNode } from "react";

export type VisxPlayerTooltipData = {
  match: FormattedPlayerChartData;
};

type VisxMatchesTooltipProps = {
  top: number | undefined;
  left: number | undefined;
  data: VisxPlayerTooltipData;
  children: ReactNode;
};

const VisxPlayerTooltip = ({
  top,
  left,
  data,
  children,
}: VisxMatchesTooltipProps) => {
  return (
    <TooltipWithBounds
      className="!p-0 border border-gray-400 !rounded-sm !bg-gray-400"
      key={Math.random()}
      top={top}
      left={left}
    >
      <div className="flex flex-col flex-nowrap gap-y-[1px] z-30 rounded-sm">
        <div className="flex w-full flex-nowrap gap-x-[1px]">
          <div className="flex flex-col flex-nowrap gap-y-[1px]">
            <div className="flex justify-between w-full gap-x-[1px]">
              <div className="flex items-center justify-center px-2 py-1 text-xs bg-gray-100">
                {data.match.home ? (
                  <HomeIcon className="w-3.5 h-3.5 fill-dark-600" />
                ) : (
                  <PlaneIcon className="w-3.5 h-3.5 fill-dark-600" />
                )}
              </div>
              <div
                className="flex items-center justify-center flex-1 px-2 py-1 text-xs font-bold text-white"
                style={{
                  backgroundColor: `${data.match.opponent.primary}B3`,
                  color: data
                    ? getContrastColor(data.match.opponent.primary)
                    : "white",
                }}
              >
                {data.match.opponent.abbreviation}
              </div>
            </div>
            <div className="flex justify-between w-full gap-x-[1px]">
              <div className="justify-center flex-1 px-2 py-1 text-xs bg-gray-100">
                {data.match.competition.abbreviation}
              </div>
              <div className="justify-center px-2 py-1 text-xs bg-gray-100">
                {new Date(data.match.date).toLocaleDateString(undefined, {
                  month: "numeric",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center min-w-[48px] flex-1 text-base font-bold bg-gray-200 font-num text-black">
            <span>{children}</span>
          </div>
        </div>
      </div>
    </TooltipWithBounds>
  );
};

export default VisxPlayerTooltip;
