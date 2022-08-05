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
      <ul className="mt-4 lg:mt-8 flex flex-col gap-2 lg:gap-4 lg:grid grid-cols-2">
        {match?.stats.map((player) => (
          <li
            key={player.playerId}
            className="w-full h-10 lg:h-16 bg-white rounded lg:border-none border border-gray-100 flex items-center justify-between overflow-hidden first:mt-0 lg:drop-shadow-sm"
          >
            <div className="flex items-center flex-1 w-full">
              <div className="relative w-6 h-6 lg:w-12 lg:h-12 rounded-full bg-gray-300 ml-2 flex justify-center items-center overflow-hidden">
                {player.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${player.image}`}
                    layout="fill"
                    objectFit="cover"
                    alt={`${player.firstName} ${player.lastName}`}
                  />
                ) : null}
              </div>
              <span className="ml-2 text-sm lg:text-base whitespace-nowrap lg:font-medium">
                {player.firstName![0] + ". " + player.lastName}
              </span>
            </div>

            {userRatings && (
              <div
                className="flex h-full items-center w-10 lg:w-16 justify-center text-sm lg:text-base bg-marine-100"
                title="la note de l'utilisateur"
              >
                <span className="text-marine-600 font-num lg:font-bold">
                  {
                    userRatings.find((r) => r.playerId === player.playerId)
                      ?.rating
                  }
                </span>
              </div>
            )}

            <div
              title="moyenne des notes de la communauté"
              className={`flex h-full items-center w-12 lg:w-16 justify-center font-num text-sm lg:text-base font-bold bg-marine-200 text-marine-800`}
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
