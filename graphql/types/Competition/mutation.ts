import { arg, extendType, nonNull, stringArg } from "nexus";
import { CompetitionType } from "./Competition";
import { CreateCompetitionInput, UpdateCompetitionInput } from "./types";
import prisma from "@/lib/prisma";
import { ApolloError, UserInputError } from "apollo-server-micro";

export const CompetitionMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    // create competition
    t.field("createCompetition", {
      type: CompetitionType,
      args: { data: nonNull(arg({ type: CreateCompetitionInput })) },
      resolve: async (_, args, ctx) => {
        // if (ctx.auth?.role !== "ADMIN") {
        //   throw new ForbiddenError(`Forbidden Action`);
        // }
        try {
          const createdCompetition = await prisma.competition.create({
            data: args.data,
          });

          if (createdCompetition) {
            return createdCompetition;
          } else {
            throw new UserInputError(`Couldn't create a new competition`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // update competition
    t.field("updateCompetition", {
      type: CompetitionType,
      args: {
        id: nonNull(stringArg()),
        data: nonNull(arg({ type: UpdateCompetitionInput })),
      },
      resolve: async (_, args, ctx) => {
        // if (ctx.auth?.role !== "ADMIN") {
        //   throw new ForbiddenError(`Forbidden Action`);
        // }
        try {
          const { name, abbreviation } = args.data || {};
          const updatedCompetition = await prisma.competition.update({
            where: { id: args.id },
            data: {
              name: name ? name : undefined,
              abbreviation: abbreviation ? abbreviation : undefined,
            },
          });

          if (updatedCompetition) {
            return updatedCompetition;
          } else {
            throw new UserInputError(
              `Couldn't update competition with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // delete competition
    t.field("deleteCompetition", {
      type: CompetitionType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        // if (ctx.auth?.role !== "ADMIN") {
        //   throw new ForbiddenError(`Forbidden Action`);
        // }
        try {
          const deletedCompetition = await prisma.competition.delete({
            where: { id: args.id },
          });

          if (deletedCompetition) {
            return deletedCompetition;
          } else {
            throw new UserInputError(
              `Couldn't delete competition with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
