import { FormattedPlayersChartData } from "@/utils/charts/formatPlayersChartData";

export type ChartPlayersListProps = {
  players: FormattedPlayersChartData[];
  idsToShow: string[];
  togglePlayerLine: (id: string) => void;
};

const ChartPlayersList = ({
  players,
  idsToShow,
  togglePlayerLine,
}: ChartPlayersListProps) => {
  return (
    <ul className="w-72 flex flex-col gap-y-[2px]">
      {players.map((player, i) => (
        <li
          key={player.id}
          className={`h-10 flex items-center px-4 cursor-pointer group ${
            idsToShow.includes(player.id) ? "bg-black/50" : "bg-dark-500"
          }`}
          onClick={() => togglePlayerLine(player.id)}
        >
          <input
            type="checkbox"
            id={`p-${player.id}`}
            value={player.id}
            checked={idsToShow.includes(player.id)}
            className="sr-only"
          />
          <div
            className={`w-2 h-2 rounded-full ${
              !idsToShow.includes(player.id) &&
              "border border-dark-300 group-hover:border-gray-300"
            }`}
            style={{
              background: idsToShow.includes(player.id)
                ? player.color
                : "transparent",
            }}
          ></div>
          <label
            htmlFor={`p-${player.id}`}
            className={`text-sm ml-4 pointer-events-none ${
              idsToShow.includes(player.id)
                ? `text-white`
                : "text-gray-300 group-hover:text-white"
            }`}
          >
            {player.firstName} {player.lastName}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ChartPlayersList;
