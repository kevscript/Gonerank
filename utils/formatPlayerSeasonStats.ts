import {
  PlayerSeasonDataQuery,
  PlayerSeasonRatingsQuery,
} from "graphql/generated/queryTypes";

export type FormatPlayerSeasonStatsParams = {
  clubs: PlayerSeasonDataQuery["clubs"];
  competitions: PlayerSeasonDataQuery["competitions"];
  matches: PlayerSeasonDataQuery["matches"];
  ratings: PlayerSeasonRatingsQuery["ratings"];
};

export type PlayerMatchStats = {
  [key: string]: PlayerSeasonDataQuery["matches"][0] & {
    competition: PlayerSeasonDataQuery["competitions"][0];
    opponent: PlayerSeasonDataQuery["clubs"][0];
    averageSum: number;
    averageQuantity: number;
  };
};

export type FormattedPlayerSeasonStats = PlayerSeasonDataQuery["matches"][0] & {
  competition: PlayerSeasonDataQuery["competitions"][0];
  opponent: PlayerSeasonDataQuery["clubs"][0];
  averageSum: number;
  averageQuantity: number;
};

export const formatPlayerSeasonStats = ({
  matches,
  clubs,
  competitions,
  ratings,
}: FormatPlayerSeasonStatsParams) => {
  let playerMatchesStats: PlayerMatchStats = {};

  // if there is no matches
  if (matches.length < 1) {
    return Object.values(playerMatchesStats);
  }

  // creating object containing all matches by their ids
  // { [matchId]: matchData }
  let matchesById: {
    [key: string]: PlayerSeasonDataQuery["matches"][0];
  } = {};
  matches.forEach((match) => (matchesById[match.id] = match));

  // creating object containing all clubs by their ids
  // { [clubId]: clubData }
  let clubsById: { [key: string]: PlayerSeasonDataQuery["clubs"][0] } = {};
  clubs.forEach((club) => (clubsById[club.id] = club));

  // creating object containing all competitions by their ids
  // { [compId]: compData }
  let competitionsById: {
    [key: string]: PlayerSeasonDataQuery["competitions"][0];
  } = {};
  competitions.forEach((comp) => (competitionsById[comp.id] = comp));

  // for each match initialize a detailed object with all the corresponding data
  matches.forEach((m) => {
    if (!playerMatchesStats[m.id]) {
      playerMatchesStats[m.id] = {
        ...matchesById[m.id],
        competition: {
          ...competitionsById[matchesById[m.id].competitionId],
        },
        opponent: { ...clubsById[matchesById[m.id].opponentId] },
        averageSum: 0,
        averageQuantity: 0,
      };
    }
  });

  // add up each ratings to their corresponding match
  ratings.forEach((r) => {
    if (playerMatchesStats[r.matchId]) {
      playerMatchesStats[r.matchId].averageSum += r.rating || 0;
      playerMatchesStats[r.matchId].averageQuantity += r.rating ? 1 : 0;
    } else {
      playerMatchesStats[r.matchId] = {
        ...matchesById[r.matchId],
        competition: {
          ...competitionsById[matchesById[r.matchId].competitionId],
        },
        opponent: { ...clubsById[matchesById[r.matchId].opponentId] },
        averageSum: r.rating || 0,
        averageQuantity: r.rating ? 1 : 0,
      };
    }
  });

  const formattedMatches: FormattedPlayerSeasonStats[] =
    Object.values(playerMatchesStats);

  return formattedMatches;
};
