import Spinner from "../shared/Spinner";

const LatestSeasonRankingSkeleton = () => {
  return (
    <div className="flex-col hidden lg:flex lg:w-60 2xl:w-72">
      <div className="w-full h-16 bg-gray-200 dark:bg-dark-400"></div>
      <div className="flex items-center justify-center flex-1 bg-gray-200 dark:bg-dark-400">
        <Spinner />
      </div>
    </div>
  );
};

export default LatestSeasonRankingSkeleton;
