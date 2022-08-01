import { inputObjectType } from "nexus";
import { MatchPlayersWhereInput } from "../MatchPlayer";
import { SeasonPlayersWhereInput, SeasonPlayerType } from "../SeasonPlayer";

export const CreatePlayerInput = inputObjectType({
  name: "CreatePlayerInput",
  definition: (t) => {
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
    t.nonNull.dateTime("birthDate");
    t.string("image");
    t.string("country");
    t.string("countryCode");
    t.boolean("active");
  },
});

export const UpdatePlayerInput = inputObjectType({
  name: "UpdatePlayerInput",
  definition: (t) => {
    t.string("firstName");
    t.string("lastName");
    t.dateTime("birthDate");
    t.string("image");
    t.string("country");
    t.string("countryCode");
    t.boolean("active");
  },
});

export const PlayersWhereInput = inputObjectType({
  name: "PlayersWhereInput",
  definition: (t) => {
    t.string("firstName");
    t.string("lastName");
    t.dateTime("birthDate");
    t.string("image");
    t.string("country");
    t.string("countryCode");
    t.boolean("active");
    t.field({ name: "season", type: SeasonPlayersWhereInput });
    t.field({ name: "match", type: MatchPlayersWhereInput });
    t.boolean("archived");
  },
});
