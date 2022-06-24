import { extendType, list, nonNull, stringArg } from "nexus";
import { UserType } from "./User";
import prisma from "../../../lib/prisma";
import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-micro";

export const UserQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("user", {
      type: UserType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        if (
          ctx.auth === null ||
          (ctx.auth.role !== "ADMIN" && ctx.auth.sub !== args.id)
        ) {
          throw new ForbiddenError("Unautorized Request");
        }

        try {
          const user = await prisma.user.findUnique({ where: { id: args.id } });
          if (user) {
            return user;
          } else {
            throw new UserInputError(`Couldn't find user with id ${args.id}`);
          }
        } catch (err) {
          throw new ApolloError("Error with user query");
        }
      },
    });
    t.field("users", {
      type: list(UserType),
      resolve: async (_, __, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError("Unauthorized Request");
        }

        try {
          const users = await prisma.user.findMany();
          if (users) {
            return users;
          } else {
            throw new ApolloError("No user could be found");
          }
        } catch (err) {
          throw new ApolloError("Error with users query");
        }
      },
    });
  },
});
