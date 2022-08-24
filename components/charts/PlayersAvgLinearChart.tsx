import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { FormattedPlayersChartData } from "@/utils/charts/formatPlayersChartData";

type PlayersAvgLinearChartProps = {
  players: FormattedPlayersChartData[];
  idsToShow: string[];
};

const PlayersAvgLinearChart = ({
  players,
  idsToShow,
}: PlayersAvgLinearChartProps) => {
  const getAverageDomain = () => {
    let highestAvg = 0;
    let lowestAvg = 10;

    players.forEach((player) => {
      player.matches.forEach((m) => {
        if (m.averageQuantity) {
          if (m.averageSum / m.averageQuantity > highestAvg)
            highestAvg = m.averageSum / m.averageQuantity;
          if (m.averageSum / m.averageQuantity < lowestAvg)
            lowestAvg = m.averageSum / m.averageQuantity;
        }
      });
    });

    return [Math.floor(lowestAvg), Math.ceil(highestAvg)];
  };

  if (!players) return null;
  return (
    <>
      <h3>Linear Average</h3>
      <ResponsiveContainer aspect={16.0 / 9.0}>
        <LineChart>
          <XAxis
            dataKey={(x) => {
              return new Date(x.date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
              });
            }}
            allowDuplicatedCategory={false}
          />
          <YAxis
            type="number"
            dataKey={(x) => x.averageSum / x.averageQuantity}
            // ticks={[1, 3, 5, 7, 9]}
            domain={getAverageDomain()}
          />
          <ReferenceLine y={5} strokeDasharray="1 3" strokeOpacity="1" />
          <CartesianGrid strokeDasharray="1 3" strokeOpacity="0.5" />
          {players
            .sort((a, b) => (a.globalAverage > b.globalAverage ? 1 : -1))
            .map((player, i) => (
              <Line
                key={player.id}
                data={player.matches}
                type="monotone"
                dataKey={(x) => x.averageSum / x.averageQuantity}
                stroke={player.color}
                name={player.lastName}
                isAnimationActive={false}
                className={`${!idsToShow.includes(player.id) && "hidden"}`}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default PlayersAvgLinearChart;
