import { ApolloError, UserInputError } from "apollo-server-micro";
import { arg, extendType, nonNull, stringArg } from "nexus";
import { MatchType } from "./Match";
import { CreateMatchInput, UpdateMatchInput } from "./types";
import prisma from "@/lib/prisma";

export const MatchMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    // create match
    t.field("createMatch", {
      type: MatchType,
      args: { data: nonNull(arg({ type: CreateMatchInput })) },
      resolve: async (_, args, ctx) => {
        // if (ctx.auth?.role !== "ADMIN") {
        //   throw new ForbiddenError(`Forbidden Action`);
        // }
        try {
          const {
            date,
            competitionId,
            conceeded,
            opponentId,
            scored,
            seasonId,
            active,
            home,
          } = args.data || {};

          const createdMatch = await prisma.match.create({
            data: {
              date,
              scored,
              conceeded,
              opponentId,
              competitionId,
              seasonId,
              active: typeof active === "boolean" ? active : undefined,
              home: typeof home === "boolean" ? home : undefined,
            },
          });

          if (createdMatch) {
            return createdMatch;
          } else {
            throw new UserInputError(`Couldn't create a new match`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // update match
    t.field("updateMatch", {
      type: MatchType,
      args: {
        id: nonNull(stringArg()),
        data: nonNull(arg({ type: UpdateMatchInput })),
      },
      resolve: async (_, args, ctx) => {
        // if (ctx.auth?.role !== "ADMIN") {
        //   throw new ForbiddenError(`Forbidden Action`);
        // }
        try {
          const {
            date,
            competitionId,
            conceeded,
            opponentId,
            scored,
            seasonId,
            active,
            archived,
            home,
          } = args.data || {};

          const updatedMatch = await prisma.match.update({
            where: { id: args.id },
            data: {
              date: date ? date : undefined,
              competitionId: competitionId ? competitionId : undefined,
              conceeded: typeof conceeded === "number" ? conceeded : undefined,
              opponentId: opponentId ? opponentId : undefined,
              scored: typeof scored === "number" ? scored : undefined,
              seasonId: seasonId ? seasonId : undefined,
              active: typeof active === "boolean" ? active : undefined,
              archived: typeof archived === "boolean" ? archived : undefined,
              home: typeof home === "boolean" ? home : undefined,
            },
          });

          if (updatedMatch) {
            return updatedMatch;
          } else {
            throw new UserInputError(
              `Couldn't update match with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // delete match
    t.field("deleteMatch", {
      type: MatchType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        // if (ctx.auth?.role !== "ADMIN") {
        //   throw new ForbiddenError(`Forbidden Action`);
        // }
        try {
          const deletedMatch = await prisma.match.delete({
            where: { id: args.id },
          });

          if (deletedMatch) {
            return deletedMatch;
          } else {
            throw new UserInputError(
              `Couldn't delete match with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // toggle match status
    t.field("toggleMatchStatus", {
      type: MatchType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        // if (ctx.auth?.role !== "ADMIN") {
        //   throw new ForbiddenError(`Forbidden Action`);
        // }
        try {
          // deactivate any match thats currently activated
          await prisma.match.updateMany({
            where: { active: true, NOT: { id: args.id } },
            data: { active: false },
          });

          // first fetch match to retrieve current activation status
          const currentMatch = await prisma.match.findUnique({
            where: { id: args.id },
          });
          if (currentMatch) {
            // update that match with the appropriate status
            const setMatchStatus = await prisma.match.update({
              where: { id: args.id },
              data: { active: currentMatch.active ? false : true },
            });
            return setMatchStatus;
          } else {
            throw new UserInputError(`Can't find match with id ${args.id}`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
