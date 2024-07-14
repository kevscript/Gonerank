import Image from "next/image";
import { SUPABASE } from "@/utils/constants";
import { PlayerSeasonDataQuery } from "@/graphql/generated/queryTypes";
import { getAgeFromDate } from "@/utils/getAgeFromDate";

export function PlayerHeader({
  player,
}: {
  player: PlayerSeasonDataQuery["player"];
}) {
  return (
    <div className="flex justify-center w-full my-8 md:py-8 md:my-0">
      <div className="flex flex-row items-center w-full px-4 py-4 overflow-hidden bg-white rounded dark:bg-dark-500 lg:px-8 flex-nowrap drop-shadow-sm">
        <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full shadow-inner dark:bg-dark-300 lg:h-16 lg:w-16 shrink-0">
          <Image
            src={`${SUPABASE.FULL_AVATARS_BUCKET_PATH}/${player.image}`}
            alt="player avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col flex-1 ml-4">
          <h3 className="overflow-hidden truncate lg:text-xl whitespace-nowrap">{`${player.firstName} ${player.lastName}`}</h3>
          <div className="flex items-center">
            <span className="mr-2 text-sm whitespace-nowrap">
              {getAgeFromDate(player.birthDate)} ans
            </span>
            <Image
              className="drop-shadow-sm"
              // src={`https://flagsapi.com/png/${player.countryCode}`}
              src={`https://flagsapi.com/${player.countryCode}/flat/64.png`}
              height={12}
              width={18}
              alt={player.country}
              title={player.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
