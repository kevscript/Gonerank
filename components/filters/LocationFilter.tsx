import HomeIcon from "../Icons/HomeIcon";
import PlaneIcon from "../Icons/PlaneIcon";

export type LocationFilterOptions = "all" | "home" | "away";

export type LocationFilterProps = {
  toggleLocation: (x: LocationFilterOptions) => unknown;
  location: LocationFilterOptions;
};

const LocationFilter = ({ location, toggleLocation }: LocationFilterProps) => {
  return (
    <div className="h-10 flex flex-row justify-between items-center bg-gray-100 dark:bg-dark-300 max-w-max  gap-x-[1px] px-[2px] rounded">
      <button
        title="Domicile"
        onClick={() => toggleLocation("home")}
        className={`w-9 flex justify-center items-center rounded-l h-9 text-sm ${
          location === "home"
            ? "bg-white dark:bg-marine-600 text-marine-600 dark:text-white"
            : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:hover:text-white"
        }`}
      >
        <HomeIcon
          className={`w-4 h-4 ${
            location === "home"
              ? "fill-marine-600 dark:fill-white"
              : "group-hover:fill-marine-600 dark:fill-gray-100 dark:group-hover:fill-white"
          }`}
        />
      </button>
      <button
        title="Exterieur"
        onClick={() => toggleLocation("away")}
        className={`group w-9 flex justify-center items-center rounded-r h-9 text-sm ${
          location === "away"
            ? "bg-white dark:bg-marine-600 text-marine-600 dark:text-white"
            : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:hover:text-white"
        }`}
      >
        <PlaneIcon
          className={`w-4 h-4 ${
            location === "away"
              ? "fill-marine-600 dark:fill-white"
              : "group-hover:fill-marine-600 dark:fill-gray-100 dark:group-hover:fill-white"
          }`}
        />
      </button>
    </div>
  );
};

export default LocationFilter;
