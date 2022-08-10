import { arg, extendType, intArg, list, nonNull, stringArg } from "nexus";
import { RatingType } from "./Rating";
import prisma from "@/lib/prisma";
import { ApolloError, ForbiddenError } from "apollo-server-micro";
import { CreateUserRatingsInput } from "./types";

export const RatingMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createUserRatings", {
      type: list(RatingType),
      args: {
        userId: nonNull(stringArg()),
        matchId: nonNull(stringArg()),
        ratings: nonNull(list(nonNull(arg({ type: CreateUserRatingsInput })))),
      },
      resolve: async (_, args, ctx) => {
        console.log(ctx.auth?.sub, args.userId);
        if (ctx.auth?.role !== "ADMIN" && ctx.auth?.sub !== args.userId) {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const { userId, matchId, ratings } = args || {};

          const userAlreadyVoted = await prisma.rating.findFirst({
            where: { matchId: matchId, userId: userId },
          });

          if (userAlreadyVoted) {
            throw new ApolloError(
              `user ${userId} already voted for match ${matchId}`
            );
          }

          const ratingsToCreate = ratings.map(
            (r: { playerId: string; rating: number }) => ({
              userId: userId,
              matchId: matchId,
              rating: r.rating,
              playerId: r.playerId,
            })
          );

          const [createUserRatingsInfo, matchUserRatings] =
            await prisma.$transaction([
              prisma.rating.createMany({
                data: ratingsToCreate,
                skipDuplicates: true,
              }),
              prisma.rating.findMany({
                where: { userId: userId, matchId: matchId },
              }),
            ]);

          if (matchUserRatings) {
            return matchUserRatings;
          } else {
            throw new ApolloError(`Couldn't create user ratings`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
