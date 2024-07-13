import {
  CreateUserRatingsInput,
  GetDisplayMatchQuery,
  useCreateUserRatingsMutation,
} from "@/graphql/generated/queryTypes";
import MatchInfoBar from "./MatchInfoBar";
import MatchVoter, { MatchFormInput } from "./MatchVoter";
import { useSession } from "next-auth/react";

type MatchDisplayVotableProps = {
  match: NonNullable<GetDisplayMatchQuery["displayMatch"]>;
};

function MatchDisplayVotable({ match }: MatchDisplayVotableProps) {
  const { data: session, status } = useSession();
  const [createUserRatings] = useCreateUserRatingsMutation({
    refetchQueries: ["GetRatings", "GetDisplayMatch", "GetLatestSeason"],
    awaitRefetchQueries: true,
  });

  const handleVote = (data: MatchFormInput) => {
    if (session && status === "authenticated") {
      const ratings: CreateUserRatingsInput[] = [];
      for (const playerId in data) {
        ratings.push({ playerId: playerId, rating: data[playerId] });
      }
      createUserRatings({
        variables: {
          matchId: match.id,
          userId: session.user.id!,
          ratings,
        },
      });
    } else {
      throw new Error("Couldn't submit votes, no matchData or auth session");
    }
  };

  return (
    <>
      <MatchInfoBar voted={false} />
      <MatchVoter match={match} onSubmit={handleVote} />
    </>
  );
}

export default MatchDisplayVotable;
