import { Season } from "graphql/generated/nexusTypes";
import { objectType } from "nexus";

export const SeasonType = objectType({
  name: Season.$name,
  definition: (t) => {
    t.field(Season.id);
    t.field(Season.startDate);
    t.field(Season.matches);
  },
});
