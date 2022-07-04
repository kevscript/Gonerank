import prisma from "@/lib/prisma";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { extendType, list, nonNull, stringArg } from "nexus";
import { PlayerType } from "./Player";

export const PlayerQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("player", {
      type: PlayerType,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args) => {
        try {
          const player = await prisma.player.findUnique({
            where: { id: args.id },
          });
          if (player) {
            return player;
          } else {
            throw new UserInputError(
              `Couldn't find player with id "${args.id}"`
            );
          }
        } catch (err) {
          const error = err as ApolloError;
          throw error;
        }
      },
    });
    t.field("players", {
      type: list(PlayerType),
      resolve: async () => {
        try {
          const players = await prisma.player.findMany();
          if (players) {
            return players;
          } else {
            throw new ApolloError(`No player could be found`);
          }
        } catch (err) {
          const error = err as ApolloError;
          throw error;
        }
      },
    });
  },
});
