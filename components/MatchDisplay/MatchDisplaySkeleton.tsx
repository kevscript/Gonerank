import Spinner from "../shared/Spinner";

const MatchDisplaySkeleton = () => {
  return (
    <div className="flex flex-col flex-1 min-h-fit gap-y-8">
      <div className="w-full h-32 bg-gray-200 dark:bg-dark-400"></div>
      <div className="flex items-center justify-center flex-1 w-full bg-gray-200 dark:bg-dark-400">
        <Spinner />
      </div>
    </div>
  );
};

export default MatchDisplaySkeleton;
