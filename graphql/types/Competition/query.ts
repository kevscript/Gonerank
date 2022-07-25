import { ApolloError, UserInputError } from "apollo-server-micro";
import { arg, extendType, list, nonNull, nullable, stringArg } from "nexus";
import { CompetitionType } from "./Competition";
import prisma from "@/lib/prisma";
import { CompetitionsWhereInput } from "./types";

export const CompetitionQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("competition", {
      type: CompetitionType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args) => {
        try {
          const competition = await prisma.competition.findUnique({
            where: { id: args.id },
          });

          if (competition) {
            return competition;
          } else {
            throw new UserInputError(
              `Couldn't find a competition with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
    t.field("competitions", {
      type: list(CompetitionType),
      args: { where: arg({ type: CompetitionsWhereInput }) },
      resolve: async (_, args) => {
        try {
          let competitions;

          if (!args.where) {
            competitions = await prisma.competition.findMany();
          } else {
            const { abbreviation, name } = args.where;
            competitions = await prisma.competition.findMany({
              where: {
                name: name ? name : undefined,
                abbreviation: abbreviation ? abbreviation : undefined,
              },
            });
          }

          if (competitions) {
            return competitions;
          } else {
            return [];
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
