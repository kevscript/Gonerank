import {
  GetSeasonsQuery,
  GlobalSeasonDataQuery,
} from "graphql/generated/queryTypes";
import SeasonSelector from "./SeasonSelector";
import WhoFilter, { WhoFilterOptions } from "./WhoFilter";
import VisualFilter, { VisualFilterOptions } from "./VisualFilter";
import LocationFilter, { LocationFilterOptions } from "./LocationFilter";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import CompetitionSelector from "./CompetitionSelector";

export type OptionsFilterProps = {
  seasons?: GetSeasonsQuery["seasons"] | undefined;
  competitions?: GlobalSeasonDataQuery["competitions"] | undefined;
  currentSeasonId?: string;
  handleSeasonChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  whoHidden?: boolean;
  locationHidden?: boolean;
  visualHidden?: boolean;
};

const OptionsFilter = ({
  currentSeasonId,
  competitions,
  seasons,
  handleSeasonChange,
  whoHidden = false,
  locationHidden = false,
  visualHidden = false,
}: OptionsFilterProps) => {
  const { status } = useSession();
  const router = useRouter();

  const toggleWho = (newWho: WhoFilterOptions) => {
    const queries = { ...router.query };
    if (status === "authenticated" && newWho === "user") {
      queries.for = "user";
    } else {
      delete queries.for;
    }
    router.replace({ query: queries }, undefined, { shallow: true });
  };

  const toggleVisual = (newVisual: VisualFilterOptions) => {
    const queries = { ...router.query };
    if (newVisual === "chart") {
      queries.shape = "chart";
    } else {
      delete queries.shape;
    }
    router.replace({ query: queries }, undefined, { shallow: true });
  };

  const toggleLocation = (newLocation: LocationFilterOptions) => {
    const queries = { ...router.query };
    if (newLocation === router.query.location) {
      delete queries.location;
    } else {
      queries.location = newLocation;
    }
    router.replace({ query: queries }, undefined, { shallow: true });
  };

  const handleCompetitionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompetitionId = e.target.value;
    if (selectedCompetitionId === "all") {
      const queries = { ...router.query };
      delete queries.competition;
      router.replace({ query: { ...queries } }, undefined, { shallow: true });
    } else {
      const compExists = competitions?.find(
        (c) => c.id === selectedCompetitionId
      );
      if (compExists && compExists.abbreviation !== router.query.competition) {
        router.replace(
          { query: { ...router.query, competition: compExists.abbreviation } },
          undefined,
          { shallow: true }
        );
      }
    }
  };

  return (
    <>
      {/** Desktop */}
      <div className="flex-col flex-wrap justify-between hidden gap-2 md:flex sm:flex-row lg:gap-y-0">
        <div className="flex flex-row">
          {!visualHidden && (
            <VisualFilter
              toggleVisual={toggleVisual}
              visual={router.query.shape === "chart" ? "chart" : "table"}
            />
          )}
        </div>

        <div className="flex flex-col flex-wrap gap-2 sm:flex-row">
          {status === "authenticated" && !whoHidden && (
            <WhoFilter
              toggleWho={toggleWho}
              who={
                status === "authenticated" && router.query.for === "user"
                  ? "user"
                  : "community"
              }
            />
          )}

          {!locationHidden && (
            <LocationFilter
              location={
                router.query.location === "home"
                  ? "home"
                  : router.query.location === "away"
                  ? "away"
                  : "all"
              }
              toggleLocation={toggleLocation}
            />
          )}

          {competitions && (
            <CompetitionSelector
              competitions={competitions}
              currentCompetitionId={
                competitions?.find(
                  (c) => router.query.competition === c.abbreviation
                )?.id || "all"
              }
              handleChange={handleCompetitionChange}
            />
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
          {!visualHidden && (
            <VisualFilter
              toggleVisual={toggleVisual}
              visual={router.query.shape === "chart" ? "chart" : "table"}
            />
          )}
          {status === "authenticated" && !whoHidden && (
            <WhoFilter
              toggleWho={toggleWho}
              who={
                status === "authenticated" && router.query.for === "user"
                  ? "user"
                  : "community"
              }
            />
          )}
          {!locationHidden && (
            <LocationFilter
              location={
                router.query.location === "home"
                  ? "home"
                  : router.query.location === "away"
                  ? "away"
                  : "all"
              }
              toggleLocation={toggleLocation}
            />
          )}
        </div>
        {competitions && (
          <CompetitionSelector
            competitions={competitions}
            currentCompetitionId={
              competitions?.find(
                (c) => router.query.competition === c.abbreviation
              )?.id || "all"
            }
            handleChange={handleCompetitionChange}
          />
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
