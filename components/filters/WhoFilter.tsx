import UserIcon from "../Icons/User";

export type WhoFilterOptions = "community" | "user";

export type WhoFilterProps = {
  toggleWho: (x: WhoFilterOptions) => unknown;
  who: WhoFilterOptions;
};

const WhoFilter = ({ toggleWho, who }: WhoFilterProps) => {
  return (
    <>
      <div className="h-10 flex-row justify-between items-center bg-gray-100 dark:bg-dark-400 border border-gray-200 dark:border-dark-300 max-w-max gap-x-[1px] rounded hidden lg:flex">
        <button
          onClick={() => toggleWho("community")}
          className={`px-2 rounded-l-sm h-9 text-sm ${
            who === "community"
              ? "bg-white text-marine-600 dark:bg-marine-600 dark:text-white"
              : "bg-gray-100 dark:text-gray-300 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:text-white dark:hover:bg-dark-300"
          }`}
        >
          Communauté
        </button>
        <button
          onClick={() => toggleWho("user")}
          className={`px-2 rounded-r-sm h-9 text-sm ${
            who === "user"
              ? "bg-white text-marine-600 dark:bg-marine-600 dark:text-white"
              : "bg-gray-100 dark:text-gray-300 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:text-white dark:hover:bg-dark-300"
          }`}
        >
          Utilisateur
        </button>
      </div>
      <div className="h-10 flex flex-row justify-between items-center bg-gray-100 dark:bg-dark-300 max-w-max  gap-x-[1px] px-[2px] rounded lg:hidden">
        <button
          onClick={() => toggleWho("community")}
          className={`w-9 flex justify-center items-center rounded-l-sm h-9 text-sm ${
            who === "community"
              ? "bg-white dark:bg-marine-600 text-marine-600 dark:text-white"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:hover:text-white"
          }`}
        >
          <span className="font-bold">GR</span>
        </button>
        <button
          onClick={() => toggleWho("user")}
          className={`group w-9 flex justify-center items-center rounded-r-sm h-9 text-sm ${
            who === "user"
              ? "bg-white dark:bg-marine-600 text-marine-600 dark:text-white"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:hover:text-white"
          }`}
        >
          <UserIcon
            className={`w-4 h-4 ${
              who === "user"
                ? "fill-marine-600 dark:fill-white"
                : "group-hover:fill-marine-600 dark:fill-gray-300 dark:group-hover:fill-white"
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default WhoFilter;
