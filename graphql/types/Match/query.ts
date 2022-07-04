import prisma from "@/lib/prisma";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { extendType, list } from "nexus";
import { MatchType } from "./Match";

export const MatchQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("match", {
      type: MatchType,
      resolve: async (_, args) => {
        try {
          const match = await prisma.match.findUnique({
            where: { id: args.id },
          });
          if (match) {
            return match;
          } else {
            throw new UserInputError(
              `Couldn't find a match with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
    t.field("matches", {
      type: list(MatchType),
      resolve: async () => {
        try {
          const matches = await prisma.match.findMany();
          if (matches) {
            return matches;
          } else {
            throw new ApolloError(`No matches could be found`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
