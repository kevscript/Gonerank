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

type UseCommunityStatsArgs = {
  filteredMatches: PlayerSeasonDataQuery["matches"] | null;
  matches?: PlayerSeasonDataQuery["matches"];
  ratings?: PlayerSeasonRatingsQuery["ratings"];
  competitions?: PlayerSeasonDataQuery["competitions"];
  clubs?: PlayerSeasonDataQuery["clubs"];
};

export const useCommunityPlayerStats = ({
  filteredMatches,
  matches,
  ratings,
  competitions,
  clubs,
}: UseCommunityStatsArgs) => {
  const [communityStats, setCommunityStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);
  const [communityChartStats, setCommunityChartStats] = useState<
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
        setCommunityStats(formattedStats);
        const formattedChartStats = formatPlayerChartData({
          stats: formattedStats,
        });
        setCommunityChartStats(formattedChartStats);
      }
    }
  }, [clubs, competitions, filteredMatches, ratings, matches]);

  return {
    communityStats,
    communityChartStats,
  };
};
