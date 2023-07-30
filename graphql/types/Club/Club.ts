import { Club } from "graphql/generated/nexusTypes";
import { objectType } from "nexus";

export const ClubType = objectType({
  name: Club.$name,
  definition: (t) => {
    t.field(Club.id);
    t.field(Club.name);
    t.field(Club.abbreviation);
    t.field(Club.primary);
    t.field(Club.secondary);
    t.field(Club.logo);
    t.field(Club.matches);
  },
});
