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

const PlayerPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { playerId } = router.query;

  const [seasonsPlayed, setSeasonsPlayed] = useState<
    GetSeasonsQuery["seasons"] | null
  >(null);
  const [currentSeasonId, setCurrentSeasonId] = useState("");
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

  const toggleMode = (newMode: "all" | "user") => {
    if (newMode !== mode) setMode(newMode);
  };

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonId = e.target.value;
    if (selectedSeasonId !== currentSeasonId) {
      setCurrentSeasonId(selectedSeasonId);
    }
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
      formattedStats && setStats(formattedStats);
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

      currentUserRatings && setUserStats(formattedStats);
    }
  }, [playerSeasonRatings, status, session, playerSeasonData]);

  return (
    <div className="p-4 lg:p-8 max-w-max">
      <div className="flex flex-row gap-x-2 mb-4 justify-between">
        {status === "authenticated" && userStats && (
          <div className="h-10 flex flex-row justify-between items-center bg-gray-100 max-w-max  gap-x-[1px] px-[2px] rounded">
            <button
              onClick={() => toggleMode("all")}
              className={`px-2 rounded-l-sm h-9 text-sm ${
                mode === "all"
                  ? "bg-white text-marine-600"
                  : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600"
              }`}
            >
              Communauté
            </button>
            <button
              onClick={() => toggleMode("user")}
              className={`px-2 rounded-l-sm h-9 text-sm ${
                mode === "user"
                  ? "bg-white text-marine-600"
                  : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600"
              }`}
            >
              Utilisateur
            </button>
          </div>
        )}
        {seasonsPlayed && (
          <select
            className="outline-none h-10 border-2 border-gray-100 rounded px-2 text-sm text-marine-600"
            value={currentSeasonId}
            onChange={handleSeasonChange}
          >
            {seasonsPlayed.map((season) => (
              <option key={season.id} value={season.id} className="text-black">
                {`${new Date(season.startDate).getFullYear()}/${
                  new Date(season.startDate).getFullYear() + 1
                }`}
              </option>
            ))}
          </select>
        )}
      </div>

      {stats && (
        <div>
          <Draggable>
            <PlayerTable
              data={userStats && mode === "user" ? userStats : stats}
            />
          </Draggable>
        </div>
      )}
    </div>
  );
};

export default PlayerPage;
