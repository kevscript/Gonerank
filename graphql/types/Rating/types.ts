import { inputObjectType } from "nexus";

export const CreateUserRatingsInput = inputObjectType({
  name: "CreateUserRatingsInput",
  definition: (t) => {
    t.nonNull.string("playerId");
    t.nonNull.int("rating");
  },
});
