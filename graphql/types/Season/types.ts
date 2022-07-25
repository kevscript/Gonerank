import { inputObjectType, list, objectType } from "nexus";
import { PlayerType } from "../Player";

export const CreateSeasonInput = inputObjectType({
  name: "CreateSeasonInput",
  definition: (t) => {
    t.nonNull.dateTime("startDate");
  },
});

export const UpdateSeasonInput = inputObjectType({
  name: "UpdateSeasonInput",
  definition: (t) => {
    t.nonNull.dateTime("startDate");
  },
});

export const SeasonsWhereInput = inputObjectType({
  name: "SeasonsWhereInput",
  definition: (t) => {
    t.nonNull.dateTime("startDate");
  },
});

export const SeasonPlayerMatchStats = objectType({
  name: "SeasonPlayerMatchStats",
  definition: (t) => {
    t.nonNull.string("matchId");
    t.nonNull.float("averageSum");
    t.nonNull.int("averageQuantity");
    t.nonNull.float("tendency");
    t.nonNull.boolean("motm");
    t.nonNull.boolean("botm");
  },
});

export const SeasonPlayerStats = objectType({
  name: "SeasonPlayerStats",
  definition: (t) => {
    t.nonNull.string("playerId");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
    t.nonNull.string("image");
    t.field("matches", { type: list(SeasonPlayerMatchStats) });
  },
});
