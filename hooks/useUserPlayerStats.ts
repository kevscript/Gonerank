import {
  PlayerSeasonDataQuery,
  PlayerSeasonRatingsQuery,
} from "@/graphql/generated/queryTypes";
import {
  FormattedPlayerChartData,
  formatPlayerChartData,
} from "@/utils/charts/formatPlayerChartData";
import {
  FormattedPlayerSeasonStats,
  formatPlayerSeasonStats,
} from "@/utils/formatPlayerSeasonStats";
import { useEffect, useState } from "react";

type UseUserStatsArgs = {
  filteredMatches: PlayerSeasonDataQuery["matches"] | null;
  matches?: PlayerSeasonDataQuery["matches"];
  ratings?: PlayerSeasonRatingsQuery["ratings"] | null;
  competitions?: PlayerSeasonDataQuery["competitions"];
  clubs?: PlayerSeasonDataQuery["clubs"];
};

export const useUserPlayerStats = ({
  filteredMatches,
  matches,
  ratings,
  competitions,
  clubs,
}: UseUserStatsArgs) => {
  const [userStats, setUserStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);
  const [userChartStats, setUserChartStats] = useState<
    FormattedPlayerChartData[] | null
  >(null);

  // format community stats
  useEffect(() => {
    if (matches && filteredMatches && ratings) {
      const formattedStats = formatPlayerSeasonStats({
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings: ratings.filter((r) =>
          filteredMatches.some((m) => m.id === r.matchId)
        ),
      });

      if (formattedStats) {
        setUserStats(formattedStats);
        const formattedChartStats = formatPlayerChartData({
          stats: formattedStats,
        });
        setUserChartStats(formattedChartStats);
      }
    }
  }, [clubs, competitions, filteredMatches, ratings, matches]);

  return {
    userStats,
    userChartStats,
  };
};
