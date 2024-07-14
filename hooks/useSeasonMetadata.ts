import { useGlobalSeasonDataLazyQuery } from "@/graphql/generated/queryTypes";
import { useEffect } from "react";

export const useSeasonMetadata = (seasonId?: string) => {
  const [
    getGlobalSeasonData,
    {
      data: { clubs, competitions, matches, players } = {
        clubs: undefined,
        competitions: undefined,
        matches: undefined,
        players: undefined,
      },
    },
  ] = useGlobalSeasonDataLazyQuery();

  // fetching season data whenever season changes
  useEffect(() => {
    if (seasonId) {
      getGlobalSeasonData({
        variables: { seasonId: seasonId, archived: true },
      });
    }
  }, [seasonId, getGlobalSeasonData]);

  return {
    clubs,
    competitions,
    matches,
    players,
  };
};
