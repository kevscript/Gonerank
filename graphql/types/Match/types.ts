import { inputObjectType, objectType } from "nexus";

export const CreateMatchInput = inputObjectType({
  name: "CreateMatchInput",
  definition: (t) => {
    t.nonNull.field("date", { type: "DateTime" });
    t.boolean("home");
    t.nonNull.int("scored");
    t.nonNull.int("conceeded");
    t.boolean("active");
    t.boolean("archived");
    t.nonNull.string("opponentId");
    t.nonNull.string("seasonId");
    t.nonNull.string("competitionId");
  },
});

export const UpdateMatchInput = inputObjectType({
  name: "UpdateMatchInput",
  definition: (t) => {
    t.field("date", { type: "DateTime" });
    t.boolean("home");
    t.int("scored");
    t.int("conceeded");
    t.boolean("active");
    t.boolean("archived");
    t.string("opponentId");
    t.string("seasonId");
    t.string("competitionId");
  },
});

export const MatchesWhereInput = inputObjectType({
  name: "MatchesWhereInput",
  definition: (t) => {
    t.field("date", { type: "DateTime" });
    t.boolean("home");
    t.int("scored");
    t.int("conceeded");
    t.boolean("active");
    t.boolean("archived");
    t.string("opponentId");
    t.string("seasonId");
    t.string("competitionId");
    t.string("playerId");
  },
});

export const MatchStats = objectType({
  name: "MatchStats",
  definition: (t) => {
    t.string("playerId");
    t.string("lastName");
    t.string("firstName");
    t.string("image");
    t.float("avgSum");
    t.float("numOfAvg");
    t.float("tendency");
  },
});
