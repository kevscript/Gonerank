import { usePlayerSeasonDataLazyQuery } from "@/graphql/generated/queryTypes";
import { useEffect } from "react";

export const usePlayerSeasonMetadata = ({
  seasonId,
  playerId,
}: {
  seasonId?: string;
  playerId?: string;
}) => {
  const [
    getPlayerSeasonData,
    {
      data: { clubs, competitions, matches, player } = {
        clubs: undefined,
        competitions: undefined,
        matches: undefined,
        player: undefined,
      },
    },
  ] = usePlayerSeasonDataLazyQuery();

  // fetching season data whenever season changes
  useEffect(() => {
    if (seasonId && playerId) {
      getPlayerSeasonData({
        variables: {
          playerId: playerId as string,
          seasonId: seasonId,
          archived: true,
        },
      });
    }
  }, [seasonId, playerId, getPlayerSeasonData]);

  return {
    clubs,
    competitions,
    matches,
    player,
  };
};
