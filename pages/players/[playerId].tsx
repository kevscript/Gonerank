import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Draggable from "@/components/shared/Draggable";
import PlayerTable from "@/components/tables/PlayerTable";
import {
  useGetPlayerQuery,
  useGetSeasonsQuery,
} from "graphql/generated/queryTypes";
import Spinner from "@/components/shared/Spinner";
import OptionsFilter from "@/components/filters/OptionsFilter";
import { ParentSize } from "@visx/responsive";
import VisxChartContainer from "@/components/charts/VisxChartContainer";
import VisxPlayerAvgLinearChart from "@/components/charts/VisxPlayerAvgLinearChart";
import VisxPlayerAvgProgressChart from "@/components/charts/VisxPlayerAvgProgressChart";
import VisxPlayerTdcProgressChart from "@/components/charts/VisxPlayerTdcProgressChart";
import VisxPlayerTdcLinearChart from "@/components/charts/VisxPlayerTdcLinearChart";
import { PlayerPageHead } from "@/components/meta/PlayerPageHead";
import { PlayerHeader } from "@/components/PlayerHeader";
import { PlayerBreadcrumbs } from "@/components/PlayerBreadcrumbs";
import { useCurrentSeason } from "@/hooks/useCurrentSeason";
import { usePlayerSeasonMetadata } from "@/hooks/usePlayerSeasonMetdata";
import { usePlayerSeasonRatings } from "@/hooks/usePlayerSeasonRatings";
import { useFilteredMatches } from "@/hooks/useFilteredMatches";
import { useCommunityPlayerStats } from "@/hooks/useCommunityPlayerStats";
import { useUserPlayerStats } from "@/hooks/useUserPlayerStats";

const PlayerPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { playerId } = router.query;

  const { data: { player: playerData } = {}, error: playerError } =
    useGetPlayerQuery({
      variables: { id: playerId as string },
    });

  const { data: { seasons } = {} } = useGetSeasonsQuery();

  const { currentSeason, setCurrentSeason } = useCurrentSeason({
    seasons: seasons?.filter((s) =>
      s.players.some((p) => p.playerId === (playerId as string))
    ),
  });

  const { clubs, competitions, matches, player } = usePlayerSeasonMetadata({
    playerId: playerData?.id,
    seasonId: currentSeason?.id,
  });

  const { playerSeasonRatings, playerSeasonUserRatings } =
    usePlayerSeasonRatings({
      playerId: playerId as string,
      seasonId: currentSeason?.id,
    });

  const { filteredMatches } = useFilteredMatches({ matches, competitions });

  const { communityStats, communityChartStats } = useCommunityPlayerStats({
    filteredMatches,
    clubs,
    competitions,
    matches,
    ratings: playerSeasonRatings,
  });

  const { userStats, userChartStats } = useUserPlayerStats({
    filteredMatches,
    clubs,
    competitions,
    matches,
    ratings: playerSeasonUserRatings,
  });

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonId = e.target.value;
    const newSeason = seasons?.find((s) => s.id === selectedSeasonId);
    newSeason &&
      newSeason.id !== currentSeason?.id &&
      setCurrentSeason(newSeason);
  };

  if (playerError) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <h1>Something went wrong :(</h1>
      </div>
    );
  }

  if (!communityStats) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <PlayerPageHead player={player} />
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen responsive-px">
      {player && (
        <>
          <PlayerPageHead player={player} />
          <div className="hidden w-full my-8 md:flex">
            <PlayerBreadcrumbs player={player} />
          </div>

          <PlayerHeader player={player} />
        </>
      )}

      <OptionsFilter
        competitions={competitions}
        seasons={
          seasons
            ? seasons.filter((s) =>
                s.players.some((p) => p.playerId === playerId)
              )
            : undefined
        }
        currentSeasonId={currentSeason?.id}
        handleSeasonChange={handleSeasonChange}
      />

      {router.query.shape === "chart" && communityChartStats ? (
        <div className="flex-1 w-full pb-8 mt-8 overflow-scroll scroll-hide">
          <div className="flex flex-col w-full grid-cols-2 gap-4 lg:grid">
            {[
              {
                title: "Moyenne pour chaque match du joueur sur la saison.",
                Chart: VisxPlayerAvgLinearChart,
              },
              {
                title:
                  "Evolution de la moyenne générale du joueur sur la saison.",
                Chart: VisxPlayerAvgProgressChart,
              },
              {
                title: "Tendance pour chaque match du joueur sur la saison.",
                Chart: VisxPlayerTdcLinearChart,
              },
              {
                title:
                  "Evolution de la tendance générale du joueur sur la saison.",
                Chart: VisxPlayerTdcProgressChart,
              },
            ].map(({ title, Chart }) => (
              <VisxChartContainer key={title} title={title}>
                <ParentSize debounceTime={10}>
                  {(parent) => (
                    <Chart
                      theme={theme || "dark"}
                      matches={
                        userChartStats && router.query.for === "user"
                          ? userChartStats
                          : communityChartStats
                      }
                      dimensions={{
                        width: parent.width,
                        height: Math.min(parent.width * (9 / 16), 400),
                      }}
                    />
                  )}
                </ParentSize>
              </VisxChartContainer>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center w-full py-8">
            <Draggable>
              <PlayerTable
                data={
                  userStats && router.query.for === "user"
                    ? userStats
                    : communityStats
                }
              />
            </Draggable>
            {communityStats.length === 0 && (
              <div className="flex items-center justify-center mt-4">
                <div className="flex flex-col items-center justify-center w-full p-4 text-center border rounded bg-marine-100 border-marine-200 text-marine-400 md:p-8 dark:bg-marine-900/10 dark:border-marine-400">
                  <p>Aucun match disponible avec ces critères.</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerPage;
