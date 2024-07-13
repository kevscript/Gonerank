import { generateRatingTweet } from "@/utils/generateRatingTweet";
import MatchInfoBar from "./MatchInfoBar";
import MatchInfo from "./MatchInfo";
import {
  GetDisplayMatchQuery,
  GetRatingsQuery,
} from "@/graphql/generated/queryTypes";

type MatchDisplayVotedProps = {
  match: NonNullable<GetDisplayMatchQuery["displayMatch"]>;
  userRatings: GetRatingsQuery["ratings"];
};

function MatchDisplayVoted({ match, userRatings }: MatchDisplayVotedProps) {
  return (
    <>
      <MatchInfoBar
        voted={true}
        twitterText={generateRatingTweet({ userRatings, match })}
      />
      <MatchInfo match={match} userRatings={userRatings} />
    </>
  );
}

export default MatchDisplayVoted;
