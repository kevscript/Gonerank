import { ApolloError } from "apollo-server-micro";
import { extendType, list, nonNull, stringArg } from "nexus";
import { SeasonPlayerType } from "..";
import prisma from "@/lib/prisma";

export const SeasonPlayerMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateSeasonPlayers", {
      type: list(SeasonPlayerType),
      args: {
        seasonId: nonNull(stringArg()),
        playerIds: nonNull(list(nonNull(stringArg()))),
      },
      resolve: async (_, args, ctx) => {
        // if (ctx.auth?.role !== "ADMIN") {
        //   throw new ForbiddenError(`Forbidden Action`);
        // }
        try {
          const seasonPlayersToCreate = args.playerIds.map((pId) => ({
            seasonId: args.seasonId,
            playerId: pId,
          }));

          const [
            deleteSeasonPlayers,
            createSeasonPlayers,
            updatedSeasonPlayers,
          ] = await prisma.$transaction([
            prisma.seasonPlayer.deleteMany({
              where: {
                seasonId: args.seasonId,
                playerId: { notIn: args.playerIds },
              },
            }),
            prisma.seasonPlayer.createMany({
              data: seasonPlayersToCreate,
              skipDuplicates: true,
            }),
            prisma.seasonPlayer.findMany({
              where: { seasonId: args.seasonId },
            }),
          ]);

          if (updatedSeasonPlayers) {
            return updatedSeasonPlayers;
          } else {
            throw new ApolloError(
              `Can't find the updated season players for season with id ${args.seasonId}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
