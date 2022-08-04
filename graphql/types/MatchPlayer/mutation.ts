import { extendType, list, nonNull, stringArg } from "nexus";
import { MatchPlayerType } from "./MatchPlayer";
import prisma from "@/lib/prisma";
import { ApolloError, ForbiddenError } from "apollo-server-micro";

export const MatchPlayerMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateMatchPlayers", {
      type: list(MatchPlayerType),
      args: {
        matchId: nonNull(stringArg()),
        playerIds: nonNull(list(nonNull(stringArg()))),
      },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const matchPlayersToCreate = args.playerIds.map((pId: string) => ({
            matchId: args.matchId,
            playerId: pId,
          }));

          const [
            deletedMatchPlayers,
            createdMatchPlayers,
            updatedMatchPlayers,
          ] = await prisma.$transaction([
            prisma.matchPlayer.deleteMany({
              where: {
                matchId: args.matchId,
                playerId: { notIn: args.playerIds },
              },
            }),
            prisma.matchPlayer.createMany({
              data: matchPlayersToCreate,
              skipDuplicates: true,
            }),
            prisma.matchPlayer.findMany({ where: { matchId: args.matchId } }),
          ]);

          if (updatedMatchPlayers) {
            return updatedMatchPlayers;
          } else {
            throw new ApolloError(
              `Can't find the updated match players for match with id ${args.matchId}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
