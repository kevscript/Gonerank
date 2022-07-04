import { ApolloError, UserInputError } from "apollo-server-micro";
import { arg, extendType, list, nonNull, stringArg } from "nexus";
import { ClubType } from "./Club";
import prisma from "@/lib/prisma";

export const ClubQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("club", {
      type: ClubType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args) => {
        try {
          const club = await prisma.club.findUnique({ where: { id: args.id } });
          if (club) {
            return club;
          } else {
            throw new UserInputError(`Couldn't find club with id ${args.id}`);
          }
        } catch (err) {
          const error = err as ApolloError;
          throw error;
        }
      },
    });
    t.field("clubs", {
      type: list(ClubType),
      resolve: async () => {
        try {
          const clubs = await prisma.club.findMany();
          if (clubs) {
            return clubs;
          } else {
            throw new ApolloError(`No club could be found`);
          }
        } catch (err) {
          const error = err as ApolloError;
          throw error;
        }
      },
    });
  },
});
