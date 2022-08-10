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
import MatchDisplay from "@/components/MatchDisplay";
import MatchDisplayNoUser from "@/components/MatchDisplayNoUser";

const HomePage: NextCustomPage = () => {
  const { data: session, status } = useSession();

  const [twitterText, setTwitterText] = useState<string>("");

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

  if (matchError) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center w-full p-4 bg-gray-300 rounded dark:bg-slate-900">
          <p className="text-sm font-normal text-center text-gray-600 dark:text-white">
            {matchError.message}
          </p>
        </div>
      </div>
    );
  }

  if (matchData && !matchData.displayMatch) {
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

  return (
    <div className="">
      <Head>
        <title>Gonerank - Home</title>
        <meta name="description" content="Home page for Gonerank app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full min-h-screen">
        <div className="hidden w-full md:block md:px-4 md:py-8 lg:px-8 2xl:px-16">
          <div className="w-full bg-white rounded drop-shadow-sm">
            Breadcrumbs
          </div>
        </div>

        <div className="flex justify-between flex-1 w-full p-4 gap-x-8 2xl:gap-x-16 md:pt-0 md:pb-8 lg:px-8 2xl:px-16">
          {matchData && matchData.displayMatch ? (
            <div className="flex flex-col flex-1 min-h-fit">
              {status === "authenticated" ? (
                <MatchDisplay
                  match={matchData.displayMatch}
                  userRatings={userMatchRatingsData?.ratings}
                  handleVote={handleVote}
                  twitterText={twitterText}
                />
              ) : (
                <MatchDisplayNoUser match={matchData.displayMatch} />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-1 my-8">
              <Spinner />
            </div>
          )}
          <div className="hidden bg-red-600 rounded min-h-fit drop-shadow-sm lg:block lg:w-60 2xl:w-72"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
