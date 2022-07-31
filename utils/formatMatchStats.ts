import {
  MatchDataQuery,
  MatchRatingsQuery,
} from "graphql/generated/queryTypes";

export type FormatMatchStatsParams = {
  match: MatchDataQuery["match"];
  players: MatchDataQuery["players"];
  ratings: MatchRatingsQuery["ratings"];
};

export type FormattedMatchPlayerStats = MatchDataQuery["players"][0] & {
  averageSum: number;
  averageQuantity: number;
  motm: boolean;
  botm: boolean;
};

export const formatMatchStats = ({
  match,
  players,
  ratings,
}: FormatMatchStatsParams) => {
  /* Turning players into objects by Id for better referencing */
  let playersById: { [key: string]: MatchDataQuery["players"][0] } = {};
  players.forEach((player) => (playersById[player.id] = player));

  let matchPlayersStats: { [key: string]: FormattedMatchPlayerStats } = {};

  ratings.forEach((r) => {
    if (!matchPlayersStats[r.playerId]) {
      matchPlayersStats[r.playerId] = {
        ...playersById[r.playerId],
        averageSum: r.rating || 0,
        averageQuantity: r.rating ? 1 : 0,
        motm: false,
        botm: false,
      };
    } else {
      (matchPlayersStats[r.playerId].averageSum += r.rating || 0),
        (matchPlayersStats[r.playerId].averageQuantity += r.rating ? 1 : 0);
    }
  });

  let motmRating = 0;
  let motmIds: string[] = [];
  let botmRating = 11;
  let botmIds: string[] = [];

  players.forEach((pl) => {
    const playerAvg = matchPlayersStats[pl.id].averageSum
      ? matchPlayersStats[pl.id].averageSum /
        matchPlayersStats[pl.id].averageQuantity
      : 0;

    if (playerAvg) {
      playerAvg === motmRating && motmIds.push(pl.id);
      playerAvg === botmRating && botmIds.push(pl.id);

      if (playerAvg > motmRating) {
        motmIds = [pl.id];
        motmRating = playerAvg;
      }

      if (playerAvg < botmRating) {
        botmIds = [pl.id];
        botmRating = playerAvg;
      }
    }
  });

  if (motmRating > 5 && motmIds.length > 0) {
    motmIds.forEach((pId) => (matchPlayersStats[pId].motm = true));
  }

  if (botmRating < 5 && botmIds.length > 0) {
    botmIds.forEach((pId) => (matchPlayersStats[pId].botm = true));
  }

  const formattedStats = Object.values(matchPlayersStats);
  return formattedStats;
};
