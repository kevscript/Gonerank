import { RankingType } from "./index";

type LatestSeasonHeaderProps = {
  seasonStartYear: number;
  rankingType: RankingType;
};

const LatestSeasonHeader = ({
  rankingType,
  seasonStartYear,
}: LatestSeasonHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center flex-shrink-0 w-full h-20 bg-white dark:bg-dark-500 drop-shadow-sm gap-y-1">
      <span className="text-sm font-bold uppercase">
        Classement{" "}
        <span className="font-num">
          {seasonStartYear}/{(seasonStartYear + 1).toString().substring(2)}
        </span>
      </span>
      <span className="text-xs">
        {rankingType === "average" && "Moyennes"}
        {rankingType === "tendency" && "Tendances"}
        {rankingType === "award" && "Récompenses"}
      </span>
    </div>
  );
};

export default LatestSeasonHeader;
