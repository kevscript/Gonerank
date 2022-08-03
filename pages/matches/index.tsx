import Draggable from "@/components/shared/Draggable";
import SeasonSelector from "@/components/shared/SeasonSelector";
import Spinner from "@/components/shared/Spinner";
import UserFilter from "@/components/shared/UserFilter";
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

  if (!globalSeasonData) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-max">
      {stats && (
        <>
          <div className="flex flex-row gap-x-2 mb-4 justify-between">
            {status === "authenticated" && userStats && (
              <UserFilter mode={mode} toggleMode={toggleMode} />
            )}
            {seasonsData && (
              <SeasonSelector
                currentSeasonId={currentSeasonId}
                handleChange={handleSeasonChange}
                seasons={seasonsData.seasons}
              />
            )}
          </div>

          <div>
            <Draggable>
              <MatchesTable
                data={userStats && mode === "user" ? userStats : stats}
              />
            </Draggable>
          </div>
        </>
      )}
    </div>
  );
};

export default MatchesPage;
