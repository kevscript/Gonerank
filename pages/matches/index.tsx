import MatchesTable from "@/components/tables/MatchesTable";
import {
  formatMatchesSeasonStats,
  FormattedMatchStats,
} from "@/utils/formatMatchesSeasonStats";
import {
  useGetSeasonRatingsLazyQuery,
  useGetSeasonsQuery,
  useGetSeasonUserRatingsLazyQuery,
  useGlobalSeasonDataLazyQuery,
} from "graphql/generated/queryTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MatchesPage = () => {
  const { data: session, status } = useSession();

  const [currentSeasonId, setCurrentSeasonId] = useState<string | null>(null);
  const { data: seasonsData } = useGetSeasonsQuery();
  const [getGlobalSeasonData, { data: globalSeasonData }] =
    useGlobalSeasonDataLazyQuery();

  const [getSeasonRatings, { data: seasonRatings }] =
    useGetSeasonRatingsLazyQuery();
  const [getSeasonUserRatings, { data: seasonUserRatings }] =
    useGetSeasonUserRatingsLazyQuery();

  const [stats, setStats] = useState<FormattedMatchStats[] | null>(null);
  const [userStats, setUserStats] = useState<FormattedMatchStats[] | null>(
    null
  );

  const [mode, setMode] = useState<"user" | "all">("all");
  const toggleMode = () => {
    mode === "all" ? setMode("user") : setMode("all");
  };

  useEffect(() => {
    if (seasonsData?.seasons) {
      const latestSeason = seasonsData.seasons.sort((a, b) =>
        new Date(a.startDate) < new Date(b.startDate) ? 1 : -1
      )[0];

      if (latestSeason) {
        setCurrentSeasonId(latestSeason.id);
        getGlobalSeasonData({ variables: { seasonId: latestSeason.id } });
        getSeasonRatings({ variables: { seasonId: latestSeason.id } });
      }
    }
  }, [seasonsData, getGlobalSeasonData, getSeasonRatings]);

  useEffect(() => {
    if (seasonsData?.seasons && status === "authenticated" && session) {
      const latestSeason = seasonsData.seasons.sort((a, b) =>
        new Date(a.startDate) < new Date(b.startDate) ? 1 : -1
      )[0];
      if (latestSeason) {
        getSeasonUserRatings({
          variables: { seasonId: latestSeason.id, userId: session.user.id! },
        });
      }
    }
  }, [seasonsData, getSeasonUserRatings, status, session]);

  useEffect(() => {
    if (globalSeasonData && seasonRatings) {
      const formattedStats = formatMatchesSeasonStats({
        players: globalSeasonData.players || [],
        matches: globalSeasonData.matches || [],
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings: seasonRatings.ratings,
      });
      formattedStats && setStats(formattedStats);
    }
  }, [globalSeasonData, seasonRatings]);

  useEffect(() => {
    if (globalSeasonData && seasonUserRatings) {
      const formattedStats = formatMatchesSeasonStats({
        players: globalSeasonData.players || [],
        matches: globalSeasonData.matches || [],
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings: seasonUserRatings.ratings,
      });
      formattedStats && setUserStats(formattedStats);
    }
  }, [globalSeasonData, seasonUserRatings]);

  return (
    <div>
      Matches Page
      {status === "authenticated" && userStats && (
        <button onClick={() => toggleMode()}>Now : {mode}</button>
      )}
      {stats && (
        <MatchesTable data={userStats && mode === "user" ? userStats : stats} />
      )}
    </div>
  );
};

export default MatchesPage;
