import { extendType, list, nonNull, stringArg } from "nexus";
import { SeasonType } from "./Season";
import prisma from "@/lib/prisma";
import { ApolloError, UserInputError } from "apollo-server-micro";

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
      resolve: async () => {
        try {
          const seasons = await prisma.season.findMany();
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
