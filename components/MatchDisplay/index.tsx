import {
  GetDisplayMatchQuery,
  GetRatingsQuery,
} from "graphql/generated/queryTypes";
import MatchHeader from "../MatchHeader";
import MatchInfo from "./MatchInfo";
import MatchInfoBar from "./MatchInfoBar";
import MatchVoter, { MatchFormInput } from "./MatchVoter";

export type MatchDisplayProps = {
  match: NonNullable<GetDisplayMatchQuery["displayMatch"]>;
  userRatings: GetRatingsQuery["ratings"] | undefined;
  handleVote: (x: MatchFormInput) => void;
  twitterText: string;
};

const MatchDisplay = ({
  match,
  userRatings,
  handleVote,
  twitterText,
}: MatchDisplayProps) => {
  return (
    <>
      <MatchHeader match={match} />

      {/* voting phase is not active */}
      {match.archived && (
        <>
          <MatchInfoBar archived={true} />
          <MatchInfo match={match} userRatings={userRatings} />
        </>
      )}

      {/* voting phase is active + user already voted */}
      {!match.archived && userRatings && userRatings.length > 0 && (
        <>
          <MatchInfoBar voted={true} twitterText={twitterText} />
          <MatchInfo match={match} userRatings={userRatings} />
        </>
      )}

      {/* voting phase is active + user hasn't voted yet */}
      {!match.archived && userRatings && userRatings.length === 0 && (
        <>
          <MatchInfoBar voted={false} />
          <MatchVoter match={match} onSubmit={handleVote} />
        </>
      )}
    </>
  );
};

export default MatchDisplay;
