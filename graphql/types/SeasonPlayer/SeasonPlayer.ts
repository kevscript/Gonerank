import { SeasonPlayer } from "graphql/generated/nexusTypes";
import { objectType } from "nexus";

export const SeasonPlayerType = objectType({
  name: SeasonPlayer.$name,
  definition: (t) => {
    t.field(SeasonPlayer.id);
    t.field(SeasonPlayer.playerId);
    t.field(SeasonPlayer.player);
    t.field(SeasonPlayer.seasonId);
    t.field(SeasonPlayer.season);
  },
});
