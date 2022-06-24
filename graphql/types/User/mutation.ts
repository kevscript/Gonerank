import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-micro";
import { extendType, nonNull, stringArg } from "nexus";
import { UpdateUserInput } from "./types";
import { UserType } from "./User";
import prisma from "../../../lib/prisma";

export const UserMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateUser", {
      type: UserType,
      args: { id: nonNull(stringArg()), input: nonNull(UpdateUserInput) },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.sub !== args.id || ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError("Unauthorized Request");
        }

        try {
          const user = await prisma.user.update({
            where: { id: args.id },
            data: args.input,
          });
          if (user) {
            return user;
          } else {
            throw new UserInputError(
              `Something went wrong while updating user ${args.id}`
            );
          }
        } catch (err) {
          throw new ApolloError("Error with updateUser mutation");
        }
      },
    });
    t.field("deleteUser", {
      type: UserType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.sub !== args.id || ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError("Unauthorized Request");
        }

        try {
          const user = await prisma.user.delete({ where: { id: args.id } });
          if (user) {
            return user;
          } else {
            throw new UserInputError(
              `Something went wrong while deleting user ${args.id}`
            );
          }
        } catch (err) {
          throw new ApolloError("Error with deleteUser mutation");
        }
      },
    });
  },
});
