import {
  GetSeasonRatingsQuery,
  GlobalSeasonDataQuery,
} from "graphql/generated/queryTypes";

export type FormatMatchesSeasonStatsParams = {
  players: GlobalSeasonDataQuery["players"];
  clubs: GlobalSeasonDataQuery["clubs"];
  competitions: GlobalSeasonDataQuery["competitions"];
  matches: GlobalSeasonDataQuery["matches"];
  ratings: GetSeasonRatingsQuery["ratings"];
};

export type FormattedMatchStatsPlayer = GlobalSeasonDataQuery["players"][0] & {
  averageSum: number;
  averageQuantity: number;
};

export type FormattedMatchStats = GlobalSeasonDataQuery["matches"][0] & {
  competition: GlobalSeasonDataQuery["competitions"][0];
  opponent: GlobalSeasonDataQuery["clubs"][0];
  averageSum: number;
  averageQuantity: number;
  tendency: number;
  motmRating: number;
  motmIds: string[];
  botmRating: number;
  botmIds: string[];
  players: { [key: string]: FormattedMatchStatsPlayer };
};

export const formatMatchesSeasonStats = ({
  matches,
  players,
  clubs,
  competitions,
  ratings,
}: FormatMatchesSeasonStatsParams) => {
  /* Turning all lists into objects by Id for better referencing */
  let playersById: { [key: string]: GlobalSeasonDataQuery["players"][0] } = {};
  players.forEach((player) => (playersById[player.id] = player));

  let matchesById: {
    [key: string]: GlobalSeasonDataQuery["matches"][0];
  } = {};
  matches.forEach((match) => (matchesById[match.id] = match));

  let clubsById: { [key: string]: GlobalSeasonDataQuery["clubs"][0] } = {};
  clubs.forEach((club) => (clubsById[club.id] = club));

  let competitionsById: {
    [key: string]: GlobalSeasonDataQuery["competitions"][0];
  } = {};
  competitions.forEach((comp) => (competitionsById[comp.id] = comp));

  let matchesStats: { [key: string]: FormattedMatchStats } = {};

  if (matches.length < 1) {
    return Object.values(matchesStats);
  }

  matches.forEach((m) => {
    if (!matchesStats[m.id]) {
      matchesStats[m.id] = {
        ...m,
        competition: competitionsById[m.competitionId],
        opponent: clubsById[m.opponentId],
        averageSum: 0,
        averageQuantity: 0,
        tendency: 0,
        motmRating: 0,
        motmIds: [],
        botmRating: 11,
        botmIds: [],
        players: {},
      };
    }
  });

  ratings.forEach((r) => {
    if (!matchesStats[r.matchId]) {
      matchesStats[r.matchId] = {
        ...matchesById[r.matchId],
        competition: competitionsById[matchesById[r.matchId].competitionId],
        opponent: clubsById[matchesById[r.matchId].opponentId],
        averageSum: 0,
        averageQuantity: 0,
        tendency: 0,
        motmRating: 0,
        motmIds: [],
        botmRating: 11,
        botmIds: [],
        players: {},
      };
    }
    if (!matchesStats[r.matchId].players[r.playerId]) {
      matchesStats[r.matchId].players[r.playerId] = {
        ...playersById[r.playerId],
        averageSum: r.rating || 0,
        averageQuantity: r.rating ? 1 : 0,
      };
    } else {
      matchesStats[r.matchId].players[r.playerId].averageSum += r.rating || 0;
      matchesStats[r.matchId].players[r.playerId].averageQuantity += r.rating
        ? 1
        : 0;
    }

    matchesStats[r.matchId].averageSum += r.rating || 0;
    matchesStats[r.matchId].averageQuantity += r.rating ? 1 : 0;
    matchesStats[r.matchId].tendency = r.rating
      ? matchesStats[r.matchId].tendency + (r.rating - 5)
      : 0;
  });

  matches.forEach((m) => {
    let motmIds: string[] = [];
    let motmRating: number = 0;

    let botmIds: string[] = [];
    let botmRating: number = 11;

    const matchPlayers = matchesStats[m.id].players;

    for (const pId in matchPlayers) {
      const playerRating = matchPlayers[pId].averageSum
        ? matchPlayers[pId].averageSum / matchPlayers[pId].averageQuantity
        : 0;

      if (playerRating) {
        playerRating === motmRating && motmIds.push(pId);
        playerRating === botmRating && botmIds.push(pId);

        if (playerRating > motmRating) {
          motmIds = [pId];
          motmRating = playerRating;
        }

        if (playerRating < botmRating) {
          botmIds = [pId];
          botmRating = playerRating;
        }
      }
    }

    if (motmRating > 5) {
      matchesStats[m.id].motmIds = motmIds;
      matchesStats[m.id].motmRating = motmRating;
    }

    if (botmRating < 5) {
      matchesStats[m.id].botmIds = botmIds;
      matchesStats[m.id].botmRating = botmRating;
    }
  });

  const formattedStats = Object.values(matchesStats);
  return formattedStats;
};
