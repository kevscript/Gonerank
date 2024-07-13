import {
  GetDisplayMatchQuery,
  GetRatingsQuery,
} from "graphql/generated/queryTypes";
import MatchHeader from "../MatchHeader";
import MatchDisplayArchived from "./MatchDisplayArchived";
import MatchDisplayVoted from "./MatchDisplayVoted";
import MatchDisplayVotable from "./MatchDisplayVotable";

export type MatchDisplayProps = {
  match: NonNullable<GetDisplayMatchQuery["displayMatch"]>;
  userRatings: GetRatingsQuery["ratings"] | undefined;
};

const MatchDisplay = ({ match, userRatings }: MatchDisplayProps) => {
  return (
    <>
      <MatchHeader match={match} />

      {/* voting phase is not active */}
      {match.archived && (
        <MatchDisplayArchived match={match} userRatings={userRatings} />
      )}

      {/* voting phase is active + user already voted */}
      {!match.archived && userRatings && userRatings.length > 0 && (
        <MatchDisplayVoted match={match} userRatings={userRatings} />
      )}

      {/* voting phase is active + user hasn't voted yet */}
      {!match.archived && userRatings && userRatings.length === 0 && (
        <MatchDisplayVotable match={match} />
      )}
    </>
  );
};

export default MatchDisplay;
