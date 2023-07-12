import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import OptionsFilter from "@/components/filters/OptionsFilter";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import MatchesTable from "@/components/tables/MatchesTable";
import { VisualFilterOptions } from "@/components/filters/VisualFilter";
import { WhoFilterOptions } from "@/components/filters/WhoFilter";
import { LocationFilterOptions } from "@/components/filters/LocationFilter";
import {
  GetSeasonsQuery,
  GlobalSeasonDataQuery,
  useGetSeasonRatingsLazyQuery,
  useGetSeasonsQuery,
  useGetSeasonUserRatingsLazyQuery,
  useGlobalSeasonDataLazyQuery,
} from "graphql/generated/queryTypes";
import {
  formatMatchesSeasonStats,
  FormattedMatchStats,
} from "@/utils/formatMatchesSeasonStats";
import {
  formatMatchesChartData,
  FormattedMatchesChartData,
} from "@/utils/charts/formatMatchesChartData";
import { ParentSize } from "@visx/responsive";
import VisxChartContainer from "@/components/charts/VisxChartContainer";
import VisxMatchesAvgLinearChart from "@/components/charts/VisxMatchesAvgLinearChart";
import VisxMatchesTdcLinearChart from "@/components/charts/VisxMatchesTdcLinearChart";
import VisxMatchesAvgProgressChart from "@/components/charts/VisxMatchesAvgProgressChart";
import VisxMatchesTdcProgressChart from "@/components/charts/VisxMatchesTdcProgressChart";

const MatchesPage = () => {
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
    FormattedMatchStats[] | null
  >(null);
  const [userStats, setUserStats] = useState<FormattedMatchStats[] | null>(
    null
  );

  const [communityChartStats, setCommunityChartStats] = useState<
    FormattedMatchesChartData[] | null
  >(null);
  const [userChartStats, setUserChartStats] = useState<
    FormattedMatchesChartData[] | null
  >(null);

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
      const formattedStats = formatMatchesSeasonStats({
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
        setCommunityChartStats(formatMatchesChartData(formattedStats));
      }
    }
  }, [clubs, competitions, filteredMatches, matches, players, seasonRatings]);

  // format user stats
  useEffect(() => {
    if (matches && filteredMatches && seasonUserRatings) {
      const formattedStats = formatMatchesSeasonStats({
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
        setUserChartStats(formatMatchesChartData(formattedStats));
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

  if (!communityStats) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Head>
          <title>Gonerank - Matchs</title>
          <meta
            name="description"
            content="Page avec les statistiques des matchs"
          />
        </Head>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen responsive-px">
      <Head>
        <title>Gonerank - Matchs</title>
        <meta
          name="description"
          content="Page avec les statistiques des matchs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hidden w-full my-8 md:flex">
        <Breadcrumbs
          crumbs={[
            { label: "Accueil", path: "/" },
            { label: "Matchs", path: "/matches" },
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
        <div className="flex-1 w-full pb-8 mt-8 overflow-scroll scroll-hide">
          <div className="flex flex-col w-full grid-cols-2 gap-4 lg:grid">
            <VisxChartContainer title="Moyenne de chaque match de la saison">
              <ParentSize debounceTime={10}>
                {(parent) => (
                  <VisxMatchesAvgLinearChart
                    matches={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    theme={theme || "dark"}
                    dimensions={{
                      width: parent.width,
                      height: parent.width * (9 / 16),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>

            <VisxChartContainer title="Tendance de chaque match de la saison">
              <ParentSize debounceTime={10}>
                {(parent) => (
                  <VisxMatchesTdcLinearChart
                    matches={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    theme={theme || "dark"}
                    dimensions={{
                      width: parent.width,
                      height: parent.width * (9 / 16),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>

            <VisxChartContainer title="Evolution des moyennes de match sur la saison">
              <ParentSize debounceTime={10}>
                {(parent) => (
                  <VisxMatchesAvgProgressChart
                    matches={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    theme={theme || "dark"}
                    dimensions={{
                      width: parent.width,
                      height: parent.width * (9 / 16),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>

            <VisxChartContainer title="Evolution de la tendance de match sur la saison">
              <ParentSize debounceTime={10}>
                {(parent) => (
                  <VisxMatchesTdcProgressChart
                    matches={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
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
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full md:py-8">
          <Draggable>
            <MatchesTable
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

export default MatchesPage;
