import { Competition } from "graphql/generated/nexusTypes";
import { objectType } from "nexus";

export const CompetitionType = objectType({
  name: Competition.$name,
  definition: (t) => {
    t.field(Competition.id);
    t.field(Competition.name);
    t.field(Competition.abbreviation);
    t.field(Competition.matches);
  },
});
