import UserIcon from "../Icons/User";

export type UserFilterProps = {
  toggleMode: (x: "all" | "user") => unknown;
  mode: "all" | "user";
};

const UserFilter = ({ toggleMode, mode }: UserFilterProps) => {
  return (
    <>
      <div className="h-10 flex-row justify-between items-center bg-gray-100 max-w-max  gap-x-[1px] px-[2px] rounded hidden lg:flex">
        <button
          onClick={() => toggleMode("all")}
          className={`px-2 rounded-l-sm h-9 text-sm ${
            mode === "all"
              ? "bg-white text-marine-600"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600"
          }`}
        >
          Communauté
        </button>
        <button
          onClick={() => toggleMode("user")}
          className={`px-2 rounded-l-sm h-9 text-sm ${
            mode === "user"
              ? "bg-white text-marine-600"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600"
          }`}
        >
          Utilisateur
        </button>
      </div>
      <div className="h-10 flex flex-row justify-between items-center bg-gray-100 max-w-max  gap-x-[1px] px-[2px] rounded lg:hidden">
        <button
          onClick={() => toggleMode("all")}
          className={`w-9 flex justify-center items-center rounded-l-sm h-9 text-sm ${
            mode === "all"
              ? "bg-white text-marine-600"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600"
          }`}
        >
          <span className="font-bold">GR</span>
        </button>
        <button
          onClick={() => toggleMode("user")}
          className={`group w-9 flex justify-center items-center rounded-l-sm h-9 text-sm ${
            mode === "user"
              ? "bg-white text-marine-600"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600"
          }`}
        >
          <UserIcon
            className={`w-4 h-4 ${
              mode === "user"
                ? "fill-marine-600"
                : "group-hover:fill-marine-600"
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default UserFilter;
