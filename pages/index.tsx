import Head from "next/head";
import Image from "next/image";
import TwitterIcon from "../components/Icons/Twitter";
import { NextCustomPage } from "./_app";
import {
  CreateUserRatingsInput,
  useCreateUserRatingsMutation,
  useGetDisplayMatchQuery,
  useGetRatingsLazyQuery,
} from "graphql/generated/queryTypes";
import Spinner from "@/components/shared/Spinner";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import MatchVoter, { MatchFormInput } from "@/components/MatchVoter";
import MatchInfo from "@/components/MatchInfo";
import MatchHeader from "@/components/MatchHeader";
import InfoIcon from "@/components/Icons/Info";

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
    refetchQueries: ["GetRatings", "GetDisplayMatch"],
    awaitRefetchQueries: true,
  });

  const handleVote = (data: MatchFormInput) => {
    if (matchData?.displayMatch && session && status === "authenticated") {
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

  if (matchData?.displayMatch) {
    return (
      <div className="p-4">
        <Head>
          <title>Gonerank - Home</title>
          <meta name="description" content="Home page for Gonerank app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <div className="max-w-7xl mx-auto">
            <MatchHeader match={matchData.displayMatch} />
          </div>

          {/** Not Authenticated */}
          {status === "unauthenticated" && (
            <div className="max-w-7xl mx-auto">
              <button
                className="w-full bg-marine-50 mt-4 h-10 rounded flex justify-center items-center"
                onClick={() => signIn("twitter")}
              >
                <span className="uppercase text-xs font-bold text-marine-600">
                  Connectez-vous pour noter
                </span>
                <TwitterIcon className="w-4 h-4 ml-3 fill-marine-600" />
              </button>
              <MatchInfo match={matchData.displayMatch} />
            </div>
          )}

          {/** Authenticated but DisplayMatch is Archived */}
          {status === "authenticated" && matchData?.displayMatch.archived && (
            <div className="max-w-7xl mx-auto">
              <div className="w-full bg-red-50 mt-4 h-10 rounded flex justify-center items-center">
                <span className="uppercase text-xs font-bold text-red-500">
                  Les votes sont fermés.
                </span>
              </div>
              <MatchInfo
                match={matchData.displayMatch}
                userRatings={userMatchRatingsData?.ratings || null}
              />
            </div>
          )}

          {/** Authenticated, DisplayMatch is Active, but check if already voted */}
          {status === "authenticated" && !matchData?.displayMatch.archived && (
            <div className="max-w-7xl mx-auto">
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
              {userMatchRatingsData?.ratings.length === 0 && (
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
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-4 h-screen w-full">
        <div className="h-full flex flex-col md:justify-center lg:items-center w-11/12 lg:w-3/5 mx-auto">
          <div className="relative w-full overflow-hidden rounded border border-marine-300 flex justify-center items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/misc/pleurer`}
              width={1200}
              height={795}
              alt="pleurer"
            />
          </div>
          <div className="relative bg-marine-50 border border-marine-300 rounded w-full flex justify-center items-center p-4 lg:p-8 mt-4">
            <div className="flex justify-center items-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-marine-600 absolute top-2 left-2 md:relative md:top-0 md:left-0">
              <InfoIcon className="w-3 h-3 fill-white" />
            </div>
            <span className="ml-4 text-marine-500 text-sm lg:font-bold">
              Aucun match n&apos;est actuellement disponible. Veuillez revenir
              plus tard.
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;
