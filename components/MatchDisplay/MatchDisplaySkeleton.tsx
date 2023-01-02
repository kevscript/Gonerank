import Spinner from "../shared/Spinner";

const MatchDisplaySkeleton = () => {
  return (
    <div className="relative flex flex-col flex-1 overflow-hidden min-h-fit gap-y-8">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10">
        <Spinner />
      </div>
      <div className="flex items-center justify-between w-full h-32 p-4 rounded-sm bg-marine-50 dark:bg-dark-500 flex-nowrap gap-x-4 drop-shadow-sm">
        <div className="flex-1 h-24 rounded-sm dark:bg-dark-400 bg-white/70 drop-shadow-sm"></div>
        <div className="w-24 h-24 rounded-sm dark:bg-dark-400 bg-white/70 drop-shadow-sm"></div>
        <div className="flex-1 h-24 rounded-sm dark:bg-dark-400 bg-white/70 drop-shadow-sm"></div>
      </div>
      <div className="flex flex-1 w-full p-4 rounded-sm bg-marine-50 dark:bg-dark-500">
        <ul className="grid w-full grid-cols-2 gap-2 overflow-hidden auto-rows-min">
          {[...Array(14)].map((n, i) => (
            <li
              key={i}
              className="h-24 rounded-sm dark:bg-dark-400 bg-white/70 drop-shadow-sm"
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MatchDisplaySkeleton;
