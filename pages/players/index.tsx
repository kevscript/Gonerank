import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Draggable from "@/components/shared/Draggable";
import PlayersTable from "@/components/tables/PlayersTable";
import Spinner from "@/components/shared/Spinner";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import OptionsFilter from "@/components/filters/OptionsFilter";
import ChartPlayersList from "@/components/charts/ChartPlayersList";
import VisxPlayersAvgLinearChart from "@/components/charts/VisxPlayersAvgLinearChart";
import VisxPlayersTdcLinearChart from "@/components/charts/VisxPlayersTdcLinearChart";
import VisxPlayersAvgProgressChart from "@/components/charts/VisxPlayersAvgProgressChart";
import VisxPlayersTdcProgressChart from "@/components/charts/VisxPlayersTdcProgressChart";
import VisxChartContainer from "@/components/charts/VisxChartContainer";
import { ParentSize } from "@visx/responsive";
import { useRouter } from "next/router";
import { useSeasonMetadata } from "@/hooks/useSeasonMetadata";
import { useSeasonRatings } from "@/hooks/useSeasonRatings";
import { useCurrentSeason } from "@/hooks/useCurrentSeason";
import { useFilteredMatches } from "@/hooks/useFilteredMatches";
import { useCommunityPlayersStats } from "@/hooks/useCommunityPlayersStats";
import { useUserPlayersStats } from "@/hooks/useUserPlayersStats";
import { usePlayersChart } from "@/hooks/usePlayersChart";
import { useGetSeasonsQuery } from "@/graphql/generated/queryTypes";
import { PlayersPageHead } from "@/components/meta/PlayersPageHead";

const PlayersPage = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const { data: { seasons } = {} } = useGetSeasonsQuery();

  const { currentSeason, setCurrentSeason } = useCurrentSeason({ seasons });

  const { clubs, competitions, matches, players } = useSeasonMetadata(
    currentSeason?.id
  );

  const { seasonCommunityRatings, seasonUserRatings } = useSeasonRatings(
    currentSeason?.id
  );

  const { filteredMatches } = useFilteredMatches({
    matches,
    competitions,
  });

  const { communityStats, communityChartStats } = useCommunityPlayersStats({
    filteredMatches,
    ratings: seasonCommunityRatings,
    matches,
    clubs,
    competitions,
    players,
  });

  const { userStats, userChartStats } = useUserPlayersStats({
    filteredMatches,
    ratings: seasonUserRatings,
    matches,
    clubs,
    competitions,
    players,
  });

  const { idsToShow, togglePlayerLine } = usePlayersChart({
    stats: communityChartStats,
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
        <PlayersPageHead />
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen responsive-px">
      <PlayersPageHead />

      <div className="hidden w-full my-8 md:flex">
        <Breadcrumbs
          crumbs={[
            { label: "Accueil", path: "/" },
            { label: "Joueurs", path: "/players" },
          ]}
        />
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
        <div className="flex py-8 overflow-hidden scroll-hide gap-x-8">
          <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll gap-y-8">
            {[
              {
                title:
                  "Evolution de la moyenne générale des joueurs sur la saison.",
                Chart: VisxPlayersAvgProgressChart,
              },
              {
                title:
                  "Evolution de la tendance générale des joueurs sur la saison.",
                Chart: VisxPlayersTdcProgressChart,
              },
              {
                title: "Moyenne des joueurs pour chaque match de la saison.",
                Chart: VisxPlayersAvgLinearChart,
              },
              {
                title: "Tendance des joueurs pour chaque match de la saison.",
                Chart: VisxPlayersTdcLinearChart,
              },
            ].map(({ title, Chart }) => (
              <VisxChartContainer key={title} title={title}>
                <ParentSize>
                  {(parent) => (
                    <Chart
                      players={activeChartStats!}
                      idsToShow={idsToShow}
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

          <ChartPlayersList
            players={activeChartStats!}
            idsToShow={idsToShow}
            togglePlayerLine={togglePlayerLine}
            theme={theme}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full md:py-8">
          <Draggable>
            <PlayersTable data={activeTableStats!} />
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

export default PlayersPage;
