import { MatchPlayer } from "graphql/generated/nexusTypes";
import { objectType } from "nexus";

export const MatchPlayerType = objectType({
  name: MatchPlayer.$name,
  definition: (t) => {
    t.field(MatchPlayer.id);
    t.field(MatchPlayer.matchId);
    t.field(MatchPlayer.match);
    t.field(MatchPlayer.playerId);
    t.field(MatchPlayer.player);
  },
});
