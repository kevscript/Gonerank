import { arg, extendType, list, nonNull, stringArg } from "nexus";
import { SeasonType } from "./Season";
import prisma from "@/lib/prisma";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { SeasonsWhereInput } from "./types";

export const SeasonQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("season", {
      type: SeasonType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args) => {
        try {
          const season = await prisma.season.findUnique({
            where: { id: args.id },
          });
          if (season) {
            return season;
          } else {
            throw new UserInputError(`Couldn't find season with id ${args.id}`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
    t.field("seasons", {
      type: list(SeasonType),
      args: { where: arg({ type: SeasonsWhereInput }) },
      resolve: async (_, args) => {
        try {
          let seasons;
          if (!args.where) {
            seasons = await prisma.season.findMany();
          } else {
            seasons = await prisma.season.findMany({
              where: {
                startDate: args.where.startDate,
              },
            });
          }

          if (seasons) {
            return seasons;
          } else {
            throw new ApolloError(`No seasons could be found`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
