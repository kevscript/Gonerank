import {
  useGetSeasonRatingsLazyQuery,
  useGetSeasonsQuery,
  useGetSeasonUserRatingsLazyQuery,
  useGlobalSeasonDataLazyQuery,
} from "graphql/generated/queryTypes";
import React, { useEffect, useState } from "react";
import {
  formatPlayersSeasonStats,
  FormattedPlayerSeasonStats,
} from "@/utils/formatPlayersSeasonStats";
import Draggable from "@/components/shared/Draggable";
import { useSession } from "next-auth/react";
import PlayersTable from "@/components/tables/PlayersTable";
import UserFilter from "@/components/shared/UserFilter";
import SeasonSelector from "@/components/shared/SeasonSelector";
import Spinner from "@/components/shared/Spinner";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Head from "next/head";

const PlayersPage = () => {
  const { data: session, status } = useSession();

  const [currentSeasonId, setCurrentSeasonId] = useState("");
  const [currentCompetitionId, setCurrentCompetitionId] = useState("all");

  const { data: seasonsData } = useGetSeasonsQuery();
  const [getGlobalSeasonData, { data: globalSeasonData }] =
    useGlobalSeasonDataLazyQuery();

  const [getSeasonRatings, { data: seasonRatings }] =
    useGetSeasonRatingsLazyQuery();
  const [getSeasonUserRatings, { data: seasonUserRatings }] =
    useGetSeasonUserRatingsLazyQuery();

  const [stats, setStats] = useState<FormattedPlayerSeasonStats[] | null>(null);
  const [userStats, setUserStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);

  const [mode, setMode] = useState<"user" | "all">("all");

  const toggleMode = (newMode: "all" | "user") => {
    if (newMode !== mode) setMode(newMode);
  };

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonId = e.target.value;
    if (selectedSeasonId !== currentSeasonId) {
      setCurrentSeasonId(selectedSeasonId);
      getGlobalSeasonData({
        variables: { seasonId: selectedSeasonId, archived: true },
      });
      getSeasonRatings({
        variables: { seasonId: selectedSeasonId, archived: true },
      });

      if (status === "authenticated" && session) {
        getSeasonUserRatings({
          variables: {
            seasonId: selectedSeasonId,
            userId: session.user.id!,
            archived: true,
          },
        });
      }
    }
  };

  const handleCompetitionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompetitionId = e.target.value;
    if (
      selectedCompetitionId !== currentCompetitionId &&
      globalSeasonData &&
      seasonRatings
    ) {
      const filteredMatchesByComp = globalSeasonData.matches.filter(
        (m) => m.competitionId === selectedCompetitionId
      );

      setCurrentCompetitionId(selectedCompetitionId);
      const formattedStats = formatPlayersSeasonStats({
        players: globalSeasonData.players || [],
        matches:
          selectedCompetitionId === "all"
            ? globalSeasonData.matches
            : filteredMatchesByComp,
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings:
          selectedCompetitionId === "all"
            ? seasonRatings.ratings
            : seasonRatings.ratings.filter((r) =>
                filteredMatchesByComp.some((m) => m.id === r.matchId)
              ),
      });
      formattedStats && setStats(formattedStats);

      if (status === "authenticated" && session && seasonUserRatings) {
        const formattedUserStats = formatPlayersSeasonStats({
          players: globalSeasonData.players || [],
          matches:
            selectedCompetitionId === "all"
              ? globalSeasonData.matches
              : filteredMatchesByComp,
          competitions: globalSeasonData.competitions || [],
          clubs: globalSeasonData.clubs || [],
          ratings:
            selectedCompetitionId === "all"
              ? seasonUserRatings.ratings
              : seasonUserRatings.ratings.filter((r) =>
                  filteredMatchesByComp.some((m) => m.id === r.matchId)
                ),
        });
        formattedUserStats && setUserStats(formattedUserStats);
      }
    }
  };

  useEffect(() => {
    if (seasonsData?.seasons) {
      const latestSeason = seasonsData.seasons.sort((a, b) =>
        new Date(a.startDate) < new Date(b.startDate) ? 1 : -1
      )[0];
      if (latestSeason) {
        setCurrentSeasonId(latestSeason.id);
        getGlobalSeasonData({
          variables: { seasonId: latestSeason.id, archived: true },
        });
        getSeasonRatings({
          variables: { seasonId: latestSeason.id, archived: true },
        });
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
          variables: {
            seasonId: latestSeason.id,
            userId: session.user.id!,
            archived: true,
          },
        });
      }
    }
  }, [seasonsData, getSeasonUserRatings, status, session]);

  useEffect(() => {
    if (globalSeasonData && seasonRatings) {
      const filteredMatches =
        currentCompetitionId === "all"
          ? globalSeasonData.matches
          : globalSeasonData.matches.filter(
              (m) => m.competitionId === currentCompetitionId
            );

      const formattedStats = formatPlayersSeasonStats({
        players: globalSeasonData.players || [],
        matches: filteredMatches || [],
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings:
          currentCompetitionId === "all"
            ? seasonRatings.ratings
            : seasonRatings.ratings.filter((r) =>
                filteredMatches.some((m) => m.id === r.matchId)
              ),
      });
      formattedStats && setStats(formattedStats);
    }
  }, [globalSeasonData, seasonRatings, currentCompetitionId]);

  useEffect(() => {
    if (globalSeasonData && seasonUserRatings) {
      const filteredMatches =
        currentCompetitionId === "all"
          ? globalSeasonData.matches
          : globalSeasonData.matches.filter(
              (m) => m.competitionId === currentCompetitionId
            );

      const formattedStats = formatPlayersSeasonStats({
        players: globalSeasonData.players || [],
        matches: filteredMatches || [],
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings:
          currentCompetitionId === "all"
            ? seasonUserRatings.ratings
            : seasonUserRatings.ratings.filter((r) =>
                filteredMatches.some((m) => m.id === r.matchId)
              ),
      });
      formattedStats && setUserStats(formattedStats);
    }
  }, [globalSeasonData, seasonUserRatings, currentCompetitionId]);

  useEffect(() => {}, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Head>
          <title>Gonerank - Joueurs</title>
          <meta
            name="description"
            content="Page avec les statistiques des joueurs"
          />
        </Head>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Gonerank - Joueurs</title>
        <meta
          name="description"
          content="Page avec les statistiques des joueurs"
        />
      </Head>
      <Breadcrumbs
        crumbs={[
          { label: "Accueil", path: "/" },
          { label: "Joueurs", path: "/players" },
        ]}
      />

      <div className="p-4 max-w-max md:py-0 md:px-4 lg:px-8 2xl:px-16">
        <div className="flex flex-row flex-wrap justify-between gap-2 mb-4 lg:gap-y-0">
          {status === "authenticated" && userStats && (
            <UserFilter toggleMode={toggleMode} mode={mode} />
          )}

          <div className="flex flex-row gap-x-2">
            {globalSeasonData && (
              <select
                className="h-10 px-2 text-sm border-2 border-gray-100 rounded outline-none cursor-pointer dark:border-dark-300 text-marine-600 dark:text-white dark:bg-dark-400"
                value={currentCompetitionId}
                onChange={handleCompetitionChange}
              >
                <option value="all" className="text-black dark:text-white">
                  Toutes compétitions
                </option>
                {globalSeasonData.competitions.map((comp) => (
                  <option
                    key={comp.id}
                    value={comp.id}
                    className="text-black dark:text-white"
                  >
                    {comp.name}
                  </option>
                ))}
              </select>
            )}

            {seasonsData && (
              <SeasonSelector
                currentSeasonId={currentSeasonId}
                handleChange={handleSeasonChange}
                seasons={seasonsData.seasons}
              />
            )}
          </div>
        </div>
        <div>
          <Draggable>
            <PlayersTable
              data={userStats && mode === "user" ? userStats : stats}
            />
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
