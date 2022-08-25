import { FormattedPlayersChartData } from "@/utils/charts/formatPlayersChartData";

export type ChartPlayersListProps = {
  players: FormattedPlayersChartData[];
  idsToShow: string[];
  togglePlayerLine: (id: string) => void;
  highlightPlayer: (id: string | null) => void;
  highlightedPlayer: string | null;
};

const ChartPlayersList = ({
  players,
  idsToShow,
  togglePlayerLine,
  highlightPlayer,
  highlightedPlayer,
}: ChartPlayersListProps) => {
  return (
    <ul className="flex flex-col w-72">
      {players
        .filter((p) => p.matches.length > 0)
        .sort((a, b) => {
          let aIncluded = idsToShow.includes(a.id);
          let bIncluded = idsToShow.includes(b.id);

          if (aIncluded && !bIncluded) return -1;
          if (!aIncluded && bIncluded) return 1;
          return 0;
        })
        .map((player, i) => (
          <li
            key={player.id}
            className={`h-10 flex items-center px-4 cursor-pointer group border-b-2 border-dark-600 ${
              idsToShow.includes(player.id) ? "bg-black/40" : "bg-dark-500"
            }`}
            onClick={() => togglePlayerLine(player.id)}
            onMouseEnter={() =>
              idsToShow.includes(player.id) && highlightPlayer(player.id)
            }
            onMouseLeave={() =>
              highlightedPlayer === player.id && highlightPlayer(null)
            }
          >
            <input
              type="checkbox"
              id={`p-${player.id}`}
              value={player.id}
              checked={idsToShow.includes(player.id)}
              className="sr-only"
              readOnly
            />
            <div
              className={`w-2 h-2 rounded-full ${
                !idsToShow.includes(player.id) &&
                "border border-dark-300 group-hover:border-gray-300"
              }`}
              style={{
                background: idsToShow.includes(player.id)
                  ? `hsla(${
                      (360 / idsToShow.length) * idsToShow.indexOf(player.id) +
                      1
                    }, 100%, 50%, 90%)`
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
