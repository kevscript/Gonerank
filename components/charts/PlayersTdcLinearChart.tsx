import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { FormattedPlayersChartData } from "@/utils/charts/formatPlayersChartData";

type PlayersTdcLinearChartProps = {
  players: FormattedPlayersChartData[];
  idsToShow: string[];
  highlightPlayer: (id: string | null) => void;
  highlightedPlayer: string | null;
  theme: string;
};

const PlayersTdcLinearChart = ({
  players,
  idsToShow,
  highlightPlayer,
  highlightedPlayer,
  theme,
}: PlayersTdcLinearChartProps) => {
  const getTicks = () => {};

  const getDomain = () => {
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

    return [Math.floor(lowestTdc), Math.ceil(highestTdc)];
  };

  if (!players) return null;
  return (
    <ResponsiveContainer aspect={16.0 / 8.0} height="50%">
      <LineChart margin={{ top: 0, right: 32, left: -32, bottom: 32 }}>
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
          dataKey={(x) => x.averageSum - 5 * x.averageQuantity}
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
        {players
          .filter((p) => p.matches.length > 0)
          .sort((a, b) => (a.globalAverage > b.globalAverage ? 1 : -1))
          .map((player, i) => (
            <Line
              connectNulls
              key={player.id}
              data={player.matches}
              type="monotone"
              dataKey={(x) => x.averageSum - 5 * x.averageQuantity}
              stroke={`hsla(${
                (360 / idsToShow.length) * idsToShow.indexOf(player.id) + 1
              }, 100%, 50%, ${
                highlightedPlayer === null
                  ? "90%"
                  : highlightedPlayer === player.id
                  ? "100%"
                  : "10%"
              })`}
              strokeWidth={2}
              name={player.lastName}
              isAnimationActive={false}
              className={`${!idsToShow.includes(player.id) && "hidden"}`}
              dot={
                highlightedPlayer === null || highlightedPlayer === player.id
                  ? {
                      strokeWidth: 2,
                      r: 2,
                      strokeDasharray: "",
                      stroke: `hsla(${
                        (360 / idsToShow.length) *
                          idsToShow.indexOf(player.id) +
                        1
                      }, 100%, 50%, ${
                        highlightedPlayer === null
                          ? "90%"
                          : highlightedPlayer === player.id
                          ? "100%"
                          : "10%"
                      })`,
                    }
                  : false
              }
            >
              <LabelList
                valueAccessor={(x: any) => x.value}
                position="top"
                content={(props) => {
                  if (
                    highlightedPlayer === player.id &&
                    !isNaN(Number(props.value))
                  ) {
                    const { x, y, stroke, value } = props;
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
                            borderColor: `hsla(${
                              (360 / idsToShow.length) *
                                idsToShow.indexOf(player.id) +
                              1
                            }, 100%, 50%, 100%)`,
                            background: `hsla(${
                              (360 / idsToShow.length) *
                                idsToShow.indexOf(player.id) +
                              1
                            }, 50%, 50%, 100%)`,
                          }}
                        >
                          {value}
                        </div>
                      </foreignObject>
                    );
                  } else {
                    return null;
                  }
                }}
              />
            </Line>
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PlayersTdcLinearChart;
