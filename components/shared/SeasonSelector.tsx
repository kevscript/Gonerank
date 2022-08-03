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
      className="outline-none h-10 border-2 border-gray-100 rounded px-2 text-sm text-marine-600"
      value={currentSeasonId}
      onChange={handleChange}
    >
      {seasons.map((season) => (
        <option key={season.id} value={season.id} className="text-black">
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
