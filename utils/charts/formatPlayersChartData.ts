import { GlobalSeasonDataQuery } from "graphql/generated/queryTypes";
import {
  FormattedPlayerSeasonStats,
  PlayerMatchStatsMatches,
} from "../formatPlayersSeasonStats";

export type FormatPlayersChartDataParams = {
  stats: FormattedPlayerSeasonStats[];
  matches: GlobalSeasonDataQuery["matches"];
};

export type FormattedPlayersChartData = {
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
  matches: Array<
    PlayerMatchStatsMatches & {
      avgProgress: number;
      tdcProgress: number;
    }
  >;
  numberOfMatchesPlayed: number;
};

export const formatPlayersChartData = ({
  stats,
  matches,
}: FormatPlayersChartDataParams) => {
  // sort all the matches
  const sortedMatches = [...matches].sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? -1 : 1
  );

  const players = stats.map((player) => {
    return {
      ...player,
      matches: Object.values(player.matches),
    };
  });

  const formatted: FormattedPlayersChartData[] = players
    .sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
    .map((player, i) => {
      // sort matches played by player
      const playerMatches = player.matches.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? -1 : 1
      );

      let currAvgProgress: number = 0;
      let currAvgProgressQuantity: number = 0;
      let currTdcProgress: number = 0;

      // loop all matches of the team
      const formattedMatches = sortedMatches.map((match, i) => {
        // check if player played this match
        const mIndex = playerMatches.findIndex((x) => x.id === match.id);

        let m: any = {};

        if (mIndex !== -1) {
          // if he played in the match increment global stats
          m = { ...playerMatches[mIndex] };
          if (m.averageQuantity) {
            currAvgProgress += m.averageSum / m.averageQuantity;
            currAvgProgressQuantity++;
            currTdcProgress += m.averageSum - 5 * m.averageQuantity;
          }
        } else {
          // if he didn't play this match set his stats for that match to undefined
          m.date = match.date;
          m.averageQuantity = undefined;
          m.averageSum = undefined;
        }

        return {
          ...m,
          avgProgress:
            mIndex !== -1
              ? currAvgProgress / currAvgProgressQuantity
              : undefined,
          tdcProgress: mIndex !== -1 ? currTdcProgress : undefined,
        };
      });

      return {
        ...player,
        matches: formattedMatches,
        numberOfMatchesPlayed: playerMatches.length,
      };
    });

  return formatted;
};
