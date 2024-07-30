import { AxisLeft, AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear, scalePoint } from "@visx/scale";
import { LinePath } from "@visx/shape";
import * as curves from "@visx/curve";
import { Grid } from "@visx/grid";
import { useTooltip } from "@visx/tooltip";
import { FormattedPlayersChartData } from "@/utils/charts/formatPlayersChartData";
import { chartDefaults, ChartDimensions } from "@/utils/charts/chartDefaults";
import VisxPlayersTooltip, {
  VisxPlayersTooltipData,
} from "./tooltips/VisxPlayersTooltip";
import { Fragment } from "react";

type VisxPlayersTdcProgressChartProps = {
  players: FormattedPlayersChartData[];
  idsToShow: string[];
  theme: string;
  dimensions: ChartDimensions;
};

const VisxPlayersTdcProgressChart = ({
  players,
  idsToShow,
  dimensions = chartDefaults.dimensions,
  theme,
}: VisxPlayersTdcProgressChartProps) => {
  const { width, height } = dimensions;
  const baseColor = chartDefaults.baseColor(theme);
  const margins = chartDefaults.margins;
  const xMax = chartDefaults.xMax({ dimensions, margins });
  const yMax = chartDefaults.yMax({ dimensions, margins });
  const gridNumTicksColumns =
    players[0].matches.length > 16
      ? players[0].matches.length / 2
      : players[0].matches.length;

  const xScale = scalePoint({
    domain: [...players[0].matches.map((match) => match.date)],
    range: [0, xMax],
    padding: 0.5,
  });

  const refScale = scalePoint({
    domain: [...players[0].matches.map((match) => match.date)],
    range: [0, xMax],
  });

  const getDomain = () => {
    let highestTdc = 0;
    let lowestTdc = 0;

    players.forEach((player) => {
      player.matches.forEach((m) => {
        if (typeof m.tdcProgress === "number") {
          if (m.tdcProgress > highestTdc) highestTdc = m.tdcProgress;
          if (m.tdcProgress < lowestTdc) lowestTdc = m.tdcProgress;
        }
      });
    });

    if (Math.abs(highestTdc) > Math.abs(lowestTdc)) {
      return [Math.floor(-Math.abs(highestTdc)), Math.ceil(highestTdc)];
    }

    if (Math.abs(highestTdc) < Math.abs(lowestTdc)) {
      return [Math.floor(lowestTdc), Math.ceil(Math.abs(lowestTdc))];
    }

    return [Math.floor(lowestTdc), Math.ceil(highestTdc)];
  };

  const yScale = scaleLinear<number>({
    domain: getDomain(),
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
  } = useTooltip({ tooltipData: {} as VisxPlayersTooltipData });

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
      showTooltip({
        tooltipLeft: e.clientX,
        tooltipTop: e.clientY,
        tooltipData: {
          player: playerInfo,
          match: hoveredMatch,
          color: data.color,
        },
      });
    }
  };

  return (
    <>
      <svg width={width} height={height}>
        <Group left={margins.left} top={margins.top}>
          <AxisLeft
            scale={yScale}
            numTicks={5}
            tickLength={4}
            stroke={baseColor}
            tickStroke={baseColor}
            tickLabelProps={(x) => ({
              style: {
                fontSize: 12,
                fill: baseColor,
                textAnchor: "end",
              },
              dy: 4,
              dx: -4,
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
            stroke={baseColor}
            tickStroke={baseColor}
            tickLabelProps={() => ({
              style: {
                fill: baseColor,
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
            numTicksColumns={gridNumTicksColumns}
            stroke={baseColor}
            strokeWidth={0.5}
            strokeOpacity={theme === "dark" ? 0.25 : 0.1}
            numTicksRows={5}
          />
          <Group>
            <LinePath
              data={players[0].matches}
              x={(d) => refScale(d.date)!}
              y={yScale(0)}
              stroke={baseColor}
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
                  y={(d) => yScale(d.tdcProgress)}
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
                      <Fragment key={`${m.id}-fragment`}>
                        <circle
                          className={`cursor-pointer hover:stroke-2 ${
                            theme === "dark"
                              ? "hover:stroke-white"
                              : "hover:stroke-black"
                          }`}
                          key={`${p.id}__${m.id}__hoverable-tdcprogress`}
                          r={9}
                          cx={xScale(m.date)!}
                          cy={yScale(m.tdcProgress)}
                          fill="transparent"
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

                        <circle
                          className={`pointer-events-none ${
                            theme === "dark"
                              ? "hover:stroke-white"
                              : "hover:stroke-black"
                          }`}
                          key={`${p.id}__${m.id}`}
                          r={3}
                          cx={xScale(m.date)!}
                          cy={yScale(m.tdcProgress)}
                          fill={`hsla(${
                            (360 / idsToShow.length) * idsToShow.indexOf(p.id) +
                            1
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
                        />
                      </Fragment>
                    )
                  );
                })}
              </Group>
            );
          })}
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <VisxPlayersTooltip
          top={tooltipTop}
          left={tooltipLeft}
          data={tooltipData}
        >
          {tooltipData.match.tdcProgress}
        </VisxPlayersTooltip>
      )}
    </>
  );
};

export default VisxPlayersTdcProgressChart;
