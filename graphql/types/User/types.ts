import { inputObjectType } from "nexus";

export const UpdateUserInput = inputObjectType({
  name: "UpdateUserInput",
  definition: (t) => {
    t.string("name");
    t.string("email");
    t.string("image");
  },
});
