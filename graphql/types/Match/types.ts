import { inputObjectType } from "nexus";

export const CreateMatchInput = inputObjectType({
  name: "CreateMatchInput",
  definition: (t) => {
    t.nonNull.dateTime("date");
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
    t.dateTime("date");
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
    t.dateTime("date");
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
