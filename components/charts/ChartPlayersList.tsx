import { FormattedPlayersChartData } from "@/utils/charts/formatPlayersChartData";

export type ChartPlayersListProps = {
  players: FormattedPlayersChartData[];
  idsToShow: string[];
  togglePlayerLine: (id: string) => void;
  theme: string | undefined;
};

const ChartPlayersList = ({
  players,
  idsToShow,
  togglePlayerLine,
  theme,
}: ChartPlayersListProps) => {
  return (
    <div className="relative flex p-[1px] overflow-hidden bg-gray-200 rounded-sm w-72 dark:bg-dark-300">
      <ul className="flex flex-col w-full overflow-y-scroll rounded-sm">
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
              className={`h-10 flex flex-shrink-0 items-center px-4 cursor-pointer group border-b-2 border-gray-100 dark:border-dark-300 ${
                idsToShow.includes(player.id)
                  ? "bg-white hover:bg-gray-100 dark:bg-dark-400  dark:hover:bg-black/25"
                  : "bg-gray-100 hover:bg-white dark:bg-dark-600 dark:hover:bg-dark-400"
              } `}
              onClick={() => togglePlayerLine(player.id)}
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
                      }, 100%, ${theme === "dark" ? "70%" : "50%"}, 100%)`
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
