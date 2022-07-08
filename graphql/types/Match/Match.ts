import { Match } from "graphql/generated/nexusTypes";
import { objectType } from "nexus";

export const MatchType = objectType({
  name: Match.$name,
  definition: (t) => {
    t.field(Match.id);
    t.field(Match.date);
    t.field(Match.home);
    t.field(Match.scored);
    t.field(Match.conceeded);
    t.field(Match.active);
    t.field(Match.archived);
    t.field(Match.competitionId);
    t.field(Match.seasonId);
    t.field(Match.opponentId);
    t.field(Match.competition);
    t.field(Match.season);
    t.field(Match.opponent);
    t.field(Match.players);
    t.field(Match.ratings);
  },
});
