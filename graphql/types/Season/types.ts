import { inputObjectType } from "nexus";

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
