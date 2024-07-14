import {
  GetSeasonUserRatingsQuery,
  GlobalSeasonDataQuery,
} from "@/graphql/generated/queryTypes";
import {
  FormattedPlayersChartData,
  formatPlayersChartData,
} from "@/utils/charts/formatPlayersChartData";
import {
  FormattedPlayerSeasonStats,
  formatPlayersSeasonStats,
} from "@/utils/formatPlayersSeasonStats";
import { useEffect, useState } from "react";

type UseUserStatsArgs = {
  filteredMatches: GlobalSeasonDataQuery["matches"] | null;
  matches?: GlobalSeasonDataQuery["matches"];
  ratings?: GetSeasonUserRatingsQuery["ratings"];
  players?: GlobalSeasonDataQuery["players"];
  competitions?: GlobalSeasonDataQuery["competitions"];
  clubs?: GlobalSeasonDataQuery["clubs"];
};

export const useUserPlayersStats = ({
  filteredMatches,
  matches,
  ratings,
  players,
  competitions,
  clubs,
}: UseUserStatsArgs) => {
  const [userStats, setUserStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);
  const [userChartStats, setUserChartStats] = useState<
    FormattedPlayersChartData[] | null
  >(null);

  // format user stats
  useEffect(() => {
    if (matches && filteredMatches && ratings) {
      const formattedStats = formatPlayersSeasonStats({
        players: players || [],
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings: ratings.filter((r) =>
          filteredMatches.some((m) => m.id === r.matchId)
        ),
      });

      if (formattedStats) {
        setUserStats(formattedStats);
        const formattedPlayersChartData = formatPlayersChartData({
          stats: formattedStats,
          matches: matches,
        });
        setUserChartStats(formattedPlayersChartData);
      }
    }
  }, [clubs, competitions, filteredMatches, matches, players, ratings]);

  return {
    userStats,
    userChartStats,
  };
};
