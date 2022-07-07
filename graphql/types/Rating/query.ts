import { ApolloError, ForbiddenError } from "apollo-server-micro";
import { arg, extendType, list, nonNull, stringArg } from "nexus";
import { RatingType } from "./Rating";
import prisma from "@/lib/prisma";

export const RatingQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("rating", {
      type: RatingType,
      args: {
        userId: nonNull(stringArg()),
        matchId: nonNull(stringArg()),
        playerId: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        // if (ctx.auth?.role !== "ADMIN" || ctx.auth?.sub !== args.userId) {
        //   throw new ForbiddenError(`Forbidden Action`);
        // }
        try {
          const { matchId, playerId, userId } = args || {};
          const rating = await prisma.rating.findUnique({
            where: {
              playerId_matchId_userId: {
                playerId: playerId,
                matchId: matchId,
                userId: userId,
              },
            },
          });

          if (rating) {
            return rating;
          } else {
            throw new ApolloError(`Couldn't find the rating`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    t.field("ratings", {
      type: list(RatingType),
      args: {
        userId: stringArg(),
        matchId: stringArg(),
        playerId: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        try {
          const { userId, matchId, playerId } = args || {};

          let ratings;
          if (!userId && !matchId && !playerId) {
            ratings = await prisma.rating.findMany();
          } else {
            ratings = await prisma.rating.findMany({
              where: {
                userId: userId ? userId : undefined,
                matchId: matchId ? matchId : undefined,
                playerId: playerId ? playerId : undefined,
              },
            });
          }

          if (ratings) {
            return ratings;
          } else {
            throw new ApolloError(`Couldn't find the ratings`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
