import {
  GetSeasonRatingsQuery,
  GlobalSeasonDataQuery,
} from "graphql/generated/queryTypes";

export type PlayerMatchStatsMatches = GlobalSeasonDataQuery["matches"][0] & {
  averageSum: number;
  averageQuantity: number;
  motm: boolean;
  botm: boolean;
  competition: GlobalSeasonDataQuery["competitions"][0];
  opponent: GlobalSeasonDataQuery["clubs"][0];
};

export type PlayerMatchStats = {
  [key: string]: GlobalSeasonDataQuery["players"][0] & {
    matches: { [key: string]: PlayerMatchStatsMatches };
    globalAverage: number;
    awayAverage: number;
    homeAverage: number;
    globalMotm: number;
    globalBotm: number;
  };
};

export type FormattedPlayerSeasonStats = {
  __typename?: "Player" | undefined;
  id: string;
  lastName: string;
  country: string;
  firstName: string;
  countryCode: string;
  birthDate: any;
  image: string;
  active: boolean;
  globalAverage: number;
  awayAverage: number;
  homeAverage: number;
  globalMotm: number;
  globalBotm: number;
  matches: {
    [key: string]: PlayerMatchStatsMatches;
  };
};

export type FormatSeasonStatsParams = {
  players: GlobalSeasonDataQuery["players"];
  clubs: GlobalSeasonDataQuery["clubs"];
  competitions: GlobalSeasonDataQuery["competitions"];
  matches: GlobalSeasonDataQuery["matches"];
  ratings: GetSeasonRatingsQuery["ratings"];
};

export const formatPlayersSeasonStats = ({
  matches,
  players,
  clubs,
  competitions,
  ratings,
}: FormatSeasonStatsParams) => {
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

  /****************
   * ** */

  let playersMatchStats: PlayerMatchStats = {};

  // init playersMatchStats object with all players
  players.forEach((pl) => {
    if (!playersMatchStats[pl.id]) {
      playersMatchStats[pl.id] = {
        ...playersById[pl.id],
        matches: {},
        globalAverage: 0,
        awayAverage: 0,
        homeAverage: 0,
        globalBotm: 0,
        globalMotm: 0,
      };
    }
  });

  // compute averages
  ratings.forEach((r) => {
    // if player doesnt exist yet, create
    if (!playersMatchStats[r.playerId]) {
      playersMatchStats[r.playerId] = {
        ...playersById[r.playerId],
        matches: {},
        globalAverage: 0,
        awayAverage: 0,
        homeAverage: 0,
        globalBotm: 0,
        globalMotm: 0,
      };
    }

    // if match doesnt exist for player, create
    if (!playersMatchStats[r.playerId].matches[r.matchId]) {
      playersMatchStats[r.playerId].matches[r.matchId] = {
        ...matchesById[r.matchId],
        averageSum: r.rating || 0,
        averageQuantity: r.rating ? 1 : 0,
        motm: false,
        botm: false,
        competition: {
          ...competitionsById[matchesById[r.matchId].competitionId],
        },
        opponent: { ...clubsById[matchesById[r.matchId].opponentId] },
      };
    } else {
      playersMatchStats[r.playerId].matches[r.matchId].averageSum +=
        r.rating || 0;
      playersMatchStats[r.playerId].matches[r.matchId].averageQuantity +=
        r.rating ? 1 : 0;
    }
  });

  // compute prizes
  matches.forEach((match) => {
    let motmIds: string[] = [];
    let motmRating: number = 0;

    let botmIds: string[] = [];
    let botmRating: number = 11;

    players.forEach((player) => {
      const existingMatch = playersMatchStats[player.id]?.matches[match.id];
      if (existingMatch) {
        const playerRating =
          existingMatch.averageSum / existingMatch.averageQuantity;

        if (playerRating === motmRating) {
          motmIds.push(player.id);
        }

        if (playerRating === botmRating) {
          botmIds.push(player.id);
        }

        if (playerRating > motmRating) {
          motmIds = [player.id];
          motmRating = playerRating;
        }

        if (playerRating < botmRating) {
          botmIds = [player.id];
          botmRating = playerRating;
        }
      }
    });

    motmRating > 5 &&
      motmIds.forEach((pId) => {
        playersMatchStats[pId].matches[match.id].motm = true;
        playersMatchStats[pId].globalMotm++;
      });

    botmRating < 5 &&
      botmIds.forEach((pId) => {
        playersMatchStats[pId].matches[match.id].botm = true;
        playersMatchStats[pId].globalBotm++;
      });
  });

  // compute global averages
  players.forEach((player) => {
    let globalAvgSum = 0;
    let globalAvgQuantity = 0;
    let homeAvgSum = 0;
    let homeAvgQuantity = 0;
    let awayAvgSum = 0;
    let awayAvgQuantity = 0;

    const playerMatches = playersMatchStats[player.id]?.matches;

    for (const mId in playerMatches) {
      const home = playerMatches[mId].home;
      const avg =
        playerMatches[mId].averageSum / playerMatches[mId].averageQuantity;

      if (avg) {
        if (home) {
          homeAvgSum += avg;
          homeAvgQuantity++;
        } else {
          awayAvgSum += avg;
          awayAvgQuantity++;
        }

        globalAvgSum += avg;
        globalAvgQuantity++;
      }
    }

    if (globalAvgSum) {
      playersMatchStats[player.id].globalAverage =
        globalAvgSum / globalAvgQuantity;
      playersMatchStats[player.id].homeAverage =
        homeAvgSum / homeAvgQuantity || 0;
      playersMatchStats[player.id].awayAverage =
        awayAvgSum / awayAvgQuantity || 0;
    }
  });

  const formattedStats = Object.values(playersMatchStats);
  return formattedStats;
};
