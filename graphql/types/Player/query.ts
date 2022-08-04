import prisma from "@/lib/prisma";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { arg, extendType, list, nonNull, stringArg } from "nexus";
import { PlayerType } from "./Player";
import { PlayersWhereInput } from "./types";

export const PlayerQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("player", {
      type: PlayerType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args) => {
        try {
          const player = await prisma.player.findUnique({
            where: { id: args.id },
          });
          if (player) {
            return player;
          } else {
            throw new UserInputError(
              `Couldn't find player with id "${args.id}"`
            );
          }
        } catch (err) {
          const error = err as ApolloError;
          throw error;
        }
      },
    });
    t.field("players", {
      type: list(PlayerType),
      args: { where: arg({ type: PlayersWhereInput }) },
      resolve: async (_, args) => {
        try {
          let players;
          if (!args.where) {
            players = await prisma.player.findMany();
          } else {
            const {
              active,
              birthDate,
              country,
              countryCode,
              firstName,
              image,
              lastName,
              season,
              match,
              archived,
            } = args.where;
            players = await prisma.player.findMany({
              where: {
                firstName: firstName ? firstName : undefined,
                lastName: lastName ? lastName : undefined,
                active: typeof active === "boolean" ? active : undefined,
                birthDate: birthDate ? birthDate : undefined,
                country: country ? country : undefined,
                countryCode: countryCode ? countryCode : undefined,
                image: image ? image : undefined,
                seasons: season
                  ? {
                      some: {
                        seasonId: season?.seasonId
                          ? season.seasonId
                          : undefined,
                      },
                    }
                  : undefined,
                matches: match
                  ? {
                      some: {
                        matchId: match?.matchId ? match.matchId : undefined,
                        match: { archived: archived ? true : undefined },
                      },
                    }
                  : undefined,
              },
            });
          }

          if (players) {
            return players;
          } else {
            throw new ApolloError(`No player could be found`);
          }
        } catch (err) {
          const error = err as ApolloError;
          throw error;
        }
      },
    });
  },
});
