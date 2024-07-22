import { AxisLeft, AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear, scalePoint } from "@visx/scale";
import { LinePath } from "@visx/shape";
import * as curves from "@visx/curve";
import { Grid } from "@visx/grid";
import { useTooltip } from "@visx/tooltip";
import { FormattedPlayerChartData } from "@/utils/charts/formatPlayerChartData";
import { chartDefaults, ChartDimensions } from "@/utils/charts/chartDefaults";
import VisxPlayerTooltip, {
  VisxPlayerTooltipData,
} from "./tooltips/VisxPlayerTooltip";

type VisxPlayerAvgLinearChartProps = {
  matches: FormattedPlayerChartData[];
  theme: string;
  dimensions?: ChartDimensions;
};

const VisxPlayerAvgLinearChart = ({
  matches,
  dimensions = chartDefaults.dimensions,
  theme,
}: VisxPlayerAvgLinearChartProps) => {
  const { width, height } = dimensions;
  const baseColor = chartDefaults.baseColor(theme);
  const margins = chartDefaults.margins;
  const xMax = chartDefaults.xMax({ dimensions, margins });
  const yMax = chartDefaults.yMax({ dimensions, margins });
  const gridNumTicksColumns =
    matches.length > 16 ? matches.length / 2 : matches.length;

  const xScale = scalePoint({
    domain: [...matches.map((match) => match.date)],
    range: [0, xMax],
    padding: 0.5,
  });

  const refScale = scalePoint({
    domain: [...matches.map((match) => match.date)],
    range: [0, xMax],
  });

  const yScale = scaleLinear<number>({
    domain: [0, 10],
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
  } = useTooltip({ tooltipData: {} as VisxPlayerTooltipData });

  const handlePointHover = (
    e: React.MouseEvent<SVGCircleElement>,
    data: { matchId: string }
  ) => {
    const hoveredMatch = matches.find((m) => m.id === data.matchId);
    if (hoveredMatch) {
      showTooltip({
        tooltipLeft: e.clientX,
        tooltipTop: e.clientY,
        tooltipData: { match: hoveredMatch },
      });
    }
  };

  return (
    <>
      <svg width={width} height={height}>
        <Group left={margins.left} top={margins.top}>
          <AxisLeft
            scale={yScale}
            tickValues={[1, 3, 5, 7, 9]}
            tickLength={4}
            stroke={baseColor}
            tickStroke={baseColor}
            tickLabelProps={() => ({
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
            rowTickValues={[1, 3, 5, 7, 9]}
            numTicksColumns={gridNumTicksColumns}
            stroke={baseColor}
            strokeWidth={0.5}
            strokeOpacity={theme === "dark" ? 0.25 : 0.1}
            numTicksRows={0}
          />
          <Group>
            <LinePath
              data={matches}
              x={(d) => refScale(d.date)!}
              y={yScale(5)}
              stroke={baseColor}
              strokeWidth={0.5}
              strokeOpacity={theme === "dark" ? 1 : 0.5}
              strokeDasharray={4}
            />
          </Group>

          <Group>
            <LinePath
              className={`${
                theme === "dark" ? "stroke-marine-600" : "stroke-marine-400"
              }`}
              data={matches.filter((m) => m.averageQuantity)}
              defined={(d) => d.averageQuantity !== undefined}
              curve={curves["curveMonotoneX"]}
              x={(d) => xScale(d.date)!}
              y={(d) =>
                d.averageQuantity ? yScale(d.averageSum / d.averageQuantity) : 0
              }
              strokeWidth={2}
              strokeOpacity={1}
            />
            {matches.map((m, i) => {
              return (
                m.averageQuantity && (
                  <>
                    <circle
                      className={`cursor-pointer hover:stroke-2 fill-transparent ${
                        theme === "dark"
                          ? "hover:stroke-white"
                          : "hover:stroke-black"
                      }`}
                      key={`${m.id}__hoverable`}
                      r={9}
                      cx={xScale(m.date)!}
                      cy={yScale(m.averageSum / m.averageQuantity)}
                      onMouseOver={(e) =>
                        handlePointHover(e, { matchId: m.id })
                      }
                      onMouseOut={hideTooltip}
                    />

                    <circle
                      className={`pointer-events-none ${
                        theme === "dark"
                          ? "hover:stroke-white fill-marine-200"
                          : "hover:stroke-black fill-marine-600"
                      }`}
                      key={`${m.id}`}
                      r={3}
                      cx={xScale(m.date)!}
                      cy={yScale(m.averageSum / m.averageQuantity)}
                    />
                  </>
                )
              );
            })}
          </Group>
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <VisxPlayerTooltip
          top={tooltipTop}
          left={tooltipLeft}
          data={tooltipData}
        >
          {tooltipData.match.averageQuantity &&
            (
              tooltipData.match.averageSum / tooltipData.match.averageQuantity
            ).toFixed(2)}
        </VisxPlayerTooltip>
      )}
    </>
  );
};

export default VisxPlayerAvgLinearChart;
