import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
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
import MatchHeader from "@/components/MatchHeader";
import OptionsFilter from "@/components/filters/OptionsFilter";
import { MatchBreadcrumbs } from "@/components/MatchBreadcrumbs";
import { MatchPageHead } from "@/components/meta/MatchPageHead";

const MatchPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { matchId } = router.query;

  const [
    getMatchData,
    {
      data: { match, players } = { match: undefined, players: undefined },
      error: matchDataError,
    },
  ] = useMatchDataLazyQuery();
  const [getMatchRatings, { data: matchRatings }] = useMatchRatingsLazyQuery();

  const [communityStats, setCommunityStats] = useState<
    FormattedMatchPlayerStats[] | null
  >(null);
  const [userStats, setUserStats] = useState<
    FormattedMatchPlayerStats[] | null
  >(null);

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

  if (matchDataError) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <h1>Something went wrong :(</h1>
      </div>
    );
  }

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
      {match && (
        <>
          <MatchPageHead match={match} />
          <div className="hidden w-full my-8 md:flex">
            <MatchBreadcrumbs match={match} />
          </div>
          <div className="flex justify-center w-full my-8 md:py-8 md:my-0">
            <MatchHeader match={match} />
          </div>
        </>
      )}

      <OptionsFilter visualHidden locationHidden />

      <div className="flex justify-center w-full py-8">
        <Draggable>
          <MatchTable
            data={
              userStats && router.query.for === "user"
                ? userStats
                : communityStats
            }
          />
        </Draggable>
      </div>
    </div>
  );
};

export default MatchPage;
