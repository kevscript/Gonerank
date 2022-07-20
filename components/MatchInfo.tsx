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
      <ul className="mt-4">
        {match.stats.map((player) => (
          <li
            key={player.playerId}
            className="w-full h-10 bg-white rounded border border-gray-100 flex items-center justify-between overflow-hidden mt-2 first:mt-0"
          >
            <div className="flex items-center flex-1 w-full">
              <div className="relative w-6 h-6 rounded-full bg-gray-300 ml-2 flex justify-center items-center overflow-hidden">
                {player.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${player.image}`}
                    layout="fill"
                    objectFit="cover"
                    alt={`${player.firstName} ${player.lastName}`}
                  />
                ) : null}
              </div>
              <span className="ml-2 text-sm whitespace-nowrap">
                {player.firstName![0] + ". " + player.lastName}
              </span>
            </div>

            <div
              className={`flex h-full items-center w-12 justify-center font-num text-sm font-bold ${
                userRatings
                  ? "bg-gray-50 text-black"
                  : "bg-marine-50 text-marine-600"
              }`}
            >
              <span>
                {player.avgSum
                  ? (player.avgSum / player.numOfAvg).toFixed(2)
                  : "-"}
              </span>
            </div>

            {userRatings && (
              <div className="flex h-full items-center w-10 justify-center text-sm bg-marine-50">
                <span className="text-marine-600 font-num font-bold">
                  {
                    userRatings.find((r) => r.playerId === player.playerId)
                      ?.rating
                  }
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MatchInfo;
