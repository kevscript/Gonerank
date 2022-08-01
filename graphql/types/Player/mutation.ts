import { arg, extendType, nonNull, stringArg } from "nexus";
import { PlayerType } from "./Player";
import prisma from "@/lib/prisma";
import {
  ApolloError,
  UserInputError,
  ForbiddenError,
} from "apollo-server-micro";
import { CreatePlayerInput, UpdatePlayerInput } from "./types";

export const PlayerMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    // createPlayer
    t.field("createPlayer", {
      type: PlayerType,
      args: { data: nonNull(arg({ type: CreatePlayerInput })) },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const {
            birthDate,
            firstName,
            lastName,
            active,
            country,
            countryCode,
            image,
          } = args.data || {};

          const createdPlayer = await prisma.player.create({
            data: {
              firstName,
              lastName,
              birthDate,
              active: typeof active === "boolean" ? active : undefined,
              country: country ? country : undefined,
              countryCode: countryCode ? countryCode : undefined,
              image: image ? image : undefined,
            },
          });
          if (createdPlayer) {
            return createdPlayer;
          } else {
            throw new UserInputError(`Couldn't create a new player`);
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // updatePlayer
    t.field("updatePlayer", {
      type: PlayerType,
      args: {
        id: nonNull(stringArg()),
        data: nonNull(arg({ type: UpdatePlayerInput })),
      },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const {
            active,
            birthDate,
            country,
            countryCode,
            firstName,
            image,
            lastName,
          } = args.data || {};
          const updatedPlayer = await prisma.player.update({
            where: { id: args.id },
            data: {
              firstName: firstName ? firstName : undefined,
              lastName: lastName ? lastName : undefined,
              birthDate: birthDate ? birthDate : undefined,
              active: typeof active === "boolean" ? active : undefined,
              country: country ? country : undefined,
              countryCode: countryCode ? countryCode : undefined,
              image: image ? image : undefined,
            },
          });

          if (updatedPlayer) {
            return updatedPlayer;
          } else {
            throw new UserInputError(
              `Couldn't update player with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });

    // deletePlayer
    t.field("deletePlayer", {
      type: PlayerType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        if (ctx.auth?.role !== "ADMIN") {
          throw new ForbiddenError(`Forbidden Action`);
        }
        try {
          const deletedPlayer = await prisma.player.delete({
            where: { id: args.id },
          });

          if (deletedPlayer) {
            return deletedPlayer;
          } else {
            throw new UserInputError(
              `Couldn't delete a player with id ${args.id}`
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
