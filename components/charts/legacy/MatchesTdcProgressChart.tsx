import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FormattedMatchesChartData } from "@/utils/charts/formatMatchesChartData";
import CustomTooltip from "./CustomTooltip";
import { useRouter } from "next/router";

type MatchesTdcProgressChartProps = {
  matches: FormattedMatchesChartData[];
  highlighted: boolean;
  theme: string;
};

const MatchesTdcProgressChart = ({
  matches,
  highlighted,
  theme,
}: MatchesTdcProgressChartProps) => {
  const router = useRouter();

  const getDomain = () => {
    let highestTdc = 0;
    let lowestTdc = 0;

    matches.forEach((m) => {
      if (typeof m.tdcProgress === "number") {
        if (m.tdcProgress > highestTdc) highestTdc = m.tdcProgress;
        if (m.tdcProgress < lowestTdc) lowestTdc = m.tdcProgress;
      }
    });

    if (Math.abs(highestTdc) > Math.abs(lowestTdc)) {
      return [Math.floor(-Math.abs(highestTdc)), Math.ceil(highestTdc)];
    }

    if (Math.abs(highestTdc) < Math.abs(lowestTdc)) {
      return [Math.floor(lowestTdc), Math.ceil(Math.abs(lowestTdc))];
    }

    return [Math.floor(lowestTdc), Math.ceil(highestTdc)];
  };

  if (!matches) return null;
  return (
    <ResponsiveContainer aspect={16.0 / 8.0} height="50%">
      <LineChart
        margin={{ top: 0, right: 32, left: -32, bottom: 32 }}
        onClick={(e) =>
          router.push(`/matches/${e.activePayload![0].payload.id}`)
        }
      >
        <XAxis
          dataKey={(x) => {
            return new Date(x.date).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
            });
          }}
          allowDuplicatedCategory={false}
          stroke={theme === "dark" ? "white" : "black"}
          tickMargin={16}
          tickLine={false}
          padding={{ left: 4, right: 4 }}
          minTickGap={32}
          fontSize={14}
          axisLine={false}
        />
        <YAxis
          type="number"
          dataKey="tdcProgress"
          domain={getDomain()}
          ticks={[0]}
          stroke={theme === "dark" ? "white" : "black"}
          tickMargin={8}
          tickLine={false}
          fontSize={14}
          axisLine={false}
        />

        <CartesianGrid
          stroke="#666666"
          strokeDasharray="1 2"
          strokeOpacity="1"
          fill={theme === "dark" ? "#1b1b1b" : "#f3f4f6"}
        />
        <ReferenceLine y={0} strokeOpacity="1" stroke="#666666" />
        <Tooltip content={(props) => <CustomTooltip {...props} />} />
        <Line
          data={matches}
          type="monotone"
          dataKey="tdcProgress"
          stroke="#4834f7"
          strokeWidth={2}
          isAnimationActive={false}
          dot={highlighted}
        >
          {/* <LabelList
            valueAccessor={(x: any) => x.value}
            position="top"
            content={(props) => {
              const { x, y, stroke, value } = props;
              if (highlighted) {
                return (
                  <foreignObject
                    x={Number(x) - 24}
                    y={value! > 0 ? Number(y) + 10 : Number(y) - 36}
                    width={48}
                    height={32}
                  >
                    <div
                      className="flex items-center justify-center text-sm text-white border rounded"
                      style={{
                        borderColor: "#4834f7",
                        background: "rgba(72, 52, 247, 50%)",
                      }}
                    >
                      {Number(value)}
                    </div>
                  </foreignObject>
                );
              } else {
                return null;
              }
            }}
          /> */}
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MatchesTdcProgressChart;
