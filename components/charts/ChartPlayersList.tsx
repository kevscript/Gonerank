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
    <div className="flex flex-col h-full p-4 bg-gray-100 rounded w-72 dark:bg-dark-500 drop-shadow-sm">
      <ul className="flex flex-col flex-1 w-full overflow-scroll rounded scroll-hide">
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
              className={`h-10 flex flex-shrink-0 items-center px-4 cursor-pointer group border-b-2 border-gray-100 dark:border-dark-600 ${
                idsToShow.includes(player.id)
                  ? "bg-gray-200 hover:bg-gray-300 dark:bg-black/25 dark:hover:bg-black/50"
                  : "dark:bg-dark-400"
              } `}
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
                className={`w-2 h-2 rounded-full`}
                style={{
                  background: idsToShow.includes(player.id)
                    ? `hsla(${
                        (360 / idsToShow.length) *
                          idsToShow.indexOf(player.id) +
                        1
                      }, 100%, 50%, 90%)`
                    : "#333",
                }}
              ></div>
              <label
                htmlFor={`p-${player.id}`}
                className={`text-sm ml-4 pointer-events-none ${
                  idsToShow.includes(player.id)
                    ? `dark:text-white text-black`
                    : "dark:text-gray-300 text-gray-600 group-hover:text-black dark:group-hover:text-white"
                }`}
              >
                {player.firstName} {player.lastName}
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChartPlayersList;
