import { ApolloError, UserInputError } from "apollo-server-micro";
import { arg, extendType, list, nonNull, nullable, stringArg } from "nexus";
import { ClubType } from "./Club";
import prisma from "@/lib/prisma";
import { ClubsWhereInput } from "./types";

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
      args: { where: arg({ type: ClubsWhereInput }) },
      resolve: async (_, args) => {
        try {
          let clubs;
          if (!args.where) {
            clubs = await prisma.club.findMany();
          } else {
            const { name, abbreviation, primary, secondary } = args.where;
            clubs = await prisma.club.findMany({
              where: {
                name: name ? name : undefined,
                abbreviation: abbreviation ? abbreviation : undefined,
                primary: primary ? primary : undefined,
                secondary: secondary ? secondary : undefined,
              },
            });
          }

          if (clubs) {
            return clubs;
          } else {
            return [];
          }
        } catch (err) {
          const error = err as ApolloError;
          throw error;
        }
      },
    });
  },
});
