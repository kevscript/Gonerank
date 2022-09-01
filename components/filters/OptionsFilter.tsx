import {
  GetSeasonsQuery,
  GlobalSeasonDataQuery,
} from "graphql/generated/queryTypes";
import SeasonSelector from "./SeasonSelector";
import WhoFilter, { WhoFilterOptions } from "./WhoFilter";
import VisualFilter, { VisualFilterOptions } from "./VisualFilter";
import LocationFilter, { LocationFilterOptions } from "./LocationFilter";

export type OptionsFilterProps = {
  visual?: VisualFilterOptions;
  toggleVisual?: (x: VisualFilterOptions) => void;
  who?: WhoFilterOptions;
  toggleWho?: (x: WhoFilterOptions) => void;
  location?: LocationFilterOptions;
  toggleLocation?: (x: LocationFilterOptions) => void;

  seasons?: GetSeasonsQuery["seasons"] | undefined;
  competitions?: GlobalSeasonDataQuery["competitions"] | undefined;
  isAuth: boolean;

  currentCompetitionId?: string;
  currentSeasonId?: string;

  handleCompetitionChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSeasonChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const OptionsFilter = ({
  visual,
  toggleVisual,
  who,
  toggleWho,
  location,
  toggleLocation,
  currentCompetitionId,
  currentSeasonId,
  competitions,
  seasons,
  handleCompetitionChange,
  handleSeasonChange,
  isAuth,
}: OptionsFilterProps) => {
  return (
    <>
      {/** Desktop */}
      <div className="flex-col flex-wrap justify-between hidden gap-2 md:flex sm:flex-row lg:gap-y-0">
        {visual && (
          <div className="flex flex-row">
            <VisualFilter
              toggleVisual={toggleVisual || console.log}
              visual={visual}
            />
          </div>
        )}

        <div className="flex flex-col flex-wrap gap-2 sm:flex-row">
          {isAuth && who && (
            <WhoFilter toggleWho={toggleWho || console.log} who={who} />
          )}

          {location && (
            <LocationFilter
              location={location}
              toggleLocation={toggleLocation || console.log}
            />
          )}

          {competitions && (
            <select
              className="h-10 px-2 text-sm border-2 border-gray-100 rounded outline-none cursor-pointer dark:border-dark-300 text-marine-600 dark:text-white dark:bg-dark-400"
              value={currentCompetitionId}
              onChange={handleCompetitionChange}
            >
              <option value="all" className="text-black dark:text-white">
                Toutes compétitions
              </option>
              {competitions.map((comp) => (
                <option
                  key={comp.id}
                  value={comp.id}
                  className="text-black dark:text-white"
                >
                  {comp.name}
                </option>
              ))}
            </select>
          )}
          {seasons && currentSeasonId && (
            <SeasonSelector
              currentSeasonId={currentSeasonId}
              handleChange={handleSeasonChange!}
              seasons={seasons}
            />
          )}
        </div>
      </div>

      {/** Mobile/Tablet */}
      <div className="flex flex-col w-full gap-2 md:hidden">
        <div className="flex flex-row justify-between w-full gap-2">
          {visual && (
            <VisualFilter
              toggleVisual={toggleVisual || console.log}
              visual={visual}
            />
          )}
          {isAuth && who && (
            <WhoFilter toggleWho={toggleWho || console.log} who={who} />
          )}
          {location && (
            <LocationFilter
              location={location}
              toggleLocation={toggleLocation || console.log}
            />
          )}
        </div>
        {competitions && (
          <select
            className="h-10 px-2 text-sm border-2 border-gray-100 rounded outline-none cursor-pointer dark:border-dark-300 text-marine-600 dark:text-white dark:bg-dark-400"
            value={currentCompetitionId}
            onChange={handleCompetitionChange}
          >
            <option value="all" className="text-black dark:text-white">
              Toutes compétitions
            </option>
            {competitions.map((comp) => (
              <option
                key={comp.id}
                value={comp.id}
                className="text-black dark:text-white"
              >
                {comp.name}
              </option>
            ))}
          </select>
        )}
        {seasons && currentSeasonId && (
          <SeasonSelector
            currentSeasonId={currentSeasonId}
            handleChange={handleSeasonChange!}
            seasons={seasons}
          />
        )}
      </div>
    </>
  );
};

export default OptionsFilter;
