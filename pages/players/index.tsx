import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Draggable from "@/components/shared/Draggable";
import PlayersTable from "@/components/tables/PlayersTable";
import Spinner from "@/components/shared/Spinner";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import OptionsFilter from "@/components/filters/OptionsFilter";
import { VisualFilterOptions } from "@/components/filters/VisualFilter";
import { WhoFilterOptions } from "@/components/filters/WhoFilter";
import ChartPlayersList from "@/components/charts/ChartPlayersList";
import { LocationFilterOptions } from "@/components/filters/LocationFilter";
import VisxPlayersAvgLinearChart from "@/components/charts/VisxPlayersAvgLinearChart";
import VisxPlayersTdcLinearChart from "@/components/charts/VisxPlayersTdcLinearChart";
import VisxPlayersAvgProgressChart from "@/components/charts/VisxPlayersAvgProgressChart";
import VisxPlayersTdcProgressChart from "@/components/charts/VisxPlayersTdcProgressChart";
import VisxChartContainer from "@/components/charts/VisxChartContainer";
import { ParentSize } from "@visx/responsive";
import {
  GetSeasonsQuery,
  GlobalSeasonDataQuery,
  useGetSeasonRatingsLazyQuery,
  useGetSeasonsQuery,
  useGetSeasonUserRatingsLazyQuery,
  useGlobalSeasonDataLazyQuery,
} from "graphql/generated/queryTypes";
import {
  formatPlayersSeasonStats,
  FormattedPlayerSeasonStats,
} from "@/utils/formatPlayersSeasonStats";
import {
  formatPlayersChartData,
  FormattedPlayersChartData,
} from "@/utils/charts/formatPlayersChartData";
import { useRouter } from "next/router";

