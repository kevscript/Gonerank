import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Draggable from "@/components/shared/Draggable";
import PlayerTable from "@/components/tables/PlayerTable";
import {
  GetSeasonsQuery,
  PlayerSeasonDataQuery,
  PlayerSeasonRatingsQuery,
  useGetSeasonsQuery,
  usePlayerSeasonDataLazyQuery,
  usePlayerSeasonRatingsLazyQuery,
} from "graphql/generated/queryTypes";
import Spinner from "@/components/shared/Spinner";
import { getAgeFromDate } from "@/utils/getAgeFromDate";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { WhoFilterOptions } from "@/components/filters/WhoFilter";
import OptionsFilter from "@/components/filters/OptionsFilter";
import { VisualFilterOptions } from "@/components/filters/VisualFilter";
import { LocationFilterOptions } from "@/components/filters/LocationFilter";
import {
  formatPlayerSeasonStats,
  FormattedPlayerSeasonStats,
} from "@/utils/formatPlayerSeasonStats";
import {
  formatPlayerChartData,
  FormattedPlayerChartData,
} from "@/utils/charts/formatPlayerChartData";
import { ParentSize } from "@visx/responsive";
import VisxChartContainer from "@/components/charts/VisxChartContainer";
import VisxPlayerAvgLinearChart from "@/components/charts/VisxPlayerAvgLinearChart";
import VisxPlayerAvgProgressChart from "@/components/charts/VisxPlayerAvgProgressChart";
import VisxPlayerTdcProgressChart from "@/components/charts/VisxPlayerTdcProgressChart";
import VisxPlayerTdcLinearChart from "@/components/charts/VisxPlayerTdcLinearChart";

const PlayerPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { playerId } = router.query;

  const { theme } = useTheme();

  const { data: { seasons } = {} } = useGetSeasonsQuery();

  const [currentSeason, setCurrentSeason] = useState<
    GetSeasonsQuery["seasons"][0] | null
  >(null);

  const [seasonsPlayed, setSeasonsPlayed] = useState<
    GetSeasonsQuery["seasons"] | null
  >(null);

  const [
    getPlayerSeasonData,
    {
      data: { clubs, competitions, matches, player } = {
        clubs: undefined,
        competitions: undefined,
        matches: undefined,
        player: undefined,
      },
    },
  ] = usePlayerSeasonDataLazyQuery();

  const [
    getPlayerSeasonRatings,
    { data: { ratings: playerSeasonRatings } = { ratings: undefined } },
  ] = usePlayerSeasonRatingsLazyQuery();

  const [playerSeasonUserRatings, setPlayerSeasonUserRatings] = useState<
    null | PlayerSeasonRatingsQuery["ratings"]
  >(null);

  const [filteredMatches, setFilteredMatches] = useState<
    PlayerSeasonDataQuery["matches"] | null
  >(null);

  const [communityStats, setCommunityStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);
  const [userStats, setUserStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);
  const [communityChartStats, setCommunityChartStats] = useState<
    FormattedPlayerChartData[] | null
  >(null);
  const [userChartStats, setUserChartStats] = useState<
    FormattedPlayerChartData[] | null
  >(null);

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

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonId = e.target.value;
    const newSeason = seasons?.find((s) => s.id === selectedSeasonId);
    newSeason &&
      newSeason.id !== currentSeason?.id &&
      setCurrentSeason(newSeason);
  };

  // const [currentCompetitionId, setCurrentCompetitionId] = useState("all");
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

  // setting the initial season data
  useEffect(() => {
    if (seasons && !currentSeason) {
      const playedSeasons = seasons.filter((s) =>
        s.players.some((p) => p.playerId === (playerId as string))
      );

      if (playedSeasons.length > 0) {
        let selectedSeason = null;

        if (router.query.season) {
          const querySeasonYear = parseFloat(router.query.season as string);
          const queriedSeason = playedSeasons.find(
            (s) => new Date(s.startDate).getFullYear() === querySeasonYear
          );
          if (queriedSeason) {
            selectedSeason = queriedSeason;
          }
        }

        if (!selectedSeason) {
          const latestSeason = playedSeasons.sort((a, b) =>
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

        setSeasonsPlayed(playedSeasons);
        setCurrentSeason(selectedSeason);
      }
    }
  }, [currentSeason, playerId, router, seasons]);

  // fetching data whenever season changes
  useEffect(() => {
    if (currentSeason && playerId) {
      getPlayerSeasonData({
        variables: {
          playerId: playerId as string,
          seasonId: currentSeason.id,
          archived: true,
        },
      });
      getPlayerSeasonRatings({
        variables: {
          playerId: playerId as string,
          seasonId: currentSeason.id,
          archived: true,
        },
      });
    }
  }, [playerId, currentSeason, getPlayerSeasonData, getPlayerSeasonRatings]);

  // if there is an autenticated user, filter his ratings
  useEffect(() => {
    if (playerSeasonRatings && status === "authenticated") {
      const currentUserRatings = playerSeasonRatings.filter(
        (r) => r.userId === session.user.id
      );
      setPlayerSeasonUserRatings(currentUserRatings);
    }
  }, [playerSeasonRatings, session, status]);

  // filter matches
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

      // for filter
      // if (router.query.for === "user" && status === "authenticated") {
      //   newFilteredMatches = newFilteredMatches.filter((m) =>
      //     playerSeasonUserRatings?.some((r) => r.matchId === m.id)
      //   );
      // }

      setFilteredMatches(newFilteredMatches);
    }
  }, [competitions, matches, playerSeasonUserRatings, router, session, status]);

  // format community stats
  useEffect(() => {
    if (matches && filteredMatches && playerSeasonRatings) {
      const formattedStats = formatPlayerSeasonStats({
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings: playerSeasonRatings.filter((r) =>
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
  }, [clubs, competitions, filteredMatches, matches, playerSeasonRatings]);

  // format user stats
  useEffect(() => {
    if (
      matches &&
      filteredMatches &&
      playerSeasonUserRatings &&
      router.query.for === "user"
    ) {
      const formattedStats = formatPlayerSeasonStats({
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings: playerSeasonUserRatings.filter((r) =>
          filteredMatches.some((m) => m.id === r.matchId)
        ),
      });

      if (formattedStats) {
        setUserStats(formattedStats);
        const formattedChartStats = formatPlayerChartData({
          stats: formattedStats,
        });
        setUserChartStats(formattedChartStats);
      }
    }
  }, [
    clubs,
    competitions,
    filteredMatches,
    matches,
    playerSeasonUserRatings,
    router,
  ]);

  if (!communityStats) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Head>
          <title>
            Gonerank -{" "}
            {player ? player.firstName + " " + player.lastName : "Joueur"}
          </title>
          <meta
            name="description"
            content="Page avec les statistiques pour un joueur"
          />
        </Head>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen responsive-px">
      <Head>
        <title>
          Gonerank -{" "}
          {player ? player.firstName + " " + player.lastName : "Joueur"}
        </title>
        <meta
          name="description"
          content={`Page des statistiques pour ${
            player ? player.firstName + " " + player.lastName : "un joueur"
          }`}
        />
      </Head>
      <div className="hidden w-full my-8 md:flex">
        <Breadcrumbs
          crumbs={[
            { label: "Accueil", path: "/" },
            { label: "Joueurs", path: "/players" },
            {
              label: player ? `${player.firstName} ${player.lastName}` : "",
              path: `/players/${playerId}`,
            },
          ]}
        />
      </div>

      {player && (
        <div className="flex justify-center w-full my-8 md:py-8 md:my-0">
          <div className="flex flex-row items-center w-full px-4 py-4 overflow-hidden bg-white rounded dark:bg-dark-500 lg:px-8 flex-nowrap drop-shadow-sm">
            <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full shadow-inner dark:bg-dark-300 lg:h-16 lg:w-16 shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${player.image}`}
                alt="player avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col flex-1 ml-4">
              <h3 className="overflow-hidden truncate lg:text-xl whitespace-nowrap">{`${player.firstName} ${player.lastName}`}</h3>
              <div className="flex items-center">
                <span className="mr-2 text-sm whitespace-nowrap">
                  {getAgeFromDate(player.birthDate)} ans
                </span>
                <Image
                  className="drop-shadow-sm"
                  src={`https://countryflagsapi.com/png/${player.countryCode}`}
                  height={12}
                  width={18}
                  alt={player.country}
                  title={player.country}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <OptionsFilter
        isAuth={status === "authenticated" ? true : false}
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
          competitions?.find((c) => router.query.competition === c.abbreviation)
            ?.id || "all"
        }
        currentSeasonId={currentSeason?.id}
        handleCompetitionChange={handleCompetitionChange}
        handleSeasonChange={handleSeasonChange}
      />

      {router.query.shape === "chart" && communityChartStats ? (
        <div className="flex-1 w-full pb-8 mt-8 overflow-scroll scroll-hide">
          <div className="flex flex-col w-full grid-cols-2 gap-4 lg:grid">
            <VisxChartContainer
              title={`Moyenne pour chaque match du joueur sur la saison.`}
            >
              <ParentSize debounceTime={10}>
                {(parent) => (
                  <VisxPlayerAvgLinearChart
                    theme={theme || "dark"}
                    matches={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    dimensions={{
                      width: parent.width,
                      height: Math.min(parent.width * (9 / 16), 400),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>

            <VisxChartContainer
              title={`Evolution de la moyenne générale du joueur sur la saison.`}
            >
              <ParentSize debounceTime={10}>
                {(parent) => (
                  <VisxPlayerAvgProgressChart
                    theme={theme || "dark"}
                    matches={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    dimensions={{
                      width: parent.width,
                      height: Math.min(parent.width * (9 / 16), 400),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>

            <VisxChartContainer
              title={`Tendance pour chaque match du joueur sur la saison.`}
            >
              <ParentSize debounceTime={10}>
                {(parent) => (
                  <VisxPlayerTdcLinearChart
                    theme={theme || "dark"}
                    matches={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    dimensions={{
                      width: parent.width,
                      height: Math.min(parent.width * (9 / 16), 400),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>

            <VisxChartContainer
              title={`Evolution de la tendance générale du joueur sur la saison.`}
            >
              <ParentSize debounceTime={10}>
                {(parent) => (
                  <VisxPlayerTdcProgressChart
                    theme={theme || "dark"}
                    matches={
                      userChartStats && router.query.for === "user"
                        ? userChartStats
                        : communityChartStats
                    }
                    dimensions={{
                      width: parent.width,
                      height: Math.min(parent.width * (9 / 16), 400),
                    }}
                  />
                )}
              </ParentSize>
            </VisxChartContainer>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center w-full py-8">
            <Draggable>
              <PlayerTable
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
                  <p>Aucun match disponible avec ces critères.</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerPage;
