import prisma from "@/lib/prisma";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { arg, extendType, list, nonNull, stringArg } from "nexus";
import { MatchType } from "./Match";
import { MatchesWhereInput } from "./types";

export const MatchQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("match", {
      type: MatchType,
      args: { id: nonNull(stringArg()) },
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
      args: { where: arg({ type: MatchesWhereInput }) },
      resolve: async (_, args) => {
        try {
          let matches;
          if (!args.where) {
            matches = await prisma.match.findMany();
          } else {
            const {
              date,
              competitionId,
              conceeded,
              opponentId,
              scored,
              seasonId,
              active,
              archived,
              home,
            } = args.where;
            matches = await prisma.match.findMany({
              where: {
                date: date ? date : undefined,
                competitionId: competitionId ? competitionId : undefined,
                conceeded:
                  typeof conceeded === "number" ? conceeded : undefined,
                opponentId: opponentId ? opponentId : undefined,
                scored: typeof scored === "number" ? scored : undefined,
                seasonId: seasonId ? seasonId : undefined,
                active: typeof active === "boolean" ? active : undefined,
                archived: typeof archived === "boolean" ? archived : undefined,
                home: typeof home === "boolean" ? home : undefined,
              },
            });
          }

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

    t.field("displayMatch", {
      type: MatchType,
      resolve: async () => {
        try {
          const activeMatch = await prisma.match.findFirst({
            where: { active: true },
          });

          if (activeMatch) {
            return activeMatch;
          }

          const latestMatches = await prisma.match.findMany({
            where: { archived: true },
            orderBy: { date: "desc" },
            take: 1,
          });

          const latestMatch = latestMatches[0];

          if (latestMatch) {
            return latestMatch;
          } else {
            throw new ApolloError(
              "Pas de match à afficher pour l'instant, revenez plus tard!"
            );
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
