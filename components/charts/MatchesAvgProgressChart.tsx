import { FormattedMatchesChartData } from "@/utils/charts/formatMatchesChartData";
import { useRouter } from "next/router";
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
import CustomTooltip from "./CustomTooltip";

type MatchesAvgProgressChartProps = {
  matches: FormattedMatchesChartData[];
  theme: string;
  highlighted: boolean;
};

const MatchesAvgProgressChart = ({
  matches,
  theme,
  highlighted,
}: MatchesAvgProgressChartProps) => {
  const router = useRouter();

  const getDomain = () => {
    let highestAvg = 0;
    let lowestAvg = 10;

    matches.forEach((m) => {
      if (typeof m.avgProgress === "number") {
        if (m.avgProgress > highestAvg) highestAvg = m.avgProgress;
        if (m.avgProgress < lowestAvg) lowestAvg = m.avgProgress;
      }
    });

    return [Math.floor(lowestAvg), Math.ceil(highestAvg)];
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
          dataKey="avgProgress"
          domain={[0, 10]}
          ticks={[1, 3, 5, 7, 9]}
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
        <ReferenceLine
          y={5}
          // strokeDasharray="1 1"
          strokeOpacity="1"
          stroke="#666666"
        />
        <Tooltip content={(props) => <CustomTooltip {...props} />} />
        <Line
          data={matches}
          type="monotone"
          dataKey="avgProgress"
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
                    y={value! > 5 ? Number(y) + 10 : Number(y) - 36}
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
                      {Number(value).toFixed(2)}
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

export default MatchesAvgProgressChart;
