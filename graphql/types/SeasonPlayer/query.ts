import { arg, extendType, list, nonNull, stringArg } from "nexus";
import { SeasonPlayerType } from "./SeasonPlayer";
import prisma from "@/lib/prisma";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { SeasonPlayersWhereInput } from "./types";

export const SeasonPlayerQuery = extendType({
  type: "Query",
  definition: (t) => {
    // get a single seasonPlayer
    t.field("seasonPlayer", {
      type: SeasonPlayerType,
      args: { seasonId: nonNull(stringArg()), playerId: nonNull(stringArg()) },
      resolve: async (_, args) => {
        try {
          const seasonPlayer = await prisma.seasonPlayer.findUnique({
            where: {
              playerId_seasonId: {
                playerId: args.playerId,
                seasonId: args.seasonId,
              },
            },
          });

          if (seasonPlayer) {
            return seasonPlayer;
          } else {
            throw new UserInputError(
              `Coudn't find seasonPlayer with seasonId ${args.seasonId} and playerId ${args.playerId}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // get seasonPlayers
    t.field("seasonPlayers", {
      type: list(SeasonPlayerType),
      args: { where: arg({ type: SeasonPlayersWhereInput }) },
      resolve: async (_, args) => {
        try {
          let seasonPlayers;
          if (!args.where) {
            seasonPlayers = await prisma.seasonPlayer.findMany();
          } else {
            const { seasonId, playerId } = args.where;
            seasonPlayers = await prisma.seasonPlayer.findMany({
              where: {
                seasonId: seasonId ? seasonId : undefined,
                playerId: playerId ? playerId : undefined,
              },
            });
          }

          if (seasonPlayers) {
            return seasonPlayers;
          } else {
            throw new ApolloError(`Couldn't find seasonPlayers`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
