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
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import MatchVoter, { MatchFormInput } from "@/components/MatchVoter";
import MatchInfo from "@/components/MatchInfo";
import MatchHeader from "@/components/MatchHeader";

const HomePage: NextCustomPage = () => {
  const { data: session, status } = useSession();

  const [getUserMatchRatings, { data: userMatchRatingsData }] =
    useGetRatingsLazyQuery();

  const {
    data: matchData,
    loading: matchLoading,
    error: matchError,
  } = useGetDisplayMatchQuery();

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
      getUserMatchRatings({
        variables: {
          where: {
            userId: session.user.id,
            matchId: matchData.displayMatch.id,
          },
        },
      });
  }, [matchData, status, session, getUserMatchRatings]);

  if (matchLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (matchError) {
    return (
      <div className="p-4">
        <div className="w-full bg-gray-100 p-4 rounded flex justify-center items-center">
          <p className="text-sm text-center font-normal text-gray-600">
            {matchError.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Head>
        <title>Gonerank - Home</title>
        <meta name="description" content="Home page for Gonerank app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MatchHeader match={matchData!.displayMatch} />

        {status === "unauthenticated" && (
          <>
            <button
              className="w-full bg-marine-50 mt-4 h-10 rounded flex justify-center items-center"
              onClick={() => signIn("twitter")}
            >
              <span className="uppercase text-xs font-bold text-marine-600">
                Connectez-vous pour noter
              </span>
              <TwitterIcon className="w-4 h-4 ml-3 fill-marine-600" />
            </button>
            <MatchInfo match={matchData!.displayMatch} />
          </>
        )}

        {status === "authenticated" && matchData?.displayMatch.archived && (
          <>
            <div className="w-full bg-red-50 mt-4 h-10 rounded flex justify-center items-center">
              <span className="uppercase text-xs font-bold text-red-500">
                Les votes sont fermés.
              </span>
            </div>
            <MatchInfo
              match={matchData.displayMatch}
              userRatings={userMatchRatingsData?.ratings || null}
            />
          </>
        )}

        {status === "authenticated" && !matchData?.displayMatch.archived && (
          <>
            {userMatchRatingsData && userMatchRatingsData.ratings.length > 0 && (
              <>
                <div className="w-full bg-gray-100 mt-4 h-10 rounded flex justify-center items-center">
                  <span className="uppercase text-xs font-bold text-gray-400">
                    Vos notes ont été soumises.
                  </span>
                </div>
                <MatchInfo
                  match={matchData!.displayMatch}
                  userRatings={userMatchRatingsData.ratings}
                />
              </>
            )}
            {userMatchRatingsData && userMatchRatingsData.ratings.length === 0 && (
              <>
                <div className="w-full bg-marine-50 mt-4 h-10 rounded flex justify-center items-center">
                  <span className="uppercase text-xs font-bold text-marine-600">
                    Les votes sont ouverts.
                  </span>
                </div>

                <MatchVoter
                  match={matchData!.displayMatch}
                  onSubmit={handleVote}
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
