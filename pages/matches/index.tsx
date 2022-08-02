import Draggable from "@/components/shared/Draggable";
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
import { useEffect, useState } from "react";

const MatchesPage = () => {
  const { data: session, status } = useSession();

  const [currentSeasonId, setCurrentSeasonId] = useState("");
  const { data: seasonsData } = useGetSeasonsQuery();
  const [getGlobalSeasonData, { data: globalSeasonData }] =
    useGlobalSeasonDataLazyQuery();

  const [getSeasonRatings, { data: seasonRatings }] =
    useGetSeasonRatingsLazyQuery();
  const [getSeasonUserRatings, { data: seasonUserRatings }] =
    useGetSeasonUserRatingsLazyQuery();

  const [stats, setStats] = useState<FormattedMatchStats[] | null>(null);
  const [userStats, setUserStats] = useState<FormattedMatchStats[] | null>(
    null
  );

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
      const formattedStats = formatMatchesSeasonStats({
        players: globalSeasonData.players || [],
        matches: globalSeasonData.matches || [],
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings: seasonRatings.ratings,
      });
      formattedStats && setStats(formattedStats);
    }
  }, [globalSeasonData, seasonRatings]);

  useEffect(() => {
    if (globalSeasonData && seasonUserRatings) {
      const formattedStats = formatMatchesSeasonStats({
        players: globalSeasonData.players || [],
        matches: globalSeasonData.matches || [],
        competitions: globalSeasonData.competitions || [],
        clubs: globalSeasonData.clubs || [],
        ratings: seasonUserRatings.ratings,
      });
      formattedStats && setUserStats(formattedStats);
    }
  }, [globalSeasonData, seasonUserRatings]);

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
        {seasonsData && (
          <select
            className="outline-none h-10 border-2 border-gray-100 rounded px-2 text-sm text-marine-600"
            value={currentSeasonId}
            onChange={handleSeasonChange}
          >
            {seasonsData.seasons.map((season) => (
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
            <MatchesTable
              data={userStats && mode === "user" ? userStats : stats}
            />
          </Draggable>
        </div>
      )}
    </div>
  );
};

export default MatchesPage;
