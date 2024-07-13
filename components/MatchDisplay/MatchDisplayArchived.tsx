import {
  GetDisplayMatchQuery,
  GetRatingsQuery,
} from "@/graphql/generated/queryTypes";
import MatchInfo from "./MatchInfo";
import MatchInfoBar from "./MatchInfoBar";

type MatchDisplayArchivedProps = {
  match: NonNullable<GetDisplayMatchQuery["displayMatch"]>;
  userRatings: GetRatingsQuery["ratings"] | undefined;
};

function MatchDisplayArchived({
  match,
  userRatings,
}: MatchDisplayArchivedProps) {
  return (
    <>
      <MatchInfoBar archived={true} />
      <MatchInfo match={match} userRatings={userRatings} />
    </>
  );
}

export default MatchDisplayArchived;
