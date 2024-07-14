import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import OptionsFilter from "@/components/filters/OptionsFilter";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import MatchesTable from "@/components/tables/MatchesTable";
import { useGetSeasonsQuery } from "graphql/generated/queryTypes";
import { ParentSize } from "@visx/responsive";
import VisxChartContainer from "@/components/charts/VisxChartContainer";
import VisxMatchesAvgLinearChart from "@/components/charts/VisxMatchesAvgLinearChart";
import VisxMatchesTdcLinearChart from "@/components/charts/VisxMatchesTdcLinearChart";
import VisxMatchesAvgProgressChart from "@/components/charts/VisxMatchesAvgProgressChart";
import VisxMatchesTdcProgressChart from "@/components/charts/VisxMatchesTdcProgressChart";
import { useCurrentSeason } from "@/hooks/useCurrentSeason";
import { useSeasonMetadata } from "@/hooks/useSeasonMetadata";
import { useSeasonRatings } from "@/hooks/useSeasonRatings";
import { useFilteredMatches } from "@/hooks/useFilteredMatches";
import { useCommunityMatchesStats } from "@/hooks/useCommunityMatchesStats";
import { useUserMatchesStats } from "@/hooks/useUserMatchesStats";
import { MatchesPageHead } from "@/components/meta/MatchesPageHead";
import { MatchesBreadcrumbs } from "@/components/MatchesBreadcrumbs";
import { useMemo } from "react";

const MatchesPage = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const { data: { seasons } = {} } = useGetSeasonsQuery();

  const { currentSeason, setCurrentSeason } = useCurrentSeason({ seasons });

  const { clubs, competitions, matches, players } = useSeasonMetadata(
    currentSeason?.id
  );

  const { seasonCommunityRatings: seasonRatings, seasonUserRatings } =
    useSeasonRatings(currentSeason?.id);

  const { filteredMatches } = useFilteredMatches({ matches, competitions });

  const { communityStats, communityChartStats } = useCommunityMatchesStats({
    filteredMatches,
    clubs,
    competitions,
    matches,
    players,
    ratings: seasonRatings,
  });

  const { userStats, userChartStats } = useUserMatchesStats({
    filteredMatches,
    clubs,
    competitions,
    matches,
    players,
    ratings: seasonUserRatings,
  });

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonId = e.target.value;
    const newSeason = seasons?.find((s) => s.id === selectedSeasonId);
    newSeason && setCurrentSeason(newSeason);
  };

  const activeChartStats = useMemo(
    () =>
      userChartStats && router.query.for === "user"
        ? userChartStats
        : communityChartStats,
    [userChartStats, communityChartStats, router.query.for]
  );

  const activeTableStats = useMemo(
    () =>
      userStats && router.query.for === "user" ? userStats : communityStats,
    [userStats, communityStats, router.query.for]
  );

  if (!communityStats) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <MatchesPageHead />
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen responsive-px">
      <MatchesPageHead />

      <div className="hidden w-full my-8 md:flex">
        <MatchesBreadcrumbs />
      </div>

      <div className="my-8 md:my-0">
        <OptionsFilter
          competitions={competitions}
          seasons={seasons}
          currentSeasonId={currentSeason?.id}
          handleSeasonChange={handleSeasonChange}
        />
      </div>

      {router.query.shape === "chart" && communityChartStats?.length ? (
        <div className="flex-1 w-full pb-8 mt-8 overflow-scroll scroll-hide">
          <div className="flex flex-col w-full grid-cols-2 gap-4 lg:grid">
            {[
              {
                title: "Moyenne de chaque match de la saison",
                Chart: VisxMatchesAvgLinearChart,
              },
              {
                title: "Tendance de chaque match de la saison",
                Chart: VisxMatchesTdcLinearChart,
              },
              {
                title: "Evolution des moyennes de match sur la saison",
                Chart: VisxMatchesAvgProgressChart,
              },
              {
                title: "Evolution de la tendance de match sur la saison",
                Chart: VisxMatchesTdcProgressChart,
              },
            ].map(({ title, Chart }) => (
              <VisxChartContainer key={title} title={title}>
                <ParentSize debounceTime={10}>
                  {(parent) => (
                    <Chart
                      matches={activeChartStats!}
                      theme={theme || "dark"}
                      dimensions={{
                        width: parent.width,
                        height: parent.width * (9 / 16),
                      }}
                    />
                  )}
                </ParentSize>
              </VisxChartContainer>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full md:py-8">
          <Draggable>
            <MatchesTable data={activeTableStats!} />
          </Draggable>

          {communityStats.length === 0 && (
            <div className="flex items-center justify-center mt-4">
              <div className="flex flex-col items-center justify-center w-full p-4 text-center border rounded bg-marine-100 border-marine-200 text-marine-400 md:p-8 dark:bg-marine-900/10 dark:border-marine-400">
                <p>Aucune statistique ne correspond à ces critères.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchesPage;
