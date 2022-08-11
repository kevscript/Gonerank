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
import UserFilter from "@/components/shared/UserFilter";
import SeasonSelector from "@/components/shared/SeasonSelector";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

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

  if (!playerSeasonData) {
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
          { label: "Accueil", path: "/" },
          { label: "Joueurs", path: "/players" },
          {
            label: playerSeasonData
              ? `${playerSeasonData.player.firstName} ${playerSeasonData.player.lastName}`
              : "",
            path: `/players/${playerId}`,
          },
        ]}
      />
      <div className="p-4 md:py-0 md:px-4 lg:px-8 2xl:px-16 max-w-max">
        {playerSeasonData.player && (
          <div className="flex flex-row items-center w-full px-4 py-4 overflow-hidden bg-white rounded dark:bg-slate-900 lg:px-8 flex-nowrap drop-shadow-sm">
            <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full shadow-inner lg:h-16 lg:w-16 shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${playerSeasonData.player.image}`}
                alt="player avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col flex-1 ml-4">
              <h3 className="overflow-hidden truncate lg:text-xl whitespace-nowrap">{`${playerSeasonData.player.firstName} ${playerSeasonData.player.lastName}`}</h3>
              <span className="text-sm whitespace-nowrap ">
                {getAgeFromDate(playerSeasonData.player.birthDate)} ans,{" "}
                {playerSeasonData.player.country}
              </span>
            </div>
          </div>
        )}

        {stats && (
          <>
            <div className="flex flex-row flex-wrap justify-between mt-4 mb-4 gap-x-2 lg:mt-8">
              {status === "authenticated" && userStats && (
                <UserFilter toggleMode={toggleMode} mode={mode} />
              )}
              {seasonsPlayed && (
                <SeasonSelector
                  currentSeasonId={currentSeasonId}
                  handleChange={handleSeasonChange}
                  seasons={seasonsPlayed}
                />
              )}
            </div>
            <div>
              <Draggable>
                <PlayerTable
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

export default PlayerPage;
