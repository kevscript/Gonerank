import { ApolloError, UserInputError } from "apollo-server-micro";
import { extendType, list, nonNull, stringArg } from "nexus";
import { CompetitionType } from "./Competition";
import prisma from "@/lib/prisma";

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
      resolve: async () => {
        try {
          const competitions = await prisma.competition.findMany();

          if (competitions) {
            return competitions;
          } else {
            throw new ApolloError(`No competitions could be found`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
