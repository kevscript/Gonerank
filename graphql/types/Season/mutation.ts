import { arg, extendType, nonNull, stringArg } from "nexus";
import { SeasonType } from "./Season";
import prisma from "@/lib/prisma";
import { ForbiddenError, UserInputError } from "apollo-server-micro";
import { ApolloError } from "@apollo/client";
import { CreateSeasonInput, UpdateSeasonInput } from "./types";

export const SeasonMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    // create season
    t.field("createSeason", {
      type: SeasonType,
      args: { data: nonNull(arg({ type: CreateSeasonInput })) },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const { startDate } = args.data || {};
          const createdSeason = await prisma.season.create({
            data: { startDate },
          });

          if (createdSeason) {
            return createdSeason;
          } else {
            throw new UserInputError(`Couldn't create a season`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // update season
    t.field("updateSeason", {
      type: SeasonType,
      args: {
        id: nonNull(stringArg()),
        data: nonNull(arg({ type: UpdateSeasonInput })),
      },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const { startDate } = args.data || {};
          const updatedSeason = await prisma.season.update({
            where: { id: args.id },
            data: { startDate },
          });

          if (updatedSeason) {
            return updatedSeason;
          } else {
            throw new UserInputError(
              `Couldn't update season with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // delete seasons
    t.field("deleteSeason", {
      type: SeasonType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const deletedSeason = await prisma.season.delete({
            where: { id: args.id },
          });

          if (deletedSeason) {
            return deletedSeason;
          } else {
            throw new UserInputError(
              `Couldn't delete season with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
