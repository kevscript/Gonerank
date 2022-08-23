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

type PlayersChartProps = {
  data: FormattedPlayersChartData[];
};

const PlayersChart = ({ data }: PlayersChartProps) => {
  if (!data) return null;
  return (
    <>
      <h3>Linear Average</h3>
      <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
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
            ticks={[1, 3, 5, 7, 9]}
            domain={[0, 10]}
          />
          <ReferenceLine y={5} stroke="" />
          <CartesianGrid strokeDasharray="1 3" strokeOpacity="0.5" />
          {data.map((player) => (
            <Line
              key={player.id}
              data={player.matches}
              type="monotone"
              dataKey={(x) => x.averageSum / x.averageQuantity}
              stroke="#8884d8"
              name={player.lastName}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <h3>Progressive Average</h3>
      <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
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
            dataKey="avgProgress"
            ticks={[1, 3, 5, 7, 9]}
            domain={[0, 10]}
          />
          <ReferenceLine y={5} stroke="" />
          <CartesianGrid strokeDasharray="1 3" strokeOpacity="0.5" />
          {data.map((player) => (
            <Line
              key={player.id}
              data={player.matches}
              type="monotone"
              dataKey="avgProgress"
              stroke="#8884d8"
              name={player.lastName}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <h3>Linear Tendency</h3>
      <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
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
            dataKey={(x) => x.averageSum - 5 * x.averageQuantity}
            ticks={[0]}
            domain={[-10, 10]}
          />
          <ReferenceLine y={0} stroke="" />
          <CartesianGrid strokeDasharray="1 3" strokeOpacity="0.5" />
          {data.map((player) => (
            <Line
              key={player.id}
              data={player.matches}
              type="monotone"
              dataKey={(x) => x.averageSum - 5 * x.averageQuantity}
              stroke="#8884d8"
              name={player.lastName}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <h3>Progressive Tendency</h3>
      <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
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
            dataKey="tdcProgress"
            ticks={[0]}
            domain={[-10, 10]}
          />
          <ReferenceLine y={0} stroke="" />
          <CartesianGrid strokeDasharray="1 3" strokeOpacity="0.5" />
          {data.map((player) => (
            <Line
              key={player.id}
              data={player.matches}
              type="monotone"
              dataKey="tdcProgress"
              stroke="#8884d8"
              name={player.lastName}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default PlayersChart;
