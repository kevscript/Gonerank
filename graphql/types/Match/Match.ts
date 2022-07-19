import { Match } from "graphql/generated/nexusTypes";
import { list, objectType } from "nexus";
import { MatchStats } from "./types";
import prisma from "@/lib/prisma";
import { ApolloError } from "apollo-server-micro";

export const MatchType = objectType({
  name: Match.$name,
  definition: (t) => {
    t.field(Match.id);
    t.field(Match.date);
    t.field(Match.home);
    t.field(Match.scored);
    t.field(Match.conceeded);
    t.field(Match.active);
    t.field(Match.archived);
    t.field(Match.competitionId);
    t.field(Match.seasonId);
    t.field(Match.opponentId);
    t.field(Match.competition);
    t.field(Match.season);
    t.field(Match.opponent);
    t.field(Match.players);
    t.field(Match.ratings);

    t.field("stats", {
      type: list(MatchStats),
      resolve: async (parent) => {
        try {
          const stats: {
            [key: string]: {
              playerId: string;
              firstName: string;
              lastName: string;
              image: string;
              avgSum: number;
              numOfAvg: number;
              tendency: number;
            };
          } = {};

          const matchPlayers = await prisma.matchPlayer.findMany({
            where: { matchId: parent.id },
            include: {
              player: {
                select: {
                  firstName: true,
                  lastName: true,
                  image: true,
                  ratings: {
                    where: { matchId: parent.id },
                    select: { rating: true },
                  },
                },
              },
            },
          });

          matchPlayers.forEach((mp) => {
            stats[mp.playerId] = {
              playerId: mp.playerId,
              firstName: mp.player.firstName,
              lastName: mp.player.lastName,
              image: mp.player.image,
              avgSum: 0,
              numOfAvg: 0,
              tendency: 0,
            };

            mp.player.ratings.forEach((r) => {
              stats[mp.playerId].avgSum += r.rating ? r.rating : 0;
              stats[mp.playerId].numOfAvg += r.rating ? 1 : 0;
              stats[mp.playerId].tendency += r.rating ? r.rating - 5 : 0;
            });
          });

          return Object.values(stats);
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
