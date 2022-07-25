import { ApolloError } from "apollo-server-micro";
import { Season } from "graphql/generated/nexusTypes";
import { list, nullable, objectType } from "nexus";
import prisma from "@/lib/prisma";
import { SeasonPlayerStats } from "./types";

type PlayerMatchStats = {
  matchId: string;
  averageSum: number;
  averageQuantity: number;
  tendency: number;
  motm: boolean;
  botm: boolean;
};

type SeasonPlayerStats = {
  playerId: string;
  firstName: string;
  lastName: string;
  image: string;
  matches: PlayerMatchStats[];
};

export const SeasonType = objectType({
  name: Season.$name,
  definition: (t) => {
    t.field(Season.id);
    t.field(Season.startDate);
    t.field(Season.matches);
    t.field(Season.players);

    t.field("playerStats", {
      type: nullable(list(SeasonPlayerStats)),
      resolve: async (parent) => {
        try {
          const players = await prisma.seasonPlayer.findMany({
            where: { seasonId: parent.id },
            include: {
              player: {
                include: {
                  ratings: { where: { match: { seasonId: parent.id } } },
                },
              },
            },
          });

          const playerStats: SeasonPlayerStats[] = [];
          const matchIds: string[] = [];

          players.forEach((sp) => {
            const playerMatches: { [key: string]: PlayerMatchStats } = {};

            sp.player.ratings.forEach((r) => {
              // push new match id to matchIds list
              !matchIds.includes(r.matchId) && matchIds.push(r.matchId);
              // compute stats for each match
              if (!playerMatches[r.matchId]) {
                playerMatches[r.matchId] = {
                  matchId: r.matchId,
                  averageSum: r.rating || 0,
                  averageQuantity: r.rating ? 1 : 0,
                  tendency: r.rating ? r.rating - 5 : 0,
                  motm: false,
                  botm: false,
                };
              } else {
                playerMatches[r.matchId].averageSum += r.rating || 0;
                playerMatches[r.matchId].averageQuantity += r.rating ? 1 : 0;
                playerMatches[r.matchId].tendency += r.rating
                  ? r.rating - 5
                  : 0;
              }
            });

            playerStats.push({
              playerId: sp.playerId,
              firstName: sp.player.firstName,
              lastName: sp.player.lastName,
              image: sp.player.image,
              matches: Object.values(playerMatches),
            });
          });

          // check who was motm and botm in each match
          matchIds.forEach((mId) => {
            let motmAvg = 0;
            let botmAvg = 11;
            let motmIds: string[] = [];
            let botmIds: string[] = [];

            // compare and update avgs of each player's match
            playerStats.forEach((pl) => {
              if (pl.matches.length > 0) {
                const currMatch = pl.matches.find((s) => s.matchId === mId);

                if (currMatch) {
                  const playerAvg =
                    currMatch.averageSum / currMatch.averageQuantity;
                  if (playerAvg === motmAvg) {
                    motmIds.push(pl.playerId);
                  }
                  if (playerAvg === botmAvg) {
                    botmIds.push(pl.playerId);
                  }
                  if (playerAvg > motmAvg) {
                    motmIds = [pl.playerId];
                    motmAvg = playerAvg;
                  }
                  if (playerAvg < botmAvg) {
                    botmIds = [pl.playerId];
                    botmAvg = playerAvg;
                  }
                }
              }
            });

            // if the best average is above 5, give all the players with this avg a motm
            motmAvg > 5 &&
              motmIds.forEach((pId) => {
                const player = playerStats.find((ps) => ps.playerId === pId);
                const playerMatch = player?.matches.find(
                  (m) => m.matchId === mId
                );
                if (playerMatch) playerMatch.motm = true;
              });

            // if the worst average is under 5, give all the players with this avg a botm
            botmAvg < 5 &&
              botmIds.forEach((pId) => {
                const player = playerStats.find((ps) => ps.playerId === pId);
                const playerMatch = player?.matches.find(
                  (m) => m.matchId === mId
                );
                if (playerMatch) playerMatch.botm = true;
              });
          });

          if (playerStats) {
            return playerStats;
          } else {
            return null;
          }
        } catch (err) {
          throw err as ApolloError;
        }
      },
    });
  },
});
