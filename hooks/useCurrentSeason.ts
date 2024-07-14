import {
  GetSeasonsQuery,
  useGetSeasonsQuery,
} from "@/graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useCurrentSeason = ({
  seasons,
}: {
  seasons?: GetSeasonsQuery["seasons"];
}) => {
  const router = useRouter();

  const [currentSeason, setCurrentSeason] = useState<
    GetSeasonsQuery["seasons"][0] | null
  >(null);

  // intializing selected season
  useEffect(() => {
    if (seasons && !currentSeason) {
      let selectedSeason = null;

      if (router.query.season) {
        const querySeasonYear = parseFloat(router.query.season as string);
        const queriedSeason = seasons.find(
          (s) => new Date(s.startDate).getFullYear() === querySeasonYear
        );
        if (queriedSeason) {
          selectedSeason = queriedSeason;
        }
      }

      if (!selectedSeason) {
        const latestSeason = [...seasons].sort((a, b) =>
          new Date(a.startDate) < new Date(b.startDate) ? 1 : -1
        )[0];

        selectedSeason = latestSeason;
      }

      // const selectedSeasonYear = new Date(
      //   selectedSeason.startDate
      // ).getFullYear();
      // router.replace({ query: { season: selectedSeasonYear } }, undefined, {
      //   shallow: true,
      // });

      setCurrentSeason(selectedSeason);
    }
  }, [seasons, router, currentSeason]);

  return {
    currentSeason,
    setCurrentSeason,
  };
};
