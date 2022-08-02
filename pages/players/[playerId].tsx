import Draggable from "@/components/shared/Draggable";
import PlayerTable from "@/components/tables/PlayerTable";
import {
  formatPlayerSeasonStats,
  FormattedPlayerSeasonStats,
} from "@/utils/formatPlayerSeasonStats";
import {
  GetSeasonsQuery,
  PlayerSeasonRatingsQuery,
  useGetSeasonsQuery,
  usePlayerSeasonDataLazyQuery,
  usePlayerSeasonRatingsLazyQuery,
} from "graphql/generated/queryTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PlayerPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { playerId } = router.query;

  const [seasonsPlayed, setSeasonsPlayed] = useState<
    GetSeasonsQuery["seasons"] | null
  >(null);
  const [currentSeasonId, setCurrentSeasonId] = useState<string | null>(null);

  const { data: seasonsData } = useGetSeasonsQuery();
  const [getPlayerSeasonData, { data: playerSeasonData }] =
    usePlayerSeasonDataLazyQuery();
  const [getPlayerSeasonRatings, { data: playerSeasonRatings }] =
    usePlayerSeasonRatingsLazyQuery();

  const [stats, setStats] = useState<FormattedPlayerSeasonStats[] | null>(null);
  const [userStats, setUserStats] = useState<
    FormattedPlayerSeasonStats[] | null
  >(null);

  const [mode, setMode] = useState<"user" | "all">("all");

  const toggleMode = () => {
    mode === "all" ? setMode("user") : setMode("all");
  };

  // init seasons where player played
  useEffect(() => {
    if (seasonsData?.seasons) {
      const playedSeasons = seasonsData.seasons.filter((s) =>
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
  }, [seasonsData, playerId]);

  // fetch all the data and ratings in the player season
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
    if (playerSeasonData && playerSeasonRatings) {
      const formattedStats = formatPlayerSeasonStats({
        matches: playerSeasonData.matches || [],
        competitions: playerSeasonData.competitions || [],
        clubs: playerSeasonData.clubs || [],
        ratings: playerSeasonRatings.ratings,
      });
      formattedStats.length > 0 && setStats(formattedStats);
    }
  }, [playerSeasonRatings, playerSeasonData]);

  // if the ratings are here and a user is authenticated, filter his ratings
  useEffect(() => {
    if (playerSeasonData && playerSeasonRatings && status === "authenticated") {
      const currentUserRatings = playerSeasonRatings.ratings.filter(
        (r) => r.userId === session.user.id
      );

      const formattedStats = formatPlayerSeasonStats({
        matches: playerSeasonData.matches || [],
        competitions: playerSeasonData.competitions || [],
        clubs: playerSeasonData.clubs || [],
        ratings: currentUserRatings,
      });

      currentUserRatings.length > 0 && setUserStats(formattedStats);
    }
  }, [playerSeasonRatings, status, session, playerSeasonData]);

  return (
    <div className="p-4">
      Player page
      {status === "authenticated" && userStats && (
        <button onClick={() => toggleMode()}>Now : {mode}</button>
      )}
      {stats && (
        <Draggable>
          <PlayerTable
            data={userStats && mode === "user" ? userStats : stats}
          />
        </Draggable>
      )}
    </div>
  );
};

export default PlayerPage;
