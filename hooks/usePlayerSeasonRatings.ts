import {
  PlayerSeasonRatingsQuery,
  usePlayerSeasonRatingsLazyQuery,
} from "@/graphql/generated/queryTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const usePlayerSeasonRatings = ({
  playerId,
  seasonId,
}: {
  playerId?: string;
  seasonId?: string;
}) => {
  const { data: session, status } = useSession();
  const [
    getPlayerSeasonRatings,
    { data: { ratings: playerSeasonRatings } = { ratings: undefined } },
  ] = usePlayerSeasonRatingsLazyQuery();

  const [playerSeasonUserRatings, setPlayerSeasonUserRatings] = useState<
    null | PlayerSeasonRatingsQuery["ratings"]
  >(null);

  // fetching data whenever season changes
  useEffect(() => {
    if (seasonId && playerId) {
      getPlayerSeasonRatings({
        variables: {
          playerId: playerId as string,
          seasonId: seasonId,
          archived: true,
        },
      });

      if (playerSeasonRatings && status === "authenticated" && session) {
        const currentUserRatings = playerSeasonRatings.filter(
          (r) => r.userId === session.user.id
        );
        setPlayerSeasonUserRatings(currentUserRatings);
      }
    }
  }, [
    playerId,
    seasonId,
    getPlayerSeasonRatings,
    playerSeasonRatings,
    status,
    session,
  ]);

  return {
    playerSeasonRatings,
    playerSeasonUserRatings,
  };
};
