import { inputObjectType } from "nexus";

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
  },
});
