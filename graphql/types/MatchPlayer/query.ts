import { extendType, list, nonNull, stringArg } from "nexus";
import { MatchPlayerType } from "./MatchPlayer";
import prisma from "@/lib/prisma";
import { UserInputError, ApolloError } from "apollo-server-micro";

export const MatchPlayerQuery = extendType({
  type: "Query",
  definition: (t) => {
    // get a single matchPlayer
    t.field("matchPlayer", {
      type: MatchPlayerType,
      args: { matchId: nonNull(stringArg()), playerId: nonNull(stringArg()) },
      resolve: async (_, args) => {
        try {
          const matchPlayer = await prisma.matchPlayer.findUnique({
            where: {
              playerId_matchId: {
                matchId: args.matchId,
                playerId: args.playerId,
              },
            },
          });
          if (matchPlayer) {
            return matchPlayer;
          } else {
            throw new UserInputError(
              `Couldn't find matchPlayer with matchId ${args.matchId} and playerId ${args.playerId}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // get matchPlayers
    t.field("matchPlayers", {
      type: list(MatchPlayerType),
      args: { matchId: stringArg(), playerId: stringArg() },
      resolve: async (_, args, ctx) => {
        try {
          const { matchId, playerId } = args || {};

          let matchPlayers;
          if (!matchId && !playerId) {
            matchPlayers = await prisma.matchPlayer.findMany();
          } else {
            matchPlayers = await prisma.matchPlayer.findMany({
              where: {
                matchId: matchId ? matchId : undefined,
                playerId: playerId ? playerId : undefined,
              },
            });
          }

          if (matchPlayers) {
            return matchPlayers;
          } else {
            throw new ApolloError(`Couldn't find matchPlayers`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
