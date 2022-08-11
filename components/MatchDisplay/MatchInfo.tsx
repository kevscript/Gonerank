import {
  GetDisplayMatchQuery,
  GetRatingsQuery,
} from "graphql/generated/queryTypes";
import Image from "next/image";

export type MatchInfoProps = {
  match: GetDisplayMatchQuery["displayMatch"];
  userRatings?: GetRatingsQuery["ratings"] | null;
};

const MatchInfo = ({ match, userRatings }: MatchInfoProps) => {
  return (
    <>
      <ul className="flex flex-col grid-cols-2 gap-2 mt-4 md:grid xl:mt-8 ">
        {match?.stats.map((player) => (
          <li
            key={player.playerId}
            className="flex items-center justify-between w-full h-10 overflow-hidden bg-white border border-gray-100 rounded dark:bg-dark-500 dark:border-dark-400 md:h-12 xl:h-16 xl:border-none first:mt-0 xl:drop-shadow-sm"
          >
            <div className="flex items-center flex-1 w-full">
              <div className="relative flex items-center justify-center w-6 h-6 ml-2 overflow-hidden bg-gray-300 rounded-full dark:bg-dark-600 md:w-8 md:h-8 xl:w-12 xl:h-12">
                {player.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${player.image}`}
                    layout="fill"
                    objectFit="cover"
                    alt={`${player.firstName} ${player.lastName}`}
                  />
                ) : null}
              </div>
              <span className="ml-2 text-sm whitespace-nowrap md:text-base md:font-medium">
                {player.firstName![0] + ". " + player.lastName}
              </span>
            </div>

            {userRatings && (
              <div
                className="flex items-center justify-center w-10 h-full text-sm font-bold md:text-base md:w-12 xl:w-14 bg-marine-100 dark:bg-dark-400"
                title="la note de l'utilisateur"
              >
                <span className="text-marine-600 dark:text-marine-400 font-num xl:font-bold">
                  {
                    userRatings.find((r) => r.playerId === player.playerId)
                      ?.rating
                  }
                </span>
              </div>
            )}

            <div
              title="moyenne des notes de la communauté"
              className={`flex h-full items-center w-12 xl:w-14 justify-center font-num text-sm font-bold md:text-base bg-marine-200 dark:bg-dark-500 text-marine-800 dark:text-white`}
            >
              <span>
                {player.avgSum
                  ? (player.avgSum / player.numOfAvg).toFixed(2)
                  : "-"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MatchInfo;
