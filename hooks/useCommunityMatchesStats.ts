import { useEffect, useState } from "react";
import {
  GetSeasonRatingsQuery,
  GlobalSeasonDataQuery,
} from "@/graphql/generated/queryTypes";
import {
  FormattedMatchesChartData,
  formatMatchesChartData,
} from "@/utils/charts/formatMatchesChartData";
import {
  FormattedMatchStats,
  formatMatchesSeasonStats,
} from "@/utils/formatMatchesSeasonStats";

type UseCommunityStatsArgs = {
  filteredMatches: GlobalSeasonDataQuery["matches"] | null;
  matches?: GlobalSeasonDataQuery["matches"];
  ratings?: GetSeasonRatingsQuery["ratings"];
  players?: GlobalSeasonDataQuery["players"];
  competitions?: GlobalSeasonDataQuery["competitions"];
  clubs?: GlobalSeasonDataQuery["clubs"];
};

export const useCommunityMatchesStats = ({
  filteredMatches,
  matches,
  ratings,
  players,
  competitions,
  clubs,
}: UseCommunityStatsArgs) => {
  const [communityStats, setCommunityStats] = useState<
    FormattedMatchStats[] | null
  >(null);

  const [communityChartStats, setCommunityChartStats] = useState<
    FormattedMatchesChartData[] | null
  >(null);

  // format community stats
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
        setCommunityStats(formattedStats);
        setCommunityChartStats(formatMatchesChartData(formattedStats));
      }
    }
  }, [clubs, competitions, filteredMatches, players, ratings, matches]);

  return {
    communityStats,
    communityChartStats,
  };
};
