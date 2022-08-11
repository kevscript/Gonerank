import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import UserFilter from "@/components/shared/UserFilter";
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
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const MatchPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { matchId } = router.query;

  const [getMatchData, { data: matchData }] = useMatchDataLazyQuery();
  const [getMatchRatings, { data: matchRatings }] = useMatchRatingsLazyQuery();

  const [stats, setStats] = useState<FormattedMatchPlayerStats[] | null>(null);
  const [userStats, setUserStats] = useState<
    FormattedMatchPlayerStats[] | null
  >(null);

  const [mode, setMode] = useState<"user" | "all">("all");
  const toggleMode = (newMode: "all" | "user") => {
    if (newMode !== mode) setMode(newMode);
  };
  // fetch all the data and ratings for the match
  useEffect(() => {
    if (matchId) {
      getMatchData({ variables: { matchId: matchId as string } });
      getMatchRatings({ variables: { matchId: matchId as string } });
    }
  }, [matchId, getMatchData, getMatchRatings]);

  useEffect(() => {
    if (matchData && matchRatings) {
      const formattedStats = formatMatchStats({
        players: matchData.players,
        ratings: matchRatings.ratings,
      });
      formattedStats && setStats(formattedStats);
    }
  }, [matchData, matchRatings]);

  // if the ratings are here and a user is authenticated, filter his ratings
  useEffect(() => {
    if (matchData && matchRatings && status === "authenticated") {
      const currentUserRatings = matchRatings.ratings.filter(
        (r) => r.userId === session.user.id
      );

      const formattedStats = formatMatchStats({
        players: matchData.players,
        ratings: currentUserRatings,
      });

      currentUserRatings && setUserStats(formattedStats);
    }
  }, [matchData, matchRatings, status, session]);

  if (!matchData) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs
        crumbs={[
          { label: "Acceuil", path: "/" },
          { label: "Matchs", path: "/matches" },
          {
            label: matchData
              ? `${matchData.match.opponent}${new Date(
                  matchData.match.date
                ).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}`
              : "",
            path: `/matches/${matchId}`,
          },
        ]}
      />

      <div className="p-4 max-w-max md:py-0 md:px-4 lg:px-8 2xl:px-16">
        {stats && (
          <>
            <div className="flex flex-row justify-between mb-4 gap-x-2">
              {status === "authenticated" && userStats && (
                <UserFilter toggleMode={toggleMode} mode={mode} />
              )}
            </div>
            <div>
              <Draggable>
                <MatchTable
                  data={userStats && mode === "user" ? userStats : stats}
                />
              </Draggable>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MatchPage;
