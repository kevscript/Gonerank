import {
  GlobalSeasonDataQuery,
  PlayerSeasonDataQuery,
} from "@/graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type useFilteredMatchesArgs = {
  matches?: GlobalSeasonDataQuery["matches"];
  competitions?: GlobalSeasonDataQuery["competitions"];
};

export const useFilteredMatches = ({
  matches,
  competitions,
}: useFilteredMatchesArgs) => {
  const router = useRouter();

  const [filteredMatches, setFilteredMatches] = useState<
    GlobalSeasonDataQuery["matches"] | PlayerSeasonDataQuery["matches"] | null
  >(null);

  useEffect(() => {
    if (matches && competitions && router.isReady) {
      let newFilteredMatches = [...matches];

      // competition filter
      if (router.query.competition) {
        const compExists = competitions?.find(
          (c) => c.abbreviation === router.query.competition
        );
        if (compExists !== undefined) {
          newFilteredMatches = newFilteredMatches.filter(
            (m) => m.competitionId === compExists.id
          );
        }
      }

      // location filter
      if (router.query.location === "home") {
        newFilteredMatches = newFilteredMatches.filter((m) => m.home === true);
      }
      if (router.query.location === "away") {
        newFilteredMatches = newFilteredMatches.filter((m) => m.home === false);
      }

      setFilteredMatches(newFilteredMatches);
    }
  }, [competitions, matches, router]);

  return {
    filteredMatches,
  };
};
