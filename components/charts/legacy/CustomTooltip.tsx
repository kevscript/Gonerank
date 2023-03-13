import pickTextColor from "@/utils/pickTextColor";

type CustomTooltipProps = {
  active?: any;
  payload?: any;
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex overflow-hidden bg-gray-100 border border-gray-300 rounded-sm dark:bg-dark-500 dark:border-dark-300">
        <div className="flex flex-col">
          <div className="flex items-center h-5 px-1 gap-x-4">
            <span className="text-xs">
              {payload[0].payload.competition.abbreviation}
            </span>
            <span className="text-xs">
              {new Date(payload[0].payload.date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
              })}
            </span>
          </div>
          <div
            style={{ backgroundColor: payload[0].payload.opponent.primary }}
            className="px-1"
          >
            <span
              style={{
                color: pickTextColor(payload[0].payload.opponent.primary),
              }}
              className="text-sm"
            >
              {payload[0].payload.opponent.abbreviation}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center px-2 bg-gray-300 dark:bg-dark-300">
          <span className="font-bold font-num">
            {payload[0].value.toFixed(2)}
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CustomTooltip;
