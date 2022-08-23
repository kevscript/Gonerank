import ChartIcon from "../Icons/Chart";
import TableIcon from "../Icons/Table";

export type VisualFilterOptions = "table" | "chart";

export type VisualFilterProps = {
  toggleVisual: (x: "table" | "chart") => unknown;
  visual: "table" | "chart";
};

const VisualFilter = ({ toggleVisual, visual }: VisualFilterProps) => {
  return (
    <>
      <div className="h-10 flex-row justify-between items-center bg-gray-100 dark:bg-dark-400 border border-gray-200 dark:border-dark-300 max-w-max gap-x-[1px] px-[2px] rounded hidden lg:flex">
        <button
          onClick={() => toggleVisual("table")}
          className={`px-2 rounded-l h-9 text-sm ${
            visual === "table"
              ? "bg-white text-marine-600 dark:bg-marine-600 dark:text-white"
              : "bg-gray-100 dark:text-gray-300 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:text-white dark:hover:bg-dark-300"
          }`}
        >
          Tableau
        </button>
        <button
          onClick={() => toggleVisual("chart")}
          className={`px-2 rounded-r h-9 text-sm ${
            visual === "chart"
              ? "bg-white text-marine-600 dark:bg-marine-600 dark:text-white"
              : "bg-gray-100 dark:text-gray-300 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:text-white dark:hover:bg-dark-300"
          }`}
        >
          Graphique
        </button>
      </div>
      <div className="h-10 flex flex-row justify-between items-center bg-gray-100 dark:bg-dark-300 max-w-max  gap-x-[1px] px-[2px] rounded lg:hidden">
        <button
          onClick={() => toggleVisual("table")}
          className={`w-9 flex justify-center items-center rounded-l h-9 text-sm ${
            visual === "table"
              ? "bg-white dark:bg-marine-600 text-marine-600 dark:text-white"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:hover:text-white"
          }`}
        >
          <TableIcon
            className={`w-4 h-4 ${
              visual === "chart"
                ? "fill-marine-600 dark:fill-white"
                : "group-hover:fill-marine-600 dark:fill-gray-100 dark:group-hover:fill-white"
            }`}
          />
        </button>
        <button
          onClick={() => toggleVisual("chart")}
          className={`group w-9 flex justify-center items-center rounded-r h-9 text-sm ${
            visual === "chart"
              ? "bg-white dark:bg-marine-600 text-marine-600 dark:text-white"
              : "bg-gray-100 hover:bg-gray-50 hover:text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:hover:text-white"
          }`}
        >
          <ChartIcon
            className={`w-4 h-4 ${
              visual === "chart"
                ? "fill-marine-600 dark:fill-white"
                : "group-hover:fill-marine-600 dark:fill-gray-100 dark:group-hover:fill-white"
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default VisualFilter;