const PlayersPage = () => {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  const { data: { seasons } = {} } = useGetSeasonsQuery();

  const [currentSeason, setCurrentSeason] = useState<
    GetSeasonsQuery["seasons"][0] | null
  >(null);

  const [
    getGlobalSeasonData,
    {
      data: { clubs, competitions, matches, players } = {
        clubs: undefined,
        competitions: undefined,
        matches: undefined,
        players: undefined,
      },
    },
  ] = useGlobalSeasonDataLazyQuery();

  const [
    getSeasonRatings,
    { data: { ratings: seasonRatings } = { ratings: undefined } },
  ] = useGetSeasonRatingsLazyQuery();
  const [
    getSeasonUserRatings,
    { data: { ratings: seasonUserRatings } = { ratings: undefined } },
  ] = useGetSeasonUserRatingsLazyQuery();

  const [filteredMatches, setFilteredMatches] = useState<
    GlobalSeasonDataQuery["matches"] | null
  >(null);

  const [communityStats, setCommunityStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);
  const [userStats, setUserStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);
  const [communityChartStats, setCommunityChartStats] = useState<
    FormattedPlayersChartData[] | null
  >(null);
  const [userChartStats, setUserChartStats] = useState<
    FormattedPlayersChartData[] | null
  >(null);

  const [idsToShow, setIdsToShow] = useState<string[]>([]);

  const togglePlayerLine = (pId: string) => {
    let newIds = [...idsToShow];

    if (!newIds.includes(pId)) {
      newIds.push(pId);
    } else {
      if (newIds.length > 1) {
        newIds = newIds.filter((id) => id !== pId);
      }
    }

    setIdsToShow(newIds);
  };

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonId = e.target.value;
    const newSeason = seasons?.find((s) => s.id === selectedSeasonId);
    newSeason && setCurrentSeason(newSeason);
  };

  const handleCompetitionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompetitionId = e.target.value;
    if (selectedCompetitionId === "all") {
      const queries = { ...router.query };
      delete queries.competition;
      router.replace({ query: { ...queries } }, undefined, { shallow: true });
    } else {
      const compExists = competitions?.find(
        (c) => c.id === selectedCompetitionId
      );
      if (compExists && compExists.abbreviation !== router.query.competition) {
        router.replace(
          { query: { ...router.query, competition: compExists.abbreviation } },
          undefined,
          { shallow: true }
        );
      }
    }
  };

  const toggleWho = (newWho: WhoFilterOptions) => {
    if (status === "authenticated") {
      if (newWho === "user") {
        router.replace({ query: { ...router.query, for: "user" } }, undefined, {
          shallow: true,
        });
      }
      if (newWho === "community") {
        const queries = { ...router.query };
        delete queries.for;
        router.replace({ query: { ...queries } }, undefined, { shallow: true });
      }
    } else {
      const queries = { ...router.query };
      delete queries.for;
      router.replace({ query: { ...queries } }, undefined, { shallow: true });
    }
  };

  const toggleVisual = (newVisual: VisualFilterOptions) => {
    if (newVisual === "chart" && newVisual !== router.query.shape) {
      router.replace(
        { query: { ...router.query, shape: "chart" } },
        undefined,
        { shallow: true }
      );
    }
    if (newVisual === "table" && router.query.shape) {
      const queries = { ...router.query };
      delete queries.shape;
      router.replace({ query: { ...queries } }, undefined, { shallow: true });
    }
  };

  const toggleLocation = (newLocation: LocationFilterOptions) => {
    if (newLocation === router.query.location) {
      const queries = { ...router.query };
      delete queries.location;
      router.replace({ query: { ...queries } }, undefined, { shallow: true });
    } else {
      router.replace(
        { query: { ...router.query, location: newLocation } },
        undefined,
        { shallow: true }
      );
    }
  };

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

      // router.push({ query: { season: selectedSeasonYear } }, undefined, {
      //   shallow: true,
      // });

      setCurrentSeason(selectedSeason);
    }
  }, [seasons, router, currentSeason]);

  // fetching season data whenever season changes
  useEffect(() => {
    if (currentSeason) {
      getGlobalSeasonData({
        variables: { seasonId: currentSeason.id, archived: true },
      });
      getSeasonRatings({
        variables: { seasonId: currentSeason.id, archived: true },
      });

      if (status === "authenticated" && session) {
        getSeasonUserRatings({
          variables: {
            seasonId: currentSeason.id,
            userId: session.user.id!,
            archived: true,
          },
        });
      }
    }
  }, [
    currentSeason,
    getGlobalSeasonData,
    getSeasonRatings,
    getSeasonUserRatings,
    session,
    status,
  ]);

  useEffect(() => {
    if (matches && router.isReady) {
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
  }, [competitions, matches, router, seasonUserRatings, status]);

  // format community stats
  useEffect(() => {
    if (matches && filteredMatches && seasonRatings) {
      const formattedStats = formatPlayersSeasonStats({
        players: players || [],
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings: seasonRatings.filter((r) =>
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
  }, [clubs, competitions, filteredMatches, matches, players, seasonRatings]);

  // format user stats
  useEffect(() => {
    if (matches && filteredMatches && seasonUserRatings) {
      const formattedStats = formatPlayersSeasonStats({
        players: players || [],
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings: seasonUserRatings.filter((r) =>
          filteredMatches.some((m) => m.id === r.matchId)
        ),
      });

      if (formattedStats) {
        setUserStats(formattedStats);
        const formattedPlayersChartData = formatPlayersChartData({
          stats: formattedStats,
          matches: matches,
        });
        setUserChartStats(formattedPlayersChartData);
      }
    }
  }, [
    clubs,
    competitions,
    filteredMatches,
    matches,
    players,
    seasonUserRatings,
  ]);

  // init player IDS to show in chart
  useEffect(() => {
    if (communityChartStats?.length && idsToShow.length === 0) {
      const sortedPlayersByNumberOfMatches = communityChartStats.sort((a, b) =>
        a.numberOfMatchesPlayed > b.numberOfMatchesPlayed ? -1 : 1
      );
      const initIdsToShow = sortedPlayersByNumberOfMatches
        .slice(0, 5)
        .map((x) => x.id);
      setIdsToShow(initIdsToShow);
    }
  }, [communityChartStats, idsToShow]);

  if (!communityStats) {
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
    <div className="flex flex-col h-screen responsive-px">
      <Head>
        <title>Gonerank - Joueurs</title>
        <meta
          name="description"
          content="Page avec les statistiques des joueurs"
        />
      </Head>

      <div className="hidden w-full my-8 md:flex">
        <Breadcrumbs
          crumbs={[
            { label: "Accueil", path: "/" },
            { label: "Joueurs", path: "/players" },
          ]}
        />
      </div>

      <div className="my-8 md:my-0">
        <OptionsFilter
          isAuth={status === "authenticated" && userStats ? true : false}
          who={router.query.for === "user" ? "user" : "community"}
          toggleWho={toggleWho}
          visual={router.query.shape === "chart" ? "chart" : "table"}
          toggleVisual={toggleVisual}
          location={
            router.query.location === "home"
              ? "home"
              : router.query.location === "away"
              ? "away"
              : "all"
          }
          toggleLocation={toggleLocation}
          competitions={competitions}
          seasons={seasons}
          currentCompetitionId={
            competitions?.find(
              (c) => router.query.competition === c.abbreviation
            )?.id || "all"
          }
          currentSeasonId={currentSeason?.id}
          handleCompetitionChange={handleCompetitionChange}
          handleSeasonChange={handleSeasonChange}
        />
      </div>

      {router.query.shape === "chart" && communityChartStats?.length ? (
        <div className="flex py-8 overflow-hidden scroll-hide gap-x-8">
          <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll gap-y-8">
            <VisxChartContainer title="Moyenne des joueurs pour chaque match de la saison.">
              <ParentSize debounceTime={10}>
                {(parent) => (
                  <VisxPlayersAvgLinearChart
                    players={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    idsToShow={idsToShow}
                    theme={theme || "dark"}
                    dimensions={{
                      width: parent.width,
                      height: parent.width * (9 / 16),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>
            <VisxChartContainer title="Evolution de la moyenne générale des joueurs sur la saison.">
              <ParentSize>
                {(parent) => (
                  <VisxPlayersAvgProgressChart
                    players={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    idsToShow={idsToShow}
                    theme={theme || "dark"}
                    dimensions={{
                      width: parent.width,
                      height: parent.width * (9 / 16),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>
            <VisxChartContainer title="Tendance des joueurs pour chaque match de la saison.">
              <ParentSize>
                {(parent) => (
                  <VisxPlayersTdcLinearChart
                    players={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    idsToShow={idsToShow}
                    theme={theme || "dark"}
                    dimensions={{
                      width: parent.width,
                      height: parent.width * (9 / 16),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>
            <VisxChartContainer title="Evolution de la tendance générale des joueurs sur la saison.">
              <ParentSize>
                {(parent) => (
                  <VisxPlayersTdcProgressChart
                    players={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    idsToShow={idsToShow}
                    theme={theme || "dark"}
                    dimensions={{
                      width: parent.width,
                      height: parent.width * (9 / 16),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>
          </div>

          <ChartPlayersList
            players={
              userChartStats && router.query.for === "user"
                ? userChartStats
                : communityChartStats
            }
            idsToShow={idsToShow}
            togglePlayerLine={togglePlayerLine}
            theme={theme}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full md:py-8">
          <Draggable>
            <PlayersTable
              data={
                userStats && router.query.for === "user"
                  ? userStats
                  : communityStats
              }
            />
          </Draggable>

          {communityStats.length === 0 && (
            <div className="flex items-center justify-center mt-4">
              <div className="flex flex-col items-center justify-center w-full p-4 text-center border rounded bg-marine-100 border-marine-200 text-marine-400 md:p-8 dark:bg-marine-900/10 dark:border-marine-400">
                <p>Aucune statistique ne correspond à ces critères.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayersPage;
