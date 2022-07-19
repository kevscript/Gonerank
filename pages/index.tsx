import Head from "next/head";
import TwitterIcon from "../components/Icons/Twitter";
import ClubIcon from "../components/Icons/Club";
import LyonIcon from "../components/Icons/Lyon";
import { NextCustomPage } from "./_app";
import {
  CreateUserRatingsInput,
  useCreateUserRatingsMutation,
  useGetDisplayMatchQuery,
  useGetRatingsLazyQuery,
} from "graphql/generated/queryTypes";
import Spinner from "@/components/shared/Spinner";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import MatchVoter, { MatchFormInput } from "@/components/MatchVoter";
import { GET_RATINGS } from "graphql/queries/rating";
import MatchInfo from "@/components/MatchInfo";

const HomePage: NextCustomPage = () => {
  const { data: session, status } = useSession();
  const [getRatings, { data: ratingsData }] = useGetRatingsLazyQuery();
  const { data: matchData, loading } = useGetDisplayMatchQuery();
  const [createUserRatings] = useCreateUserRatingsMutation({
    refetchQueries: ["GetRatings"],
    awaitRefetchQueries: true,
  });

  const handleVote = (data: MatchFormInput) => {
    if (matchData && session && status === "authenticated") {
      const ratings: CreateUserRatingsInput[] = [];
      for (const playerId in data) {
        ratings.push({ playerId: playerId, rating: data[playerId] });
      }
      createUserRatings({
        variables: {
          matchId: matchData?.displayMatch.id,
          userId: session?.user.id!,
          ratings,
        },
      });
    } else {
      throw new Error("Couldn't submit votes, no matchData or auth session");
    }
  };

  useEffect(() => {
    status === "authenticated" &&
      matchData &&
      getRatings({
        variables: {
          where: {
            userId: session.user.id,
            matchId: matchData.displayMatch.id,
          },
        },
      });
  }, [matchData, status, session, getRatings]);

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <Head>
        <title>Gonerank - Home</title>
        <meta name="description" content="Home page for Gonerank app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div
          className={`w-full bg-white border border-gray-100 rounded flex justify-between py-4 px-8 ${
            !matchData?.displayMatch.home && "flex-row-reverse"
          }`}
        >
          <div className="flex flex-col items-center">
            <LyonIcon className="w-12 h-12" />
            <span className="mt-1 font-bold">OL</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs">
              {matchData?.displayMatch.competition.name}
            </span>
            <div
              className={`flex items-center text-xl font-num font-black ${
                !matchData?.displayMatch.home && "flex-row-reverse"
              }`}
            >
              <span>{matchData?.displayMatch.scored}</span>
              <span>:</span>
              <span>{matchData?.displayMatch.conceeded}</span>
            </div>
            <span className="text-xs font-num">
              {new Date(matchData?.displayMatch.date).toLocaleDateString(
                "fr-FR",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                }
              )}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <ClubIcon
              className="w-12 h-12"
              primary={matchData?.displayMatch.opponent.primary || "#333"}
              secondary={matchData?.displayMatch.opponent.secondary || "#444"}
            />
            <span
              className="mt-1 font-bold"
              title={matchData?.displayMatch.opponent.name}
            >
              {matchData?.displayMatch.opponent.abbreviation}
            </span>
          </div>
        </div>

        {status !== "authenticated" && (
          <button className="w-full bg-gray-200 mt-4 h-10 rounded flex justify-center items-center">
            <span className="uppercase text-xs font-bold">
              Connectez-vous pour voter
            </span>
            <TwitterIcon className="w-4 h-4 ml-3" />
          </button>
        )}

        {matchData && ratingsData?.ratings && (
          <>
            {ratingsData?.ratings.length === 0 ? (
              <>
                <div className="w-full bg-marine-50 mt-4 h-10 rounded flex justify-center items-center">
                  <span className="uppercase text-xs font-bold text-marine-800">
                    Les votes sont ouverts.
                  </span>
                </div>
                <MatchVoter
                  match={matchData.displayMatch}
                  onSubmit={handleVote}
                />
              </>
            ) : (
              <>
                <div className="w-full bg-marine-50 mt-4 h-10 rounded flex justify-center items-center">
                  <span className="uppercase text-xs font-bold text-marine-800">
                    Vos notes ont été soumises.
                  </span>
                </div>
                <MatchInfo
                  match={matchData.displayMatch}
                  userRatings={ratingsData.ratings}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
