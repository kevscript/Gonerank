import { Rating } from "graphql/generated/nexusTypes";
import { objectType } from "nexus";

export const RatingType = objectType({
  name: Rating.$name,
  definition: (t) => {
    t.field(Rating.id);
    t.field(Rating.rating);
    t.field(Rating.matchId);
    t.field(Rating.playerId);
    t.field(Rating.userId);
    t.field(Rating.match);
    t.field(Rating.player);
    t.field(Rating.user);
  },
});
