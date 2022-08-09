import { GetSeasonsQuery } from "graphql/generated/queryTypes";

export type SeasonSelectorProps = {
  currentSeasonId: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  seasons: GetSeasonsQuery["seasons"];
};

const SeasonSelector = ({
  currentSeasonId,
  handleChange,
  seasons,
}: SeasonSelectorProps) => {
  return (
    <select
      className="h-10 px-2 text-sm border-2 border-gray-100 rounded outline-none cursor-pointer dark:border-slate-600 text-marine-600 dark:text-white dark:bg-slate-700"
      value={currentSeasonId}
      onChange={handleChange}
    >
      {seasons.map((season) => (
        <option
          key={season.id}
          value={season.id}
          className="text-black dark:text-white"
        >
          {`${new Date(season.startDate).getFullYear()}/${(
            new Date(season.startDate).getFullYear() + 1
          )
            .toString()
            .substring(2)}`}
        </option>
      ))}
    </select>
  );
};

export default SeasonSelector;
