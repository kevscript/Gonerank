import { inputObjectType } from "nexus";

export const SeasonPlayersWhereInput = inputObjectType({
  name: "SeasonPlayersWhereInput",
  definition: (t) => {
    t.string("seasonId");
    t.string("playerId");
  },
});
