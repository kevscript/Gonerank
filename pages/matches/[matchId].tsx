import ClubIcon from "@/components/Icons/Club";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import WhoFilter, { WhoFilterOptions } from "@/components/shared/WhoFilter";
import MatchTable from "@/components/tables/MatchTable";
import {
  formatMatchStats,
  FormattedMatchPlayerStats,
} from "@/utils/formatMatchStats";
import {
  useMatchDataLazyQuery,
  useMatchRatingsLazyQuery,
} from "graphql/generated/queryTypes";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MatchHeader from "@/components/shared/MatchHeader";
import { VisualFilterOptions } from "@/components/shared/VisualFilter";
import OptionsFilter from "@/components/OptionsFilter";

const MatchPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { matchId } = router.query;

  const [
    getMatchData,
    { data: { match, players } = { match: undefined, players: undefined } },
  ] = useMatchDataLazyQuery();
  const [getMatchRatings, { data: matchRatings }] = useMatchRatingsLazyQuery();

  const [communityStats, setCommunityStats] = useState<
    FormattedMatchPlayerStats[] | null
  >(null);
  const [userStats, setUserStats] = useState<
    FormattedMatchPlayerStats[] | null
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

  // fetch all the data and ratings for the match
  useEffect(() => {
    if (matchId) {
      getMatchData({ variables: { matchId: matchId as string } });
      getMatchRatings({ variables: { matchId: matchId as string } });
    }
  }, [matchId, getMatchData, getMatchRatings]);

  useEffect(() => {
    if (match && matchRatings) {
      const formattedStats = formatMatchStats({
        players: players || [],
        ratings: matchRatings.ratings,
      });
      formattedStats && setCommunityStats(formattedStats);
    }
  }, [match, matchRatings, players]);

  // if the ratings are here and a user is authenticated, filter his ratings
  useEffect(() => {
    if (match && matchRatings && status === "authenticated") {
      const currentUserRatings = matchRatings.ratings.filter(
        (r) => r.userId === session.user.id
      );

      const formattedStats = formatMatchStats({
        players: players || [],
        ratings: currentUserRatings,
      });

      currentUserRatings && setUserStats(formattedStats);
    }
  }, [matchRatings, status, session, match, players]);

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
        <title>
          Gonerank -{" "}
          {match
            ? match.opponent + " " + new Date(match.date).toLocaleDateString()
            : "Match"}
        </title>
        <meta
          name="description"
          content={`Page des statistiques pour le match contre ${
            match
              ? match.opponent +
                ", le " +
                new Date(match.date).toLocaleDateString()
              : "un adversaire"
          }`}
        />
      </Head>
      <div className="hidden w-full my-8 md:flex">
        <Breadcrumbs
          crumbs={[
            { label: "Accueil", path: "/" },
            { label: "Matchs", path: "/matches" },
            {
              label: match
                ? `${match.competition.abbreviation} - ${
                    match.opponent.abbreviation
                  } ${new Date(match.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })} ${match.home ? "[Dom]" : "[Ext]"} `
                : "",
              path: `/matches/${matchId}`,
            },
          ]}
        />
      </div>

      {match && (
        <div className="flex justify-center w-full my-8 md:py-8 md:my-0">
          <MatchHeader match={match} />
        </div>
      )}

      <OptionsFilter
        isAuth={status === "authenticated" && userStats ? true : false}
        who={whoFilter}
        toggleWho={toggleWho}
        visual={visualFilter}
        toggleVisual={toggleVisual}
      />

      {visualFilter === "table" && (
        <div className="flex justify-center w-full py-8">
          <Draggable>
            <MatchTable
              data={
                userStats && whoFilter === "user" ? userStats : communityStats
              }
            />
          </Draggable>
        </div>
      )}

      {visualFilter === "chart" && <h1>Chart</h1>}
    </div>
  );
};

export default MatchPage;
