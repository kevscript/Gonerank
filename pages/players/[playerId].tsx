import Draggable from "@/components/shared/Draggable";
import PlayerTable from "@/components/tables/PlayerTable";
import {
  formatPlayerSeasonStats,
  FormattedPlayerSeasonStats,
} from "@/utils/formatPlayerSeasonStats";
import {
  GetSeasonsQuery,
  useGetSeasonsQuery,
  usePlayerSeasonDataLazyQuery,
  usePlayerSeasonRatingsLazyQuery,
} from "graphql/generated/queryTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAgeFromDate } from "@/utils/getAgeFromDate";
import Spinner from "@/components/shared/Spinner";
import { WhoFilterOptions } from "@/components/filters/WhoFilter";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Head from "next/head";
import OptionsFilter from "@/components/filters/OptionsFilter";
import { VisualFilterOptions } from "@/components/filters/VisualFilter";
import { LocationFilterOptions } from "@/components/filters/LocationFilter";
import {
  formatPlayerChartData,
  FormattedPlayerChartData,
} from "@/utils/charts/formatPlayerChartData";
import PlayerAvgLinearChart from "@/components/charts/PlayerAvgLinearChart";
import { useTheme } from "next-themes";
import ChartContainer from "@/components/charts/ChartContainer";
import PlayerAvgProgressChart from "@/components/charts/PlayerAvgProgressChart";
import PlayerTdcLinearChart from "@/components/charts/PlayerTdcLinearChart";
import PlayerTdcProgressChart from "@/components/charts/PlayerTdcProgressChart";

const PlayerPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { playerId } = router.query;

  const { theme } = useTheme();

  const [seasonsPlayed, setSeasonsPlayed] = useState<
    GetSeasonsQuery["seasons"] | null
  >(null);

  const { data: { seasons } = {} } = useGetSeasonsQuery();

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

  const [whoFilter, setWhoFilter] = useState<WhoFilterOptions>("community");
  const toggleWho = (newWho: WhoFilterOptions) => {
    if (newWho !== whoFilter) setWhoFilter(newWho);
  };

  const [visualFilter, setVisualFilter] =
    useState<VisualFilterOptions>("table");
  const toggleVisual = (newVisual: VisualFilterOptions) => {
    if (newVisual !== visualFilter) setVisualFilter(newVisual);
  };

  const [locationFilter, setLocationFilter] =
    useState<LocationFilterOptions>("all");
  const toggleLocation = (newLocation: LocationFilterOptions) => {
    if (newLocation === locationFilter) {
      setLocationFilter("all");
    } else {
      setLocationFilter(newLocation);
    }
  };

  const [currentSeasonId, setCurrentSeasonId] = useState("");
  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonId = e.target.value;
    if (selectedSeasonId !== currentSeasonId) {
      setCurrentSeasonId(selectedSeasonId);
    }
  };

  const [currentCompetitionId, setCurrentCompetitionId] = useState("all");
  const handleCompetitionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompetitionId = e.target.value;
    if (selectedCompetitionId !== currentCompetitionId) {
      setCurrentCompetitionId(selectedCompetitionId);
    }
  };

  // setting the initial season
  useEffect(() => {
    if (seasons && !currentSeasonId) {
      const playedSeasons = seasons.filter((s) =>
        s.players.some((p) => p.playerId === (playerId as string))
      );

      if (playedSeasons.length > 0) {
        setSeasonsPlayed(playedSeasons);

        const latestSeason = playedSeasons.sort((a, b) =>
          new Date(a.startDate) < new Date(b.startDate) ? 1 : -1
        )[0];
        latestSeason && setCurrentSeasonId(latestSeason.id);
      }
    }
  }, [seasons, currentSeasonId, playerId]);

  // fetching data whenever season changes
  useEffect(() => {
    if (currentSeasonId && playerId) {
      getPlayerSeasonData({
        variables: {
          playerId: playerId as string,
          seasonId: currentSeasonId,
          archived: true,
        },
      });
      getPlayerSeasonRatings({
        variables: {
          playerId: playerId as string,
          seasonId: currentSeasonId,
          archived: true,
        },
      });
    }
  }, [playerId, currentSeasonId, getPlayerSeasonData, getPlayerSeasonRatings]);

  useEffect(() => {
    if (matches && playerSeasonRatings) {
      let filteredMatches = [...matches];

      if (currentCompetitionId !== "all") {
        filteredMatches = filteredMatches.filter(
          (m) => m.competitionId === currentCompetitionId
        );
      }

      if (locationFilter !== "all") {
        filteredMatches = filteredMatches.filter(
          (m) => (m.home ? "home" : "away") === locationFilter
        );
      }

      const formattedStats = formatPlayerSeasonStats({
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings: playerSeasonRatings.filter((r) =>
          filteredMatches.some((m) => m.id === r.matchId)
        ),
      });

      formattedStats && setCommunityStats(formattedStats);
      formattedStats &&
        setCommunityChartStats(formatPlayerChartData(formattedStats));
    }
  }, [
    playerSeasonRatings,
    matches,
    competitions,
    clubs,
    currentCompetitionId,
    locationFilter,
  ]);

  // if the ratings are here and a user is authenticated, filter his ratings
  useEffect(() => {
    if (matches && playerSeasonRatings && status === "authenticated") {
      const currentUserRatings = playerSeasonRatings.filter(
        (r) => r.userId === session.user.id
      );

      let filteredMatches = [...matches];

      if (currentCompetitionId !== "all") {
        filteredMatches = filteredMatches.filter(
          (m) => m.competitionId === currentCompetitionId
        );
      }

      if (locationFilter !== "all") {
        filteredMatches = filteredMatches.filter(
          (m) => (m.home ? "home" : "away") === locationFilter
        );
      }

      const formattedStats = formatPlayerSeasonStats({
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings: currentUserRatings.filter((r) =>
          filteredMatches.some((m) => m.id === r.matchId)
        ),
      });

      currentUserRatings && formattedStats && setUserStats(formattedStats);
      currentUserRatings &&
        formattedStats &&
        setUserChartStats(formatPlayerChartData(formattedStats));
    }
  }, [
    playerSeasonRatings,
    status,
    session,
    matches,
    competitions,
    clubs,
    currentCompetitionId,
    locationFilter,
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
        isAuth={status === "authenticated" && userStats ? true : false}
        who={whoFilter}
        toggleWho={toggleWho}
        visual={visualFilter}
        toggleVisual={toggleVisual}
        location={locationFilter}
        toggleLocation={toggleLocation}
        competitions={competitions}
        seasons={seasons}
        currentCompetitionId={currentCompetitionId}
        currentSeasonId={currentSeasonId}
        handleCompetitionChange={handleCompetitionChange}
        handleSeasonChange={handleSeasonChange}
      />

      {visualFilter === "table" && (
        <>
          <div className="flex flex-col justify-center w-full py-8">
            <Draggable>
              <PlayerTable
                data={
                  userStats && whoFilter === "user" ? userStats : communityStats
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

      {visualFilter === "chart" && communityChartStats && (
        <div className="flex-1 w-full pb-8 mt-8 overflow-scroll scroll-hide">
          <div className="flex flex-col w-full grid-cols-2 gap-4 lg:grid">
            <ChartContainer title="Moyenne Linéaire">
              <PlayerAvgLinearChart
                highlighted={true}
                theme={theme || "dark"}
                matches={
                  userChartStats && whoFilter === "user"
                    ? userChartStats
                    : communityChartStats
                }
              />
            </ChartContainer>
            <ChartContainer title="Moyenne Progressive">
              <PlayerAvgProgressChart
                highlighted={true}
                theme={theme || "dark"}
                matches={
                  userChartStats && whoFilter === "user"
                    ? userChartStats
                    : communityChartStats
                }
              />
            </ChartContainer>
            <ChartContainer title="Tendance Linéaire">
              <PlayerTdcLinearChart
                highlighted={true}
                theme={theme || "dark"}
                matches={
                  userChartStats && whoFilter === "user"
                    ? userChartStats
                    : communityChartStats
                }
              />
            </ChartContainer>
            <ChartContainer title="Tendance Progressive">
              <PlayerTdcProgressChart
                highlighted={true}
                theme={theme || "dark"}
                matches={
                  userChartStats && whoFilter === "user"
                    ? userChartStats
                    : communityChartStats
                }
              />
            </ChartContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerPage;
