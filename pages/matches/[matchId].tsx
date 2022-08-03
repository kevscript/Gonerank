import Draggable from "@/components/shared/Draggable";
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

  return (
    <div className="p-4 lg:p-8 max-w-max">
      <div className="flex flex-row gap-x-2 mb-4 justify-between">
        {status === "authenticated" && userStats && (
          <UserFilter toggleMode={toggleMode} mode={mode} />
        )}
      </div>

      {stats && (
        <div>
          <Draggable>
            <MatchTable
              data={userStats && mode === "user" ? userStats : stats}
            />
          </Draggable>
        </div>
      )}
    </div>
  );
};

export default MatchPage;
