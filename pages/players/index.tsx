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
import Spinner from "@/components/shared/Spinner";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Head from "next/head";
import PlayersAvgLinearChart from "@/components/charts/PlayersAvgLinearChart";
import {
  formatPlayersChartData,
  FormattedPlayersChartData,
} from "@/utils/charts/formatPlayersChartData";
import OptionsFilter from "@/components/filters/OptionsFilter";
import { VisualFilterOptions } from "@/components/filters/VisualFilter";
import { WhoFilterOptions } from "@/components/filters/WhoFilter";
import ChartPlayersList from "@/components/charts/ChartPlayersList";
import PlayersAvgProgressChart from "@/components/charts/PlayersAvgProgressChart";
import PlayersTdcLinearChart from "@/components/charts/PlayersTdcLinearChart";
import PlayersTdcProgressChart from "@/components/charts/PlayersTdcProgressChart";
import ChartContainer from "@/components/charts/ChartContainer";
import { useTheme } from "next-themes";
import { LocationFilterOptions } from "@/components/filters/LocationFilter";

const PlayersPage = () => {
  const { data: session, status } = useSession();

  const { theme } = useTheme();

  const { data: { seasons } = {} } = useGetSeasonsQuery();
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

  const [idsToShow, setIdsToShow] = useState<string[]>([]);
  const [highlightedPlayer, setHighlightedPlayer] = useState<string | null>(
    null
  );

  const highlightPlayer = (pId: string | null) => {
    if (pId === null) setHighlightedPlayer(null);
    if (typeof pId === "string") setHighlightedPlayer(pId);
  };

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

  // setting the initial season
  useEffect(() => {
    if (seasons && !currentSeasonId) {
      const latestSeason = seasons.sort((a, b) =>
        new Date(a.startDate) < new Date(b.startDate) ? 1 : -1
      )[0];

      latestSeason && setCurrentSeasonId(latestSeason.id);
    }
  }, [seasons, currentSeasonId]);

  // fetching season data whenever season changes
  useEffect(() => {
    if (currentSeasonId) {
      getGlobalSeasonData({
        variables: { seasonId: currentSeasonId, archived: true },
      });
      getSeasonRatings({
        variables: { seasonId: currentSeasonId, archived: true },
      });

      if (status === "authenticated" && session) {
        getSeasonUserRatings({
          variables: {
            seasonId: currentSeasonId,
            userId: session.user.id!,
            archived: true,
          },
        });
      }
    }
  }, [
    currentSeasonId,
    getGlobalSeasonData,
    getSeasonRatings,
    getSeasonUserRatings,
    session,
    status,
  ]);

  // format community stats
  useEffect(() => {
    if (matches && seasonRatings) {
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
        setCommunityChartStats(
          formatPlayersChartData({ stats: formattedStats, matches: matches })
        );
      }
    }
  }, [
    matches,
    seasonRatings,
    currentCompetitionId,
    players,
    competitions,
    clubs,
    locationFilter,
  ]);

  // format user stats
  useEffect(() => {
    if (matches && seasonUserRatings) {
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
        setUserChartStats(
          formatPlayersChartData({ stats: formattedStats, matches: matches })
        );
      }
    }
  }, [
    matches,
    seasonUserRatings,
    currentCompetitionId,
    players,
    competitions,
    clubs,
    locationFilter,
  ]);

  // init player IDS to show in chart
  useEffect(() => {
    if (communityChartStats && idsToShow.length === 0) {
      let ids: string[] = [];

      communityChartStats.forEach((player, i) => {
        player.numberOfMatchesPlayed > 0 && ids.push(player.id);
      });

      setIdsToShow(ids);
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
    <div className="flex flex-col w-full h-screen responsive-px">
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
      </div>

      {visualFilter === "table" && (
        <div className="flex justify-center w-full md:py-8">
          <Draggable>
            <PlayersTable
              data={
                userStats && whoFilter === "user" ? userStats : communityStats
              }
            />
          </Draggable>
        </div>
      )}

      {visualFilter === "chart" && communityChartStats && (
        <div className="flex-1 w-full overflow-hidden scroll-hide">
          <div className="relative flex flex-1 h-full py-8 gap-x-8">
            <div className="flex flex-col flex-1 overflow-scroll scroll-hide gap-y-8">
              <ChartContainer title="Moyenne Linéaire">
                <PlayersAvgLinearChart
                  players={
                    userChartStats && whoFilter === "user"
                      ? userChartStats
                      : communityChartStats
                  }
                  idsToShow={idsToShow}
                  highlightPlayer={highlightPlayer}
                  highlightedPlayer={highlightedPlayer}
                  theme={theme || "dark"}
                />
              </ChartContainer>

              <ChartContainer title="Moyenne Progressive">
                <PlayersAvgProgressChart
                  players={
                    userChartStats && whoFilter === "user"
                      ? userChartStats
                      : communityChartStats
                  }
                  idsToShow={idsToShow}
                  highlightPlayer={highlightPlayer}
                  highlightedPlayer={highlightedPlayer}
                  theme={theme || "dark"}
                />
              </ChartContainer>

              <ChartContainer title="Tendance Linéaire">
                <PlayersTdcLinearChart
                  players={
                    userChartStats && whoFilter === "user"
                      ? userChartStats
                      : communityChartStats
                  }
                  idsToShow={idsToShow}
                  highlightPlayer={highlightPlayer}
                  highlightedPlayer={highlightedPlayer}
                  theme={theme || "dark"}
                />
              </ChartContainer>

              <ChartContainer title="Tendance Progressive">
                <PlayersTdcProgressChart
                  players={
                    userChartStats && whoFilter === "user"
                      ? userChartStats
                      : communityChartStats
                  }
                  idsToShow={idsToShow}
                  highlightPlayer={highlightPlayer}
                  highlightedPlayer={highlightedPlayer}
                  theme={theme || "dark"}
                />
              </ChartContainer>
            </div>

            <div className="h-full">
              <ChartPlayersList
                players={
                  userChartStats && whoFilter === "user"
                    ? userChartStats
                    : communityChartStats
                }
                idsToShow={idsToShow}
                togglePlayerLine={togglePlayerLine}
                highlightedPlayer={highlightedPlayer}
                highlightPlayer={highlightPlayer}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayersPage;
