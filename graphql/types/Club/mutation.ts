import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-micro";
import { arg, extendType, nonNull, stringArg } from "nexus";
import { ClubType } from "./Club";
import { CreateClubInput, UpdateClubInput } from "./types";
import prisma from "@/lib/prisma";

export const ClubMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    // create club
    t.field("createClub", {
      type: ClubType,
      args: { data: nonNull(arg({ type: CreateClubInput })) },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const createdClub = await prisma.club.create({ data: args.data });

          if (createdClub) {
            return createdClub;
          } else {
            throw new UserInputError(`Couldn't create a new club`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // update club
    t.field("updateClub", {
      type: ClubType,
      args: {
        id: nonNull(stringArg()),
        data: nonNull(arg({ type: UpdateClubInput })),
      },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const { name, abbreviation, primary, secondary } = args.data || {};
          const updatedClub = await prisma.club.update({
            where: { id: args.id },
            data: {
              name: name ? name : undefined,
              abbreviation: abbreviation ? abbreviation : undefined,
              primary: primary ? primary : undefined,
              secondary: secondary ? secondary : undefined,
            },
          });

          if (updatedClub) {
            return updatedClub;
          } else {
            throw new UserInputError(`Couldn't update club with id ${args.id}`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // delete club
    t.field("deleteClub", {
      type: ClubType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const deletedClub = await prisma.club.delete({
            where: { id: args.id },
          });

          if (deletedClub) {
            return deletedClub;
          } else {
            throw new UserInputError(`Couldn't delete club with id ${args.id}`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
