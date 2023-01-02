import Spinner from "../shared/Spinner";

const LatestSeasonRankingSkeleton = () => {
  return (
    <div className="relative flex-col hidden lg:flex lg:w-60 2xl:w-72">
      <div className="flex flex-col flex-1 p-4 overflow-hidden bg-marine-50 dark:bg-dark-500 rouned-sm">
        <div className="w-full h-24 rounded-sm bg-white/70 dark:bg-dark-400 drop-shadow-sm"></div>
        <ul className="flex flex-col flex-1 flex-shrink-0 w-full gap-1 my-4 overflow-hidden">
          {[...Array(17)].map((n, i) => (
            <li
              key={i}
              className="flex-shrink-0 w-full h-10 rounded-sm bg-white/70 dark:bg-dark-400 drop-shadow-sm"
            ></li>
          ))}
        </ul>
        <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default LatestSeasonRankingSkeleton;
