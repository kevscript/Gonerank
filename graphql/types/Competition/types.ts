import { inputObjectType } from "nexus";

export const CreateCompetitionInput = inputObjectType({
  name: "CreateCompetitionInput",
  definition: (t) => {
    t.nonNull.string("name");
    t.nonNull.string("abbreviation");
  },
});

export const UpdateCompetitionInput = inputObjectType({
  name: "UpdateCompetitionInput",
  definition: (t) => {
    t.string("name");
    t.string("abbreviation");
  },
});
