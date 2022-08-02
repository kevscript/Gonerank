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

const PlayersPage = () => {
  const { data: session, status } = useSession();

  const [currentSeasonId, setCurrentSeasonId] = useState("");
  const [currentCompetitionId, setCurrentCompetitionId] = useState("all");

  const { data: seasonsData } = useGetSeasonsQuery();
  const [getGlobalSeasonData, { data: globalSeasonData }] =
    useGlobalSeasonDataLazyQuery();

  const [getSeasonRatings, { data: seasonRatings }] =
    useGetSeasonRatingsLazyQuery();
  const [getSeasonUserRatings, { data: seasonUserRatings }] =
    useGetSeasonUserRatingsLazyQuery();

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
      getGlobalSeasonData({
        variables: { seasonId: selectedSeasonId, archived: true },
      });
      getSeasonRatings({
        variables: { seasonId: selectedSeasonId, archived: true },
      });

      if (status === "authenticated" && session) {
        getSeasonUserRatings({
          variables: {
            seasonId: selectedSeasonId,
            userId: session.user.id!,
            archived: true,
          },
        });
      }
    }
  };

  const handleCompetitionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompetitionId = e.target.value;
    if (
      selectedCompetitionId !== currentCompetitionId &&
      globalSeasonData &&
      seasonRatings
    ) {
      const filteredMatchesByComp = globalSeasonData.matches.filter(
        (m) => m.competitionId === selectedCompetitionId
      );

      setCurrentCompetitionId(selectedCompetitionId);
      const formattedStats = formatPlayersSeasonStats({
        players: globalSeasonData.players || [],
        matches:
          selectedCompetitionId === "all"
            ? globalSeasonData.matches
            : filteredMatchesByComp,
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings:
          selectedCompetitionId === "all"
            ? seasonRatings.ratings
            : seasonRatings.ratings.filter((r) =>
                filteredMatchesByComp.some((m) => m.id === r.matchId)
              ),
      });
      setStats(formattedStats);

      if (status === "authenticated" && session && seasonUserRatings) {
        const formattedUserStats = formatPlayersSeasonStats({
          players: globalSeasonData.players || [],
          matches:
            selectedCompetitionId === "all"
              ? globalSeasonData.matches
              : filteredMatchesByComp,
          competitions: globalSeasonData.competitions || [],
          clubs: globalSeasonData.clubs || [],
          ratings:
            selectedCompetitionId === "all"
              ? seasonUserRatings.ratings
              : seasonUserRatings.ratings.filter((r) =>
                  filteredMatchesByComp.some((m) => m.id === r.matchId)
                ),
        });
        setUserStats(formattedUserStats);
      }
    }
  };

  useEffect(() => {
    if (seasonsData?.seasons) {
      const latestSeason = seasonsData.seasons.sort((a, b) =>
        new Date(a.startDate) < new Date(b.startDate) ? 1 : -1
      )[0];
      if (latestSeason) {
        setCurrentSeasonId(latestSeason.id);
        getGlobalSeasonData({
          variables: { seasonId: latestSeason.id, archived: true },
        });
        getSeasonRatings({
          variables: { seasonId: latestSeason.id, archived: true },
        });
      }
    }
  }, [seasonsData, getGlobalSeasonData, getSeasonRatings]);

  useEffect(() => {
    if (seasonsData?.seasons && status === "authenticated" && session) {
      const latestSeason = seasonsData.seasons.sort((a, b) =>
        new Date(a.startDate) < new Date(b.startDate) ? 1 : -1
      )[0];
      if (latestSeason) {
        getSeasonUserRatings({
          variables: {
            seasonId: latestSeason.id,
            userId: session.user.id!,
            archived: true,
          },
        });
      }
    }
  }, [seasonsData, getSeasonUserRatings, status, session]);

  useEffect(() => {
    if (globalSeasonData && seasonRatings) {
      const filteredMatches =
        currentCompetitionId === "all"
          ? globalSeasonData.matches
          : globalSeasonData.matches.filter(
              (m) => m.competitionId === currentCompetitionId
            );

      const formattedStats = formatPlayersSeasonStats({
        players: globalSeasonData.players || [],
        matches: filteredMatches || [],
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings:
          currentCompetitionId === "all"
            ? seasonRatings.ratings
            : seasonRatings.ratings.filter((r) =>
                filteredMatches.some((m) => m.id === r.matchId)
              ),
      });
      formattedStats && setStats(formattedStats);
    }
  }, [globalSeasonData, seasonRatings, currentCompetitionId]);

  useEffect(() => {
    if (globalSeasonData && seasonUserRatings) {
      const filteredMatches =
        currentCompetitionId === "all"
          ? globalSeasonData.matches
          : globalSeasonData.matches.filter(
              (m) => m.competitionId === currentCompetitionId
            );

      const formattedStats = formatPlayersSeasonStats({
        players: globalSeasonData.players || [],
        matches: filteredMatches || [],
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings:
          currentCompetitionId === "all"
            ? seasonUserRatings.ratings
            : seasonUserRatings.ratings.filter((r) =>
                filteredMatches.some((m) => m.id === r.matchId)
              ),
      });
      formattedStats && setUserStats(formattedStats);
    }
  }, [globalSeasonData, seasonUserRatings, currentCompetitionId]);

  useEffect(() => {}, []);

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
        <div className="flex flex-row gap-x-2">
          {globalSeasonData && (
            <select
              className="outline-none h-10 border-2 border-gray-100 rounded px-2 text-sm text-marine-600"
              value={currentCompetitionId}
              onChange={handleCompetitionChange}
            >
              <option value="all" className="text-black">
                Toutes compétitions
              </option>
              {globalSeasonData.competitions.map((comp) => (
                <option key={comp.id} value={comp.id} className="text-black">
                  {comp.name}
                </option>
              ))}
            </select>
          )}

          {seasonsData && (
            <select
              className="outline-none h-10 border-2 border-gray-100 rounded px-2 text-sm text-marine-600"
              value={currentSeasonId}
              onChange={handleSeasonChange}
            >
              {seasonsData.seasons.map((season) => (
                <option
                  key={season.id}
                  value={season.id}
                  className="text-black"
                >
                  {`${new Date(season.startDate).getFullYear()}/${
                    new Date(season.startDate).getFullYear() + 1
                  }`}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {stats && (
        <div>
          <Draggable>
            <PlayersTable
              data={userStats && mode === "user" ? userStats : stats}
            />
          </Draggable>
        </div>
      )}
    </div>
  );
};

export default PlayersPage;
