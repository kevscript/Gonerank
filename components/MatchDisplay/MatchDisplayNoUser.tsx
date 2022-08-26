import { GetDisplayMatchQuery } from "graphql/generated/queryTypes";
import MatchHeader from "../shared/MatchHeader";
import MatchInfo from "./MatchInfo";
import MatchInfoBar from "./MatchInfoBar";

export type MatchDisplayNoUserProps = {
  match: GetDisplayMatchQuery["displayMatch"];
};

const MatchDisplayNoUser = ({ match }: MatchDisplayNoUserProps) => {
  return (
    <>
      <MatchHeader match={match} />
      <MatchInfoBar authenticated={false} />
      <MatchInfo match={match} />
    </>
  );
};

export default MatchDisplayNoUser;
