import {
  GetSeasonUserRatingsQuery,
  GlobalSeasonDataQuery,
} from "@/graphql/generated/queryTypes";
import {
  FormattedMatchesChartData,
  formatMatchesChartData,
} from "@/utils/charts/formatMatchesChartData";
import {
  FormattedPlayersChartData,
  formatPlayersChartData,
} from "@/utils/charts/formatPlayersChartData";
import { formatMatchStats } from "@/utils/formatMatchStats";
import {
  FormattedMatchStats,
  formatMatchesSeasonStats,
} from "@/utils/formatMatchesSeasonStats";
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

export const useUserMatchesStats = ({
  filteredMatches,
  matches,
  ratings,
  players,
  competitions,
  clubs,
}: UseUserStatsArgs) => {
  const [userStats, setUserStats] = useState<FormattedMatchStats[] | null>(
    null
  );
  const [userChartStats, setUserChartStats] = useState<
    FormattedMatchesChartData[] | null
  >(null);

  // format user stats
  useEffect(() => {
    if (matches && filteredMatches && ratings) {
      const formattedStats = formatMatchesSeasonStats({
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
        setUserChartStats(formatMatchesChartData(formattedStats));
      }
    }
  }, [clubs, competitions, filteredMatches, matches, players, ratings]);

  return {
    userStats,
    userChartStats,
  };
};
