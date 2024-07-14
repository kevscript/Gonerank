import { FormattedPlayersChartData } from "@/utils/charts/formatPlayersChartData";
import { useEffect, useState } from "react";

export const usePlayersChart = ({
  stats,
}: {
  stats: FormattedPlayersChartData[] | null;
}) => {
  const [idsToShow, setIdsToShow] = useState<string[]>([]);

  const togglePlayerLine = (pId: string) => {
    let newIds = [...idsToShow];

    if (!newIds.includes(pId)) {
      newIds.length < 5 && newIds.push(pId);
    } else {
      if (newIds.length > 1) {
        newIds = newIds.filter((id) => id !== pId);
      }
    }

    setIdsToShow(newIds);
  };

  // init player IDS to show in chart
  useEffect(() => {
    if (stats?.length && idsToShow.length === 0) {
      const sortedPlayersByNumberOfMatches = stats.sort((a, b) =>
        a.numberOfMatchesPlayed > b.numberOfMatchesPlayed ? -1 : 1
      );
      const initIdsToShow = sortedPlayersByNumberOfMatches
        .slice(0, 3)
        .map((x) => x.id);
      setIdsToShow(initIdsToShow);
    }
  }, [stats, idsToShow]);

  return {
    idsToShow,
    togglePlayerLine,
  };
};
