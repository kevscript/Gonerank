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
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import MatchVoter, { MatchFormInput } from "@/components/MatchVoter";
import MatchInfo from "@/components/MatchInfo";
import MatchHeader from "@/components/MatchHeader";
import InfoIcon from "@/components/Icons/Info";

const HomePage: NextCustomPage = () => {
  const { data: session, status } = useSession();

  const [twitterText, setTwitterText] = useState<string | null>(null);

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

  // setting up the twitter text
  useEffect(() => {
    if (
      status === "authenticated" &&
      userMatchRatingsData &&
      userMatchRatingsData.ratings.length > 0 &&
      matchData &&
      matchData.displayMatch
    ) {
      const ratings: { firstName: string; lastName: string; rating: number }[] =
        [];

      userMatchRatingsData.ratings.forEach((r) => {
        const player = matchData.displayMatch?.stats.find(
          (s) => s.playerId === r.playerId
        );
        if (player) {
          ratings.push({
            firstName: player.firstName,
            lastName: player.lastName,
            rating: r.rating,
          });
        }
      });

      const ratingsArr = ratings
        .sort((a, b) => (a.rating > b.rating ? -1 : 1))
        .map((r) => encodeURI(`${r.lastName} - ${r.rating}`));

      const ratingsText = ratingsArr.join("%0D%0A");
      const headerText = `Mes notes vs ${matchData.displayMatch.opponent.abbreviation.toUpperCase()} - ${new Date(
        matchData.displayMatch.date
      ).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })} :`;

      const finalText = `${headerText}%0D%0A${ratingsText}`;
      setTwitterText(finalText);
    }
  }, [status, userMatchRatingsData, matchData]);

  if (matchLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  if (matchError) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center w-full p-4 bg-gray-100 rounded">
          <p className="text-sm font-normal text-center text-gray-600">
            {matchError.message}
          </p>
        </div>
      </div>
    );
  }

  if (matchData && matchData.displayMatch) {
    return (
      <div className="p-4 lg:p-8">
        <Head>
          <title>Gonerank - Home</title>
          <meta name="description" content="Home page for Gonerank app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <div className="max-w-7xl">
            <MatchHeader match={matchData.displayMatch} />
          </div>

          {/** Not Authenticated */}
          {status === "unauthenticated" && (
            <div className="max-w-7xl">
              <button
                className="flex items-center justify-center w-full h-10 mt-4 rounded bg-marine-50 lg:mt-8"
                onClick={() => signIn("twitter")}
              >
                <span className="text-xs font-bold uppercase text-marine-600">
                  Connectez-vous pour voter.
                </span>
                <TwitterIcon className="w-4 h-4 ml-3 fill-marine-600" />
              </button>
              <MatchInfo match={matchData.displayMatch} />
            </div>
          )}

          {/** Authenticated but DisplayMatch is Archived */}
          {status === "authenticated" && matchData?.displayMatch.archived && (
            <div className="max-w-7xl ">
              <div className="flex items-center justify-center w-full h-10 mt-4 rounded bg-red-50 lg:mt-8">
                <span className="text-xs font-bold text-red-500 uppercase">
                  Les votes sont finis.
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
            <div className="max-w-7xl">
              {userMatchRatingsData && userMatchRatingsData.ratings.length > 0 && (
                <>
                  <div className="flex flex-row items-center w-full mt-4 flex-nowrap gap-x-2 lg:gap-x-4 lg:mt-8">
                    <div className="flex items-center justify-center flex-1 h-10 rounded bg-marine-50">
                      <span className="text-xs font-bold uppercase text-marine-600">
                        Vous avez déjà voté.
                      </span>
                    </div>
                    <a
                      href={`https://twitter.com/intent/tweet?via=GoneRank&text=${twitterText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center w-20 h-10 text-xs font-bold text-white uppercase rounded bg-sky-500 hover:bg-sky-600"
                    >
                      Tweeter
                    </a>
                  </div>

                  <MatchInfo
                    match={matchData!.displayMatch}
                    userRatings={userMatchRatingsData.ratings}
                  />
                </>
              )}
              {userMatchRatingsData?.ratings.length === 0 && (
                <>
                  <div className="flex items-center justify-center w-full h-10 mt-4 rounded bg-marine-50">
                    <span className="text-xs font-bold uppercase text-marine-600">
                      Les votes sont ouverts!
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
      <div className="w-full h-screen p-4">
        <div className="flex flex-col w-11/12 h-full mx-auto md:justify-center lg:items-center lg:w-3/5">
          <div className="relative flex items-center justify-center w-full overflow-hidden border rounded border-marine-300">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/misc/pleurer`}
              width={1200}
              height={795}
              alt="pleurer"
            />
          </div>
          <div className="relative flex items-center justify-center w-full p-4 mt-4 border rounded bg-marine-50 border-marine-300 lg:p-8">
            <div className="absolute flex items-center justify-center w-4 h-4 rounded-full md:w-6 md:h-6 bg-marine-600 top-2 left-2 md:relative md:top-0 md:left-0">
              <InfoIcon className="w-3 h-3 fill-white" />
            </div>
            <span className="ml-4 text-sm text-marine-500 lg:font-bold">
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
