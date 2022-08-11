import UserIcon from "../Icons/User";

export type UserFilterProps = {
  toggleMode: (x: "all" | "user") => unknown;
  mode: "all" | "user";
};

const UserFilter = ({ toggleMode, mode }: UserFilterProps) => {
  return (
    <>
      <div className="h-10 flex-row justify-between items-center bg-gray-100 dark:bg-dark-400 border border-gray-200 dark:border-dark-300 max-w-max gap-x-[1px] px-[2px] rounded hidden lg:flex">
        <button
          onClick={() => toggleMode("all")}
          className={`px-2 rounded-l h-9 text-sm ${
            mode === "all"
              ? "bg-white text-marine-600 dark:bg-marine-600 dark:text-white"
              : "bg-gray-100 dark:text-gray-300 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:text-white dark:hover:bg-dark-300"
          }`}
        >
          Communauté
        </button>
        <button
          onClick={() => toggleMode("user")}
          className={`px-2 rounded-r h-9 text-sm ${
            mode === "user"
              ? "bg-white text-marine-600 dark:bg-marine-600 dark:text-white"
              : "bg-gray-100 dark:text-gray-300 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:text-white dark:hover:bg-dark-300"
          }`}
        >
          Utilisateur
        </button>
      </div>
      <div className="h-10 flex flex-row justify-between items-center bg-gray-100 dark:bg-dark-300 max-w-max  gap-x-[1px] px-[2px] rounded lg:hidden">
        <button
          onClick={() => toggleMode("all")}
          className={`w-9 flex justify-center items-center rounded-l h-9 text-sm ${
            mode === "all"
              ? "bg-white dark:bg-marine-600 text-marine-600 dark:text-white"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:hover:text-white"
          }`}
        >
          <span className="font-bold">GR</span>
        </button>
        <button
          onClick={() => toggleMode("user")}
          className={`group w-9 flex justify-center items-center rounded-r h-9 text-sm ${
            mode === "user"
              ? "bg-white dark:bg-marine-600 text-marine-600 dark:text-white"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:hover:text-white"
          }`}
        >
          <UserIcon
            className={`w-4 h-4 ${
              mode === "user"
                ? "fill-marine-600 dark:fill-white"
                : "group-hover:fill-marine-600 dark:fill-gray-300 dark:group-hover:fill-white"
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default UserFilter;
