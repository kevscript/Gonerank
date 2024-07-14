import {
  useGetSeasonRatingsLazyQuery,
  useGetSeasonUserRatingsLazyQuery,
} from "@/graphql/generated/queryTypes";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useSeasonRatings = (seasonId?: string) => {
  const { data: session, status } = useSession();
  const [
    getSeasonCommunityRatings,
    { data: { ratings: seasonCommunityRatings } = { ratings: undefined } },
  ] = useGetSeasonRatingsLazyQuery();
  const [
    getSeasonUserRatings,
    { data: { ratings: seasonUserRatings } = { ratings: undefined } },
  ] = useGetSeasonUserRatingsLazyQuery();

  // fetching season data whenever season changes
  useEffect(() => {
    if (seasonId) {
      getSeasonCommunityRatings({
        variables: { seasonId: seasonId, archived: true },
      });

      if (status === "authenticated" && session.user.id) {
        getSeasonUserRatings({
          variables: {
            seasonId: seasonId,
            userId: session.user.id,
            archived: true,
          },
        });
      }
    }
  }, [
    seasonId,
    getSeasonCommunityRatings,
    getSeasonUserRatings,
    session,
    status,
  ]);

  return {
    seasonCommunityRatings,
    seasonUserRatings,
  };
};
