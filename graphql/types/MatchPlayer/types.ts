import { inputObjectType } from "nexus";

export const MatchPlayersWhereInput = inputObjectType({
  name: "MatchPlayersWhereInput",
  definition: (t) => {
    t.string("matchId");
    t.string("playerId");
  },
});
