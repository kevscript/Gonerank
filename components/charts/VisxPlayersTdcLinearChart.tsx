import { AxisLeft, AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear, scalePoint } from "@visx/scale";
import { LinePath } from "@visx/shape";
import * as curves from "@visx/curve";
import { Grid } from "@visx/grid";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";

import { FormattedPlayersChartData } from "@/utils/charts/formatPlayersChartData";
import { getContrastColor } from "@/utils/getContrastColor";

type VisxPlayersTdcLinearChartProps = {
  players: FormattedPlayersChartData[];
  idsToShow: string[];
  theme: string;
  dimensions: { width: number; height: number };
};

type TooltipData = {
  player: Omit<FormattedPlayersChartData, "matches">;
  match: FormattedPlayersChartData["matches"][0];
  color: string;
};

const defaultDimensions = { width: 600, height: 400 };

const VisxPlayersTdcLinearChart = ({
  players,
  idsToShow,
  dimensions = defaultDimensions,
  theme,
}: VisxPlayersTdcLinearChartProps) => {
  const { width, height } = dimensions;

  const margin = { top: 32, right: 32, bottom: 48, left: 32 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scalePoint({
    domain: [...players[0].matches.map((match) => match.date)],
    range: [0, xMax],
    padding: 0.5,
  });

  const refScale = scalePoint({
    domain: [...players[0].matches.map((match) => match.date)],
    range: [0, xMax],
  });

  const getTdcDomain = () => {
    let highestTdc = 0;
    let lowestTdc = 0;

    players.forEach((player) => {
      player.matches.forEach((m) => {
        if (typeof m.averageQuantity === "number") {
          const tdc = m.averageSum - 5 * m.averageQuantity;
          if (tdc > highestTdc) highestTdc = tdc;
          if (tdc < lowestTdc) lowestTdc = tdc;
        }
      });
    });

    if (Math.abs(highestTdc) > Math.abs(lowestTdc)) {
      return [Math.floor(-Math.abs(highestTdc)), Math.ceil(highestTdc)];
    }

    if (Math.abs(highestTdc) < Math.abs(lowestTdc)) {
      return [Math.floor(lowestTdc), Math.ceil(Math.abs(lowestTdc))];
    }

    console.log("aaa", [Math.floor(lowestTdc), Math.ceil(highestTdc)]);

    return [Math.floor(lowestTdc), Math.ceil(highestTdc)];
  };

  const yScale = scaleLinear<number>({
    domain: getTdcDomain(),
    nice: true,
    range: [yMax, 0],
  });

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip({ tooltipData: {} as TooltipData });

  const handlePointHover = (
    e: React.MouseEvent<SVGCircleElement>,
    data: { playerId: string; matchId: string; color: string }
  ) => {
    const hoveredPlayer = players.find((p) => p.id === data.playerId);
    const hoveredMatch = hoveredPlayer?.matches.find(
      (m) => m.id === data.matchId
    );
    if (hoveredPlayer && hoveredMatch) {
      const { matches, ...playerInfo } = hoveredPlayer;
      const info: TooltipData = {
        player: playerInfo,
        match: hoveredMatch,
        color: data.color,
      };

      showTooltip({
        tooltipLeft: e.clientX,
        tooltipTop: e.clientY,
        tooltipData: info,
      });
    }
  };

  return (
    <>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <AxisLeft
            scale={yScale}
            numTicks={5}
            tickLength={4}
            stroke={theme === "dark" ? "#eeeeee" : "#111111"}
            tickStroke={theme === "dark" ? "#eeeeee" : "#111111"}
            tickLabelProps={() => ({
              dy: 4,
              dx: -16,
              fontSize: 12,
              fill: theme === "dark" ? "#eeeeee" : "#111111",
            })}
          />
          <AxisBottom
            scale={xScale}
            top={yMax}
            tickLength={4}
            tickFormat={(d) =>
              new Date(d).toLocaleDateString(undefined, {
                month: "numeric",
                day: "numeric",
              })
            }
            stroke={theme === "dark" ? "#eeeeee" : "#111111"}
            tickStroke={theme === "dark" ? "#eeeeee" : "#111111"}
            tickLabelProps={() => ({
              style: {
                fill: theme === "dark" ? "#eeeeee" : "#111111",
                fontSize: 12,
                textAnchor: "middle",
              },
              dy: 4,
            })}
          />
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            numTicksColumns={players[0].matches.length}
            stroke={theme === "dark" ? "#eeeeee" : "#111111"}
            strokeWidth={0.5}
            strokeOpacity={theme === "dark" ? 0.25 : 0.1}
            numTicksRows={5}
          />
          <Group>
            <LinePath
              data={players[0].matches}
              x={(d) => refScale(d.date)!}
              y={yScale(0)}
              stroke={theme === "dark" ? "#eeeeee" : "#111111"}
              strokeWidth={0.5}
              strokeOpacity={theme === "dark" ? 1 : 0.5}
              strokeDasharray={4}
            />
          </Group>
          {players.map((p, i) => {
            return (
              <Group key={`line-${p.id}`}>
                <LinePath
                  className="pointer-events-none"
                  defined={(d) => d.averageQuantity !== undefined}
                  curve={curves["curveMonotoneX"]}
                  data={p.matches.filter((m) => m.averageQuantity)}
                  x={(d) => xScale(d.date)!}
                  y={(d) =>
                    d.averageQuantity
                      ? yScale(d.averageSum - 5 * d.averageQuantity)
                      : 0
                  }
                  stroke={`hsla(${
                    (360 / idsToShow.length) * idsToShow.indexOf(p.id) + 1
                  }, 100%, ${theme === "dark" ? "70%" : "50%"}, ${
                    idsToShow.length === 0 ||
                    idsToShow.some((id) => id === p.id)
                      ? "60%"
                      : "0%"
                  })`}
                  strokeWidth={2}
                  strokeOpacity={1}
                />
                {p.matches.map((m, j) => {
                  return (
                    m.averageQuantity && (
                      <circle
                        className={`cursor-pointer  hover:stroke-2 ${
                          theme === "dark"
                            ? "hover:stroke-white"
                            : "hover:stroke-black"
                        }`}
                        key={`${p.id}__${m.id}`}
                        r={3}
                        cx={xScale(m.date)!}
                        cy={yScale(m.averageSum - 5 * m.averageQuantity)}
                        fill={`hsla(${
                          (360 / idsToShow.length) * idsToShow.indexOf(p.id) + 1
                        }, 100%, ${theme === "dark" ? "70%" : "50%"}, ${
                          idsToShow.length === 0 ||
                          idsToShow.some((id) => id === p.id)
                            ? "100%"
                            : "0%"
                        })`}
                        style={{
                          display:
                            idsToShow.length === 0 ||
                            idsToShow.some((id) => id === p.id)
                              ? "block"
                              : "none",
                        }}
                        onMouseOver={(e) =>
                          handlePointHover(e, {
                            playerId: p.id,
                            matchId: m.id,
                            color: `hsla(${
                              (360 / idsToShow.length) *
                                idsToShow.indexOf(p.id) +
                              1
                            },  ${theme === "dark" ? "70%" : "50%"}, ${
                              idsToShow.length === 0 ||
                              idsToShow.some((id) => id === p.id)
                                ? "60%"
                                : "0%"
                            })`,
                          })
                        }
                        onMouseOut={hideTooltip}
                      />
                    )
                  );
                })}
              </Group>
            );
          })}
        </Group>
      </svg>

      {tooltipOpen && (
        <TooltipWithBounds
          className="!p-0 border border-gray-400 !rounded-sm !overflow-hidden !bg-gray-400"
          key={tooltipData ? tooltipData.player.id : Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <div className="flex flex-col flex-nowrap gap-y-[1px]">
            <div className="relative flex items-center justify-between w-full p-2 font-medium text-black bg-white flex-nowrap gap-x-2">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{ backgroundColor: tooltipData?.color, opacity: 0.2 }}
              ></div>
              <span>
                {tooltipData?.player.firstName[0] +
                  ". " +
                  tooltipData?.player.lastName}
              </span>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tooltipData?.color }}
              ></div>
            </div>
            <div className="flex w-full flex-nowrap gap-x-[1px]">
              <div className="flex flex-col flex-nowrap gap-y-[1px]">
                <div className="flex justify-between w-full gap-x-[1px]">
                  <div
                    className="flex items-center justify-center flex-1 px-2 py-1 text-xs font-bold text-white"
                    style={{
                      backgroundColor: tooltipData?.match.opponent?.primary,
                      color: tooltipData
                        ? getContrastColor(tooltipData.match.opponent.primary)
                        : "white",
                    }}
                  >
                    {tooltipData?.match.opponent?.abbreviation}
                  </div>
                  <div className="justify-center px-2 py-1 text-xs bg-gray-100">
                    {tooltipData?.match.home ? "H" : "A"}
                  </div>
                </div>
                <div className="flex justify-between w-full gap-x-[1px]">
                  <div className="justify-center flex-1 px-2 py-1 text-xs bg-gray-100">
                    {tooltipData?.match.competition?.abbreviation}
                  </div>
                  <div className="justify-center px-2 py-1 text-xs bg-gray-100">
                    {new Date(tooltipData!.match.date).toLocaleDateString(
                      undefined,
                      {
                        month: "numeric",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center min-w-[48px] flex-1 text-base font-bold bg-gray-200 font-num text-black">
                <span>
                  {tooltipData?.match.averageQuantity &&
                    tooltipData?.match.averageSum -
                      5 * tooltipData?.match.averageQuantity}
                </span>
              </div>
            </div>
          </div>
        </TooltipWithBounds>
      )}
    </>
  );
};

export default VisxPlayersTdcLinearChart;
