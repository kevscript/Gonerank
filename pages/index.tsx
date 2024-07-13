import { NextCustomPage } from "./_app";
import {
  useGetDisplayMatchQuery,
  useGetLatestSeasonQuery,
  useGetRatingsLazyQuery,
} from "graphql/generated/queryTypes";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import LatestSeasonRanking from "@/components/LatestSeasonRanking/LatestSeasonRanking";
import LatestSeasonRankingSkeleton from "@/components/LatestSeasonRanking/LatestSeasonRankingSkeleton";
import MatchDisplay from "@/components/MatchDisplay/MatchDisplay";
import MatchDisplayEmpty from "@/components/MatchDisplay/MatchDisplayEmpty";
import MatchDisplayError from "@/components/MatchDisplay/MatchDisplayError";
import MatchDisplayNoUser from "@/components/MatchDisplay/MatchDisplayNoUser";
import MatchDisplaySkeleton from "@/components/MatchDisplay/MatchDisplaySkeleton";
import { HomePageHead } from "@/components/meta/HomePageHead";

const HomePage: NextCustomPage = () => {
  const { data: session, status } = useSession();

  const {
    data: matchData,
    loading: matchLoading,
    error: matchError,
  } = useGetDisplayMatchQuery();

  const { data: latestSeasonData } = useGetLatestSeasonQuery();

  const [getUserMatchRatings, { data: userMatchRatingsData }] =
    useGetRatingsLazyQuery();

  useEffect(() => {
    status === "authenticated" &&
      matchData?.displayMatch &&
      getUserMatchRatings({
        variables: {
          where: {
            userId: session.user.id,
            matchId: matchData.displayMatch.id,
          },
        },
      });
  }, [matchData?.displayMatch, status, session, getUserMatchRatings]);

  if (matchError) {
    return (
      <>
        <HomePageHead />
        <div className="p-4">
          <MatchDisplayError error={matchError} />
        </div>
      </>
    );
  }

  if (matchData && !matchData.displayMatch) {
    return (
      <>
        <HomePageHead />
        <div className="w-full h-screen p-4">
          <MatchDisplayEmpty />
        </div>
      </>
    );
  }

  return (
    <>
      <HomePageHead />
      <div className="flex flex-col w-full min-h-screen lg:h-screen lg:overflow-hidden">
        <div className="flex justify-between flex-1 py-8 overflow-hidden gap-x-8 2xl:gap-x-16 responsive-px">
          {matchData?.displayMatch ? (
            <div className="flex flex-col flex-1 overflow-scroll min-h-fit scroll-hide">
              {status === "authenticated" ? (
                <MatchDisplay
                  match={matchData.displayMatch}
                  userRatings={userMatchRatingsData?.ratings}
                />
              ) : (
                <MatchDisplayNoUser match={matchData.displayMatch} />
              )}
            </div>
          ) : (
            <MatchDisplaySkeleton />
          )}
          {latestSeasonData?.latestSeason ? (
            <LatestSeasonRanking season={latestSeasonData.latestSeason} />
          ) : (
            <LatestSeasonRankingSkeleton />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
