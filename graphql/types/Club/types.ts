import { inputObjectType } from "nexus";

export const CreateClubInput = inputObjectType({
  name: "CreateClubInput",
  definition: (t) => {
    t.nonNull.string("name");
    t.nonNull.string("abbreviation");
    t.nonNull.string("primary");
    t.nonNull.string("secondary");
  },
});

export const UpdateClubInput = inputObjectType({
  name: "UpdateClubInput",
  definition: (t) => {
    t.string("name");
    t.string("abbreviation");
    t.string("primary");
    t.string("secondary");
  },
});
