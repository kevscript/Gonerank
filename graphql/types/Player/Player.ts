import { Player } from "graphql/generated/nexusTypes";
import { objectType } from "nexus";

export const PlayerType = objectType({
  name: Player.$name,
  definition: (t) => {
    t.field(Player.id);
    t.field(Player.firstName);
    t.field(Player.lastName);
    t.field(Player.country);
    t.field(Player.countryCode);
    t.field(Player.birthDate);
    t.field(Player.image);
    t.field(Player.active);
    t.field(Player.matches);
    t.field(Player.seasons);
    t.field(Player.ratings);
  },
});
