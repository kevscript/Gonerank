import {
  GetSeasonRatingsQuery,
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

type UseCommunityStatsArgs = {
  filteredMatches: GlobalSeasonDataQuery["matches"] | null;
  matches?: GlobalSeasonDataQuery["matches"];
  ratings?: GetSeasonRatingsQuery["ratings"];
  players?: GlobalSeasonDataQuery["players"];
  competitions?: GlobalSeasonDataQuery["competitions"];
  clubs?: GlobalSeasonDataQuery["clubs"];
};

export const useCommunityPlayersStats = ({
  filteredMatches,
  matches,
  ratings,
  players,
  competitions,
  clubs,
}: UseCommunityStatsArgs) => {
  const [communityStats, setCommunityStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);

  const [communityChartStats, setCommunityChartStats] = useState<
    FormattedPlayersChartData[] | null
  >(null);

  // format community stats
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
        setCommunityStats(formattedStats);
        const formattedPlayersChartData = formatPlayersChartData({
          stats: formattedStats,
          matches: matches,
        });
        setCommunityChartStats(formattedPlayersChartData);
      }
    }
  }, [clubs, competitions, filteredMatches, players, ratings, matches]);

  return {
    communityStats,
    communityChartStats,
  };
};
