import { inputObjectType } from "nexus";
import { MatchesWhereInput } from "../Match";

export const CreateUserRatingsInput = inputObjectType({
  name: "CreateUserRatingsInput",
  definition: (t) => {
    t.nonNull.string("playerId");
    t.nonNull.float("rating");
  },
});

export const RatingsWhereInput = inputObjectType({
  name: "RatingsWhereInput",
  definition: (t) => {
    t.string("userId");
    t.string("matchId");
    t.string("playerId");
    t.string("seasonId");
    t.boolean("archived");
  },
});
