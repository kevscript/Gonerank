import { RankingType } from "./index";

type LatestSeasonStatPickerProps = {
  rankingType: RankingType;
  handleRankingType: (x: RankingType) => void;
};

const LatestSeasonStatPicker = ({
  rankingType,
  handleRankingType,
}: LatestSeasonStatPickerProps) => {
  return (
    <ul className="flex flex-row w-full h-6 my-2 flex-nowrap gap-x-1">
      <li className="flex-1">
        <button
          className={`w-full h-full rounded uppercase text-xs font-bold bg-white dark:bg-dark-400 border ${
            rankingType === "average"
              ? "border-marine-600 text-marine-600 dark:text-marine-400"
              : "border-gray-200 text-gray-500 hover:text-marine-500 hover:border-marine-300 dark:border-dark-300 dark:hover:border-marine-500 dark:text-gray-100"
          }`}
          onClick={() => handleRankingType("average")}
        >
          <span className="sr-only">Averages</span>
          Avg
        </button>
      </li>
      <li className="flex-1">
        <button
          className={`w-full h-full rounded uppercase text-xs font-bold border bg-white dark:bg-dark-400 ${
            rankingType === "tendency"
              ? "border-marine-600 text-marine-600 dark:text-marine-400"
              : "border-gray-200 text-gray-500 hover:text-marine-500 hover:border-marine-300 dark:border-dark-300 dark:hover:border-marine-500 dark:text-gray-100"
          }`}
          onClick={() => handleRankingType("tendency")}
        >
          <span className="sr-only">Tendencies</span>
          Tdc
        </button>
      </li>
      <li className="flex-1">
        <button
          className={`w-full h-full rounded uppercase text-xs font-bold bg-white dark:bg-dark-400 border ${
            rankingType === "award"
              ? "border-marine-600 text-marine-600 dark:text-marine-400"
              : "border-gray-200 text-gray-500 hover:text-marine-500 hover:border-marine-300 dark:border-dark-300 dark:hover:border-marine-500 dark:text-gray-100"
          }`}
          onClick={() => handleRankingType("award")}
        >
          <span className="sr-only">Awards</span>
          Awr
        </button>
      </li>
    </ul>
  );
};

export default LatestSeasonStatPicker;
