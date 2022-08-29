import OptionsFilter from "@/components/filters/OptionsFilter";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import { VisualFilterOptions } from "@/components/filters/VisualFilter";
import { WhoFilterOptions } from "@/components/filters/WhoFilter";
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
import Head from "next/head";
import { useEffect, useState } from "react";

const MatchesPage = () => {
  const { data: session, status } = useSession();

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
    FormattedMatchStats[] | null
  >(null);
  const [userStats, setUserStats] = useState<FormattedMatchStats[] | null>(
    null
  );

  const [whoFilter, setWhoFilter] = useState<WhoFilterOptions>("community");
  const toggleWho = (newWho: WhoFilterOptions) => {
    if (newWho !== whoFilter) setWhoFilter(newWho);
  };

  const [visualFilter, setVisualFilter] =
    useState<VisualFilterOptions>("table");
  const toggleVisual = (newVisual: VisualFilterOptions) => {
    if (newVisual !== visualFilter) setVisualFilter(newVisual);
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

  useEffect(() => {
    if (matches && seasonRatings) {
      const filteredMatches =
        currentCompetitionId === "all"
          ? matches
          : matches.filter((m) => m.competitionId === currentCompetitionId);

      const formattedStats = formatMatchesSeasonStats({
        players: players || [],
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings:
          currentCompetitionId === "all"
            ? seasonRatings
            : seasonRatings.filter((r) =>
                filteredMatches.some((m) => m.id === r.matchId)
              ),
      });
      formattedStats && setCommunityStats(formattedStats);
    }
  }, [
    clubs,
    competitions,
    currentCompetitionId,
    matches,
    players,
    seasonRatings,
  ]);

  useEffect(() => {
    if (matches && seasonUserRatings) {
      const filteredMatches =
        currentCompetitionId === "all"
          ? matches
          : matches.filter((m) => m.competitionId === currentCompetitionId);

      const formattedStats = formatMatchesSeasonStats({
        players: players || [],
        matches: filteredMatches || [],
        competitions: competitions || [],
        clubs: clubs || [],
        ratings:
          currentCompetitionId === "all"
            ? seasonUserRatings
            : seasonUserRatings.filter((r) =>
                filteredMatches.some((m) => m.id === r.matchId)
              ),
      });
      formattedStats && setUserStats(formattedStats);
    }
  }, [
    clubs,
    competitions,
    currentCompetitionId,
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
          who={whoFilter}
          toggleWho={toggleWho}
          visual={visualFilter}
          toggleVisual={toggleVisual}
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
            <MatchesTable
              data={
                userStats && whoFilter === "user" ? userStats : communityStats
              }
            />
          </Draggable>

          {matches && matches.length === 0 && (
            <div className="flex items-center justify-center mt-4">
              <div className="flex flex-col items-center justify-center w-full p-4 text-center border rounded bg-marine-100 border-marine-200 text-marine-400 md:p-8 dark:bg-marine-900/10 dark:border-marine-400">
                <p>
                  Aucun match n&apos;est encore disponible pour cette saison.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {visualFilter === "chart" && (
        <div className="flex-1 w-full overflow-hidden scroll-hide">
          <h1>Charts</h1>
        </div>
      )}
    </div>
  );
};

export default MatchesPage;
