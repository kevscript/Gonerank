import Image from "next/image";
import { SUPABASE } from "@/utils/constants";
import InfoIcon from "../Icons/Info";

function MatchDisplayEmpty() {
  return (
    <div className="flex flex-col w-11/12 h-full mx-auto md:justify-center lg:items-center lg:w-3/5">
      <div className="relative flex items-center justify-center w-full overflow-hidden border rounded border-marine-300">
        <Image
          src={`${SUPABASE.BASE_URL}/storage/v1/object/public/misc/pleurer`}
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
          Aucun match n&apos;est actuellement disponible. Veuillez revenir plus
          tard.
        </span>
      </div>
    </div>
  );
}

export default MatchDisplayEmpty;
