import {
  GetSeasonsQuery,
  GlobalSeasonDataQuery,
} from "graphql/generated/queryTypes";
import SeasonSelector from "./shared/SeasonSelector";
import WhoFilter, { WhoFilterOptions } from "./shared/WhoFilter";
import VisualFilter, { VisualFilterOptions } from "./shared/VisualFilter";

export type PlayersFiltersProps = {
  visual: VisualFilterOptions;
  toggleVisual: (x: VisualFilterOptions) => void;
  who: WhoFilterOptions;
  toggleWho: (x: WhoFilterOptions) => void;

  seasons: GetSeasonsQuery["seasons"] | undefined;
  competitions: GlobalSeasonDataQuery["competitions"] | undefined;
  isAuth: boolean;

  currentCompetitionId: string;
  currentSeasonId: string;

  handleCompetitionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSeasonChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PlayersFilters = ({
  visual,
  toggleVisual,
  who,
  toggleWho,
  currentCompetitionId,
  currentSeasonId,
  competitions,
  seasons,
  handleCompetitionChange,
  handleSeasonChange,
  isAuth,
}: PlayersFiltersProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-between gap-2 mb-4 lg:gap-y-0">
      <div className="flex flex-row">
        <VisualFilter toggleVisual={toggleVisual} visual={visual} />
      </div>

      <div className="flex flex-row gap-x-2">
        {isAuth && <WhoFilter toggleWho={toggleWho} who={who} />}

        <select
          className="h-10 px-2 text-sm border-2 border-gray-100 rounded outline-none cursor-pointer dark:border-dark-300 text-marine-600 dark:text-white dark:bg-dark-400"
          value={currentCompetitionId}
          onChange={handleCompetitionChange}
        >
          <option value="all" className="text-black dark:text-white">
            Toutes compétitions
          </option>
          {competitions &&
            competitions.map((comp) => (
              <option
                key={comp.id}
                value={comp.id}
                className="text-black dark:text-white"
              >
                {comp.name}
              </option>
            ))}
        </select>
        {seasons && (
          <SeasonSelector
            currentSeasonId={currentSeasonId}
            handleChange={handleSeasonChange}
            seasons={seasons}
          />
        )}
      </div>
    </div>
  );
};

export default PlayersFilters;
